# ds-web

[中文](#中文) · [English](#english)

## 中文

**ds-web** 是 **DeepSeek Harness（DSH）** 的 DeepSeek 网页版风格侧栏对话插件。它通过真实 DeepSeek API 流式对话，保留按「置顶 / 今天 / 昨天 / 7 天内 / 30 天内 / 月份」分组的会话列表，并支持导入 DeepSeek 官方导出（`deepseek_data-*`）继续聊。

> 非 DeepSeek 官方项目，只是按网页版交互复刻的第三方 DSH 插件。

### 功能

- **真实流式对话**：DeepSeek Chat Completions API。
- **深度思考**：`low / high / max` 强度，思考内容单独展示。
- **联网搜索**：`deepseek_web_search` / `deepseek_read_url` 服务端工具，支持来源卡片与引用。
- **文件输入**：PDF / Word / PowerPoint / 图片（解析文字或图文混排），以及文本 / 表格 / 电子书。
- **OCR**：`/v1/tools/ocr` 逐页识别，结果作为消息附件。
- **导入导出**：ZIP、对话 JSON、Markdown，或解压后的 `deepseek_data-*` 文件夹。
- **会话库**：置顶、重命名、导出、删除、搜索、折叠侧栏。
- **本地优先**：对话、设置和 API Key 保存在本机 `~/.dsh/deepseek-chat/`；插件没有后端，也不上报遥测。

### 安装

在 DSH 的 **Plugins** 页面添加 bundle，spec 填：

```text
github:MoyuOlogy/ds-web
```

如果是 CLI 管理的 profile（不是 Electron 管理的 `desktop`）：

```powershell
dsh plugin --profile <profile> add github:MoyuOlogy/ds-web
```

也可以从 [Releases](https://github.com/MoyuOlogy/ds-web/releases) 下载 `ds-web-1.0.0.tgz`，在 CLI profile 里用 `file:` 安装。

刷新 DSH 后，左侧栏会出现 **ds-web**。

### 配置

1. 从左侧栏打开 **ds-web**。
2. 打开 **设置 / Settings**。
3. 填入 DeepSeek API Key（<https://platform.deepseek.com/api_keys>）。
4. 默认接口是 `https://api.deepseek.com`，默认模型是 `deepseek-flash`；也可以选 `deepseek-v4-pro`。

Key 只保存在本机插件数据目录，不进入仓库或浏览器存储；面板直接请求你配置的 API 地址。OpenAI 兼容网关也会自动识别，但兼容网关不保证返回 DeepSeek 式引用。

### 导入历史

在账号菜单选择 **导入 / Import**，可以选：

- 导出的 ZIP；
- 单个对话 JSON；
- Markdown；
- 解压后的 `deepseek_data-*` 文件夹。

导入后每个会话保存为 `~/.dsh/deepseek-chat/conversations/` 下的 JSON，并重建分组索引；重复导入相同 id 会刷新对应会话。

### 数据与隐私

- 会话、设置和 API Key 位于 `~/.dsh/deepseek-chat/`。
- `settings.json` 里是明文 API Key（POSIX 下权限 600），请不要分享或同步这个目录。
- 上传的文件会进入所配置 API 账号的文件库；OCR 文字保存在本地会话里。
- 仓库不包含 API Key、API 地址、个人会话、用户资料或导出数据。
- 联网搜索、文件解析和 OCR 由 API 提供方计费。

### 已知限制

- DeepSeek 模型 id 和能力会变化；当前默认 `deepseek-flash`，也可用 `deepseek-v4-pro`。
- 文件上限：PDF/Word/PowerPoint 100 MiB，图片 64 MiB，文本/表格/电子书 32 MiB；每轮最多 20 个文档。
- OCR 单文件最多 1,000 页；预览中的长文本会截断，但完整内容保留在消息里。
- 超长会话只把最近约 400 条消息发给模型，更早内容仍保留在本地。
- 插件的会话库独立于 DSH 自己的会话列表和模型上下文。
- DeepSeek 导出需要使用 `export_format_version: 3`。

### 开发

- `index.js`：Host 端，数据存储、导入导出、API 代理、流式、文件、OCR。
- `client.js`：客户端，侧栏面板、输入框、消息渲染、设置。
- `cordis.patch.yml`：DSH bundle patch。
- `locale/`：`zh` / `en` UI 词典。

没有构建步骤。Host 为了兼容旧版本，数据目录仍是 `~/.dsh/deepseek-chat/`。

### License

MIT，见 [LICENSE](LICENSE)。

---

## English

**ds-web** is a DeepSeek-web-style sidebar chat plugin for **DeepSeek Harness (DSH)**. It streams real DeepSeek API conversations, keeps a chat library grouped by pinned / today / yesterday / last 7 days / last 30 days / month, and imports official DeepSeek exports (`deepseek_data-*`) so old chats can be continued.

> Independent third-party project; not affiliated with DeepSeek.

### Features

- **Real streaming chat** through the DeepSeek Chat Completions API.
- **DeepThink** with `low / high / max` effort and a visible reasoning panel.
- **Web search** with `deepseek_web_search` / `deepseek_read_url` server tools, source cards and citations.
- **Files** through the Files API: PDF / Word / PowerPoint / images as text or rich layout, plus text / spreadsheet / ebook uploads.
- **OCR** through `/v1/tools/ocr`, with per-page results attached to the message.
- **Import/export**: ZIP, conversation JSON, Markdown, or an unzipped `deepseek_data-*` folder.
- **Chat library**: pin, rename, export, delete, search, collapse.
- **Local-first**: conversations, settings and API key stay in `~/.dsh/deepseek-chat/`; no backend and no telemetry.

### Install

Add this bundle from DSH's **Plugins** page with the spec:

```text
github:MoyuOlogy/ds-web
```

For a CLI-managed profile (not the Electron-managed `desktop` profile):

```powershell
dsh plugin --profile <profile> add github:MoyuOlogy/ds-web
```

You can also download `ds-web-1.0.0.tgz` from [Releases](https://github.com/MoyuOlogy/ds-web/releases) and install it with a `file:` spec in a CLI profile.

Refresh DSH and a new **ds-web** entry appears in the left sidebar.

### Configure

1. Open **ds-web** from the sidebar.
2. Open **Settings**.
3. Paste a DeepSeek API key from <https://platform.deepseek.com/api_keys>.
4. The default base URL is `https://api.deepseek.com` and the default model is `deepseek-flash`; `deepseek-v4-pro` is selectable.

The key is stored only in the local plugin data directory, not in this repository or browser storage. The panel sends requests directly to the configured API host. OpenAI-compatible gateways are detected too, but they do not guarantee DeepSeek-style citations.

### Import

In the account menu choose **Import**, then pick:

- an exported ZIP;
- a single conversation JSON;
- Markdown; or
- an unzipped `deepseek_data-*` folder.

The importer stores one JSON file per conversation under `~/.dsh/deepseek-chat/conversations/` and rebuilds the grouped index. Re-importing the same ids refreshes those conversations.

### Data and privacy

- Chat data, settings and API key live under `~/.dsh/deepseek-chat/`.
- `settings.json` contains the API key in plain text (mode 600 on POSIX); do not share or sync this directory.
- Uploaded files go to the configured API account's file store; OCR text stays in local conversations.
- The repository contains no API key, API endpoint, personal conversations, user profile or exported data.
- Web search, file parsing and OCR are billed by the API provider.

### Limitations

- DeepSeek model ids and capabilities change over time; defaults are `deepseek-flash` and `deepseek-v4-pro`.
- Files up to 100 MiB for PDF/Word/PowerPoint, 64 MiB for images, 32 MiB for text/spreadsheets/ebooks; at most 20 documents per turn.
- OCR supports up to 1,000 pages per file; long text is truncated in the preview but kept in the message.
- Very long conversations send only the most recent ~400 messages to the model; older messages remain in the local panel.
- The plugin's chat library is separate from DSH's own session list and model context.
- DeepSeek exports must use `export_format_version: 3`.

### Development

- `index.js` — Host half: storage, import/export, API proxy, streaming, files, OCR.
- `client.js` — client half: sidebar panel, composer, message rendering, settings.
- `cordis.patch.yml` — DSH bundle patch.
- `locale/` — `zh` / `en` UI dictionaries.

There is no build step. The Host keeps its storage in `~/.dsh/deepseek-chat/` for compatibility with earlier builds.

### License

MIT. See [LICENSE](LICENSE).