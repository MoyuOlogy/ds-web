# ds-web

A DeepSeek-web-style chat panel for **DeepSeek Harness (DSH)**, reached from a new sidebar entry.

It streams real DeepSeek API conversations, keeps a chat library grouped by 置顶 / 今天 / 昨天 / 7 天内 / 30 天内 / 月份, and can import an official DeepSeek export (`deepseek_data-*`) so old conversations can be continued in the panel.

> 非 DeepSeek 官方项目，只是按网页版交互复刻的第三方 DSH 插件。

## Features

- **Real streaming chat** through the DeepSeek Chat Completions API.
- **DeepThink** toggle with `low / high / max` reasoning effort, and a visible reasoning panel.
- **Web search** with `deepseek_web_search` / `deepseek_read_url` server tools, source cards and citations.
- **File input** through the Files API: PDF / Word / PowerPoint / images as text or rich layout, plus text / spreadsheet / ebook uploads.
- **OCR** through `/v1/tools/ocr`, with per-page results attached to the message.
- **DeepSeek export import**: ZIP, conversation JSON, Markdown, or an unzipped `deepseek_data-*` folder.
- **Chat library**: pin, rename, export a conversation, delete, search, collapse the sidebar.
- **Local-first**: conversations, settings and API key stay in `~/.dsh/deepseek-chat/`; the plugin itself has no backend and no telemetry.

## Install

### From GitHub (recommended)

Add this bundle from DSH's **Plugins** page with the spec:

```text
github:MoyuOlogy/ds-web
```

For a CLI-managed profile (not the Electron-managed `desktop` profile):

```powershell
dsh plugin --profile <profile> add github:MoyuOlogy/ds-web
```

Then refresh the DSH window. A new **ds-web** entry appears in the left sidebar.

### Local development

```powershell
dsh plugin --profile <profile> add link:D:\path\to\ds-web
```

There is no build step: `index.js` is the Host half and `client.js` is the browser bundle.

## Configure

1. Open **ds-web** from the left sidebar.
2. Open **设置 / Settings**.
3. Paste a DeepSeek API key from <https://platform.deepseek.com/api_keys>.
4. The default base URL is `https://api.deepseek.com` and the default model is `deepseek-flash`; `deepseek-v4-pro` is also available.

The key is stored **only** in the local plugin data directory, not in the repository or browser storage. The panel sends requests directly to the configured API host.

OpenAI-compatible gateways are also detected automatically. For a non-DeepSeek endpoint, the panel switches to compatible-mode search, file extraction and OCR paths; those gateways may not return DeepSeek-style citations.

## Import an existing DeepSeek export

In the account menu choose **导入 / Import**, then pick:

- the exported ZIP;
- a single conversation JSON;
- Markdown; or
- an unzipped `deepseek_data-*` folder.

The importer stores one JSON file per conversation under `~/.dsh/deepseek-chat/conversations/` and builds the grouped sidebar index. Re-importing an export with the same ids refreshes those conversations.

## Data and privacy

- Chat data, settings and API key live under `~/.dsh/deepseek-chat/`.
- `settings.json` contains the API key in plain text (mode 600 on POSIX); do not share or sync this directory.
- Uploaded files go to the configured API account's file store; OCR text is kept locally in the conversation.
- The repository contains **no** API key, API endpoint, conversations, user profile, or exported chat data.
- Web search, file parsing and OCR are billed by the API provider.

## Limitations

- DeepSeek model ids and capabilities change over time; the defaults are `deepseek-flash` and `deepseek-v4-pro`.
- Files up to 100 MiB for PDF/Word/PowerPoint, 64 MiB for images, 32 MiB for text/spreadsheets/ebooks; at most 20 documents per turn.
- OCR supports up to 1,000 pages per file; long text is truncated in the preview but kept in the message.
- Only the most recent ~400 messages of a very long conversation are sent to the model; older messages stay in the local panel.
- The plugin's chat library is separate from DSH's own session list and model context.
- A DeepSeek export must use `export_format_version: 3`.

## Development notes

- `index.js` — Host half: data store, import/export, API proxy, streaming, files, OCR.
- `client.js` — client half: sidebar panel, composer, message rendering, settings.
- `cordis.patch.yml` — DSH bundle patch.
- `locale/` — `zh` / `en` UI dictionaries.

The Host keeps its storage in `~/.dsh/deepseek-chat/` for compatibility with earlier builds of this panel; the plugin/bundle name is `ds-web`.

## License

MIT. See [LICENSE](LICENSE).

---

## English

**ds-web** is a DeepSeek-web-style sidebar plugin for DeepSeek Harness. It provides streaming chat, thinking effort, server-side web search with citations, Files API uploads, OCR, a grouped chat library and DeepSeek export import. Install with `github:MoyuOlogy/ds-web`, add your own DeepSeek API key in Settings, and keep your data under `~/.dsh/deepseek-chat/`.

This is an independent third-party project, not affiliated with DeepSeek.