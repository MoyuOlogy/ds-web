/**
 * Host half of the DeepSeek Chat bundle.
 *
 * Keeps the conversation library in this machine's DSH home, maintains a small
 * index so a 1000+ conversation export opens instantly, proxies streaming chat
 * completions to the DeepSeek API, and persists imported conversations.
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { randomUUID } from 'node:crypto'

const ROUTE_PREFIX = '/api/ds-web'
const MAX_BODY_BYTES = 96 * 1024 * 1024
const MAX_MESSAGES = 6000
const MAX_TOOLS = 40
const MAX_RESULTS = 20
const INDEX_VERSION = 1
const DEFAULT_MODEL = 'deepseek-flash'
const DEFAULT_MODELS = ['deepseek-flash', 'deepseek-v4-pro']
const REASONING_EFFORTS = ['low', 'high', 'max']
const MAX_FILE_BYTES = 120 * 1024 * 1024
const UPSTREAM_FILE_TIMEOUT_MS = 240000
const MAX_OCR_CHARS = 8 * 1024 * 1024
const MAX_IMAGE_CHARS = 12 * 1024 * 1024
const QWEN_FILE_MODEL = 'qwen-long'
const QWEN_OCR_MODELS = ['qwen3.5-ocr', 'qwen-vl-ocr']

class HttpError extends Error {
  constructor(status, code, message) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.code = code
  }
}

function dataDirectory() {
  const home = process.env.DSH_HOME && process.env.DSH_HOME.trim() !== ''
    ? process.env.DSH_HOME
    : path.join(os.homedir(), '.dsh')
  return path.join(home, 'deepseek-chat')
}

function text(value, max) {
  return typeof value === 'string' ? value.slice(0, max) : ''
}

function finite(value, fallback) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function bool(value) {
  return value === true
}

function normalizeModelId(value) {
  const id = text(value, 120).trim()
  if (id === '' || id === 'deepseek-chat' || id === 'deepseek-reasoner') return DEFAULT_MODEL
  return id
}

function normalizeReasoningEffort(value, fallback) {
  const effort = text(value, 20).trim().toLowerCase()
  if (REASONING_EFFORTS.includes(effort)) return effort
  if (effort === 'minimal') return 'low'
  if (effort === 'medium' || effort === 'xhigh' || effort === 'ultra') return 'high'
  return REASONING_EFFORTS.includes(fallback) ? fallback : 'high'
}

function apiPath(baseURL, suffix) {
  const base = baseURL.replace(/\/+$/u, '')
  if (suffix.startsWith('/v1/') && base.endsWith('/v1')) return base + suffix.slice(3)
  return base + suffix
}

function detectApiMode(settings) {
  const url = String(settings && settings.baseURL ? settings.baseURL : '')
  if (/compatible-mode/iu.test(url)) return 'qwen'
  if (/api\.deepseek\.com/iu.test(url)) return 'deepseek'
  return 'openai'
}

function normalizeBaseURL(value) {
  const raw = text(value, 300).trim()
  if (raw === '') return 'https://api.deepseek.com'
  if (!/^https?:\/\/[^\s]+$/u.test(raw)) {
    throw new HttpError(400, 'deepseek-chat/bad-base-url', 'Base URL must start with http:// or https://')
  }
  return raw.replace(/\/+$/u, '').replace(/\/chat\/completions$/u, '')
}

function normalizeContent(value) {
  if (Array.isArray(value)) {
    const blocks = []
    for (const block of value.slice(0, 24)) {
      if (block === null || typeof block !== 'object') continue
      if (block.type === 'text' && typeof block.text === 'string' && block.text.trim() !== '') {
        blocks.push({ type: 'text', text: block.text.slice(0, MAX_OCR_CHARS) })
      } else if (block.type === 'file' && typeof block.file_id === 'string' && /^file-api-[A-Za-z0-9_-]{1,100}$/u.test(block.file_id)) {
        blocks.push({ type: 'file', file_id: block.file_id })
      } else if (block.type === 'image_url' && block.image_url && typeof block.image_url.url === 'string' && /^(https?:\/\/|data:image\/)/u.test(block.image_url.url)) {
        blocks.push({ type: 'image_url', image_url: { url: block.image_url.url.slice(0, MAX_IMAGE_CHARS) } })
      }
    }
    return blocks
  }
  return text(value, MAX_OCR_CHARS)
}

function normalizeMessages(value, options) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new HttpError(400, 'deepseek-chat/no-messages', 'The request has no messages')
  }
  const includeTools = options && options.tools === true
  const messages = []
  for (const entry of value.slice(-400)) {
    if (entry === null || typeof entry !== 'object') continue
    const role = entry.role === 'assistant' ? 'assistant' : entry.role === 'system' ? 'system' : 'user'
    const content = normalizeContent(entry.content)
    const hasContent = typeof content === 'string' ? content.trim() !== '' : content.length > 0
    if (!hasContent) continue
    const message = { role, content }
    if (role === 'assistant') {
      if (includeTools && typeof entry.reasoning_content === 'string' && entry.reasoning_content.trim() !== '') {
        message.reasoning_content = entry.reasoning_content.slice(0, MAX_OCR_CHARS)
      }
      if (Array.isArray(entry.server_tool_calls) && entry.server_tool_calls.length > 0) {
        message.server_tool_calls = sanitizeServerToolCalls(entry.server_tool_calls)
      }
    }
    messages.push(message)
  }
  if (messages.length === 0) {
    throw new HttpError(400, 'deepseek-chat/no-messages', 'The request has no usable messages')
  }
  return messages
}

function sanitizeTool(tool) {
  const type = ['search', 'open', 'read'].includes(tool?.type) ? tool.type : 'search'
  const queries = Array.isArray(tool?.queries)
    ? tool.queries.filter((q) => typeof q === 'string').slice(0, 10).map((q) => q.slice(0, 400))
    : []
  const results = Array.isArray(tool?.results)
    ? tool.results.slice(0, MAX_RESULTS).map((result) => ({
      title: text(result?.title, 400),
      url: text(result?.url, 3000),
      snippet: text(result?.snippet, 800),
    })).filter((result) => result.title !== '' || result.url !== '')
    : []
  return { type, queries, results }
}

function sanitizeAttachment(item) {
  if (typeof item === 'string') {
    const name = text(item, 400).trim()
    return name === '' ? null : { name, size: 0, image: false, mime: '', kind: 'file', purpose: '', fileId: '', pageCount: 0, ocrText: '', text: '', dataUrl: '' }
  }
  if (item === null || typeof item !== 'object') return null
  const name = text(item.name, 400).trim()
  if (name === '') return null
  const kind = ['file', 'image', 'ocr'].includes(item.kind) ? item.kind : item.image === true ? 'image' : 'file'
  const purpose = ['user_data', 'text_recognition', 'rich_layout_recognition'].includes(item.purpose) ? item.purpose : ''
  const fileId = typeof item.fileId === 'string' && /^file-api-[A-Za-z0-9_-]{1,100}$/u.test(item.fileId) ? item.fileId : ''
  return {
    name,
    size: Math.max(0, finite(item.size, 0)),
    image: kind === 'image' || item.image === true,
    mime: text(item.mime, 120),
    kind,
    purpose,
    fileId,
    pageCount: Math.max(0, Math.floor(finite(item.pageCount, 0))),
    ocrText: kind === 'ocr' ? text(item.ocrText, MAX_OCR_CHARS) : '',
    text: text(item.text, MAX_OCR_CHARS),
    dataUrl: typeof item.dataUrl === 'string' && item.dataUrl.startsWith('data:image/') ? text(item.dataUrl, MAX_IMAGE_CHARS) : '',
  }
}

function sanitizeSources(value) {
  if (!Array.isArray(value)) return []
  return value.slice(0, MAX_RESULTS).map((source) => ({
    type: 'url',
    url: text(source?.url, 3000),
    title: text(source?.title, 500),
    snippet: text(source?.snippet, 1200),
    site_name: text(source?.site_name, 200),
    site_icon: text(source?.site_icon, 1000),
    published_at: text(source?.published_at, 80),
    image_url: text(source?.image_url, 3000),
  })).filter((source) => source.url !== '' || source.title !== '')
}

function sanitizeAction(value) {
  if (value === null || typeof value !== 'object') return { type: '' }
  const action = { type: text(value.type, 40) }
  if (Array.isArray(value.queries)) {
    action.queries = value.queries.filter((query) => typeof query === 'string').slice(0, 10).map((query) => query.slice(0, 400))
  }
  if (typeof value.url === 'string') action.url = text(value.url, 4000)
  if (typeof value.pattern === 'string') action.pattern = text(value.pattern, 500)
  return action
}

function sanitizeServerToolCalls(value) {
  if (!Array.isArray(value)) return []
  return value.slice(0, 32).map((step, stepIndex) => ({
    index: Math.max(0, Math.floor(finite(step?.index, stepIndex))),
    reasoning_content: text(step?.reasoning_content, 400000),
    calls: Array.isArray(step?.calls)
      ? step.calls.slice(0, 32).map((call, callIndex) => {
        const page = call?.page && typeof call.page === 'object'
          ? { url: text(call.page.url, 4000), title: text(call.page.title, 1000), published_at: text(call.page.published_at, 80) }
          : null
        return {
          index: Math.max(0, Math.floor(finite(call?.index, callIndex))),
          id: text(call?.id, 200),
          type: ['deepseek_web_search', 'deepseek_read_url'].includes(call?.type) ? call.type : text(call?.type, 80),
          kind: text(call?.kind, 40),
          action: sanitizeAction(call?.action),
          status: call?.status === 'failed' ? 'failed' : 'completed',
          page,
          sources: sanitizeSources(call?.sources),
          signature: text(call?.signature, 2000000),
          error: call?.error && typeof call.error === 'object' ? { code: text(call.error.code, 80) } : null,
        }
      })
      : [],
  }))
}

function sanitizeAnnotations(value) {
  if (!Array.isArray(value)) return []
  return value.slice(0, 200).map((annotation) => {
    if (annotation?.type !== 'url_citation' || !annotation.url_citation) return null
    return {
      type: 'url_citation',
      url_citation: {
        url: text(annotation.url_citation.url, 4000),
        title: text(annotation.url_citation.title, 1000),
        start_index: Math.max(0, Math.floor(finite(annotation.url_citation.start_index, 0))),
        end_index: Math.max(0, Math.floor(finite(annotation.url_citation.end_index, 0))),
      },
    }
  }).filter((annotation) => annotation !== null && annotation.url_citation.url !== '')
}

function sanitizeMessage(message, index) {
  const role = message?.role === 'assistant' ? 'assistant' : 'user'
  const attachments = Array.isArray(message?.attachments)
    ? message.attachments.slice(0, 30).map(sanitizeAttachment).filter((item) => item !== null)
    : []
  return {
    id: text(message?.id, 100) || `m_${index}_${randomUUID().slice(0, 8)}`,
    role,
    content: text(message?.content, 4000000),
    reasoning: text(message?.reasoning, 4000000),
    reasoningSeconds: finite(message?.reasoningSeconds, 0),
    createdAt: finite(message?.createdAt, Date.now()),
    stopped: bool(message?.stopped),
    status: text(message?.status, 40),
    exclude: bool(message?.exclude),
    error: text(message?.error, 2000),
    attachments,
    tools: Array.isArray(message?.tools) ? message.tools.slice(0, MAX_TOOLS).map(sanitizeTool) : [],
    serverToolCalls: sanitizeServerToolCalls(message?.serverToolCalls),
    annotations: sanitizeAnnotations(message?.annotations),
  }
}

function sanitizeConversation(value) {
  if (value === null || typeof value !== 'object') {
    throw new HttpError(400, 'deepseek-chat/bad-conversation', 'The conversation is missing')
  }
  const messages = Array.isArray(value.messages)
    ? value.messages.slice(-MAX_MESSAGES).map(sanitizeMessage)
    : []
  const now = Date.now()
  const createdAt = finite(value.createdAt, now)
  return {
    id: text(value.id, 100),
    title: text(value.title, 400).trim() || '新对话',
    createdAt,
    updatedAt: finite(value.updatedAt, createdAt),
    model: normalizeModelId(value.model) || DEFAULT_MODEL,
    imported: bool(value.imported),
    pinned: bool(value.pinned),
    source: text(value.source, 120),
    messages,
  }
}

function summarize(conversation) {
  let preview = ''
  for (let index = conversation.messages.length - 1; index >= 0; index -= 1) {
    const message = conversation.messages[index]
    if (message.role === 'user' && message.content.trim() !== '') {
      preview = message.content.replace(/\s+/gu, ' ').trim().slice(0, 120)
      break
    }
  }
  return {
    id: conversation.id,
    title: conversation.title,
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt,
    model: conversation.model,
    imported: conversation.imported,
    pinned: conversation.pinned,
    messageCount: conversation.messages.length,
    preview,
  }
}

function publicSettings(settings) {
  return {
    baseURL: settings.baseURL,
    model: settings.model,
    models: settings.models,
    temperature: settings.temperature,
    systemPrompt: settings.systemPrompt,
    thinking: settings.thinking === true,
    reasoningEffort: settings.reasoningEffort,
    apiMode: detectApiMode(settings),
    hasKey: settings.apiKey !== '',
    keyHint: settings.apiKey === '' ? '' : settings.apiKey.slice(-4),
  }
}

function upstreamMessage(raw, fallback) {
  const trimmed = String(raw || '').trim()
  if (trimmed === '') return fallback
  try {
    const parsed = JSON.parse(trimmed)
    const message = parsed?.error?.message ?? parsed?.message
    if (typeof message === 'string' && message !== '') return message.slice(0, 600)
  } catch {
    // Not JSON: fall through to the raw text.
  }
  return trimmed.slice(0, 600)
}

function jsonError(error) {
  const status = error instanceof HttpError ? error.status : 500
  const code = error instanceof HttpError ? error.code : 'deepseek-chat/internal'
  const message = error instanceof Error && error.message !== '' ? error.message : 'DeepSeek Chat failed'
  return Response.json({ error: { code, message } }, {
    status,
    headers: { 'cache-control': 'no-store' },
  })
}

async function readJson(request) {
  const declared = Number(request.headers.get('content-length') || '0')
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    throw new HttpError(413, 'deepseek-chat/too-large', 'The request body is too large')
  }
  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) {
    throw new HttpError(413, 'deepseek-chat/too-large', 'The request body is too large')
  }
  if (raw.trim() === '') return {}
  try {
    return JSON.parse(raw)
  } catch {
    throw new HttpError(400, 'deepseek-chat/bad-json', 'The request body is not valid JSON')
  }
}

class ChatStore {
  constructor(directory) {
    this.directory = directory
    this.conversationsDirectory = path.join(directory, 'conversations')
    this.settingsFile = path.join(directory, 'settings.json')
    this.indexFile = path.join(directory, 'index.json')
    this.profileFile = path.join(directory, 'profile.json')
    this.cachedSettings = null
    this.cachedIndex = null
    this.cachedProfile = null
    this.queue = Promise.resolve()
  }

  async ensure() {
    await fs.mkdir(this.conversationsDirectory, { recursive: true })
  }

  /** Serialize mutations so index writes never overwrite each other. */
  serialize(task) {
    const run = this.queue.then(task, task)
    this.queue = run.then(() => undefined, () => undefined)
    return run
  }

  defaults() {
    return {
      apiKey: '',
      baseURL: 'https://api.deepseek.com',
      model: DEFAULT_MODEL,
      models: DEFAULT_MODELS.slice(),
      temperature: 1,
      systemPrompt: '',
      thinking: false,
      reasoningEffort: 'high',
    }
  }

  async settings() {
    if (this.cachedSettings !== null) return this.cachedSettings
    await this.ensure()
    let stored = {}
    try {
      stored = JSON.parse(await fs.readFile(this.settingsFile, 'utf8'))
    } catch {
      stored = {}
    }
    const defaults = this.defaults()
    const storedModels = Array.isArray(stored.models)
      ? stored.models.filter((model) => typeof model === 'string' && model.trim() !== '').slice(0, 20).map((model) => normalizeModelId(model))
      : defaults.models
    const hadLegacyModel = Array.isArray(stored.models)
      && stored.models.some((model) => model === 'deepseek-chat' || model === 'deepseek-reasoner')
    const models = []
    for (const model of storedModels) {
      if (!models.includes(model)) models.push(model)
    }
    if (hadLegacyModel && !models.includes('deepseek-v4-pro')) models.push('deepseek-v4-pro')
    if (models.length === 0) models.push(...defaults.models)
    const storedModel = typeof stored.model === 'string' && stored.model !== '' ? stored.model : defaults.model
    const legacyReasoner = storedModel === 'deepseek-reasoner'
    this.cachedSettings = {
      apiKey: typeof stored.apiKey === 'string' ? stored.apiKey : '',
      baseURL: typeof stored.baseURL === 'string' && stored.baseURL !== '' ? stored.baseURL : defaults.baseURL,
      model: normalizeModelId(storedModel),
      models: models.length > 0 ? models : defaults.models.slice(),
      temperature: finite(stored.temperature, defaults.temperature),
      systemPrompt: typeof stored.systemPrompt === 'string' ? stored.systemPrompt : '',
      thinking: typeof stored.thinking === 'boolean' ? stored.thinking : legacyReasoner,
      reasoningEffort: normalizeReasoningEffort(stored.reasoningEffort, defaults.reasoningEffort),
    }
    return this.cachedSettings
  }

  async writeAtomic(file, value) {
    await fs.mkdir(path.dirname(file), { recursive: true })
    const temp = `${file}.${randomUUID().slice(0, 8)}.tmp`
    await fs.writeFile(temp, JSON.stringify(value), 'utf8')
    await fs.rename(temp, file)
  }

  async saveSettings(patch) {
    return this.serialize(async () => {
      const current = await this.settings()
      const next = { ...current }
      if (patch.clearKey === true) next.apiKey = ''
      if (typeof patch.apiKey === 'string' && patch.apiKey.trim() !== '') next.apiKey = patch.apiKey.trim()
      if (patch.baseURL !== undefined) next.baseURL = normalizeBaseURL(patch.baseURL)
      if (patch.model !== undefined) {
        const model = normalizeModelId(patch.model)
        if (model === '') throw new HttpError(400, 'deepseek-chat/bad-model', 'The model id is empty')
        next.model = model
      }
      if (patch.models !== undefined) {
        if (!Array.isArray(patch.models)) throw new HttpError(400, 'deepseek-chat/bad-models', 'models must be an array')
        const models = patch.models.filter((model) => typeof model === 'string' && model.trim() !== '').slice(0, 20).map((model) => normalizeModelId(model))
        next.models = models.length > 0 ? Array.from(new Set(models)) : current.models
      }
      if (patch.thinking !== undefined) next.thinking = patch.thinking === true
      if (patch.reasoningEffort !== undefined) {
        next.reasoningEffort = normalizeReasoningEffort(patch.reasoningEffort, current.reasoningEffort)
      }
      if (patch.temperature !== undefined) {
        const temperature = Number(patch.temperature)
        if (!Number.isFinite(temperature) || temperature < 0 || temperature > 2) {
          throw new HttpError(400, 'deepseek-chat/bad-temperature', 'Temperature must be between 0 and 2')
        }
        next.temperature = temperature
      }
      if (patch.systemPrompt !== undefined) next.systemPrompt = text(patch.systemPrompt, 30000)
      this.cachedSettings = next
      await this.writeAtomic(this.settingsFile, next)
      try {
        await fs.chmod(this.settingsFile, 0o600)
      } catch {
        // Windows does not model POSIX modes.
      }
      return publicSettings(next)
    })
  }

  fileFor(id) {
    if (!/^[A-Za-z0-9_-]{1,100}$/u.test(id)) {
      throw new HttpError(400, 'deepseek-chat/bad-id', 'Invalid conversation id')
    }
    return path.join(this.conversationsDirectory, `${id}.json`)
  }

  async profile() {
    if (this.cachedProfile !== null) return this.cachedProfile
    await this.ensure()
    try {
      const stored = JSON.parse(await fs.readFile(this.profileFile, 'utf8'))
      this.cachedProfile = {
        name: text(stored.name, 80) || 'DeepSeek',
        avatar: text(stored.avatar, 500),
      }
    } catch {
      this.cachedProfile = { name: 'DeepSeek', avatar: '' }
    }
    return this.cachedProfile
  }

  async readIndex() {
    await this.ensure()
    if (this.cachedIndex !== null) return this.cachedIndex
    try {
      const stored = JSON.parse(await fs.readFile(this.indexFile, 'utf8'))
      if (stored && stored.version === INDEX_VERSION && Array.isArray(stored.items)) {
        this.cachedIndex = stored.items
        return this.cachedIndex
      }
    } catch {
      // Rebuild below.
    }
    const rebuilt = await this.rebuildIndex()
    return rebuilt
  }

  async rebuildIndex() {
    let names = []
    try {
      names = await fs.readdir(this.conversationsDirectory)
    } catch {
      names = []
    }
    const items = []
    for (const name of names) {
      if (!name.endsWith('.json')) continue
      try {
        const raw = await fs.readFile(path.join(this.conversationsDirectory, name), 'utf8')
        items.push(summarize(sanitizeConversation(JSON.parse(raw))))
      } catch {
        // Skip corrupt files.
      }
    }
    items.sort((left, right) => right.updatedAt - left.updatedAt)
    this.cachedIndex = items
    await this.writeIndex()
    return items
  }

  async writeIndex(items) {
    const value = items || this.cachedIndex || []
    await this.writeAtomic(this.indexFile, { version: INDEX_VERSION, items: value })
  }

  async list() {
    const items = await this.readIndex()
    return items.slice().sort((left, right) => right.updatedAt - left.updatedAt)
  }

  async read(id) {
    await this.ensure()
    try {
      return sanitizeConversation(JSON.parse(await fs.readFile(this.fileFor(id), 'utf8')))
    } catch (error) {
      if (error instanceof HttpError) throw error
      throw new HttpError(404, 'deepseek-chat/not-found', 'That conversation no longer exists')
    }
  }

  async upsertIndex(conversation) {
    const items = await this.readIndex()
    const summary = summarize(conversation)
    const index = items.findIndex((item) => item.id === summary.id)
    if (index >= 0) items[index] = summary
    else items.push(summary)
    items.sort((left, right) => right.updatedAt - left.updatedAt)
    this.cachedIndex = items
    await this.writeIndex()
    return summary
  }

  async save(conversation) {
    return this.serialize(async () => {
      await this.ensure()
      const normalized = sanitizeConversation(conversation)
      if (normalized.id === '') normalized.id = `c_${randomUUID().replace(/-/gu, '').slice(0, 20)}`
      if ((normalized.title === '' || normalized.title === '新对话') && normalized.messages.length > 0) {
        const first = normalized.messages.find((message) => message.role === 'user' && message.content.trim() !== '')
        if (first !== undefined) normalized.title = first.content.replace(/\s+/gu, ' ').trim().slice(0, 40)
      }
      await this.writeAtomic(this.fileFor(normalized.id), normalized)
      await this.upsertIndex(normalized)
      return normalized
    })
  }

  async remove(id) {
    return this.serialize(async () => {
      await this.ensure()
      try {
        await fs.unlink(this.fileFor(id))
      } catch (error) {
        if (error?.code !== 'ENOENT') throw error
      }
      const items = await this.readIndex()
      const next = items.filter((item) => item.id !== id)
      this.cachedIndex = next
      await this.writeIndex(next)
      return true
    })
  }

  async rename(id, title) {
    return this.serialize(async () => {
      const conversation = await this.read(id)
      conversation.title = title
      await this.writeAtomic(this.fileFor(id), conversation)
      const summary = await this.upsertIndex(conversation)
      return { conversation, summary }
    })
  }

  async pin(id, pinned) {
    return this.serialize(async () => {
      const conversation = await this.read(id)
      conversation.pinned = pinned
      await this.writeAtomic(this.fileFor(id), conversation)
      const summary = await this.upsertIndex(conversation)
      return { conversation, summary }
    })
  }

  async importMany(values) {
    return this.serialize(async () => {
      await this.ensure()
      const items = await this.readIndex()
      const imported = []
      for (const value of values) {
        const conversation = sanitizeConversation(value)
        if (!/^imp_[A-Za-z0-9_-]{1,70}$/u.test(conversation.id)) {
          conversation.id = `imp_${randomUUID().replace(/-/gu, '').slice(0, 20)}`
        }
        conversation.imported = true
        conversation.source = conversation.source || 'import'
        await this.writeAtomic(this.fileFor(conversation.id), conversation)
        const summary = summarize(conversation)
        const existing = items.findIndex((item) => item.id === summary.id)
        if (existing >= 0) items[existing] = summary
        else items.push(summary)
        imported.push(summary)
      }
      items.sort((left, right) => right.updatedAt - left.updatedAt)
      this.cachedIndex = items
      await this.writeIndex(items)
      return imported
    })
  }
}

export function apply(ctx) {
  const store = new ChatStore(dataDirectory())

  ctx.inject(['connection'], (scoped) => {
    const register = (suffix, methods, handler) => {
      scoped.effect(() => scoped.connection.fetch.register({
        path: ROUTE_PREFIX + suffix,
        methods,
        requestBody: 'buffered',
        fetch: handler,
      }), `deepseek-chat: route ${suffix}`)
    }

    const action = (suffix, handler) => {
      register(suffix, ['POST'], async (request) => {
        try {
          const payload = await readJson(request)
          const value = await handler(payload, request)
          return Response.json(value, { headers: { 'cache-control': 'no-store' } })
        } catch (error) {
          ctx.logger?.warn?.(`deepseek-chat: ${suffix} failed: ${error instanceof Error ? error.message : String(error)}`)
          return jsonError(error)
        }
      })
    }

    action('/bootstrap', async () => {
      const settings = await store.settings()
      const [conversations, profile] = await Promise.all([store.list(), store.profile()])
      return { settings: publicSettings(settings), conversations, profile }
    })

    action('/conversation/get', async (payload) => {
      return { conversation: await store.read(text(payload.id, 100)) }
    })

    action('/conversation/save', async (payload) => {
      const conversation = await store.save(payload.conversation)
      return { conversation, summary: summarize(conversation) }
    })

    action('/conversation/delete', async (payload) => {
      return { deleted: await store.remove(text(payload.id, 100)) }
    })

    action('/conversation/rename', async (payload) => {
      const title = text(payload.title, 400).trim()
      if (title === '') throw new HttpError(400, 'deepseek-chat/bad-title', 'The title is empty')
      return store.rename(text(payload.id, 100), title)
    })

    action('/conversation/pin', async (payload) => {
      return store.pin(text(payload.id, 100), payload.pinned === true)
    })

    action('/conversation/list', async () => {
      return { conversations: await store.list() }
    })

    action('/settings/save', async (payload) => {
      return { settings: await store.saveSettings(payload) }
    })

    action('/import', async (payload) => {
      const values = Array.isArray(payload.conversations) ? payload.conversations.slice(0, 40) : []
      if (values.length === 0) throw new HttpError(400, 'deepseek-chat/no-conversations', 'No conversations to import')
      return { imported: await store.importMany(values) }
    })

    const apiTarget = async () => {
      const settings = await store.settings()
      if (settings.apiKey === '') {
        throw new HttpError(400, 'deepseek-chat/missing-key', 'Add a DeepSeek API key in this panel\'s settings first')
      }
      return settings
    }

    const qwenChat = async (settings, body, timeout) => {
      let response
      try {
        response = await fetch(`${settings.baseURL}/chat/completions`, {
          method: 'POST',
          headers: {
            authorization: `Bearer ${settings.apiKey}`,
            'content-type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(timeout || 180000),
        })
      } catch (error) {
        throw new HttpError(502, 'deepseek-chat/network', `Could not reach ${settings.baseURL}: ${error instanceof Error ? error.message : String(error)}`)
      }
      const raw = await response.text()
      if (!response.ok) {
        throw new HttpError(response.status, 'deepseek-chat/api-error', upstreamMessage(raw, `The API returned HTTP ${response.status}`))
      }
      let data
      try {
        data = JSON.parse(raw)
      } catch {
        throw new HttpError(502, 'deepseek-chat/bad-response', 'The API returned an unreadable response')
      }
      if (data && data.error) {
        throw new HttpError(502, 'deepseek-chat/api-error', upstreamMessage(raw, 'The API returned an error'))
      }
      return data
    }

    const qwenExtractFile = async (settings, fileId, filename) => {
      const data = await qwenChat(settings, {
        model: QWEN_FILE_MODEL,
        messages: [
          { role: 'system', content: `fileid://${fileId}` },
          {
            role: 'user',
            content: '请把文件中的全部文字原样输出，不要总结、不要省略、不要添加解释。保留标题、列表和表格结构。文件：' + filename,
          },
        ],
        stream: false,
        temperature: 0,
        max_tokens: 8000,
      }, 180000)
      const content = data?.choices?.[0]?.message?.content
      if (typeof content !== 'string' || content.trim() === '') {
        throw new HttpError(502, 'deepseek-chat/file-extract', 'The file had no readable text')
      }
      return content.slice(0, MAX_OCR_CHARS)
    }

    const qwenUploadFile = async (settings, file) => {
      const form = new FormData()
      form.append('purpose', 'file-extract')
      form.append('file', file, file.name || 'file')
      let response
      try {
        response = await fetch(`${settings.baseURL}/files`, {
          method: 'POST',
          headers: { authorization: `Bearer ${settings.apiKey}`, accept: 'application/json' },
          body: form,
          signal: AbortSignal.timeout(UPSTREAM_FILE_TIMEOUT_MS),
        })
      } catch (error) {
        throw new HttpError(502, 'deepseek-chat/upload-failed', `Could not reach ${settings.baseURL}: ${error instanceof Error ? error.message : String(error)}`)
      }
      const raw = await response.text()
      if (!response.ok) {
        throw new HttpError(response.status, 'deepseek-chat/upload-failed', upstreamMessage(raw, `The API returned HTTP ${response.status}`))
      }
      let data
      try {
        data = JSON.parse(raw)
      } catch {
        throw new HttpError(502, 'deepseek-chat/upload-failed', 'The API returned an unreadable file response')
      }
      if (!data || typeof data.id !== 'string') {
        throw new HttpError(502, 'deepseek-chat/upload-failed', 'The API did not return a file id')
      }
      return data
    }

    const qwenOcrFile = async (settings, file) => {
      const name = String(file.name || 'file')
      const type = String(file.type || '')
      const isImage = /^image\//iu.test(type) || /\.(png|jpe?g|webp|gif|bmp|tiff?)$/iu.test(name)
      if (!isImage) {
        const uploaded = await qwenUploadFile(settings, file)
        const text = await qwenExtractFile(settings, uploaded.id, uploaded.filename || name)
        return { text, pageCount: 1, model: QWEN_FILE_MODEL }
      }
      const bytes = Buffer.from(await file.arrayBuffer())
      const dataUrl = 'data:' + (type || 'image/png') + ';base64,' + bytes.toString('base64')
      let lastError = null
      for (const model of QWEN_OCR_MODELS.concat([settings.model])) {
        try {
          const data = await qwenChat(settings, {
            model,
            messages: [{
              role: 'user',
              content: [
                { type: 'text', text: '只输出图片里的全部文字，不要解释，不要总结。' },
                { type: 'image_url', image_url: { url: dataUrl } },
              ],
            }],
            stream: false,
            max_tokens: 4000,
          }, 120000)
          const content = data?.choices?.[0]?.message?.content
          if (typeof content === 'string' && content.trim() !== '') {
            return { text: content.slice(0, MAX_OCR_CHARS), pageCount: 1, model }
          }
        } catch (error) {
          lastError = error
        }
      }
      throw lastError || new HttpError(502, 'deepseek-chat/ocr-failed', 'OCR returned no text')
    }

    action('/models', async (payload) => {
      const settings = await store.settings()
      const apiKey = typeof payload.apiKey === 'string' && payload.apiKey.trim() !== ''
        ? payload.apiKey.trim()
        : settings.apiKey
      const baseURL = payload.baseURL !== undefined ? normalizeBaseURL(payload.baseURL) : settings.baseURL
      if (apiKey === '') {
        throw new HttpError(400, 'deepseek-chat/missing-key', 'Add a DeepSeek API key in this panel\'s settings first')
      }
      let response
      try {
        response = await fetch(`${baseURL}/models`, { headers: { authorization: `Bearer ${apiKey}` } })
      } catch (error) {
        throw new HttpError(502, 'deepseek-chat/network', `Could not reach ${baseURL}: ${error instanceof Error ? error.message : String(error)}`)
      }
      const raw = await response.text()
      if (!response.ok) {
        throw new HttpError(response.status, 'deepseek-chat/models-failed', upstreamMessage(raw, `DeepSeek returned HTTP ${response.status}`))
      }
      let parsed
      try {
        parsed = JSON.parse(raw)
      } catch {
        throw new HttpError(502, 'deepseek-chat/bad-response', 'DeepSeek returned an unreadable model list')
      }
      const models = Array.isArray(parsed.data)
        ? parsed.data.map((entry) => entry?.id).filter((id) => typeof id === 'string' && id !== '')
        : Array.isArray(parsed)
          ? parsed.map((entry) => entry?.id ?? entry).filter((id) => typeof id === 'string' && id !== '')
          : []
      if (models.length > 0) {
        await store.saveSettings({ models })
      }
      return { models }
    })

    const registerStream = (suffix, handler) => {
      scoped.effect(() => scoped.connection.fetch.register({
        path: ROUTE_PREFIX + suffix,
        methods: ['POST'],
        requestBody: 'streaming',
        fetch: handler,
      }), `deepseek-chat: route ${suffix}`)
    }

    const upstreamMultipart = async (request, suffix, providedSettings) => {
      const settings = providedSettings || await apiTarget()
      const contentType = request.headers.get('content-type') || ''
      if (!contentType.toLowerCase().startsWith('multipart/form-data')) {
        throw new HttpError(400, 'deepseek-chat/bad-upload', 'Expected a multipart/form-data upload')
      }
      const declared = Number(request.headers.get('content-length') || '0')
      if (Number.isFinite(declared) && declared > MAX_FILE_BYTES) {
        throw new HttpError(413, 'deepseek-chat/file-too-large', 'The file is larger than 120 MB')
      }
      if (request.body === null) throw new HttpError(400, 'deepseek-chat/bad-upload', 'The upload has no body')
      const url = apiPath(settings.baseURL, suffix)
      const signals = [request.signal]
      if (typeof AbortSignal.timeout === 'function') signals.push(AbortSignal.timeout(UPSTREAM_FILE_TIMEOUT_MS))
      const signal = typeof AbortSignal.any === 'function' ? AbortSignal.any(signals) : signals[0]
      let response
      try {
        const headers = {
            authorization: `Bearer ${settings.apiKey}`,
            'content-type': contentType,
            accept: 'application/json',
          }
          const contentLength = request.headers.get('content-length')
          if (contentLength !== null && Number(contentLength) > 0) headers['content-length'] = contentLength
          response = await fetch(url, {
            method: 'POST',
            headers,
            body: request.body,
            duplex: 'half',
            signal,
          })
      } catch (error) {
        if (request.signal.aborted) throw new HttpError(499, 'deepseek-chat/aborted', 'The upload was cancelled')
        throw new HttpError(502, 'deepseek-chat/upload-failed', `Could not reach ${url}: ${error instanceof Error ? error.message : String(error)}`)
      }
      const raw = await response.text()
      if (!response.ok) {
        throw new HttpError(response.status, 'deepseek-chat/upload-failed', upstreamMessage(raw, `DeepSeek returned HTTP ${response.status}`))
      }
      let parsed
      try {
        parsed = JSON.parse(raw)
      } catch {
        throw new HttpError(502, 'deepseek-chat/upload-failed', 'DeepSeek returned an unreadable upload response')
      }
      if (parsed && parsed.error) {
        throw new HttpError(502, 'deepseek-chat/upload-failed', upstreamMessage(raw, 'DeepSeek could not process that file'))
      }
      return parsed
    }

    registerStream('/files/upload', async (request) => {
      try {
        const settings = await apiTarget()
        const mode = detectApiMode(settings)
        const file = await upstreamMultipart(request, '/files', settings)
        if (mode === 'qwen') {
          const text = await qwenExtractFile(settings, file.id, file.filename || 'file')
          return Response.json({ ...file, text }, { headers: { 'cache-control': 'no-store' } })
        }
        return Response.json(file, { headers: { 'cache-control': 'no-store' } })
      } catch (error) {
        ctx.logger?.warn?.(`deepseek-chat: file upload failed: ${error instanceof Error ? error.message : String(error)}`)
        return jsonError(error)
      }
    })

    registerStream('/ocr', async (request) => {
      try {
        const settings = await apiTarget()
        const mode = detectApiMode(settings)
        if (mode === 'qwen') {
          const form = await request.formData()
          const file = form.get('file')
          if (!(file instanceof File)) throw new HttpError(400, 'deepseek-chat/bad-upload', 'The OCR upload has no file')
          const result = await qwenOcrFile(settings, file)
          return Response.json({
            id: 'ocr-' + randomUUID(),
            object: 'ocr.result',
            created: Math.floor(Date.now() / 1000),
            purpose: 'text_recognition',
            page_count: result.pageCount,
            pages: [{ index: 0, text: result.text, finish_reason: 'stop' }],
            usage: { input_tokens: 0, output_tokens: 0, total_tokens: 0 },
            model: result.model,
          }, { headers: { 'cache-control': 'no-store' } })
        }
        if (mode !== 'deepseek') {
          throw new HttpError(400, 'deepseek-chat/ocr-failed', 'This API does not provide OCR')
        }
        const result = await upstreamMultipart(request, '/v1/tools/ocr', settings)
        return Response.json(result, { headers: { 'cache-control': 'no-store' } })
      } catch (error) {
        ctx.logger?.warn?.(`deepseek-chat: OCR failed: ${error instanceof Error ? error.message : String(error)}`)
        return jsonError(error)
      }
    })

    register('/chat', ['POST'], async (request) => {
      let payload
      try {
        payload = await readJson(request)
      } catch (error) {
        return jsonError(error)
      }
      try {
        const settings = await apiTarget()
        const mode = detectApiMode(settings)
        const model = normalizeModelId(payload.model) || settings.model
        const thinking = payload.thinking === undefined ? settings.thinking === true : payload.thinking === true
        const webSearch = payload.webSearch === true
        const reasoningEffort = normalizeReasoningEffort(payload.reasoningEffort, settings.reasoningEffort)
        const messages = normalizeMessages(payload.messages, { tools: mode === 'deepseek' && webSearch })
        const systemPrompt = text(payload.systemPrompt, 30000).trim() || settings.systemPrompt
        if (systemPrompt !== '') messages.unshift({ role: 'system', content: systemPrompt })
        let body
        if (mode === 'qwen') {
          for (const message of messages) {
            delete message.reasoning_content
            delete message.server_tool_calls
          }
          body = {
            model,
            messages,
            stream: true,
            thinking: { type: thinking ? 'enabled' : 'disabled' },
          }
          if (thinking) body.reasoning_effort = reasoningEffort
          if (webSearch) {
            body.enable_search = true
            body.search_options = { forced_search: true, search_strategy: 'pro' }
          }
          if (!thinking) {
            const temperature = Number(payload.temperature)
            if (Number.isFinite(temperature) && temperature >= 0 && temperature <= 2) body.temperature = temperature
            else if (Number.isFinite(settings.temperature)) body.temperature = settings.temperature
          }
        } else if (mode === 'deepseek') {
          body = {
            model,
            messages,
            stream: true,
            thinking: { type: thinking ? 'enabled' : 'disabled' },
          }
          if (thinking) body.reasoning_effort = reasoningEffort
          if (webSearch) {
            body.tools = [
              { type: 'deepseek_web_search' },
              { type: 'deepseek_read_url' },
            ]
          }
          if (!thinking && !webSearch) {
            const temperature = Number(payload.temperature)
            if (Number.isFinite(temperature) && temperature >= 0 && temperature <= 2) body.temperature = temperature
            else if (Number.isFinite(settings.temperature)) body.temperature = settings.temperature
          }
        } else {
          body = { model, messages, stream: true }
        }
        const upstream = await fetch(`${settings.baseURL}/chat/completions`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'text/event-stream',
            authorization: `Bearer ${settings.apiKey}`,
          },
          body: JSON.stringify(body),
          signal: request.signal,
        })
        if (!upstream.ok) {
          const raw = await upstream.text()
          throw new HttpError(upstream.status, 'deepseek-chat/api-error', upstreamMessage(raw, `DeepSeek returned HTTP ${upstream.status}`))
        }
        if (upstream.body === null) {
          throw new HttpError(502, 'deepseek-chat/empty-stream', 'DeepSeek returned an empty stream')
        }
        return new Response(upstream.body, {
          headers: {
            'content-type': 'text/event-stream; charset=utf-8',
            'cache-control': 'no-store, no-transform',
            connection: 'keep-alive',
            'x-accel-buffering': 'no',
          },
        })
      } catch (error) {
        ctx.logger?.warn?.(`deepseek-chat: chat failed: ${error instanceof Error ? error.message : String(error)}`)
        return jsonError(error)
      }
    })
  })
}