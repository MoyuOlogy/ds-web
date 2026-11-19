window.__ModuleLoader__.load({
  id: 'ds-web',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const PANEL_ID = 'ds-web';
    const NS = 'ds-web';
    const API = '/api/ds-web/';
    const COLLAPSED_KEY = 'dsh.plugin.ds-web.collapsed';
    const MODEL_KEY = 'dsh.plugin.ds-web.model';
    const THINKING_KEY = 'dsh.plugin.ds-web.thinking';
    const SEARCH_KEY = 'dsh.plugin.ds-web.web-search';
    const EFFORT_KEY = 'dsh.plugin.ds-web.reasoning-effort';
    const DEFAULT_MODEL = 'deepseek-flash';
    const DEFAULT_MODELS = ['deepseek-flash', 'deepseek-v4-pro'];
    const MAX_DOC_BYTES = 100 * 1024 * 1024;
    const MAX_IMAGE_BYTES = 64 * 1024 * 1024;
    const MAX_TEXT_BYTES = 32 * 1024 * 1024;
    const MAX_TOOLS = 40;
    const LOGO_SRC = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQzIiBoZWlnaHQ9IjIzIiB2aWV3Qm94PSIwIDAgMTQzIDIzIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik03OC42Nzg1IDE4LjY4MjNINzcuMTA3OFYxNi4yNDcySDc4LjY3ODVDNzkuNjUxMyAxNi4yNDcyIDgwLjYzNDIgMTYuMDA0NyA4MS4yNjcyIDE1LjMzMDhDODEuOTAwOSAxNC42NTY5IDgyLjE0IDEzLjYyMzIgODIuMTQgMTIuNTlDODIuMTQgMTEuNTU2OSA4MS45MTA5IDEwLjUyMzEgODEuMjY3MiA5Ljg0OTgxQzgwLjYyNDcgOS4xNzU5NCA3OS42NTEzIDguOTMzNDMgNzguNjc4NSA4LjkzMzQzQzc3LjcwNTYgOC45MzM0MyA3Ni43MjI4IDkuMTc1OTQgNzYuMDg4NiA5Ljg0OTgxQzc1LjQ1NDkgMTAuNTIzNyA3NS4yMTU4IDExLjU1NjkgNzUuMjE1OCAxMi41OVYyMi41OTA5SDcyLjQ2MDVWNi41MDc4MUg3NS4yMTU4VjcuNTMyMDRINzUuNzIwOUM3NS43NzU3IDcuNDY4OSA3NS44MzA0IDcuNDE1MjUgNzUuODg1NyA3LjM2MTYxQzc2LjU3NTIgNi43MzI0NCA3Ny42MzA4IDYuNTA3ODEgNzguNjY4NCA2LjUwNzgxQzgwLjI5NDQgNi41MDc4MSA4MS45MTkzIDYuOTEyMzYgODIuOTg0OSA4LjAzNTQ5Qzg0LjA0OTkgOS4xNTg2MSA4NC40MjY1IDEwLjg4MzUgODQuNDI2NSAxMi42MDAxQzg0LjQyNjUgMTQuMzE2NiA4NC4wNDA0IDE2LjAzMjYgODIuOTg0OSAxNy4xNjQ3QzgxLjkyODggMTguMjk2NyA4MC4yOTQ0IDE4LjY4MzQgNzguNjc4NSAxOC42ODM0VjE4LjY4MjNaIiBmaWxsPSIjNGQ2YmZlIi8+PHBhdGggZD0iTTM2Ljc0ODYgNi45NDA5N0gzOC4zMTg4VjkuMzc2MDlIMzYuNzQ4NkMzNS43NzUzIDkuMzc2MDkgMzQuNzkyOSA5LjYxODU5IDM0LjE1OTMgMTAuMjkyNUMzMy41MjU3IDEwLjk2NjMgMzMuMjg3MSAxMi4wMDAxIDMzLjI4NzEgMTMuMDMzMkMzMy4yODcxIDE0LjA2NjQgMzMuNTE2NyAxNS4wOTk2IDM0LjE1OTMgMTUuNzczNEMzNC44MDE5IDE2LjQ0NzMgMzUuNzc1MyAxNi42ODk4IDM2Ljc0ODYgMTYuNjg5OEMzNy43MjIgMTYuNjg5OCAzOC43MDQ5IDE2LjQ0NzMgMzkuMzM4NSAxNS43NzM0QzM5Ljk3MjIgMTUuMDk5NiA0MC4yMTA4IDE0LjA2NjQgNDAuMjEwOCAxMy4wMzMyVjMuMDIzNDRINDIuOTY1NVYxOS4xMTZINDAuMjEwOFYxOC4wOTE4SDM5LjcwNTdDMzkuNjUwMyAxOC4xNTQ0IDM5LjU5NTYgMTguMjA4NiAzOS41NDAzIDE4LjI2MjJDMzguODUxMyAxOC44OTA4IDM3Ljc5NTIgMTkuMTE2IDM2Ljc1NzYgMTkuMTE2QzM1LjEzMjEgMTkuMTE2IDMzLjUwNjcgMTguNzEyIDMyLjQ0MTYgMTcuNTg4OUMzMS4zNzY2IDE2LjQ2NTggMzEgMTQuNzQwMyAzMSAxMy4wMjQzQzMxIDExLjMwODMgMzEuMzg1NiA5LjU5MTc3IDMyLjQ0MTYgOC40NTk3MUMzMy41MDY3IDcuMzM2NTggMzUuMTMyMSA2Ljk0MDk3IDM2Ljc0ODYgNi45NDA5N1oiIGZpbGw9IiM0ZDZiZmUiLz48cGF0aCBkPSJNNTYuNzg1NSAxMi44MTU1VjEzLjc5NUg0OS40NDgzVjExLjg0NTRINTQuMzE1MkM1NC4yMDUxIDExLjEzNTggNTMuOTQ4MSAxMC40NzA5IDUzLjQ4ODcgOS45ODUzQzUyLjgyNzcgOS4yODQ2IDUxLjgwOCA5LjAzMzE2IDUwLjc5ODMgOS4wMzMxNkM0OS43ODg2IDkuMDMzMTYgNDguNzY4OCA5LjI4NDYgNDguMTA3OCA5Ljk4NTNDNDcuNDQ2OCAxMC42ODYgNDcuMjA3NiAxMS43NTU1IDQ3LjIwNzYgMTIuODE2QzQ3LjIwNzYgMTMuODc2NiA0Ny40NDYyIDE0Ljk1NDQgNDguMTA3OCAxNS42NDYyQzQ4Ljc2ODggMTYuMzM4IDQ5Ljc4OCAxNi41OTg5IDUwLjc5ODMgMTYuNTk4OUM1MS44MDg1IDE2LjU5ODkgNTIuODI3NyAxNi4zNDc1IDUzLjQ4ODcgMTUuNjQ2MkM1My41ODA0IDE1LjU0NzMgNTMuNjYzMSAxNS40Mzk1IDUzLjc0NTggMTUuMzMxNkg1Ni40NjQyQzU2LjIyNTYgMTYuMTc2NSA1NS44NDkgMTYuOTQwMyA1NS4yNzk2IDE3LjUzMzJDNTQuMTc3NyAxOC42OTIgNTIuNDc5IDE5LjExNDUgNTAuNzk4MyAxOS4xMTQ1QzQ5LjExNzUgMTkuMTE0NSA0Ny40MTg4IDE4LjcwMSA0Ni4zMTY5IDE3LjUzMzJDNDUuMjE1IDE2LjM2NTMgNDQuODExMSAxNC41ODYyIDQ0LjgxMTEgMTIuODE2QzQ0LjgxMTEgMTEuMDQ1OCA0NS4yMDYxIDkuMjU3NzggNDYuMzE2OSA4LjA5ODlDNDcuNDI4MyA2Ljk0MDAxIDQ5LjExNzUgNi41MTc1OCA1MC43OTgzIDYuNTE3NThDNTIuNDc5IDYuNTE3NTggNTQuMTc3NyA2LjkzMTA3IDU1LjI3OTYgOC4wOTg5QzU2LjM5MDQgOS4yNjY3MiA1Ni43ODU1IDExLjA0NTggNTYuNzg1NSAxMi44MTZWMTIuODE1NVoiIGZpbGw9IiM0ZDZiZmUiLz48cGF0aCBkPSJNNzAuNjE1MSAxMi44MTU1VjEzLjc5NUg2My4yNzc5VjExLjg0NTRINjguMTQ0OEM2OC4wMzQxIDExLjEzNTggNjcuNzc3NiAxMC40NzA5IDY3LjMxODMgOS45ODUzQzY2LjY1NzMgOS4yODQ2IDY1LjYzNzYgOS4wMzMxNiA2NC42Mjc5IDkuMDMzMTZDNjMuNjE4MiA5LjAzMzE2IDYyLjU5ODQgOS4yODQ2IDYxLjkzNzQgOS45ODUzQzYxLjI3NjQgMTAuNjg2IDYxLjAzNzIgMTEuNzU1NSA2MS4wMzcyIDEyLjgxNkM2MS4wMzcyIDEzLjg3NjYgNjEuMjc1OCAxNC45NTQ0IDYxLjkzNzQgMTUuNjQ2MkM2Mi41OTg0IDE2LjMzOCA2My42MTgyIDE2LjU5ODkgNjQuNjI3OSAxNi41OTg5QzY1LjYzNzYgMTYuNTk4OSA2Ni42NTczIDE2LjM0NzUgNjcuMzE4MyAxNS42NDYyQzY3LjQxMDUgMTUuNTQ3MyA2Ny40OTI3IDE1LjQzOTUgNjcuNTc0OCAxNS4zMzE2SDcwLjI5MzhDNzAuMDU0NiAxNi4xNzY1IDY5LjY3OCAxNi45NDAzIDY5LjEwODYgMTcuNTMzMkM2OC4wMDY3IDE4LjY5MiA2Ni4zMDgxIDE5LjExNDUgNjQuNjI3OSAxOS4xMTQ1QzYyLjk0NzYgMTkuMTE0NSA2MS4yNDg0IDE4LjcwMSA2MC4xNDY1IDE3LjUzMzJDNTkuMDQ0NiAxNi4zNjUzIDU4LjY0MDYgMTQuNTg2MiA1OC42NDA2IDEyLjgxNkM1OC42NDA2IDExLjA0NTggNTkuMDM1NyA5LjI1Nzc4IDYwLjE0NjUgOC4wOTg5QzYxLjI1NzkgNi45NDAwMSA2Mi45NDcxIDYuNTE3NTggNjQuNjI3OSA2LjUxNzU4QzY2LjMwODYgNi41MTc1OCA2OC4wMDY3IDYuOTMxMDcgNjkuMTA4NiA4LjA5ODlDNzAuMjIgOS4yNjY3MiA3MC42MTUxIDExLjA0NTggNzAuNjE1MSAxMi44MTZWMTIuODE1NVoiIGZpbGw9IiM0ZDZiZmUiLz48cGF0aCBkPSJNOTIuMjc4MSAxOS4xMTU2QzkzLjk1ODkgMTkuMTE1NiA5NS42NTcgMTguODczMSA5Ni43NTg5IDE4LjE4MTNDOTcuODYwOCAxNy40ODk2IDk4LjI2NTMgMTYuNDM4IDk4LjI2NTMgMTUuMzk1OUM5OC4yNjUzIDE0LjM1MzggOTcuODY5NyAxMy4yOTMyIDk2Ljc1ODkgMTIuNjEwNEM5NS42NTcgMTEuOTI3NiA5My45NTgzIDExLjY3NTYgOTIuMjc4MSAxMS42NzU2QzkxLjU2MTIgMTEuNjc1NiA5MC45MDAyIDExLjU3NjcgOTAuNDMxOSAxMS4zMTYzQzg5Ljk2MzcgMTEuMDQ2NCA4OS43ODkzIDEwLjY0MjQgODkuNzg5MyAxMC4yMzc5Qzg5Ljc4OTMgOS44MzMzMiA4OS45NTQ3IDkuNDIwMzkgOTAuNDMxOSA5LjE1OTQ0QzkwLjkwMDIgOC44ODk1NSA5MS42MjYgOC44MDAxNSA5Mi4zNDE4IDguODAwMTVDOTMuMDU3NiA4LjgwMDE1IDkzLjc4MzQgOC44OTkwNSA5NC4yNTI4IDkuMTU5NDRDOTQuNzIxIDkuNDI5MzMgOTQuODk1NCA5LjgzMzMyIDk0Ljg5NTQgMTAuMjM3OUg5Ny42OTU5Qzk3LjY5NTkgOS4xOTUyIDk3LjMzODMgOC4xMzUyMiA5Ni4zMzc2IDcuNDUyNEM5NS4zMzY4IDYuNzY5NTggOTMuODAzIDYuNTE3NTggOTIuMjc4NyA2LjUxNzU4QzkwLjc1NDMgNi41MTc1OCA4OS4yMjExIDYuNzYwMDggODguMjE5OCA3LjQ1MjRDODcuMjE5IDguMTQ0MTYgODYuODYwMyA5LjE5NTIgODYuODYwMyAxMC4yMzc5Qzg2Ljg2MDMgMTEuMjgwNSA4Ny4yMTg1IDEyLjM0MDUgODguMjE5OCAxMy4wMjMzQzg5LjIyMDUgMTMuNzA2MSA5MC43NTM4IDEzLjk1ODIgOTIuMjc4NyAxMy45NTgyQzkzLjA2ODIgMTMuOTU4MiA5My45NDEgMTQuMDU3MSA5NC40NjQgMTQuMzE3NEM5NC45ODgxIDE0LjU3ODQgOTUuMTcxNCAxNC45OTEzIDk1LjE3MTQgMTUuMzk1OUM5NS4xNzE0IDE1LjgwMDQgOTQuOTg4MSAxNi4yMTMzIDk0LjQ2NCAxNi40NzQzQzkzLjk0MSAxNi43MzQ3IDkzLjE0MiAxNi44MzM2IDkyLjM1MjQgMTYuODMzNkM5MS41NjI5IDE2LjgzMzYgOTAuNzU0MyAxNi43MzQ3IDkwLjIzOTcgMTYuNDc0M0M4OS43MjU2IDE2LjIxMzkgODkuNTMyMyAxNS44MDA0IDg5LjUzMjMgMTUuMzk1OUg4Ni4yOTk4Qzg2LjI5OTggMTYuNDM4NSA4Ni42OTQzIDE3LjQ5ODUgODcuODA2MyAxOC4xODEzQzg4LjkxNzEgMTguODY0MSA5MC41OTc5IDE5LjExNTYgOTIuMjc4NyAxOS4xMTU2SDkyLjI3ODFaIiBmaWxsPSIjNGQ2YmZlIi8+PHBhdGggZD0iTTExMi4wOTQgMTIuODE1NVYxMy43OTVIMTA0Ljc1N1YxMS44NDU0SDEwOS42MjRDMTA5LjUxNCAxMS4xMzU4IDEwOS4yNTcgMTAuNDcwOSAxMDguNzk4IDkuOTg1M0MxMDguMTM2IDkuMjg0NiAxMDcuMTE3IDkuMDMzMTYgMTA2LjEwNiA5LjAzMzE2QzEwNS4wOTUgOS4wMzMxNiAxMDQuMDc3IDkuMjg0NiAxMDMuNDE2IDkuOTg1M0MxMDIuNzU1IDEwLjY4NiAxMDIuNTE3IDExLjc1NTUgMTAyLjUxNyAxMi44MTZDMTAyLjUxNyAxMy44NzY2IDEwMi43NTUgMTQuOTU0NCAxMDMuNDE2IDE1LjY0NjJDMTA0LjA3NyAxNi4zMzggMTA1LjA5NyAxNi41OTg5IDEwNi4xMDYgMTYuNTk4OUMxMDcuMTE2IDE2LjU5ODkgMTA4LjEzNiAxNi4zNDc1IDEwOC43OTggMTUuNjQ2MkMxMDguODg5IDE1LjU0NzMgMTA4Ljk3MiAxNS40Mzk1IDEwOS4wNTQgMTUuMzMxNkgxMTEuNzcyQzExMS41MzMgMTYuMTc2NSAxMTEuMTU3IDE2Ljk0MDMgMTEwLjU4OCAxNy41MzMyQzEwOS40ODYgMTguNjkyIDEwNy43ODcgMTkuMTE0NSAxMDYuMTA2IDE5LjExNDVDMTA0LjQyNSAxOS4xMTQ1IDEwMi43MjcgMTguNzAxIDEwMS42MjUgMTcuNTMzMkMxMDAuNTI0IDE2LjM2NTMgMTAwLjEyIDE0LjU4NjIgMTAwLjEyIDEyLjgxNkMxMDAuMTIgMTEuMDQ1OCAxMDAuNTE1IDkuMjU3NzggMTAxLjYyNSA4LjA5ODlDMTAyLjczNyA2Ljk0MDAxIDEwNC40MjcgNi41MTc1OCAxMDYuMTA2IDYuNTE3NThDMTA3Ljc4NiA2LjUxNzU4IDEwOS40ODYgNi45MzEwNyAxMTAuNTg4IDguMDk4OUMxMTEuNjk5IDkuMjY2NzIgMTEyLjA5MyAxMS4wNDU4IDExMi4wOTMgMTIuODE2TDExMi4wOTQgMTIuODE1NVoiIGZpbGw9IiM0ZDZiZmUiLz48cGF0aCBkPSJNMTI1LjkyNCAxMi44MTU1VjEzLjc5NUgxMTguNTg2VjExLjg0NTRIMTIzLjQ1M0MxMjMuMzQ0IDExLjEzNTggMTIzLjA4NiAxMC40NzA5IDEyMi42MjcgOS45ODUzQzEyMS45NjYgOS4yODQ2IDEyMC45NDcgOS4wMzMxNiAxMTkuOTM2IDkuMDMzMTZDMTE4LjkyNiA5LjAzMzE2IDExNy45MDcgOS4yODQ2IDExNy4yNDYgOS45ODUzQzExNi41ODUgMTAuNjg2IDExNi4zNDYgMTEuNzU1NSAxMTYuMzQ2IDEyLjgxNkMxMTYuMzQ2IDEzLjg3NjYgMTE2LjU4NSAxNC45NTQ0IDExNy4yNDYgMTUuNjQ2MkMxMTcuOTA3IDE2LjMzOCAxMTguOTI3IDE2LjU5ODkgMTE5LjkzNiAxNi41OTg5QzEyMC45NDYgMTYuNTk4OSAxMjEuOTY2IDE2LjM0NzUgMTIyLjYyNyAxNS42NDYyQzEyMi43MTkgMTUuNTQ3MyAxMjIuODAxIDE1LjQzOTUgMTIyLjg4NSAxNS4zMzE2SDEyNS42MDJDMTI1LjM2MyAxNi4xNzY1IDEyNC45ODcgMTYuOTQwMyAxMjQuNDE4IDE3LjUzMzJDMTIzLjMxNiAxOC42OTIgMTIxLjYxNyAxOS4xMTQ1IDExOS45MzYgMTkuMTE0NUMxMTguMjU2IDE5LjExNDUgMTE2LjU1OCAxOC43MDEgMTE1LjQ1NiAxNy41MzMyQzExNC4zNTQgMTYuMzY1MyAxMTMuOTQ5IDE0LjU4NjIgMTEzLjk0OSAxMi44MTZDMTEzLjk0OSAxMS4wNDU4IDExNC4zNDQgOS4yNTc3OCAxMTUuNDU2IDguMDk4OUMxMTYuNTY3IDYuOTQwMDEgMTE4LjI1NiA2LjUxNzU4IDExOS45MzYgNi41MTc1OEMxMjEuNjE3IDYuNTE3NTggMTIzLjMxNSA2LjkzMTA3IDEyNC40MTggOC4wOTg5QzEyNS41MjkgOS4yNjY3MiAxMjUuOTI0IDExLjA0NTggMTI1LjkyNCAxMi44MTZWMTIuODE1NVoiIGZpbGw9IiM0ZDZiZmUiLz48cGF0aCBkPSJNMTMwLjUyNCAzLjAyMzQ0SDEyNy43N1YxOS4xMTZIMTMwLjUyNFYzLjAyMzQ0WiIgZmlsbD0iIzRkNmJmZSIvPjxwYXRoIGQ9Ik0xMzUuMjI3IDEyLjQzODRMMTM5Ljc0NCAxOS4xMTQ2SDEzNi4zMzdMMTMxLjgxOSAxMi40Mzg0TDEzNi4zMzcgNy4wNzQyMkgxMzkuNzQ0TDEzNS4yMjcgMTIuNDM4NFoiIGZpbGw9IiM0ZDZiZmUiLz48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfNDMyOV8xOTc2OSkiPjxwYXRoIGQ9Ik0yNi41MTc0IDMuMzk0NzFDMjYuMjM1IDMuMjU2NyAyNi4xMTM3IDMuNTIwMDYgMjUuOTQ4NyAzLjY1MzQ2QzI1Ljg5MjMgMy42OTY1OSAyNS44NDQ2IDMuNzUyOTQgMjUuNzk2OSAzLjgwNDY5QzI1LjM4NDYgNC4yNDUxNiAyNC45MDI3IDQuNTM0MzkgMjQuMjczNyA0LjQ5OTg5QzIzLjM1MzYgNC40NDgxNCAyMi41NjgyIDQuNzM3MzcgMjEuODczNSA1LjQ0MTE5QzIxLjcyNTggNC41NzM0OSAyMS4yMzUzIDQuMDU1NCAyMC40ODg5IDMuNzIzMDRDMjAuMDk4NSAzLjU1MDU0IDE5LjcwMzQgMy4zNzc0NiAxOS40Mjk3IDMuMDAxOTdDMTkuMjM4OCAyLjczNDU5IDE5LjE4NjUgMi40MzY3MyAxOS4wOTEgMi4xNDI4OUMxOS4wMzAxIDEuOTY1NzkgMTguOTY5NyAxLjc4NDY2IDE4Ljc2NTYgMS43NTQxOEMxOC41NDQyIDEuNzE5NjggMTguNDU3NCAxLjkwNTQxIDE4LjM3MDUgMi4wNjA2N0MxOC4wMjMyIDIuNjk1NDkgMTcuODg4NyAzLjM5NDcxIDE3LjkwMTkgNC4xMDMxM0MxNy45MzI0IDUuNjk2NSAxOC42MDUxIDYuOTY1NTYgMTkuOTQyMSA3Ljg2ODM0QzIwLjA5MzkgNy45NzE4NCAyMC4xMzMgOC4wNzUzNSAyMC4wODUyIDguMjI2NThDMTkuOTkzOCA4LjUzNzY2IDE5Ljg4NTcgOC44Mzk1NSAxOS43OTAzIDkuMTUwNjNDMTkuNzI5MyA5LjM0OTAxIDE5LjYzODUgOS4zOTI3MSAxOS40MjU3IDkuMzA1ODhDMTguNjkyIDguOTk5NCAxOC4wNTgzIDguNTQ1NzEgMTcuNDk4MiA3Ljk5NzcyQzE2LjU0NzcgNy4wNzgyNyAxNS42ODgxIDYuMDYzMzYgMTQuNjE2MiA1LjI2ODY5QzE0LjM2NDQgNS4wODI5NiAxNC4xMTI1IDQuOTEwNDUgMTMuODUyMSA0Ljc0NkMxMi43NTg0IDMuNjgzOTQgMTMuOTk1MiAyLjgxMTY0IDE0LjI4MTYgMi43MDgxNEMxNC41ODEyIDIuNjAwMDMgMTQuMzg1NyAyLjIyODU3IDEzLjQxNzkgMi4yMzMxN0MxMi40NTAyIDIuMjM3MiAxMS41NjQ2IDIuNTYxNTEgMTAuNDM1OSAyLjk5MzM1QzEwLjI3MDggMy4wNTgzMiAxMC4wOTcyIDMuMTA1NDcgOS45MTk1MSAzLjE0NDU3QzguODk1NCAyLjk1MDIyIDcuODMxNjIgMi45MDcwOSA2LjcyMDY5IDMuMDMyNDVDNC42Mjg3NyAzLjI2NTMzIDIuOTU3NzcgNC4yNTQzNiAxLjcyOTU0IDUuOTQyNjFDMC4yNTQwNDMgNy45NzE4NCAtMC4wOTMyNjc5IDEwLjI3NzcgMC4zMzE2NyAxMi42ODI0QzAuNzc4NDU4IDE1LjIxNzEgMi4wNzIyNSAxNy4zMTUzIDQuMDYwMDggMTguOTU1OEM2LjEyMTUyIDIwLjY1NjcgOC40OTU3NyAyMS40OTA1IDExLjIwNDcgMjEuMzMwNkMxMi44NDk4IDIxLjIzNTggMTQuNjgxMiAyMS4wMTU1IDE2Ljc0NzMgMTkuMjY2OUMxNy4yNjgyIDE5LjUyNjIgMTcuODE1MSAxOS42Mjk3IDE4LjcyMTkgMTkuNzA3NEMxOS40MjA1IDE5Ljc3MjQgMjAuMDkzMyAxOS42NzI5IDIwLjYxNDMgMTkuNTY0OEMyMS40MzAyIDE5LjM5MjMgMjEuMzczOSAxOC42MzY3IDIxLjA3ODkgMTguNDk4MUMxOC42ODc0IDE3LjM4NDMgMTkuMjEyNCAxNy44Mzc0IDE4LjczNTEgMTcuNDcwNkMxOS45NTAxIDE2LjAzMyAyMS44MDYzIDEzLjQ3NzYgMjIuMzc5IDkuOTk4MjFDMjIuNDM1MyA5LjYxNDA5IDIyLjUwNzIgOS4wNzMgMjIuNDk4NiA4Ljc2MTkyQzIyLjQ5NCA4LjU3MjE2IDIyLjUzNzcgOC40OTg1NiAyMi43NTQ1IDguNDc2NzFDMjMuMzUzNiA4LjQwNzcxIDIzLjkzNSA4LjI0MzgzIDI0LjQ2OTIgNy45NDk5OUMyNi4wMTg4IDcuMTAzNTcgMjYuNjQzOSA1LjcxMzE4IDI2Ljc5MTEgNC4wNDY3OEMyNi44MTI5IDMuNzkyMDQgMjYuNzg2NSAzLjUyODY5IDI2LjUxNzQgMy4zOTQ3MVpNMTMuMDE0MyAxOC4zOTQ2QzEwLjY5NjQgMTYuNTcyNCA5LjU3MjIgMTUuOTcyNiA5LjEwODE2IDE1Ljk5ODVDOC42NzQwMiAxNi4wMjQ0IDguNzUyMjIgMTYuNTIxMiA4Ljg0NzY4IDE2Ljg0NDlDOC45NDc3MyAxNy4xNjQ2IDkuMDc3NjggMTcuMzg0OSA5LjI1OTk2IDE3LjY2NTVDOS4zODU4OSAxNy44NTEyIDkuNDcyNzIgMTguMTI3MiA5LjEzNDA0IDE4LjMzNDhDOC4zODc2NiAxOC43OTY1IDcuMDg5ODUgMTguMTc5NiA3LjAyODkgMTguMTQ5MUM1LjUxODMzIDE3LjI1OTUgNC4yNTU1OSAxNi4wODUzIDMuMzY1NDYgMTQuNDc5M0MyLjUwNTgxIDEyLjkzMzcgMi4wMDY3IDExLjI3NTMgMS45MjQ0NyA5LjUwNTQyQzEuOTAyNjIgOS4wNzgxOCAyLjAyODU1IDguOTI2OTUgMi40NTQwNiA4Ljg0OTMyQzMuMDE0MTMgOC43NDU4MiAzLjU5MTQ0IDguNzIzOTcgNC4xNTA5MyA4LjgwNjE5QzYuNTE2NTYgOS4xNTE3OCA4LjUzMDI3IDEwLjIwOTIgMTAuMjE4NSAxMS44ODQ4QzExLjE4MjIgMTIuODM4OCAxMS45MTE0IDEzLjk3OSAxMi42NjIzIDE1LjA5MjlDMTMuNDYxIDE2LjI3NTcgMTQuMzIwMSAxNy40MDI3IDE1LjQxNDQgMTguMzI2OEMxNS44MDA4IDE4LjY1MDUgMTYuMTA5IDE4Ljg5NjYgMTYuNDA0IDE5LjA3ODNDMTUuNTE0NCAxOS4xNzc4IDE0LjAyOTcgMTkuMTk5MSAxMy4wMTQzIDE4LjM5NThWMTguMzk0NlpNMTQuMTI1MiAxMS4yNDg5QzE0LjEyNTIgMTEuMDU5MSAxNC4yNzcgMTAuOTA3OSAxNC40Njc5IDEwLjkwNzlDMTQuNTExIDEwLjkwNzkgMTQuNTUwMSAxMC45MTY1IDE0LjU4NTIgMTAuOTI5MkMxNC42MzI5IDEwLjk0NjQgMTQuNjc2NiAxMC45NzIzIDE0LjcxMTEgMTEuMDExNEMxNC43NzIxIDExLjA3MTggMTQuODA2NiAxMS4xNTggMTQuODA2NiAxMS4yNDg5QzE0LjgwNjYgMTEuNDM4NiAxNC42NTQ4IDExLjU4OTkgMTQuNDYzOSAxMS41ODk5QzE0LjI3MyAxMS41ODk5IDE0LjEyNTIgMTEuNDM4NiAxNC4xMjUyIDExLjI0ODlaTTE3LjU3NTkgMTMuMDE4OEMxNy4zNTQ1IDEzLjEwOTYgMTcuMTMzMSAxMy4xODczIDE2LjkyMDMgMTMuMTk1OUMxNi41OTAzIDEzLjIxMzEgMTYuMjMwMyAxMy4wNzkxIDE2LjAzNDggMTIuOTE1M0MxNS43MzEyIDEyLjY2MDUgMTUuNTEzOSAxMi41MTc5IDE1LjQyMyAxMi4wNzM0QzE1LjM4MzkgMTEuODgzNyAxNS40MDU3IDExLjU4OTkgMTUuNDQwMiAxMS40MjE0QzE1LjUxODUgMTEuMDU4NSAxNS40MzE2IDEwLjgyNTcgMTUuMTc1NyAxMC42MTRDMTQuOTY3NiAxMC40NDE1IDE0LjcwMjUgMTAuMzkzOCAxNC40MTE1IDEwLjM5MzhDMTQuMzAyOSAxMC4zOTM4IDE0LjIwMzQgMTAuMzQ2MSAxNC4xMjkyIDEwLjMwNzZDMTQuMDA3OSAxMC4yNDcyIDEzLjkwNzggMTAuMDk2IDE0LjAwMzMgOS45MTAyM0MxNC4wMzM4IDkuODQ5ODUgMTQuMTgxNSA5LjcwMzIyIDE0LjIxNiA5LjY3NzM0QzE0LjYxMTEgOS40NTI1MSAxNS4wNjY1IDkuNTI2MTIgMTUuNDg4IDkuNjk0NkMxNS44Nzg0IDkuODU0NDUgMTYuMTc0IDEwLjE0NzcgMTYuNTk4OSAxMC41NjIzQzE3LjAzMyAxMS4wNjMxIDE3LjExMTIgMTEuMjAxMSAxNy4zNTg1IDExLjU3NzJDMTcuNTU0IDExLjg3MSAxNy43MzE3IDEyLjE3MjkgMTcuODUzNiAxMi41MTg1QzE3LjkyNzIgMTIuNzM0MSAxNy44MzE3IDEyLjkxMDcgMTcuNTc1OSAxMy4wMTg4WiIgZmlsbD0iIzRkNmJmZSIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXAwXzQzMjlfMTk3NjkiPjxyZWN0IHdpZHRoPSIyNi42MzQiIGhlaWdodD0iMTkuNiIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMTYzMDg2IDEuNzUpIi8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+';
    const WHALE_SRC = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNSAyNiIgZmlsbD0ibm9uZSIgY2xhc3M9ImNlNDFlZDFiIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxwYXRoIGZpbGw9IiM0ZDZiZmUiIGQ9Ik0zMy42MTUgMi41OThjLS4zNi0uMTc2LS41MTUuMTYtLjcyNi4zMy0uMDcyLjA1NS0uMTMyLjEyNy0uMTkzLjE5My0uNTI2LjU2Mi0xLjE0LjkzLTEuOTQzLjg4Ny0xLjE3NC0uMDY3LTIuMTc2LjMwMi0zLjA2MiAxLjItLjE4OC0xLjEwNy0uODE0LTEuNzY3LTEuNzY2LTIuMTkxLS40OTgtLjIyLTEuMDAyLS40NDEtMS4zNS0uOTItLjI0NC0uMzQxLS4zMS0uNzIxLS40MzMtMS4wOTYtLjA3Ny0uMjI2LS4xNTQtLjQ1Ny0uNDE1LS40OTYtLjI4Mi0uMDQ0LS4zOTMuMTkzLS41MDQuMzkxLS40NDMuODEtLjYxNCAxLjcwMi0uNTk4IDIuNjA1LjA0IDIuMDMzLjg5OCAzLjY1MiAyLjYwMyA0LjgwMy4xOTMuMTMyLjI0My4yNjQuMTgyLjQ1Ny0uMTE2LjM5Ny0uMjU0Ljc4Mi0uMzc2IDEuMTc5LS4wNzguMjUzLS4xOTQuMzA4LS40NjUuMTk4LS45MzYtLjM5MS0xLjc0NC0uOTctMi40NTgtMS42NjktMS4yMTMtMS4xNzMtMi4zMS0yLjQ2Ny0zLjY3Ni0zLjQ4YTE2LjI1NCAxNi4yNTQgMCAwIDAtLjk3NS0uNjY4Yy0xLjM5NS0xLjM1NC4xODMtMi40NjcuNTQ4LTIuNTk5LjM4Mi0uMTM4LjEzMy0uNjEyLTEuMTAyLS42MDYtMS4yMzQuMDA1LTIuMzY0LjQyLTMuODAzLjk3YTQuMzQgNC4zNCAwIDAgMS0uNjYuMTkzIDEzLjU3NyAxMy41NzcgMCAwIDAtNC4wOC0uMTQzYy0yLjY2Ny4yOTctNC43OTkgMS41NTgtNi4zNjUgMy43MTJDLjExNiA4LjQzNi0uMzI3IDExLjM3OC4yMTUgMTQuNDQ0Yy41NyAzLjIzMyAyLjIyIDUuOTEgNC43NTUgOC4wMDIgMi42MyAyLjE3IDUuNjU4IDMuMjMzIDkuMTEzIDMuMDMgMi4wOTgtLjEyMiA0LjQzNC0uNDAzIDcuMDctMi42MzMuNjY0LjMzIDEuMzYyLjQ2MyAyLjUxOC41NjIuODkyLjA4MyAxLjc1LS4wNDQgMi40MTQtLjE4MiAxLjA0LS4yMi45Ny0xLjE4NC41OTMtMS4zNi0zLjA1LTEuNDIxLTIuMzgtLjg0My0yLjk5LTEuMzExIDEuNTUtMS44MzQgMy45MTgtNS4wOTMgNC42NDgtOS41MzEuMDcyLS40OS4xNjQtMS4xOC4xNTMtMS41NzctLjAwNi0uMjQyLjA1LS4zMzYuMzI2LS4zNjRhNS45MDMgNS45MDMgMCAwIDAgMi4xODctLjY3MmMxLjk3Ny0xLjA4IDIuNzc0LTIuODUzIDIuOTYyLTQuOTc4LjAyOC0uMzI1LS4wMDYtLjY2MS0uMzUtLjgzMlpNMTYuMzkgMjEuNzNjLTIuOTU2LTIuMzI0LTQuMzktMy4wODktNC45ODItMy4wNTYtLjU1NC4wMzMtLjQ1NC42NjctLjMzMiAxLjA4LjEyNy40MDcuMjkzLjY4OC41MjYgMS4wNDYuMTYuMjM3LjI3MS41OS0uMTYxLjg1NC0uOTUyLjU4OS0yLjYwNy0uMTk4LTIuNjg1LS4yMzctMS45MjctMS4xMzQtMy41MzctMi42MzItNC42NzMtNC42OC0xLjA5Ni0xLjk3Mi0xLjczMy00LjA4Ny0xLjgzOC02LjM0NS0uMDI4LS41NDUuMTMzLS43MzguNjc2LS44MzdBNi42NDMgNi42NDMgMCAwIDEgNS4wODYgOS41YzMuMDE3LjQ0MSA1LjU4NiAxLjc5IDcuNzQgMy45MjcgMS4yMjkgMS4yMTcgMi4xNTkgMi42NzEgMy4xMTYgNC4wOTIgMS4wMiAxLjUwOSAyLjExNSAyLjk0NiAzLjUxIDQuMTI1LjQ5NC40MTMuODg3LjcyNyAxLjI2My45NTgtMS4xMzUuMTI3LTMuMDI4LjE1NC00LjMyNC0uODd2LS4wMDJabTEuNDE3LTkuMTE0YS40MzQuNDM0IDAgMCAxIC41ODctLjQwOGMuMDYuMDIyLjExNy4wNTUuMTYuMTA1YS40MjYuNDI2IDAgMCAxIC4xMjIuMzAzLjQzNC40MzQgMCAwIDEtLjQzNy40MzUuNDMuNDMgMCAwIDEtLjQzMi0uNDM1Wm00LjQwMiAyLjI1N2MtLjI4My4xMTYtLjU2NS4yMTUtLjgzNi4yMjYtLjQyMS4wMjItLjg4LS4xNDktMS4xMy0uMzU4LS4zODctLjMyNS0uNjY0LS41MDYtLjc4LTEuMDczLS4wNS0uMjQyLS4wMjItLjYxNy4wMjItLjgzMi4xLS40NjMtLjAxMS0uNzYtLjMzOC0xLjAzLS4yNjUtLjIyLS42MDMtLjI4LS45NzQtLjI4YS44LjggMCAwIDEtLjM2LS4xMWMtLjE1NS0uMDc4LS4yODMtLjI3LS4xNjEtLjUwOC4wMzktLjA3Ny4yMjctLjI2NC4yNzEtLjI5Ny41MDQtLjI4NiAxLjA4NS0uMTkzIDEuNjIzLjAyMi40OTguMjA0Ljg3NS41NzggMS40MTcgMS4xMDcuNTUzLjYzOS42NTMuODE1Ljk2OCAxLjI5NS4yNS4zNzQuNDc2Ljc2LjYzMiAxLjIuMDk0LjI3NS0uMDI4LjUtLjM1NC42MzhaIi8+PC9nPjwvc3ZnPg==';

    /* ================================================================== *
     * Copy
     * ================================================================== */

    const EN = {
      'nav.title': 'DeepSeek Chat',
      'brand.newChat': 'New chat',
      'brand.search': 'Search chats',
      'brand.collapse': 'Collapse sidebar',
      'brand.expand': 'Expand sidebar',
      'group.pinned': 'Pinned',
      'group.today': 'Today',
      'group.yesterday': 'Yesterday',
      'group.week': 'Previous 7 days',
      'group.month': 'Previous 30 days',
      'list.empty': 'No chats yet',
      'list.emptyHint': 'Start a new chat or import a DeepSeek export.',
      'list.noMatch': 'No chats match your search.',
      'list.searchPlaceholder': 'Search chats',
      'action.more': 'More',
      'account.settings': 'Settings',
      'account.import': 'Import chats',
      'account.newChat': 'New chat',
      'model.chat': 'DeepSeek Chat',
      'model.reasoner': 'DeepSeek Reasoner',
      'model.select': 'Switch model',
      'model.flashOnly': 'Web search and files use deepseek-flash; switched the model.',
      'welcome.greeting': 'Hi, how can I help you?',
      'welcome.keyTitle': 'Add your DeepSeek API key to start chatting',
      'welcome.keyAction': 'Open settings',
      'composer.placeholder': 'Message DeepSeek ',
      'composer.thinking': 'DeepThink',
      'composer.search': 'Web search',
      'composer.searchOn': 'Web search is on',
      'composer.attach': 'Attach file',
      'composer.send': 'Send',
      'composer.stop': 'Stop generating',
      'composer.disclaimer': 'Content is generated by AI. Please verify important information.',
      'composer.noKey': 'Add an API key in settings to send',
      'composer.searchUnavailable': 'Web search is not available.',
      'composer.attachUnavailable': 'File uploads are not available.',
      'attach.title': 'Add a file',
      'attach.subtitle': 'Choose how DeepSeek should read it.',
      'attach.text': 'Text only',
      'attach.textDesc': 'Extract the text; charts and photos are ignored.',
      'attach.rich': 'Text + layout',
      'attach.richDesc': 'Keep charts and figures in place for the model.',
      'attach.ocr': 'OCR text',
      'attach.ocrDesc': 'Recognize every page and attach the text to this message.',
      'attach.image': 'Image understanding',
      'attach.imageDesc': 'Let the model see the image directly.',
      'attach.file': 'Send as file',
      'attach.fileDesc': 'Upload it to DeepSeek Files and reference it in chat.',
      'attach.uploading': 'Reading {name}…',
      'attach.uploaded': 'Attached {name}',
      'attach.fileParsed': 'File text extracted: {name}',
      'attach.ocrDone': 'OCR finished: {name} ({pages} pages)',
      'attach.tooLarge': 'This file is too large (up to {max}).',
      'attach.failed': 'Could not process the file: {message}',
      'attach.needKey': 'Add an API key before uploading files.',
      'attach.remove': 'Remove attachment',
      'attach.cancel': 'Cancel upload',
      'attach.pages': '{n} pages',
      'attach.chars': '{n} chars',
      'attach.ocrPreview': 'Recognized text',
      'attach.fileTextPreview': 'File text',
      'attach.uploadLimit': 'PDF/Word/PPT up to 100 MB, images up to 64 MB, text up to 32 MB.',
      'attach.tooMany': 'You can attach up to 20 files to one message.',
      'citations.title': 'Sources',
      'reasoning.title': 'Thought process',
      'reasoning.titleTime': 'Thought for {n}s',
      'reasoning.live': 'Thinking…',
      'reasoning.chars': '{n} chars',
      'tools.search': 'Searched {n} web pages',
      'tools.open': 'Opened {n} pages',
      'tools.read': 'Read {n} links',
      'status.timeout': 'The web-search reply timed out.',
      'status.incomplete': 'This reply was not finished.',
      'status.context': 'The context limit was reached.',
      'status.wip': 'This reply was interrupted.',
      'status.refused': 'This reply was blocked by content moderation.',
      'status.stopped': 'Generation stopped.',
      'message.copy': 'Copy',
      'message.copied': 'Copied',
      'message.regenerate': 'Regenerate',
      'message.retry': 'Retry',
      'message.error': 'Request failed',
      'message.attachments': '{n} attachment(s)',
      'settings.title': 'Settings',
      'settings.subtitle': 'DeepSeek API',
      'settings.key': 'API key',
      'settings.keySaved': 'A key is saved (ends with {hint}). Leave blank to keep it.',
      'settings.keyHint': 'Create one at platform.deepseek.com/api_keys. It is stored only on this Host.',
      'settings.keyPlaceholder': 'sk-…',
      'settings.clearKey': 'Remove the saved key',
      'settings.baseURL': 'Base URL',
      'settings.baseURLHint': 'https://api.deepseek.com, or a compatible gateway.',
      'settings.model': 'Default model',
      'settings.modelHint': 'e.g. deepseek-flash, deepseek-v4.1-flash, deepseek-v4-pro. Use the current API model list.',
      'settings.models': 'Models',
      'settings.modelsHint': 'Comma-separated model ids.',
      'settings.effort': 'Thinking effort',
      'settings.effortHint': 'low / high / max. Used when DeepThink is on.',
      'settings.thinking': 'DeepThink by default',
      'settings.thinkingHint': 'You can still toggle it in the composer.',
      'settings.filesHint': 'Files and OCR use the parser/OCR model that fits the current API.',
      'settings.temperature': 'Temperature',
      'settings.system': 'System prompt',
      'settings.systemPlaceholder': 'Optional instructions sent before every request…',
      'settings.show': 'Show',
      'settings.hide': 'Hide',
      'settings.check': 'Test connection',
      'settings.checking': 'Testing…',
      'settings.checkOk': 'Connected. {n} models available. Save to apply.',
      'settings.checkFail': 'Connection failed: {message}',
      'settings.save': 'Save',
      'settings.saving': 'Saving…',
      'settings.saved': 'Settings saved',
      'settings.savedNoKey': 'Saved, but no API key is set yet.',
      'settings.discard': 'Discard unsaved settings?',
      'import.title': 'Import chats',
      'import.drop': 'Drop a file here, or choose one',
      'import.formats': 'deepseek_data-*.zip · conversation JSON · Markdown',
      'import.folder': 'Choose export folder',
      'import.folderHint': 'Select the unzipped deepseek_data-* folder.',
      'import.paste': 'Or paste JSON / Markdown',
      'import.pastePlaceholder': 'Paste an exported conversation…',
      'import.parse': 'Read pasted text',
      'import.parsing': 'Reading file…',
      'import.result': '{n} chats · {m} messages',
      'import.note': 'Images and files keep their file names; their bytes are not imported.',
      'import.button': 'Import',
      'import.importing': 'Importing {done}/{total}…',
      'import.done': 'Imported {n} chats',
      'import.partial': 'Imported {n} chats, then failed: {message}',
      'import.resume': 'Continue import',
      'import.tooLarge': 'This file is larger than 300 MB.',
      'parse.zip': 'This ZIP archive cannot be read.',
      'parse.manifest': 'The archive has no manifest.json.',
      'parse.version': 'Only DeepSeek export format version 3 is supported.',
      'parse.index': 'The folder/archive has no readable chat_session_index.json.',
      'parse.empty': 'No conversations were found.',
      'parse.json': 'This JSON does not look like a conversation.',
      'parse.markdown': 'No User:/Assistant: labels were found in this text.',
      'parse.inflate': 'This browser cannot inflate the archive (deflate-raw is unavailable).',
      'parse.bigArchive': 'This archive is too large to read in the browser.',
      'rename.title': 'Rename chat',
      'rename.placeholder': 'Chat title',
      'delete.title': 'Delete chat',
      'delete.body': 'Delete “{title}”? This cannot be undone.',
      'delete.confirm': 'Delete',
      'pin.pin': 'Pin',
      'pin.unpin': 'Unpin',
      'export.action': 'Export JSON',
      'export.done': 'Chat exported.',
      'toast.needKey': 'Add a DeepSeek API key first.',
      'toast.busy': 'A reply is still generating. Stop it first.',
      'toast.stopped': 'Generation stopped.',
      'toast.deleted': 'Chat deleted.',
      'toast.copied': 'Copied to clipboard.',
      'toast.failed': 'Something went wrong.',
      'toast.trimmed': 'Only the latest 400 messages are sent to the model.',
      'error.network': 'The DeepSeek Host did not answer. Check that the plugin is enabled.',
      'error.request': 'The request failed.',
      'error.missingKey': 'Add a DeepSeek API key in settings.',
      'error.empty': 'The model returned an empty reply.',
      'error.api': 'The API returned an error: {message}',
      'error.tooLarge': 'The request is too large for the Host.',
      'error.badRequest': 'The request was rejected. Check the fields and try again.',
      'error.upload': 'File upload failed.',
      'error.ocr': 'OCR failed.',
      'error.fileTooLarge': 'The file is too large.',
      'error.aborted': 'Upload cancelled.',
      'error.noMessages': 'There is no message to send.',
      'error.notFound': 'That conversation no longer exists.',
      'error.noConversations': 'No conversations to import.',
      'loading': 'Loading…',
      'retry': 'Retry',
      'close': 'Close',
      'cancel': 'Cancel',
    };

    const ZH = {
      'nav.title': 'DeepSeek 对话',
      'brand.newChat': '开启新对话',
      'brand.search': '搜索对话',
      'brand.collapse': '收起侧栏',
      'brand.expand': '展开侧栏',
      'group.pinned': '置顶',
      'group.today': '今天',
      'group.yesterday': '昨天',
      'group.week': '7 天内',
      'group.month': '30 天内',
      'list.empty': '暂无对话',
      'list.emptyHint': '开启一个新对话，或导入 DeepSeek 导出数据。',
      'list.noMatch': '没有找到相关对话。',
      'list.searchPlaceholder': '搜索对话',
      'action.more': '更多',
      'account.settings': '设置',
      'account.import': '导入对话',
      'account.newChat': '开启新对话',
      'model.chat': 'DeepSeek Chat',
      'model.reasoner': 'DeepSeek Reasoner',
      'model.select': '切换模型',
      'model.flashOnly': '联网搜索和文件能力使用 deepseek-flash，已切换模型。',
      'welcome.greeting': '你好，我能帮什么忙吗？',
      'welcome.keyTitle': '填写 DeepSeek API Key 后即可开始对话',
      'welcome.keyAction': '去设置',
      'composer.placeholder': '给 DeepSeek 发送消息 ',
      'composer.thinking': '深度思考',
      'composer.search': '联网搜索',
      'composer.searchOn': '联网搜索已开启',
      'composer.attach': '添加文件',
      'composer.send': '发送',
      'composer.stop': '停止生成',
      'composer.disclaimer': '内容由 AI 生成，请仔细甄别',
      'composer.noKey': '配置 API Key 后即可发送',
      'composer.searchUnavailable': '联网搜索暂不可用。',
      'composer.attachUnavailable': '文件上传暂不可用。',
      'attach.title': '添加文件',
      'attach.subtitle': '选择 DeepSeek 读取这个文件的方式。',
      'attach.text': '解析文字',
      'attach.textDesc': '只提取文字，图表和照片会被忽略。',
      'attach.rich': '图文混排',
      'attach.richDesc': '保留图表和图片，按原位置交给模型。',
      'attach.ocr': 'OCR 提取文字',
      'attach.ocrDesc': '逐页识别，把文字附在这条消息里。',
      'attach.image': '图片理解',
      'attach.imageDesc': '让模型直接查看图片。',
      'attach.file': '作为文件发送',
      'attach.fileDesc': '上传到 DeepSeek 文件库，并在对话中引用。',
      'attach.uploading': '正在解析 {name}…',
      'attach.uploaded': '已添加 {name}',
      'attach.fileParsed': '文件内容已提取：{name}',
      'attach.ocrDone': 'OCR 完成：{name}（{pages} 页）',
      'attach.tooLarge': '文件太大（上限 {max}）。',
      'attach.failed': '文件处理失败：{message}',
      'attach.needKey': '上传文件前请先填写 API Key。',
      'attach.remove': '移除附件',
      'attach.cancel': '取消上传',
      'attach.pages': '{n} 页',
      'attach.chars': '{n} 字',
      'attach.ocrPreview': '识别文字',
      'attach.fileTextPreview': '文件内容',
      'attach.uploadLimit': 'PDF/Word/PPT ≤100 MB，图片 ≤64 MB，文本 ≤32 MB。',
      'attach.tooMany': '每条消息最多添加 20 个文件。',
      'citations.title': '参考来源',
      'reasoning.title': '已深度思考',
      'reasoning.titleTime': '已深度思考（用时 {n} 秒）',
      'reasoning.live': '正在思考…',
      'reasoning.chars': '{n} 字',
      'tools.search': '已搜索 {n} 个网页',
      'tools.open': '已打开 {n} 个网页',
      'tools.read': '已阅读 {n} 个链接',
      'status.timeout': '联网回复超时，未生成完整回答。',
      'status.incomplete': '这条回答未完成。',
      'status.context': '上下文长度已达上限。',
      'status.wip': '这条回答被中断。',
      'status.refused': '这条回答被内容审核拦截。',
      'status.stopped': '已停止生成。',
      'message.copy': '复制',
      'message.copied': '已复制',
      'message.regenerate': '重新生成',
      'message.retry': '重试',
      'message.error': '请求失败',
      'message.attachments': '{n} 个附件',
      'settings.title': '设置',
      'settings.subtitle': 'DeepSeek API',
      'settings.key': 'API Key',
      'settings.keySaved': '已保存 Key（末四位 {hint}），留空表示不修改。',
      'settings.keyHint': '可在 platform.deepseek.com/api_keys 创建。Key 只保存在本机 Host。',
      'settings.keyPlaceholder': 'sk-…',
      'settings.clearKey': '删除已保存的 Key',
      'settings.baseURL': '接口地址',
      'settings.baseURLHint': 'https://api.deepseek.com，或兼容网关。',
      'settings.model': '默认模型',
      'settings.modelHint': '如 deepseek-flash、deepseek-v4.1-flash、deepseek-v4-pro；以当前 API 模型列表为准。',
      'settings.models': '模型列表',
      'settings.modelsHint': '用英文逗号分隔的模型 ID。',
      'settings.effort': '思考强度',
      'settings.effortHint': 'low / high / max，仅开启深度思考时生效。',
      'settings.thinking': '默认开启深度思考',
      'settings.thinkingHint': '仍可在输入框的「深度思考」中随时切换。',
      'settings.filesHint': '文件与 OCR 会按当前 API 自动选择解析/识别模型。',
      'settings.temperature': '温度',
      'settings.system': '系统提示词',
      'settings.systemPlaceholder': '每次请求前附加的可选指令…',
      'settings.show': '显示',
      'settings.hide': '隐藏',
      'settings.check': '检查连接',
      'settings.checking': '检查中…',
      'settings.checkOk': '连接成功，共 {n} 个模型可用。保存后生效。',
      'settings.checkFail': '连接失败：{message}',
      'settings.save': '保存',
      'settings.saving': '保存中…',
      'settings.saved': '设置已保存',
      'settings.savedNoKey': '已保存，但尚未填写 API Key。',
      'settings.discard': '放弃未保存的设置？',
      'import.title': '导入对话',
      'import.drop': '拖入文件，或点击选择',
      'import.formats': 'deepseek_data-*.zip · 对话 JSON · Markdown',
      'import.folder': '选择导出文件夹',
      'import.folderHint': '选择解压后的 deepseek_data-* 文件夹。',
      'import.paste': '或粘贴 JSON / Markdown',
      'import.pastePlaceholder': '粘贴导出的对话…',
      'import.parse': '读取粘贴内容',
      'import.parsing': '正在读取…',
      'import.result': '{n} 个对话 · {m} 条消息',
      'import.note': '图片和文件只保留文件名，不导入文件本体。',
      'import.button': '导入',
      'import.importing': '正在导入 {done}/{total}…',
      'import.done': '已导入 {n} 个对话',
      'import.partial': '已导入 {n} 个对话，随后失败：{message}',
      'import.resume': '继续导入',
      'import.tooLarge': '文件超过 300 MB。',
      'parse.zip': '无法读取这个 ZIP 压缩包。',
      'parse.manifest': '压缩包中缺少 manifest.json。',
      'parse.version': '仅支持 DeepSeek 导出格式版本 3。',
      'parse.index': '文件夹/压缩包中缺少可读取的 chat_session_index.json。',
      'parse.empty': '没有找到可导入的对话。',
      'parse.json': '这段 JSON 不像对话数据。',
      'parse.markdown': '这段文本中没有找到“用户：/助手：”标记。',
      'parse.inflate': '当前浏览器不支持解压（deflate-raw 不可用）。',
      'parse.bigArchive': '压缩包太大，无法在浏览器中读取。',
      'rename.title': '重命名对话',
      'rename.placeholder': '对话标题',
      'delete.title': '删除对话',
      'delete.body': '删除「{title}」？此操作无法撤销。',
      'delete.confirm': '删除',
      'pin.pin': '置顶',
      'pin.unpin': '取消置顶',
      'export.action': '导出 JSON',
      'export.done': '对话已导出。',
      'toast.needKey': '请先填写 DeepSeek API Key。',
      'toast.busy': '正在生成回复，请先停止。',
      'toast.stopped': '已停止生成。',
      'toast.deleted': '已删除对话。',
      'toast.copied': '已复制到剪贴板。',
      'toast.failed': '操作失败。',
      'toast.trimmed': '只有最近 400 条消息会发送给模型。',
      'error.network': 'DeepSeek Host 没有响应。请确认插件已启用。',
      'error.request': '请求失败。',
      'error.missingKey': '请在设置中填写 DeepSeek API Key。',
      'error.empty': '模型返回了空回复。',
      'error.api': '接口返回错误：{message}',
      'error.tooLarge': '请求内容超过 Host 限制。',
      'error.badRequest': '请求被拒绝，请检查填写内容。',
      'error.noMessages': '没有可发送的消息。',
      'error.upload': '文件上传失败。',
      'error.ocr': 'OCR 识别失败。',
      'error.fileTooLarge': '文件太大。',
      'error.aborted': '已取消上传。',
      'error.notFound': '这个对话已不存在。',
      'error.noConversations': '没有可导入的对话。',
      'loading': '加载中…',
      'retry': '重试',
      'close': '关闭',
      'cancel': '取消',
    };

    /* ================================================================== *
     * Locale
     * ================================================================== */

    let translate = function fallbackTranslate(key) { return key; };
    let currentLocale = function fallbackLocale() { return 'zh'; };
    let localeRevision = 0;
    const localeListeners = new Set();

    function tr(key, vars) {
      const text = translate(key);
      const resolved = text === undefined || text === null || text === '' ? key : String(text);
      if (!vars) return resolved;
      return resolved.replace(/\{(\w+)\}/g, function replace(match, name) {
        return Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match;
      });
    }

    function useLocaleRevision() {
      const [revision, setRevision] = React.useState(localeRevision);
      React.useEffect(function subscribeLocale() {
        const listener = function onLocaleChange() { setRevision(localeRevision); };
        localeListeners.add(listener);
        setRevision(localeRevision);
        return function unsubscribeLocale() { localeListeners.delete(listener); };
      }, []);
      return revision;
    }

    function isZh() {
      return String(currentLocale() || '').toLowerCase().indexOf('zh') === 0;
    }

    /* ================================================================== *
     * Host API
     * ================================================================== */

    class ApiError extends Error {
      constructor(message, code) {
        super(message);
        this.name = 'ApiError';
        this.code = code || 'deepseek-chat/error';
      }
    }

    function localizeError(code, fallback) {
      const known = {
        'deepseek-chat/missing-key': tr('error.missingKey'),
        'deepseek-chat/network': tr('error.network'),
        'deepseek-chat/too-large': tr('error.tooLarge'),
        'deepseek-chat/bad-json': tr('error.badRequest'),
        'deepseek-chat/bad-base-url': tr('error.badRequest'),
        'deepseek-chat/bad-model': tr('error.badRequest'),
        'deepseek-chat/bad-models': tr('error.badRequest'),
        'deepseek-chat/bad-temperature': tr('error.badRequest'),
        'deepseek-chat/bad-title': tr('error.badRequest'),
        'deepseek-chat/bad-conversation': tr('error.badRequest'),
        'deepseek-chat/bad-id': tr('error.notFound'),
        'deepseek-chat/no-messages': tr('error.noMessages'),
        'deepseek-chat/no-conversations': tr('error.noConversations'),
        'deepseek-chat/not-found': tr('error.notFound'),
        'deepseek-chat/empty-stream': tr('error.empty'),
        'deepseek-chat/api-error': tr('error.api', { message: fallback }),
        'deepseek-chat/models-failed': tr('error.api', { message: fallback }),
        'deepseek-chat/bad-response': tr('error.api', { message: fallback }),
        'deepseek-chat/upload-failed': fallback || tr('error.upload'),
        'deepseek-chat/file-too-large': tr('error.fileTooLarge'),
        'deepseek-chat/aborted': tr('error.aborted'),
        'deepseek-chat/bad-upload': tr('error.badRequest'),
      };
      return known[code] || fallback;
    }

    async function api(name, payload) {
      let response;
      try {
        response = await fetch(API + name, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload || {}),
        });
      } catch (error) {
        throw new ApiError(tr('error.network'), 'deepseek-chat/network');
      }
      let data = null;
      try { data = await response.json(); } catch (error) { data = null; }
      if (!response.ok) {
        const code = data && data.error ? data.error.code : 'http-' + response.status;
        const message = data && data.error && typeof data.error.message === 'string' ? data.error.message : tr('error.request');
        throw new ApiError(localizeError(code, message), code);
      }
      return data || {};
    }

    function newId(prefix) {
      return (prefix || 'id') + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    }

    function readAsDataUrl(file) {
      return new Promise(function read(resolve, reject) {
        const reader = new FileReader();
        reader.onload = function loaded() { resolve(String(reader.result || '')); };
        reader.onerror = function failed() { reject(reader.error || new Error(tr('error.upload'))); };
        reader.readAsDataURL(file);
      });
    }

    async function uploadApi(name, file, purpose, signal) {
      const form = new FormData();
      form.append('purpose', purpose);
      form.append('file', file, file.name || 'file');
      let response;
      try {
        response = await fetch(API + name, { method: 'POST', body: form, signal: signal });
      } catch (error) {
        if (signal && signal.aborted) throw new ApiError(tr('error.aborted'), 'deepseek-chat/aborted');
        throw new ApiError(tr('error.network'), 'deepseek-chat/network');
      }
      let data = null;
      try { data = await response.json(); } catch (error) { data = null; }
      if (!response.ok) {
        const code = data && data.error ? data.error.code : 'http-' + response.status;
        const message = data && data.error && typeof data.error.message === 'string' ? data.error.message : tr('error.request');
        throw new ApiError(localizeError(code, message), code);
      }
      if (!data) throw new ApiError(tr('error.upload'), 'deepseek-chat/upload-failed');
      return data;
    }

    function stableId(prefix, seed) {
      let hash = 2166136261;
      const text = String(seed === undefined || seed === null ? '' : seed);
      for (let index = 0; index < text.length; index += 1) {
        hash ^= text.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
      }
      return (prefix || 'id_') + ('00000000' + (hash >>> 0).toString(16)).slice(-8);
    }

    function now() { return Date.now(); }

    function normalizeModelId(value) {
      const id = String(value === undefined || value === null ? '' : value).trim();
      if (id === '' || id === 'deepseek-chat' || id === 'deepseek-reasoner') return DEFAULT_MODEL;
      return id;
    }

    function normalizeEffort(value) {
      const effort = String(value === undefined || value === null ? '' : value).trim().toLowerCase();
      return ['low', 'high', 'max'].includes(effort) ? effort : 'high';
    }

    function fileCategory(file) {
      const name = String(file && file.name ? file.name : '').toLowerCase();
      const type = String(file && file.type ? file.type : '').toLowerCase();
      const extension = name.indexOf('.') >= 0 ? name.slice(name.lastIndexOf('.') + 1) : '';
      if (type.startsWith('image/') || ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'tif', 'tiff'].includes(extension)) return 'image';
      if (['pdf', 'doc', 'docx', 'ppt', 'pptx'].includes(extension) || type === 'application/pdf') return 'document';
      if (['txt', 'md', 'markdown', 'csv', 'json', 'js', 'ts', 'tsx', 'jsx', 'py', 'java', 'c', 'cpp', 'h', 'css', 'html', 'xml', 'yaml', 'yml', 'log', 'xlsx', 'xls', 'epub', 'mobi'].includes(extension)) return 'text';
      return 'document';
    }

    function fileLimitFor(category) {
      if (category === 'image') return MAX_IMAGE_BYTES;
      if (category === 'text') return MAX_TEXT_BYTES;
      return MAX_DOC_BYTES;
    }

    function joinOcrPages(pages) {
      return pages.map(function pageText(page) {
        const number = Number.isFinite(page.index) ? page.index + 1 : 1;
        const suffix = page.finish_reason === 'length' ? '\n（本页识别达到长度上限，可能不完整）' : '';
        return '【第 ' + number + ' 页】\n' + String(page.text || '') + suffix;
      }).join('\n\n');
    }

    function timeValue(value) {
      if (typeof value === 'number' && Number.isFinite(value)) return value;
      if (typeof value === 'string' && value !== '') {
        const parsed = Date.parse(value);
        if (Number.isFinite(parsed) && parsed >= 0) return parsed;
      }
      return now();
    }

    function pad2(value) {
      return value < 10 ? '0' + value : String(value);
    }

    function dayStart(offsetDays) {
      const date = new Date();
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() - (offsetDays || 0)).getTime();
    }

    function monthKey(timestamp) {
      const date = new Date(timestamp);
      return date.getFullYear() + '-' + pad2(date.getMonth() + 1);
    }

    function groupKey(timestamp) {
      if (timestamp >= dayStart(0)) return 'today';
      if (timestamp >= dayStart(1)) return 'yesterday';
      if (timestamp >= dayStart(7)) return 'week';
      if (timestamp >= dayStart(30)) return 'month';
      return monthKey(timestamp);
    }

    function formatSize(bytes) {
      if (!Number.isFinite(bytes) || bytes <= 0) return '';
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    async function copyToClipboard(text) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
          return true;
        }
      } catch (error) {
        // Fall through.
      }
      try {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.top = '-1000px';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        const copied = document.execCommand('copy');
        area.remove();
        return copied;
      } catch (error) {
        return false;
      }
    }

    /* ================================================================== *
     * Streaming
     * ================================================================== */

    function attachmentSuffix(message) {
      let suffix = '';
      for (const attachment of message.attachments || []) {
        if (attachment && attachment.kind === 'ocr' && typeof attachment.ocrText === 'string' && attachment.ocrText.trim() !== '') {
          suffix += '\n\n[OCR 识别文字 · ' + attachment.name + (attachment.pageCount ? ' · ' + attachment.pageCount + ' 页' : '') + ']\n' + attachment.ocrText;
        } else if (attachment && typeof attachment.text === 'string' && attachment.text.trim() !== '') {
          suffix += '\n\n[文件内容 · ' + attachment.name + ']\n' + attachment.text;
        }
      }
      return suffix;
    }

    function outgoingContent(message, apiMode) {
      const textContent = String(message.content || '') + attachmentSuffix(message);
      const blocks = [];
      if (textContent.trim() !== '') blocks.push({ type: 'text', text: textContent });
      for (const attachment of message.attachments || []) {
        if (attachment && typeof attachment.dataUrl === 'string' && /^data:image\//.test(attachment.dataUrl)) {
          blocks.push({ type: 'image_url', image_url: { url: attachment.dataUrl } });
        }
        if (apiMode === 'deepseek' && attachment && typeof attachment.fileId === 'string' && /^file-api-[A-Za-z0-9_-]{1,100}$/.test(attachment.fileId)) {
          blocks.push({ type: 'file', file_id: attachment.fileId });
        }
      }
      if (blocks.length === 0) return null;
      if (blocks.length === 1 && blocks[0].type === 'text') return blocks[0].text;
      return blocks;
    }

    function mergeOutgoing(target, source) {
      if (typeof target.content === 'string' && typeof source.content === 'string') {
        target.content += '\n\n' + source.content;
      } else {
        const targetBlocks = Array.isArray(target.content) ? target.content.slice() : [{ type: 'text', text: String(target.content || '') }];
        const sourceBlocks = Array.isArray(source.content) ? source.content : [{ type: 'text', text: String(source.content || '') }];
        target.content = targetBlocks.concat(sourceBlocks);
      }
      if (source.reasoning_content) {
        target.reasoning_content = (target.reasoning_content || '') + (target.reasoning_content ? '\n\n' : '') + source.reasoning_content;
      }
      if (Array.isArray(source.server_tool_calls) && source.server_tool_calls.length > 0) {
        target.server_tool_calls = (target.server_tool_calls || []).concat(source.server_tool_calls);
      }
    }

    function buildOutgoingMessages(conversation, options) {
      const withTools = options && options.webSearch === true;
      const apiMode = options && options.apiMode ? options.apiMode : 'deepseek';
      const messages = [];
      for (const message of conversation.messages || []) {
        if (message.exclude || message.error) continue;
        const content = outgoingContent(message, apiMode);
        if (content === null) continue;
        const outgoing = { role: message.role, content: content };
        if (message.role === 'assistant') {
          const toolReasoning = (Array.isArray(message.serverToolCalls) ? message.serverToolCalls : [])
            .map(function stepReasoning(step) { return step && typeof step.reasoning_content === 'string' ? step.reasoning_content : ''; })
            .filter(function nonEmpty(value) { return value.trim() !== ''; })
            .join('\n');
          const historyReasoning = String(message.reasoning || '').trim() !== '' ? message.reasoning : toolReasoning;
          if (withTools && historyReasoning !== '') outgoing.reasoning_content = historyReasoning;
          if (Array.isArray(message.serverToolCalls) && message.serverToolCalls.length > 0) outgoing.server_tool_calls = message.serverToolCalls;
        }
        const last = messages[messages.length - 1];
        if (last && last.role === outgoing.role) mergeOutgoing(last, outgoing);
        else messages.push(outgoing);
      }
      return messages;
    }

    function toolsFromServerCalls(steps) {
      const tools = [];
      for (const step of Array.isArray(steps) ? steps : []) {
        for (const call of Array.isArray(step && step.calls) ? step.calls : []) {
          if (call === null || typeof call !== 'object') continue;
          const action = call.action && typeof call.action === 'object' ? call.action : {};
          if (call.kind === 'read_link' || call.type === 'deepseek_read_url') {
            const page = call.page || {};
            tools.push({ type: 'read', queries: [], results: [{ title: page.title || page.url || '', url: page.url || '', snippet: '' }] });
            continue;
          }
          if (action.type === 'open_page' || action.type === 'find_in_page') {
            const page = call.page || {};
            tools.push({
              type: 'open',
              queries: [],
              results: [{
                title: action.type === 'find_in_page' ? '页内查找：' + String(action.pattern || '') : (page.title || page.url || ''),
                url: page.url || action.url || '',
                snippet: '',
              }],
            });
            continue;
          }
          if (action.type === 'search' || call.kind === 'search' || call.kind === 'deep_search' || call.kind === 'image_search' || call.kind === 'deep_image_search') {
            const results = (Array.isArray(call.sources) ? call.sources : []).map(function source(result) {
              return { title: result.title || '', url: result.url || '', snippet: result.snippet || '' };
            });
            tools.push({ type: 'search', queries: Array.isArray(action.queries) ? action.queries : [], results: results });
          }
        }
      }
      return tools.slice(0, MAX_TOOLS);
    }

    function citationsFromAnnotations(annotations) {
      const seen = new Set();
      const citations = [];
      for (const annotation of Array.isArray(annotations) ? annotations : []) {
        if (!annotation || annotation.type !== 'url_citation') continue;
        const value = annotation.url_citation;
        if (!value || typeof value.url !== 'string' || value.url === '' || seen.has(value.url)) continue;
        seen.add(value.url);
        citations.push({ url: value.url, title: value.title || value.url });
      }
      return citations;
    }

    async function streamChat(options) {
      const conversation = options.conversation;
      const messages = buildOutgoingMessages(conversation, { webSearch: options.webSearch === true, apiMode: options.apiMode || 'deepseek' });
      if (messages.length === 0) throw new ApiError(tr('error.empty'));
      let response;
      try {
        response = await fetch(API + 'chat', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            model: normalizeModelId(options.model),
            temperature: options.temperature,
            thinking: options.thinking === true,
            reasoningEffort: options.reasoningEffort || 'high',
            webSearch: options.webSearch === true,
            systemPrompt: options.systemPrompt || '',
            messages: messages,
          }),
          signal: options.signal,
        });
      } catch (error) {
        if (options.signal && options.signal.aborted) throw error;
        throw new ApiError(tr('error.network'), 'deepseek-chat/network');
      }
      if (!response.ok) {
        let data = null;
        try { data = await response.json(); } catch (error) { data = null; }
        const code = data && data.error ? data.error.code : 'http-' + response.status;
        const message = data && data.error && typeof data.error.message === 'string' ? data.error.message : tr('error.request');
        throw new ApiError(localizeError(code, message), code);
      }
      if (!response.body) throw new ApiError(tr('error.network'), 'deepseek-chat/network');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let dataLines = [];
      let content = '';
      let reasoning = '';
      let serverToolCalls = [];
      let annotations = [];
      let toolEvents = [];
      let finishReason = '';
      let finished = false;

      function flush() {
        if (dataLines.length === 0) return false;
        const data = dataLines.join('\n');
        dataLines = [];
        if (data === '[DONE]') return true;
        let json;
        try { json = JSON.parse(data); } catch (error) { return false; }
        if (json && json.error) {
          const message = typeof json.error.message === 'string' ? json.error.message : tr('error.request');
          throw new ApiError(message, 'deepseek-chat/api-error');
        }
        const choice = Array.isArray(json.choices) ? json.choices[0] : null;
        const delta = choice && choice.delta ? choice.delta : {};
        const event = (choice && choice.server_tool_event) || json.server_tool_event;
        if (event && typeof event === 'object') toolEvents = toolEvents.concat([event]);
        if (Array.isArray(delta.server_tool_calls)) serverToolCalls = delta.server_tool_calls;
        if (Array.isArray(delta.annotations)) annotations = delta.annotations;
        if (choice && typeof choice.finish_reason === 'string' && choice.finish_reason !== '') finishReason = choice.finish_reason;
        if (typeof delta.reasoning_content === 'string') reasoning += delta.reasoning_content;
        if (typeof delta.reasoning === 'string') reasoning += delta.reasoning;
        if (typeof delta.content === 'string') content += delta.content;
        if (typeof options.onProgress === 'function') options.onProgress({ content: content, reasoning: reasoning, toolEvents: toolEvents });
        return false;
      }

      while (!finished) {
        const chunk = await reader.read();
        if (chunk.done) break;
        buffer += decoder.decode(chunk.value, { stream: true });
        let newlineIndex;
        while ((newlineIndex = buffer.indexOf('\n')) >= 0) {
          const line = buffer.slice(0, newlineIndex).replace(/\r$/, '');
          buffer = buffer.slice(newlineIndex + 1);
          if (line === '') {
            if (flush()) { finished = true; break; }
          } else if (line.indexOf('data:') === 0) {
            dataLines.push(line.slice(5).replace(/^ /, ''));
          }
        }
      }
      if (!finished) {
        buffer += decoder.decode();
        const tail = buffer.split('\n');
        for (const rawLine of tail) {
          const line = rawLine.replace(/\r$/, '');
          if (line === '') {
            if (flush()) { finished = true; break; }
          } else if (line.indexOf('data:') === 0) {
            dataLines.push(line.slice(5).replace(/^ /, ''));
          }
        }
        if (!finished && dataLines.length > 0) flush();
      }
      return { content: content, reasoning: reasoning, serverToolCalls: serverToolCalls, annotations: annotations, toolEvents: toolEvents, finishReason: finishReason };
    }

    /* ================================================================== *
     * Markdown
     * ================================================================== */

    const INLINE_RE = /(`[^`\n]+`|\*\*[^*\n]+\*\*|\*[^*\n]+\*|~~[^~\n]+~~|\[[^\]\n]+\]\(https?:\/\/[^)\s]+\)|https?:\/\/[^\s<>()]+)/g;

    function renderInline(input, prefix) {
      const source = String(input === undefined || input === null ? '' : input);
      const output = [];
      let last = 0;
      let match;
      let index = 0;
      INLINE_RE.lastIndex = 0;
      while ((match = INLINE_RE.exec(source)) !== null) {
        if (match.index > last) output.push(source.slice(last, match.index));
        const token = match[0];
        const key = prefix + '-i' + index;
        index += 1;
        if (token.charAt(0) === '`') {
          output.push(h('code', { key: key, className: 'dsc-inline-code' }, token.slice(1, -1)));
        } else if (token.slice(0, 2) === '**') {
          output.push(h('strong', { key: key }, token.slice(2, -2)));
        } else if (token.slice(0, 2) === '~~') {
          output.push(h('del', { key: key }, token.slice(2, -2)));
        } else if (token.charAt(0) === '*') {
          output.push(h('em', { key: key }, token.slice(1, -1)));
        } else if (token.charAt(0) === '[') {
          const link = /^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/.exec(token);
          if (link) output.push(h('a', { key: key, href: link[2], target: '_blank', rel: 'noreferrer' }, link[1]));
          else output.push(token);
        } else {
          output.push(h('a', { key: key, href: token, target: '_blank', rel: 'noreferrer' }, token));
        }
        last = match.index + token.length;
      }
      if (last < source.length) output.push(source.slice(last));
      return output;
    }

    function CodeBlock(props) {
      const [copied, setCopied] = React.useState(false);
      function copy() {
        copyToClipboard(props.code).then(function done(ok) {
          if (!ok) return;
          setCopied(true);
          window.setTimeout(function reset() { setCopied(false); }, 1500);
        });
      }
      return h(
        'div',
        { className: 'dsc-code' },
        h(
          'div',
          { className: 'dsc-code-head' },
          h('span', { className: 'dsc-code-lang' }, props.lang || 'text'),
          h('button', { type: 'button', className: 'dsc-code-copy', onClick: copy }, copied ? tr('message.copied') : tr('message.copy'))
        ),
        h('pre', { className: 'dsc-code-pre' }, h('code', null, props.code))
      );
    }

    function isBlockStart(line) {
      return /^\s*(```|#{1,6}\s|>|\s*([-*+]|\d+[.)])\s)/.test(line);
    }

    function renderMarkdown(markdown) {
      const source = String(markdown === undefined || markdown === null ? '' : markdown);
      if (source.trim() === '') return null;
      const lines = source.replace(/\r\n?/g, '\n').split('\n');
      const blocks = [];
      let cursor = 0;
      let counter = 0;
      function nextKey() { counter += 1; return 'md-' + counter; }

      while (cursor < lines.length) {
        const line = lines[cursor];
        if (/^\s*$/.test(line)) { cursor += 1; continue; }

        const fence = /^\s*```\s*([\w+#.-]*)\s*$/.exec(line);
        if (fence) {
          const lang = fence[1] || '';
          const body = [];
          cursor += 1;
          while (cursor < lines.length && !/^\s*```\s*$/.test(lines[cursor])) {
            body.push(lines[cursor]);
            cursor += 1;
          }
          if (cursor < lines.length) cursor += 1;
          blocks.push(h(CodeBlock, { key: nextKey(), code: body.join('\n'), lang: lang }));
          continue;
        }

        const heading = /^\s{0,3}(#{1,6})\s+(.*)$/.exec(line);
        if (heading) {
          const level = Math.min(heading[1].length, 4);
          blocks.push(h('h' + level, { key: nextKey(), className: 'dsc-md-h' }, renderInline(heading[2], nextKey())));
          cursor += 1;
          continue;
        }

        if (/^\s*>\s?/.test(line)) {
          const quote = [];
          while (cursor < lines.length && /^\s*>\s?/.test(lines[cursor])) {
            quote.push(lines[cursor].replace(/^\s*>\s?/, ''));
            cursor += 1;
          }
          blocks.push(h('blockquote', { key: nextKey(), className: 'dsc-md-quote' }, h('p', null, renderInline(quote.join('\n'), nextKey()))));
          continue;
        }

        if (/^\s*[-*+]\s+/.test(line)) {
          const items = [];
          while (cursor < lines.length && /^\s*[-*+]\s+/.test(lines[cursor])) {
            items.push(h('li', { key: nextKey() }, renderInline(lines[cursor].replace(/^\s*[-*+]\s+/, ''), nextKey())));
            cursor += 1;
          }
          blocks.push(h('ul', { key: nextKey(), className: 'dsc-md-list' }, items));
          continue;
        }

        if (/^\s*\d+[.)]\s+/.test(line)) {
          const items = [];
          while (cursor < lines.length && /^\s*\d+[.)]\s+/.test(lines[cursor])) {
            items.push(h('li', { key: nextKey() }, renderInline(lines[cursor].replace(/^\s*\d+[.)]\s+/, ''), nextKey())));
            cursor += 1;
          }
          blocks.push(h('ol', { key: nextKey(), className: 'dsc-md-list' }, items));
          continue;
        }

        if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) {
          blocks.push(h('hr', { key: nextKey(), className: 'dsc-md-hr' }));
          cursor += 1;
          continue;
        }

        if (/^\s*\|.*\|\s*$/.test(line) && cursor + 1 < lines.length && /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[cursor + 1]) && lines[cursor + 1].indexOf('-') >= 0) {
          const cellsOf = function cellsOf(row) {
            return row.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map(function trim(cell) { return cell.trim(); });
          };
          const head = cellsOf(line);
          cursor += 2;
          const rows = [];
          while (cursor < lines.length && /^\s*\|.*\|\s*$/.test(lines[cursor])) {
            rows.push(cellsOf(lines[cursor]));
            cursor += 1;
          }
          blocks.push(h(
            'div',
            { key: nextKey(), className: 'dsc-table-wrap' },
            h(
              'table',
              { className: 'dsc-table' },
              h('thead', null, h('tr', null, head.map(function headCell(cell, index) { return h('th', { key: 'h' + index }, renderInline(cell, nextKey())); }))),
              h('tbody', null, rows.map(function bodyRow(row, rowIndex) {
                return h('tr', { key: 'r' + rowIndex }, row.map(function bodyCell(cell, index) { return h('td', { key: 'c' + index }, renderInline(cell, nextKey())); }));
              }))
            )
          ));
          continue;
        }

        const paragraph = [];
        while (cursor < lines.length && !/^\s*$/.test(lines[cursor]) && !isBlockStart(lines[cursor]) && !/^\s*\|.*\|\s*$/.test(lines[cursor])) {
          paragraph.push(lines[cursor]);
          cursor += 1;
        }
        blocks.push(h('p', { key: nextKey(), className: 'dsc-md-p' }, renderInline(paragraph.join('\n'), nextKey())));
      }
      return blocks;
    }

    /* ================================================================== *
     * Icons
     * ================================================================== */

    function Icon(props) {
      const size = props.size || 16;
      const paths = {
        search: ['M10.5 4.5a6 6 0 1 0 0 12a6 6 0 0 0 0-12z', 'M15 15l4.5 4.5'],
        panel: ['M3.5 4.5h17v15h-17z', 'M9 4.5v15'],
        plus: ['M12 5v14', 'M5 12h14'],
        more: ['M6 12h.01', 'M12 12h.01', 'M18 12h.01'],
        pin: ['M9 4h6l-1.2 6.2 4.2 4.3H6l4.2-4.3z', 'M12 14.5V20'],
        edit: ['M4 20h4.5L20 8.5 15.5 4 4 15.5z', 'M13.5 6l4.5 4.5'],
        trash: ['M4.5 6.5h15', 'M9 6.5V4h6v2.5', 'M6.5 6.5l1 14h9l1-14', 'M10 10.5v6', 'M14 10.5v6'],
        download: ['M12 4v11', 'M7.5 11.5 12 16l4.5-4.5', 'M4.5 19.5h15'],
        upload: ['M12 20V9', 'M7.5 12.5 12 8l4.5 4.5', 'M4.5 4.5h15'],
        copy: ['M9 9h11v11H9z', 'M5 15H4V4h11v1'],
        check: ['M4.5 12.5 9.5 17.5 19.5 6.5'],
        refresh: ['M20 11a8 8 0 1 0-2.6 6', 'M20 5v6h-6'],
        send: ['M12 19V5', 'M6 11l6-6 6 6'],
        stop: ['M7 7h10v10H7z'],
        attach: ['M8.2 12.5V8.4a3.8 3.8 0 0 1 7.6 0v6.4a5.2 5.2 0 0 1-10.4 0V7.2'],
        bulb: ['M9 18h6', 'M10 21h4', 'M8.6 14.6A6 6 0 1 1 15.4 14.6c-.8.7-1.2 1.5-1.2 2.4h-4.4c0-.9-.4-1.7-1.2-2.4z'],
        globe: ['M12 3.2a8.8 8.8 0 1 0 0 17.6a8.8 8.8 0 0 0 0-17.6z', 'M3.4 12h17.2', 'M12 3.2c2.4 2.4 3.6 5.4 3.6 8.8s-1.2 6.4-3.6 8.8c-2.4-2.4-3.6-5.4-3.6-8.8S9.6 5.6 12 3.2z'],
        settings: ['M12 15.2a3.2 3.2 0 1 0 0-6.4a3.2 3.2 0 0 0 0 6.4z', 'M19.4 13.5a7.7 7.7 0 0 0 0-3l1.7-1.3-1.9-3.3-2 .8a7.6 7.6 0 0 0-2.6-1.5L14.2 3h-3.8l-.4 2.2a7.6 7.6 0 0 0-2.6 1.5l-2-.8-1.9 3.3 1.7 1.3a7.7 7.7 0 0 0 0 3l-1.7 1.3 1.9 3.3 2-.8a7.6 7.6 0 0 0 2.6 1.5l.4 2.2h3.8l.4-2.2a7.6 7.6 0 0 0 2.6-1.5l2 .8 1.9-3.3z'],
        x: ['M6 6l12 12', 'M18 6 6 18'],
        chevronDown: ['M6 9.5l6 6 6-6'],
        chevronRight: ['M9.5 6l6 6-6 6'],
        alert: ['M12 4.5 21 20H3z', 'M12 10v4.5', 'M12 17.3v.4'],
        key: ['M14.5 9.5a4.5 4.5 0 1 1-4.2 6.1H7l-2.5 2.5L3 16.5l2-2v-2.2l2.2-2.2h3.1a4.5 4.5 0 0 1 4.2-1.1z'],
        importIcon: ['M12 4v10', 'M8 10l4 4 4-4', 'M4 20h16'],
        eye: ['M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z', 'M12 9.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5z'],
        eyeOff: ['M4 4l16 16', 'M9.9 5.2A10.6 10.6 0 0 1 12 5c6 0 9.5 6 9.5 6a17 17 0 0 1-3.3 3.7', 'M6.2 7.4A17 17 0 0 0 2.5 11s3.5 6 9.5 6a10 10 0 0 0 4-.8'],
      }[props.name] || [];
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: props.strokeWidth || 1.7,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': 'true',
          focusable: 'false',
          style: { display: 'block', flex: '0 0 auto' },
        },
        paths.map(function path(d, index) { return h('path', { key: index, d: d }); })
      );
    }

    function PanelIcon(props) {
      const size = typeof props.size === 'number' && props.size > 0 ? props.size : 16;
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.75,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': 'true',
          focusable: 'false',
          style: { display: 'block' },
        },
        h('path', { d: 'M21.3 10.9c0 4-3.6 7.2-9.3 7.2-1.1 0-2.1-.1-3.1-.35L4.2 20l1.55-4.1C4.2 14.6 3 12.9 3 10.9c0-4 3.9-6.9 9.3-6.9s9 2.9 9 6.9Z' })
      );
    }

    function Spinner(props) {
      return h('span', { className: 'dsc-spinner', style: props && props.size ? { width: props.size, height: props.size } : undefined, 'aria-hidden': 'true' });
    }

    function Logo(props) {
      return h('img', { className: 'dsc-logo', src: LOGO_SRC, width: 143, height: 23, alt: 'DeepSeek', draggable: false });
    }

    function NewChatIcon(props) {
      const size = props.size || 16;
      return h(
        'svg',
        { width: size, height: size, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': 'true', focusable: 'false', style: { display: 'block', flex: '0 0 auto' } },
        h('path', {
          d: 'M8 0.599609C3.91309 0.599609 0.599609 3.91309 0.599609 8C0.599609 9.13376 0.855461 10.2098 1.3125 11.1719L1.5918 11.7588L2.76562 11.2012L2.48633 10.6143C2.11034 9.82278 1.90039 8.93675 1.90039 8C1.90039 4.63106 4.63106 1.90039 8 1.90039C11.3689 1.90039 14.0996 4.63106 14.0996 8C14.0996 11.3689 11.3689 14.0996 8 14.0996C7.31041 14.0996 6.80528 14.0514 6.35742 13.9277C5.91623 13.8059 5.49768 13.6021 4.99707 13.2529C4.26492 12.7422 3.21611 12.5616 2.35156 13.1074L2.33789 13.1162L2.32422 13.126L1.58789 13.6436L2.01953 14.9297L3.0459 14.207C3.36351 14.0065 3.83838 14.0294 4.25293 14.3184C4.84547 14.7317 5.39743 15.011 6.01172 15.1807C6.61947 15.3485 7.25549 15.4004 8 15.4004C12.0869 15.4004 15.4004 12.0869 15.4004 8C15.4004 3.91309 12.0869 0.599609 8 0.599609ZM7.34473 4.93945V7.34961H4.93945V8.65039H7.34473V11.0605H8.64551V8.65039H11.0605V7.34961H8.64551V4.93945H7.34473Z',
          fill: 'currentColor',
        })
      );
    }

    function SidebarLines(props) {
      const size = props.size || 18;
      return h(
        'svg',
        { width: size, height: size, viewBox: '0 0 20 20', fill: 'none', 'aria-hidden': 'true', focusable: 'false', style: { display: 'block', flex: '0 0 auto' } },
        h('path', { d: 'M17.2027 4.90034V6.43655H2.79724V4.90034H17.2027Z', fill: 'currentColor' }),
        h('path', { d: 'M10.9603 13.0634V14.5996H2.79724V13.0634H10.9603Z', fill: 'currentColor' })
      );
    }

    function AttachIcon(props) {
      const size = props.size || 16;
      return h(
        'svg',
        { width: size, height: size, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': 'true', focusable: 'false', style: { display: 'block', flex: '0 0 auto' } },
        h('path', {
          d: 'M5.5498 9.75V5H6.9502V9.75C6.9502 10.3299 7.4201 10.7998 8 10.7998C8.5799 10.7998 9.0498 10.3299 9.0498 9.75V4.5C9.0498 2.9536 7.7964 1.7002 6.25 1.7002C4.7036 1.7002 3.4502 2.9536 3.4502 4.5V9.75C3.4502 12.2629 5.4871 14.2998 8 14.2998C10.5129 14.2998 12.5498 12.2629 12.5498 9.75V4H13.9502V9.75C13.9502 13.0361 11.2861 15.7002 8 15.7002C4.71391 15.7002 2.0498 13.0361 2.0498 9.75V4.5C2.04981 2.1804 3.9304 0.299806 6.25 0.299805C8.5696 0.299805 10.4502 2.1804 10.4502 4.5V9.75C10.4502 11.1031 9.3531 12.2002 8 12.2002C6.6469 12.2002 5.5498 11.1031 5.5498 9.75Z',
          fill: 'currentColor',
        })
      );
    }

    function Whale(props) {
      return h('img', { className: 'dsc-whale', src: WHALE_SRC, width: props.size || 28, height: Math.round((props.size || 28) * 0.74), alt: '', 'aria-hidden': 'true', draggable: false });
    }

    function IconButton(props) {
      return h(
        'button',
        {
          type: 'button',
          className: 'dsc-icon-btn' + (props.className ? ' ' + props.className : ''),
          title: props.title,
          'aria-label': props.title,
          onClick: props.onClick,
          disabled: props.disabled,
        },
        props.children
      );
    }

    /* ================================================================== *
     * Sidebar
     * ================================================================== */

    function groupLabel(key) {
      if (key === 'pinned') return tr('group.pinned');
      if (key === 'today') return tr('group.today');
      if (key === 'yesterday') return tr('group.yesterday');
      if (key === 'week') return tr('group.week');
      if (key === 'month') return tr('group.month');
      return key;
    }

    function buildGroups(summaries, query) {
      const needle = String(query || '').trim().toLowerCase();
      const pinned = [];
      const buckets = new Map();
      const fixed = ['today', 'yesterday', 'week', 'month'];
      for (const summary of summaries) {
        if (needle !== '' && String(summary.title || '').toLowerCase().indexOf(needle) < 0) continue;
        if (summary.pinned) {
          pinned.push(summary);
          continue;
        }
        const key = groupKey(summary.updatedAt);
        if (!buckets.has(key)) buckets.set(key, []);
        buckets.get(key).push(summary);
      }
      const groups = [];
      if (pinned.length > 0) groups.push({ key: 'pinned', label: groupLabel('pinned'), rows: pinned });
      for (const key of fixed) {
        if (buckets.has(key)) {
          groups.push({ key: key, label: groupLabel(key), rows: buckets.get(key) });
          buckets.delete(key);
        }
      }
      for (const [key, rows] of buckets.entries()) {
        groups.push({ key: key, label: groupLabel(key), rows: rows });
      }
      return groups;
    }

    function ChatRow(props) {
      const summary = props.summary;
      return h(
        'div',
        { className: 'dsc-row' + (summary.id === props.activeId ? ' is-active' : '') + (props.menuOpen ? ' is-menu-open' : '') },
        h(
          'button',
          {
            type: 'button',
            className: 'dsc-row-main',
            title: summary.title,
            onClick: function open() { props.onOpen(summary.id); },
          },
          h('span', { className: 'dsc-row-title' }, summary.title || tr('brand.newChat'))
        ),
        h(
          'button',
          {
            type: 'button',
            className: 'dsc-row-more',
            title: tr('action.more'),
            'aria-label': tr('action.more'),
            onClick: function more(event) {
              event.stopPropagation();
              props.onMenu(summary.id);
            },
          },
          h(Icon, { name: 'more', size: 16 })
        ),
        props.menuOpen
          ? h(
            'div',
            { className: 'dsc-row-menu', role: 'menu' },
            h('button', { type: 'button', role: 'menuitem', onClick: function pin() { props.onPin(summary); } }, h(Icon, { name: 'pin', size: 14 }), summary.pinned ? tr('pin.unpin') : tr('pin.pin')),
            h('button', { type: 'button', role: 'menuitem', onClick: function rename() { props.onRename(summary); } }, h(Icon, { name: 'edit', size: 14 }), tr('rename.title')),
            h('button', { type: 'button', role: 'menuitem', onClick: function exportRow() { props.onExport(summary); } }, h(Icon, { name: 'download', size: 14 }), tr('export.action')),
            h('button', { type: 'button', role: 'menuitem', className: 'is-danger', onClick: function remove() { props.onDelete(summary); } }, h(Icon, { name: 'trash', size: 14 }), tr('delete.title'))
          )
          : null
      );
    }

    const ChatRowView = React.memo(ChatRow, function sameRow(prev, next) {
      return prev.summary === next.summary
        && prev.activeId === next.activeId
        && prev.menuOpen === next.menuOpen
        && prev.busy === next.busy
        && prev.revision === next.revision;
    });

    function Sidebar(props) {
      return h(
        'aside',
        { className: 'dsc-sidebar' + (props.mobileOpen ? ' is-mobile-open' : '') },
        h(
          'header',
          { className: 'dsc-side-head' },
          h(Logo, null),
          h(
            'div',
            { className: 'dsc-side-actions' },
            h(IconButton, { title: tr('brand.search'), onClick: props.onToggleSearch }, h(Icon, { name: 'search', size: 16 })),
            h(IconButton, { title: tr('brand.collapse'), onClick: props.onCollapse }, h(Icon, { name: 'panel', size: 16 }))
          )
        ),
        props.searchOpen
          ? h(
            'label',
            { className: 'dsc-search' },
            h(Icon, { name: 'search', size: 14 }),
            h('input', {
              type: 'search',
              value: props.query,
              autoFocus: true,
              placeholder: tr('list.searchPlaceholder'),
              onChange: function change(event) { props.onQuery(event.target.value); },
              'aria-label': tr('list.searchPlaceholder'),
            })
          )
          : null,
        h(
          'button',
          { type: 'button', className: 'dsc-newchat', onClick: props.onNewChat },
          h('span', { className: 'dsc-newchat-icon' }, h(NewChatIcon, { size: 16 })),
          h('span', null, tr('brand.newChat'))
        ),
        h(
          'div',
          { className: 'dsc-list' },
          props.groups.length === 0
            ? h(
              'div',
              { className: 'dsc-empty' },
              h(Icon, { name: 'search', size: 20 }),
              h('p', { className: 'dsc-empty-title' }, props.query ? tr('list.noMatch') : tr('list.empty')),
              props.query ? null : h('p', { className: 'dsc-empty-hint' }, tr('list.emptyHint'))
            )
            : props.groups.map(function group(entry) {
              return h(
                'section',
                { key: entry.key, className: 'dsc-group' },
                h('div', { className: 'dsc-group-label' }, entry.label),
                entry.rows.map(function row(summary) {
                  return h(ChatRowView, {
                    key: summary.id,
                    summary: summary,
                    activeId: props.activeId,
                    busy: props.busy,
                    revision: props.revision,
                    menuOpen: props.menuId === summary.id,
                    onOpen: props.onOpen,
                    onMenu: props.onMenu,
                    onPin: props.onPin,
                    onRename: props.onRename,
                    onDelete: props.onDelete,
                    onExport: props.onExport,
                  });
                })
              );
            })
        ),
        h(
          'footer',
          { className: 'dsc-account' },
          h(
            'button',
            {
              type: 'button',
              className: 'dsc-account-main',
              onClick: props.onAccountMenu,
              'aria-expanded': props.accountOpen,
            },
            h(
              'span',
              { className: 'dsc-avatar-wrap' },
              h('span', { className: 'dsc-avatar' }, (props.profile.name || 'D').slice(0, 1).toUpperCase()),
              props.profile.avatar
                ? h('img', {
                  className: 'dsc-avatar-img',
                  src: props.profile.avatar,
                  alt: '',
                  'aria-hidden': 'true',
                  onError: function broken(event) { event.currentTarget.style.display = 'none'; },
                })
                : null
            ),
            h('span', { className: 'dsc-account-name' }, props.profile.name || 'DeepSeek'),
            h('span', { className: 'dsc-account-more' }, h(Icon, { name: 'more', size: 16 })),
            h('span', { className: 'dsc-focus-ring', 'aria-hidden': 'true' })
          ),
          props.accountOpen
            ? h(
              'div',
              { className: 'dsc-account-menu', role: 'menu' },
              h('button', { type: 'button', role: 'menuitem', onClick: props.onSettings }, h(Icon, { name: 'settings', size: 15 }), tr('account.settings')),
              h('button', { type: 'button', role: 'menuitem', onClick: props.onImport }, h(Icon, { name: 'importIcon', size: 15 }), tr('account.import')),
              h('button', { type: 'button', role: 'menuitem', onClick: props.onNewChat }, h(Icon, { name: 'plus', size: 15 }), tr('account.newChat'))
            )
            : null
        )
      );
    }

    const SidebarView = React.memo(Sidebar, function sameSidebar(prev, next) {
      return prev.profile === next.profile
        && prev.groups === next.groups
        && prev.query === next.query
        && prev.searchOpen === next.searchOpen
        && prev.activeId === next.activeId
        && prev.menuId === next.menuId
        && prev.accountOpen === next.accountOpen
        && prev.mobileOpen === next.mobileOpen
        && prev.busy === next.busy
        && prev.revision === next.revision;
    });

    /* ================================================================== *
     * Messages
     * ================================================================== */

    function statusNote(status) {
      if (status === 'TIMEOUT') return tr('status.timeout');
      if (status === 'INCOMPLETE') return tr('status.incomplete');
      if (status === 'CONTEXT_LENGTH_EXCEEDED') return tr('status.context');
      if (status === 'WIP') return tr('status.wip');
      return '';
    }

    function Reasoning(props) {
      const [open, setOpen] = React.useState(props.live === true);
      const wasLiveRef = React.useRef(props.live === true);
      React.useEffect(function followLive() {
        if (props.live) setOpen(true);
        else if (wasLiveRef.current) setOpen(false);
        wasLiveRef.current = props.live === true;
      }, [props.live]);
      return h(
        'div',
        { className: 'dsc-reasoning' },
        h(
          'button',
          {
            type: 'button',
            className: 'dsc-reasoning-head',
            onClick: function toggle() { setOpen(!open); },
            'aria-expanded': open,
          },
          h(Icon, { name: 'bulb', size: 14 }),
          h('span', null, props.live ? tr('reasoning.live') : (props.seconds > 0 ? tr('reasoning.titleTime', { n: Math.max(1, Math.round(props.seconds)) }) : tr('reasoning.title'))),
          h('span', { className: 'dsc-chevron' + (open ? ' is-open' : '') }, h(Icon, { name: 'chevronRight', size: 13 }))
        ),
        open
          ? h('div', { className: 'dsc-reasoning-body' },
            String(props.text || '').trim() === '' ? h('p', { className: 'dsc-muted' }, tr('reasoning.live')) : renderMarkdown(props.text))
          : null
      );
    }

    function ToolsNote(props) {
      const [open, setOpen] = React.useState(false);
      const queries = [];
      const results = [];
      let search = false;
      let read = false;
      for (const tool of props.tools || []) {
        if (tool.type === 'search') search = true;
        if (tool.type === 'open') search = true;
        if (tool.type === 'read') read = true;
        for (const query of tool.queries || []) queries.push(query);
        for (const result of tool.results || []) results.push(result);
      }
      if (results.length === 0 && queries.length === 0) return null;
      const label = read && !search
        ? tr('tools.read', { n: results.length })
        : tr('tools.search', { n: results.length });
      return h(
        'div',
        { className: 'dsc-tools' },
        h(
          'button',
          { type: 'button', className: 'dsc-tools-head', onClick: function toggle() { setOpen(!open); }, 'aria-expanded': open },
          h(Icon, { name: 'globe', size: 14 }),
          h('span', null, label),
          h('span', { className: 'dsc-chevron' + (open ? ' is-open' : '') }, h(Icon, { name: 'chevronRight', size: 12 }))
        ),
        open
          ? h(
            'div',
            { className: 'dsc-tools-body' },
            queries.length > 0 ? h('p', { className: 'dsc-tools-query' }, queries.join(' · ')) : null,
            results.map(function link(result, index) {
              return h(
                'a',
                { key: index, className: 'dsc-tools-link', href: result.url || undefined, target: '_blank', rel: 'noreferrer' },
                h('span', { className: 'dsc-tools-title' }, result.title || result.url || 'link'),
                result.snippet ? h('span', { className: 'dsc-tools-snippet' }, result.snippet) : null
              );
            })
          )
          : null
      );
    }

    function MessageRow(props) {
      const message = props.message;
      const streaming = props.streaming === true;
      const [copied, setCopied] = React.useState(false);

      function copyMessage() {
        copyToClipboard(message.content).then(function done(ok) {
          if (!ok) return;
          setCopied(true);
          window.setTimeout(function reset() { setCopied(false); }, 1500);
        });
      }

      if (message.role === 'user') {
        const attachments = Array.isArray(message.attachments) ? message.attachments : [];
        const ocrAttachments = attachments.filter(function isOcr(item) { return item && item.kind === 'ocr' && item.ocrText; });
        const textAttachments = attachments.filter(function isText(item) { return item && item.kind !== 'ocr' && item.text; });
        return h(
          'div',
          { className: 'dsc-msg dsc-msg-user' },
          h(
            'div',
            { className: 'dsc-user-bubble' },
            h('div', { className: 'dsc-user-text' }, message.content || (attachments.length > 0 ? tr('message.attachments', { n: attachments.length }) : '')),
            attachments.length > 0
              ? h(
                'div',
                { className: 'dsc-attachments' },
                attachments.map(function attachmentRow(attachment, index) {
                  const meta = attachment.kind === 'ocr'
                    ? [attachment.pageCount ? tr('attach.pages', { n: attachment.pageCount }) : '', attachment.ocrText ? tr('attach.chars', { n: attachment.ocrText.length }) : ''].filter(Boolean).join(' · ')
                    : formatSize(attachment.size);
                  return h(
                    'span',
                    { key: (attachment.name || 'file') + '-' + index, className: 'dsc-attachment' + (attachment.kind === 'ocr' ? ' is-ocr' : '') },
                    attachment.dataUrl ? h('img', { className: 'dsc-attachment-thumb', src: attachment.dataUrl, alt: '', 'aria-hidden': 'true' }) : h(AttachIcon, { size: 12 }),
                    h('span', { className: 'dsc-attachment-name' }, attachment.name),
                    attachment.kind === 'ocr' ? h('em', { className: 'dsc-attachment-badge' }, 'OCR') : null,
                    meta ? h('em', null, meta) : null
                  );
                })
              )
              : null
          ),
          ocrAttachments.length > 0
            ? h(
              'details',
              { className: 'dsc-ocr-details' },
              h('summary', null, tr('attach.ocrPreview') + ' · ' + ocrAttachments.map(function name(item) { return item.name; }).join('、')),
              ocrAttachments.map(function preview(attachment, index) {
                return h('pre', { key: index }, String(attachment.ocrText).slice(0, 6000) + (String(attachment.ocrText).length > 6000 ? '\n…' : ''));
              })
            )
            : null,
          textAttachments.length > 0
            ? h(
              'details',
              { className: 'dsc-ocr-details' },
              h('summary', null, tr('attach.fileTextPreview') + ' · ' + textAttachments.map(function name(item) { return item.name; }).join('、')),
              textAttachments.map(function preview(attachment, index) {
                return h('pre', { key: index }, String(attachment.text).slice(0, 6000) + (String(attachment.text).length > 6000 ? '\n…' : ''));
              })
            )
            : null
        );
      }

      const hasReasoning = String(message.reasoning || '').trim() !== '';
      const hasContent = String(message.content || '').trim() !== '';
      const note = message.stopped ? tr('status.stopped') : statusNote(message.status);
      const citations = citationsFromAnnotations(message.annotations);
      return h(
        'div',
        { className: 'dsc-msg dsc-msg-assistant' },
        h('div', { className: 'dsc-avatar-mark' }, h(Whale, { size: 26 })),
        h(
          'div',
          { className: 'dsc-msg-body' },
          hasReasoning ? h(Reasoning, { text: message.reasoning, seconds: message.reasoningSeconds || 0, live: streaming && !hasContent }) : null,
          streaming && !hasContent && !hasReasoning ? h('div', { className: 'dsc-typing' }, h('i', null), h('i', null), h('i', null)) : null,
          hasContent
            ? h('div', { className: 'dsc-md' },
              renderMarkdown(message.content),
              streaming ? h('span', { className: 'dsc-caret', 'aria-hidden': 'true' }) : null)
            : null,
          Array.isArray(message.tools) && message.tools.length > 0 ? h(ToolsNote, { tools: message.tools }) : null,
          citations.length > 0
            ? h(
              'div',
              { className: 'dsc-citations' },
              h('div', { className: 'dsc-citations-title' }, tr('citations.title')),
              h('ol', null, citations.map(function citation(item, index) {
                return h('li', { key: item.url + index }, h('a', { href: item.url, target: '_blank', rel: 'noreferrer', title: item.url }, item.title));
              }))
            )
            : null,
          note !== '' ? h('div', { className: 'dsc-status-note' }, h(Icon, { name: 'alert', size: 13 }), note) : null,
          message.error ? h(
            'div',
            { className: 'dsc-error' },
            h('div', { className: 'dsc-error-title' }, h(Icon, { name: 'alert', size: 14 }), tr('message.error')),
            h('div', { className: 'dsc-error-body' }, message.error)
          ) : null,
          !streaming && (hasContent || message.error) ? h(
            'div',
            { className: 'dsc-msg-actions' },
            hasContent ? h(IconButton, { title: copied ? tr('message.copied') : tr('message.copy'), onClick: copyMessage }, h(Icon, { name: copied ? 'check' : 'copy', size: 15 })) : null,
            props.onRegenerate ? h(IconButton, { title: tr('message.regenerate'), onClick: props.onRegenerate }, h(Icon, { name: 'refresh', size: 15 })) : null
          ) : null
        )
      );
    }

    const MessageRowView = React.memo(MessageRow, function sameMessage(prev, next) {
      const left = prev.message;
      const right = next.message;
      return left.id === right.id
        && left.content === right.content
        && left.reasoning === right.reasoning
        && left.reasoningSeconds === right.reasoningSeconds
        && left.status === right.status
        && left.error === right.error
        && left.stopped === right.stopped
        && (left.attachments || []).length === (right.attachments || []).length
        && (left.tools || []).length === (right.tools || []).length
        && (left.serverToolCalls || []).length === (right.serverToolCalls || []).length
        && (left.annotations || []).length === (right.annotations || []).length
        && prev.streaming === next.streaming
        && prev.revision === next.revision
        && Boolean(prev.onRegenerate) === Boolean(next.onRegenerate);
    });

    /* ================================================================== *
     * Composer
     * ================================================================== */

    function Composer(props) {
      const textareaRef = React.useRef(null);
      const composingRef = React.useRef(false);
      const fileRef = React.useRef(null);
      const [draft, setDraft] = React.useState('');
      const attachments = Array.isArray(props.attachments) ? props.attachments : [];

      React.useEffect(function resetOnChat() {
        setDraft('');
      }, [props.resetKey]);

      React.useEffect(function resize() {
        const element = textareaRef.current;
        if (!element) return;
        element.style.height = 'auto';
        element.style.height = Math.min(element.scrollHeight, 196) + 'px';
      }, [draft]);

      React.useEffect(function focusOnRequest() {
        if (props.focusSignal >= 0 && textareaRef.current) textareaRef.current.focus();
      }, [props.focusSignal]);

      function send() {
        const text = draft.trim();
        if (props.busy || props.uploading) return;
        if (text === '' && attachments.length === 0) return;
        if (props.onSend(text) === true) {
          setDraft('');
          if (textareaRef.current) textareaRef.current.focus();
        }
      }

      function onKeyDown(event) {
        if (event.key !== 'Enter' || event.shiftKey) return;
        if (event.nativeEvent && event.nativeEvent.isComposing) return;
        if (composingRef.current) return;
        event.preventDefault();
        send();
      }

      const thinking = props.thinking === true;
      const webSearch = props.webSearch === true;
      const canSend = !props.busy && !props.uploading && (draft.trim() !== '' || attachments.length > 0);
      return h(
        'div',
        { className: 'dsc-composer' + (props.welcome ? ' is-welcome' : '') },
        h(
          'div',
          { className: 'dsc-composer-card' + (props.busy ? ' is-busy' : '') },
          attachments.length > 0 || props.uploading
            ? h(
              'div',
              { className: 'dsc-pending' },
              props.uploading
                ? h(
                  'span',
                  { className: 'dsc-pending-chip is-busy' },
                  h(Spinner, { size: 12 }),
                  h('span', { className: 'dsc-pending-name' }, tr('attach.uploading', { name: props.uploading.name })),
                  h(IconButton, { title: tr('attach.cancel'), onClick: props.onCancelUpload }, h(Icon, { name: 'x', size: 13 }))
                )
                : null,
              attachments.map(function attachmentChip(attachment, index) {
                const meta = attachment.kind === 'ocr'
                  ? (attachment.pageCount ? tr('attach.pages', { n: attachment.pageCount }) : tr('attach.chars', { n: (attachment.ocrText || '').length }))
                  : formatSize(attachment.size);
                return h(
                  'span',
                  { key: (attachment.name || 'file') + '-' + index, className: 'dsc-pending-chip' },
                  attachment.dataUrl ? h('img', { className: 'dsc-attachment-thumb', src: attachment.dataUrl, alt: '', 'aria-hidden': 'true' }) : h(AttachIcon, { size: 12 }),
                  h('span', { className: 'dsc-pending-name', title: attachment.name }, attachment.name),
                  attachment.kind === 'ocr' ? h('em', { className: 'dsc-attachment-badge' }, 'OCR') : null,
                  meta ? h('em', null, meta) : null,
                  h(IconButton, { title: tr('attach.remove'), onClick: function remove() { props.onRemoveAttachment(index); } }, h(Icon, { name: 'x', size: 13 }))
                );
              })
            )
            : null,
          h('textarea', {
            ref: textareaRef,
            className: 'dsc-textarea',
            rows: 2,
            value: draft,
            placeholder: props.hasKey ? tr('composer.placeholder') : tr('composer.noKey'),
            'aria-label': tr('composer.placeholder'),
            onChange: function change(event) { setDraft(event.target.value); },
            onKeyDown: onKeyDown,
            onCompositionStart: function start() { composingRef.current = true; },
            onCompositionEnd: function end() { composingRef.current = false; },
          }),
          h(
            'div',
            { className: 'dsc-composer-tools' },
            h(
              'div',
              { className: 'dsc-tools-left' },
              h(
                'button',
                {
                  type: 'button',
                  className: 'dsc-chip' + (thinking ? ' is-on' : ''),
                  onClick: props.onToggleThinking,
                  title: tr('composer.thinking'),
                  'aria-pressed': thinking,
                },
                h(Icon, { name: 'bulb', size: 14 }),
                h('span', null, tr('composer.thinking'))
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dsc-chip' + (webSearch ? ' is-on' : ''),
                  onClick: props.onToggleSearch,
                  title: webSearch ? tr('composer.searchOn') : tr('composer.search'),
                  'aria-pressed': webSearch,
                },
                h(Icon, { name: 'globe', size: 14 }),
                h('span', null, tr('composer.search'))
              )
            ),
            h(
              'div',
              { className: 'dsc-tools-right' },
              h('input', {
                ref: fileRef,
                type: 'file',
                className: 'dsc-file-input',
                accept: '.pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.webp,.gif,.bmp,.tif,.tiff,.txt,.md,.markdown,.csv,.json,.xlsx,.xls,.epub,.mobi',
                onChange: function change(event) {
                  const file = event.target.files && event.target.files[0];
                  event.target.value = '';
                  if (file) props.onPickFile(file);
                },
                tabIndex: -1,
                'aria-hidden': 'true',
              }),
              h(IconButton, {
                title: tr('composer.attach'),
                onClick: function pick() { if (fileRef.current) fileRef.current.click(); },
                disabled: !!props.uploading,
              }, h(AttachIcon, { size: 17 })),
              props.busy
                ? h('button', { type: 'button', className: 'dsc-send is-stop', onClick: props.onStop, title: tr('composer.stop'), 'aria-label': tr('composer.stop') }, h(Icon, { name: 'stop', size: 14 }))
                : h('button', {
                  type: 'button',
                  className: 'dsc-send',
                  onClick: send,
                  disabled: !canSend,
                  title: tr('composer.send'),
                  'aria-label': tr('composer.send'),
                }, h(Icon, { name: 'send', size: 16 }))
            )
          )
        ),
        props.welcome ? null : h('div', { className: 'dsc-disclaimer' }, tr('composer.disclaimer'))
      );
    }

    /* ================================================================== *
     * Dialogs
     * ================================================================== */

    function Modal(props) {
      const boxRef = React.useRef(null);
      React.useEffect(function onKey() {
        const handler = function handler(event) {
          if (event.key === 'Escape') {
            props.onClose();
            return;
          }
          if (event.key !== 'Tab') return;
          const box = boxRef.current;
          if (!box) return;
          const nodes = Array.from(box.querySelectorAll('button:not([disabled]), input:not([type="hidden"]):not([type="file"]):not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href]'));
          if (nodes.length === 0) return;
          const first = nodes[0];
          const last = nodes[nodes.length - 1];
          if (event.shiftKey && (document.activeElement === first || !box.contains(document.activeElement))) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && (document.activeElement === last || !box.contains(document.activeElement))) {
            event.preventDefault();
            first.focus();
          }
        };
        document.addEventListener('keydown', handler);
        return function cleanup() { document.removeEventListener('keydown', handler); };
      }, [props.onClose]);
      React.useEffect(function focus() {
        const previous = document.activeElement;
        const box = boxRef.current;
        if (box) {
          const field = box.querySelector('input:not([type="hidden"]):not([type="file"]), textarea, select');
          if (field) field.focus();
        }
        return function restore() {
          if (previous && typeof previous.focus === 'function' && document.contains(previous)) {
            try { previous.focus(); } catch (error) { /* gone */ }
          }
        };
      }, []);
      return h(
        'div',
        { className: 'dsc-backdrop', onMouseDown: function backdrop(event) { if (event.target === event.currentTarget) props.onClose(); } },
        h(
          'div',
          { ref: boxRef, className: 'dsc-modal' + (props.wide ? ' is-wide' : ''), role: 'dialog', 'aria-modal': 'true', 'aria-label': props.title },
          h(
            'header',
            { className: 'dsc-modal-head' },
            h('div', null,
              h('h2', { className: 'dsc-modal-title' }, props.title),
              props.subtitle ? h('p', { className: 'dsc-modal-subtitle' }, props.subtitle) : null),
            h(IconButton, { title: tr('close'), onClick: props.onClose }, h(Icon, { name: 'x', size: 17 }))
          ),
          h('div', { className: 'dsc-modal-body' }, props.children),
          props.footer ? h('footer', { className: 'dsc-modal-foot' }, props.footer) : null
        )
      );
    }

    function Field(props) {
      return h(
        'label',
        { className: 'dsc-field' },
        h('span', { className: 'dsc-field-label' }, props.label),
        props.children,
        props.hint ? h('span', { className: 'dsc-field-hint' }, props.hint) : null
      );
    }

    function SettingsModal(props) {
      const settings = props.settings;
      const [apiKey, setApiKey] = React.useState('');
      const [showKey, setShowKey] = React.useState(false);
      const [clearKey, setClearKey] = React.useState(false);
      const [baseURL, setBaseURL] = React.useState(settings.baseURL || '');
      const [model, setModel] = React.useState(normalizeModelId(settings.model));
      const [models, setModels] = React.useState((settings.models && settings.models.length ? settings.models : DEFAULT_MODELS).join(', '));
      const [thinking, setThinking] = React.useState(settings.thinking === true);
      const [reasoningEffort, setReasoningEffort] = React.useState(normalizeEffort(settings.reasoningEffort));
      const [temperature, setTemperature] = React.useState(String(settings.temperature !== undefined ? settings.temperature : 1));
      const [systemPrompt, setSystemPrompt] = React.useState(settings.systemPrompt || '');
      const [saving, setSaving] = React.useState(false);
      const [checking, setChecking] = React.useState(false);
      const [check, setCheck] = React.useState(null);

      const dirty = apiKey.trim() !== ''
        || clearKey
        || baseURL.trim() !== String(settings.baseURL || '').trim()
        || model.trim() !== String(settings.model || '').trim()
        || models.trim() !== (settings.models || []).join(', ').trim()
        || thinking !== (settings.thinking === true)
        || reasoningEffort !== (settings.reasoningEffort || 'high')
        || Number(temperature) !== Number(settings.temperature)
        || systemPrompt !== String(settings.systemPrompt || '');

      function requestClose() {
        if (!dirty) { props.onClose(); return; }
        if (window.confirm(tr('settings.discard'))) props.onClose();
      }

      function save() {
        if (saving) return;
        setSaving(true);
        const patch = {
          baseURL: baseURL.trim(),
          model: normalizeModelId(model),
          models: models.split(',').map(function trim(value) { return value.trim(); }).filter(function keep(value) { return value !== ''; }),
          thinking: thinking,
          reasoningEffort: reasoningEffort,
          temperature: Number(temperature),
          systemPrompt: systemPrompt,
        };
        if (clearKey) patch.clearKey = true;
        else if (apiKey.trim() !== '') patch.apiKey = apiKey.trim();
        api('settings/save', patch).then(function done(data) {
          setSaving(false);
          props.onSaved(data.settings);
        }, function failed(error) {
          setSaving(false);
          setCheck({ kind: 'error', text: error.message || tr('toast.failed') });
        });
      }

      function test() {
        if (checking) return;
        setChecking(true);
        setCheck(null);
        api('models', { apiKey: apiKey.trim(), baseURL: baseURL.trim() }).then(function done(data) {
          setChecking(false);
          setCheck({ kind: 'ok', text: tr('settings.checkOk', { n: data.models.length }) });
          if (data.models.length > 0) {
            setModels(data.models.join(', '));
            if (model === '' || data.models.indexOf(model) < 0) setModel(data.models[0]);
          }
        }, function failed(error) {
          setChecking(false);
          setCheck({ kind: 'error', text: tr('settings.checkFail', { message: error.message }) });
        });
      }

      return h(
        Modal,
        {
          title: tr('settings.title'),
          subtitle: tr('settings.subtitle'),
          onClose: requestClose,
          footer: [
            h('button', { key: 'check', type: 'button', className: 'dsc-btn', onClick: test, disabled: checking }, checking ? tr('settings.checking') : tr('settings.check')),
            h('button', { key: 'save', type: 'button', className: 'dsc-btn is-primary', onClick: save, disabled: saving }, saving ? tr('settings.saving') : tr('settings.save')),
          ],
        },
        h(
          Field,
          { label: tr('settings.key'), hint: settings.hasKey ? tr('settings.keySaved', { hint: settings.keyHint }) : tr('settings.keyHint') },
          h(
            'div',
            { className: 'dsc-key-row' },
            h('input', {
              type: showKey ? 'text' : 'password',
              className: 'dsc-input',
              value: apiKey,
              placeholder: settings.hasKey ? '••••••••' : tr('settings.keyPlaceholder'),
              onChange: function change(event) { setApiKey(event.target.value); },
              autoComplete: 'off',
              spellCheck: false,
            }),
            h(IconButton, { title: showKey ? tr('settings.hide') : tr('settings.show'), onClick: function toggle() { setShowKey(!showKey); } }, h(Icon, { name: showKey ? 'eyeOff' : 'eye', size: 15 }))
          ),
          settings.hasKey ? h('label', { className: 'dsc-check-row' }, h('input', { type: 'checkbox', checked: clearKey, onChange: function change(event) { setClearKey(event.target.checked); } }), tr('settings.clearKey')) : null
        ),
        h(Field, { label: tr('settings.baseURL'), hint: tr('settings.baseURLHint') },
          h('input', { type: 'text', className: 'dsc-input', value: baseURL, onChange: function change(event) { setBaseURL(event.target.value); }, spellCheck: false })),
        h(Field, { label: tr('settings.model'), hint: tr('settings.modelHint') },
          h('input', { type: 'text', className: 'dsc-input', value: model, onChange: function change(event) { setModel(event.target.value); }, spellCheck: false })),
        h(Field, { label: tr('settings.models'), hint: tr('settings.modelsHint') },
          h('input', { type: 'text', className: 'dsc-input', value: models, onChange: function change(event) { setModels(event.target.value); }, spellCheck: false })),
        h(Field, { label: tr('settings.effort'), hint: tr('settings.effortHint') },
          h('select', { className: 'dsc-input', value: reasoningEffort, onChange: function change(event) { setReasoningEffort(event.target.value); } },
            h('option', { value: 'low' }, 'low'),
            h('option', { value: 'high' }, 'high'),
            h('option', { value: 'max' }, 'max'))),
        h('label', { className: 'dsc-check-row' },
          h('input', { type: 'checkbox', checked: thinking, onChange: function change(event) { setThinking(event.target.checked); } }),
          tr('settings.thinking')),
        h('p', { className: 'dsc-field-hint' }, tr('settings.thinkingHint') + ' ' + tr('settings.filesHint')),
        h(Field, { label: tr('settings.temperature') },
          h('div', { className: 'dsc-range-row' },
            h('input', { type: 'range', min: 0, max: 2, step: 0.1, value: temperature, onChange: function change(event) { setTemperature(event.target.value); } }),
            h('input', { type: 'number', className: 'dsc-input dsc-number', min: 0, max: 2, step: 0.1, value: temperature, onChange: function change(event) { setTemperature(event.target.value); } }))),
        h(Field, { label: tr('settings.system') },
          h('textarea', {
            className: 'dsc-input dsc-textarea-field',
            rows: 3,
            value: systemPrompt,
            placeholder: tr('settings.systemPlaceholder'),
            onChange: function change(event) { setSystemPrompt(event.target.value); },
          })),
        check ? h('p', { className: 'dsc-check is-' + check.kind }, check.text) : null
      );
    }

    function FileModal(props) {
      const file = props.file;
      const category = fileCategory(file);
      const qwen = props.apiMode === 'qwen';
      const options = [];
      if (qwen) {
        if (category === 'image') {
          options.push({ mode: 'image', label: tr('attach.image'), desc: tr('attach.imageDesc') });
          options.push({ mode: 'ocr', label: tr('attach.ocr'), desc: tr('attach.ocrDesc') });
        } else {
          options.push({ mode: 'text', label: tr('attach.text'), desc: tr('attach.textDesc') });
          options.push({ mode: 'ocr', label: tr('attach.ocr'), desc: tr('attach.ocrDesc') });
        }
      } else if (category === 'image') {
        options.push({ mode: 'image', label: tr('attach.image'), desc: tr('attach.imageDesc') });
        options.push({ mode: 'text', label: tr('attach.text'), desc: tr('attach.textDesc') });
        options.push({ mode: 'ocr', label: tr('attach.ocr'), desc: tr('attach.ocrDesc') });
      } else if (category === 'document') {
        options.push({ mode: 'text', label: tr('attach.text'), desc: tr('attach.textDesc') });
        options.push({ mode: 'rich', label: tr('attach.rich'), desc: tr('attach.richDesc') });
        options.push({ mode: 'ocr', label: tr('attach.ocr'), desc: tr('attach.ocrDesc') });
      } else {
        options.push({ mode: 'file', label: tr('attach.file'), desc: tr('attach.fileDesc') });
        options.push({ mode: 'ocr', label: tr('attach.ocr'), desc: tr('attach.ocrDesc') });
      }
      return h(
        Modal,
        {
          title: tr('attach.title'),
          subtitle: tr('attach.subtitle'),
          onClose: props.onClose,
          footer: [h('button', { key: 'cancel', type: 'button', className: 'dsc-btn', onClick: props.onClose }, tr('cancel'))],
        },
        h(
          'div',
          { className: 'dsc-file-pick' },
          h(
            'div',
            { className: 'dsc-file-summary' },
            h(AttachIcon, { size: 20 }),
            h('div', null,
              h('div', { className: 'dsc-file-name' }, file.name),
              h('div', { className: 'dsc-muted' }, formatSize(file.size) + (file.type ? ' · ' + file.type : '')))
          ),
          h(
            'div',
            { className: 'dsc-file-options' },
            options.map(function option(entry) {
              return h(
                'button',
                {
                  key: entry.mode,
                  type: 'button',
                  className: 'dsc-file-option',
                  onClick: function choose() { props.onChoose(entry.mode); },
                },
                h('span', { className: 'dsc-file-option-title' }, entry.label),
                h('span', { className: 'dsc-file-option-desc' }, entry.desc)
              );
            })
          ),
          h('p', { className: 'dsc-field-hint' }, tr('attach.uploadLimit'))
        )
      );
    }

    function ImportModal(props) {
      const [dragging, setDragging] = React.useState(false);
      const [reading, setReading] = React.useState('');
      const [parsed, setParsed] = React.useState(null);
      const [error, setError] = React.useState('');
      const [pasted, setPasted] = React.useState('');
      const [importing, setImporting] = React.useState(null);
      const [importedIds, setImportedIds] = React.useState([]);
      const [nextBatch, setNextBatch] = React.useState(0);
      const cancelledRef = React.useRef(false);
      const fileRef = React.useRef(null);
      const folderRef = React.useRef(null);

      function closeImport() {
        cancelledRef.current = true;
        if (importedIds.length > 0 && typeof props.onPartial === 'function') props.onPartial(importedIds.slice());
        props.onClose();
      }

      function resetProgress() {
        setImportedIds([]);
        setNextBatch(0);
      }

      function ingestText(text, label, preferJson) {
        setError('');
        setParsed(null);
        resetProgress();
        setReading(tr('import.parsing'));
        try {
          const conversations = parseJsonText(text);
          if (conversations.length === 0) throw new Error(tr('parse.json'));
          setParsed({ conversations: conversations, label: label || '' });
        } catch (jsonError) {
          if (preferJson) {
            setError(jsonError instanceof Error ? jsonError.message : tr('parse.json'));
            setReading('');
            return;
          }
          try {
            const conversations = parseMarkdownText(text, label || '');
            if (conversations.length === 0) throw new Error(tr('parse.markdown'));
            setParsed({ conversations: conversations, label: label || '' });
          } catch (markdownError) {
            setError(markdownError instanceof Error ? markdownError.message : tr('parse.json'));
          }
        }
        setReading('');
      }

      function ingestFile(file) {
        if (!file) return;
        setError('');
        setParsed(null);
        resetProgress();
        setReading(tr('import.parsing'));
        (async function read() {
          try {
            if (file.size > 300 * 1024 * 1024) throw new Error(tr('import.tooLarge'));
            const name = (file.name || '').toLowerCase();
            if (name.endsWith('.zip')) {
              const archive = await readZip(file);
              const conversations = await parseArchive(archive);
              setParsed({ conversations: conversations, label: file.name });
            } else {
              ingestText(await file.text(), file.name, name.endsWith('.json'));
            }
          } catch (readError) {
            setError(readError instanceof Error ? readError.message : String(readError));
          } finally {
            setReading('');
          }
        })();
      }

      function ingestFolder(fileList) {
        const files = Array.from(fileList || []);
        if (files.length === 0) return;
        setError('');
        setParsed(null);
        resetProgress();
        setReading(tr('import.parsing'));
        (async function read() {
          try {
            const conversations = await parseExportFolder(files);
            setParsed({ conversations: conversations, label: 'folder' });
          } catch (readError) {
            setError(readError instanceof Error ? readError.message : String(readError));
          } finally {
            setReading('');
          }
        })();
      }

      function importNow() {
        if (!parsed || importing) return;
        cancelledRef.current = false;
        const list = parsed.conversations;
        const collected = importedIds.slice();
        let index = nextBatch;
        setImporting({ done: index, total: list.length });
        (async function run() {
          try {
            while (index < list.length) {
              if (cancelledRef.current) return;
              const batch = list.slice(index, index + 6);
              const result = await api('import', { conversations: batch });
              if (cancelledRef.current) return;
              for (const row of result.imported) collected.push(row.id);
              index += batch.length;
              setNextBatch(index);
              setImportedIds(collected.slice());
              setImporting({ done: index, total: list.length });
            }
            if (cancelledRef.current) return;
            props.onImported(collected);
          } catch (importError) {
            if (cancelledRef.current) return;
            setNextBatch(index);
            setImportedIds(collected.slice());
            setError(tr('import.partial', { n: collected.length, message: importError instanceof Error ? importError.message : String(importError) }));
            setImporting(null);
            if (typeof props.onPartial === 'function') props.onPartial(collected.slice());
          }
        })();
      }

      const totalMessages = parsed
        ? parsed.conversations.reduce(function count(sum, conversation) { return sum + conversation.messages.length; }, 0)
        : 0;

      return h(
        Modal,
        {
          title: tr('import.title'),
          onClose: closeImport,
          wide: true,
          footer: [
            h('button', { key: 'cancel', type: 'button', className: 'dsc-btn', onClick: closeImport }, tr('cancel')),
            h('button', { key: 'import', type: 'button', className: 'dsc-btn is-primary', onClick: importNow, disabled: !parsed || !!importing }, importing ? tr('import.importing', { done: importing.done, total: importing.total }) : nextBatch > 0 ? tr('import.resume') : tr('import.button')),
          ],
        },
        h(
          'div',
          {
            className: 'dsc-drop' + (dragging ? ' is-dragging' : ''),
            onClick: function choose() { if (fileRef.current) fileRef.current.click(); },
            onDragOver: function over(event) { event.preventDefault(); setDragging(true); },
            onDragLeave: function leave() { setDragging(false); },
            onDrop: function drop(event) {
              event.preventDefault();
              setDragging(false);
              const file = event.dataTransfer && event.dataTransfer.files ? event.dataTransfer.files[0] : null;
              if (file) ingestFile(file);
            },
            role: 'button',
            tabIndex: 0,
            onKeyDown: function key(event) { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); if (fileRef.current) fileRef.current.click(); } },
          },
          h(Icon, { name: 'upload', size: 22 }),
          h('p', { className: 'dsc-drop-title' }, tr('import.drop')),
          h('p', { className: 'dsc-drop-hint' }, tr('import.formats')),
          h('input', {
            ref: fileRef,
            type: 'file',
            accept: '.zip,.json,.md,.markdown,.txt,application/zip,application/json,text/plain,text/markdown',
            style: { display: 'none' },
            onChange: function change(event) { const chosen = event.target.files && event.target.files[0]; event.target.value = ''; if (chosen) ingestFile(chosen); },
            onClick: function stop(event) { event.stopPropagation(); },
          })
        ),
        h(
          'div',
          { className: 'dsc-folder-row' },
          h('button', { type: 'button', className: 'dsc-btn', onClick: function chooseFolder() { if (folderRef.current) folderRef.current.click(); } }, tr('import.folder')),
          h('span', { className: 'dsc-muted' }, tr('import.folderHint')),
          h('input', {
            ref: folderRef,
            type: 'file',
            webkitdirectory: 'true',
            directory: 'true',
            multiple: true,
            style: { display: 'none' },
            onChange: function change(event) { ingestFolder(event.target.files); event.target.value = ''; },
          })
        ),
        reading !== '' ? h('p', { className: 'dsc-import-reading' }, h(Spinner, { size: 14 }), reading) : null,
        parsed
          ? h(
            'div',
            { className: 'dsc-import-result' },
            h('p', { className: 'dsc-import-count' }, tr('import.result', { n: parsed.conversations.length, m: totalMessages })),
            h('ul', { className: 'dsc-import-list' },
              parsed.conversations.slice(0, 8).map(function row(conversation, index) {
                return h('li', { key: index }, h('span', { className: 'dsc-import-name' }, conversation.title || tr('brand.newChat')), h('span', { className: 'dsc-muted' }, conversation.messages.length));
              })),
            parsed.conversations.length > 8 ? h('p', { className: 'dsc-muted' }, '+ ' + (parsed.conversations.length - 8)) : null,
            h('p', { className: 'dsc-muted' }, tr('import.note'))
          )
          : null,
        error !== '' ? h('p', { className: 'dsc-check is-error' }, error) : null,
        h(
          'details',
          { className: 'dsc-paste' },
          h('summary', null, tr('import.paste')),
          h('textarea', {
            className: 'dsc-input dsc-textarea-field',
            rows: 5,
            value: pasted,
            placeholder: tr('import.pastePlaceholder'),
            onChange: function change(event) { setPasted(event.target.value); },
          }),
          h('button', {
            type: 'button',
            className: 'dsc-btn',
            onClick: function parse() {
              if (pasted.trim() !== '') ingestText(pasted, 'paste', pasted.trim().charAt(0) === '{' || pasted.trim().charAt(0) === '[');
            },
            disabled: pasted.trim() === '',
          }, tr('import.parse'))
        )
      );
    }

    function RenameModal(props) {
      const [title, setTitle] = React.useState(props.title || '');
      function submit() {
        const next = title.trim();
        if (next === '') return;
        props.onSubmit(next);
      }
      return h(
        Modal,
        {
          title: tr('rename.title'),
          onClose: props.onClose,
          footer: [
            h('button', { key: 'cancel', type: 'button', className: 'dsc-btn', onClick: props.onClose }, tr('cancel')),
            h('button', { key: 'save', type: 'button', className: 'dsc-btn is-primary', onClick: submit, disabled: title.trim() === '' }, tr('settings.save')),
          ],
        },
        h('input', {
          type: 'text',
          className: 'dsc-input',
          value: title,
          placeholder: tr('rename.placeholder'),
          onChange: function change(event) { setTitle(event.target.value); },
          onKeyDown: function key(event) { if (event.key === 'Enter') submit(); },
        })
      );
    }

    function DeleteModal(props) {
      return h(
        Modal,
        {
          title: tr('delete.title'),
          onClose: props.onClose,
          footer: [
            h('button', { key: 'cancel', type: 'button', className: 'dsc-btn', onClick: props.onClose }, tr('cancel')),
            h('button', { key: 'delete', type: 'button', className: 'dsc-btn is-danger', onClick: props.onConfirm }, tr('delete.confirm')),
          ],
        },
        h('p', { className: 'dsc-modal-text' }, tr('delete.body', { title: props.title }))
      );
    }

    /* ================================================================== *
     * Import parsing
     * ================================================================== */

    function joined(message, type) {
      const parts = [];
      for (const fragment of message.fragments || []) {
        if (fragment && fragment.type === type && typeof fragment.content === 'string' && fragment.content.trim() !== '') parts.push(fragment.content);
      }
      return parts.join('\n');
    }

    function exportAttachments(message) {
      const list = [];
      for (const fragment of message.fragments || []) {
        if (!fragment || fragment.type !== 'FILE' || !Array.isArray(fragment.files)) continue;
        for (const file of fragment.files) {
          if (!file || typeof file.file_name !== 'string' || file.file_name === '') continue;
          list.push({
            name: file.file_name,
            size: Number.isFinite(file.file_size) ? file.file_size : 0,
            image: file.is_image === true,
          });
        }
      }
      return list;
    }

    function exportTools(message) {
      const tools = [];
      for (const fragment of message.fragments || []) {
        if (!fragment || typeof fragment !== 'object') continue;
        if (fragment.type === 'TOOL_SEARCH') {
          tools.push({
            type: 'search',
            queries: Array.isArray(fragment.queries) ? fragment.queries.filter(function text(value) { return typeof value === 'string'; }) : [],
            results: Array.isArray(fragment.results)
              ? fragment.results.map(function map(result) {
                return {
                  title: typeof result?.title === 'string' ? result.title : '',
                  url: typeof result?.url === 'string' ? result.url : '',
                  snippet: typeof result?.snippet === 'string' ? result.snippet : '',
                };
              })
              : [],
          });
        } else if (fragment.type === 'TOOL_OPEN') {
          if (typeof fragment.url !== 'string' || fragment.url === '') continue;
          tools.push({
            type: 'open',
            queries: typeof fragment.title === 'string' ? [fragment.title] : [],
            results: [{
              title: typeof fragment.title === 'string' ? fragment.title : fragment.url,
              url: fragment.url,
              snippet: typeof fragment.snippet === 'string' ? fragment.snippet : '',
            }],
          });
        } else if (fragment.type === 'READ_LINK' && Array.isArray(fragment.results)) {
          const results = fragment.results.map(function map(result) {
            return {
              title: typeof result?.title === 'string' ? result.title : '',
              url: typeof result?.url === 'string' ? result.url : '',
              snippet: '',
            };
          }).filter(function keep(result) { return result.title !== '' || result.url !== ''; });
          if (results.length > 0) tools.push({ type: 'read', queries: [], results: results });
        }
      }
      return tools;
    }

    function convertExportSession(file, row) {
      const tree = Array.isArray(file.messages) ? file.messages : [];
      const byId = new Map();
      for (const message of tree) {
        if (message && Number.isFinite(message.id)) byId.set(message.id, message);
      }
      let cursor = file.current_message_id !== undefined && file.current_message_id !== null ? byId.get(file.current_message_id) : undefined;
      if (!cursor && tree.length > 0) {
        cursor = tree.reduce(function latest(best, message) {
          if (!best) return message;
          return message && message.id > best.id ? message : best;
        }, null);
      }
      const chain = [];
      const seen = new Set();
      while (cursor && !seen.has(cursor.id)) {
        seen.add(cursor.id);
        chain.push(cursor);
        cursor = cursor.parent_id !== undefined && cursor.parent_id !== null ? byId.get(cursor.parent_id) : undefined;
      }
      chain.reverse();

      const messages = [];
      for (const node of chain) {
        const createdAt = timeValue(node.inserted_at);
        if (node.role === 'USER') {
          const content = joined(node, 'REQUEST');
          const attachments = exportAttachments(node);
          if (content.trim() === '' && attachments.length === 0) continue;
          messages.push({
            id: 'm' + node.id,
            role: 'user',
            content: content,
            reasoning: '',
            reasoningSeconds: 0,
            createdAt: createdAt,
            attachments: attachments,
            tools: [],
            status: '',
            exclude: false,
            error: '',
            stopped: false,
          });
          continue;
        }
        let content = joined(node, 'RESPONSE');
        if (content.trim() === '') content = joined(node, 'TEMPLATE_RESPONSE');
        const reasoning = joined(node, 'THINK');
        let reasoningSeconds = 0;
        for (const fragment of node.fragments || []) {
          if (fragment && fragment.type === 'THINK' && Number.isFinite(fragment.elapsed_secs)) reasoningSeconds += fragment.elapsed_secs;
        }
        const tools = exportTools(node);
        if (content.trim() === '' && reasoning.trim() === '' && tools.length === 0) continue;
        const status = typeof node.status === 'string' ? node.status : '';
        messages.push({
          id: 'm' + node.id,
          role: 'assistant',
          content: content,
          reasoning: reasoning,
          reasoningSeconds: reasoningSeconds,
          createdAt: createdAt,
          attachments: [],
          tools: tools,
          status: status,
          exclude: status !== '' && status !== 'FINISHED',
          error: '',
          stopped: false,
        });
      }

      if (messages.length === 0) return null;
      const firstUser = messages.find(function find(message) { return message.role === 'user' && message.content.trim() !== ''; });
      const title = typeof row?.title === 'string' && row.title.trim() !== ''
        ? row.title.trim()
        : typeof file.title === 'string' && file.title.trim() !== ''
          ? file.title.trim()
          : firstUser
            ? firstUser.content.replace(/\s+/g, ' ').trim().slice(0, 40)
            : tr('brand.newChat');
      const sourceId = String(file.id || (row && row.id) || '').replace(/[^A-Za-z0-9]/g, '');
      return {
        id: sourceId !== '' ? ('imp_' + sourceId).slice(0, 70) : stableId('imp_', title + '|' + messages.length),
        title: title,
        createdAt: timeValue(row && row.inserted_at || file.inserted_at),
        updatedAt: timeValue(row && row.updated_at || file.updated_at || file.inserted_at),
        model: 'deepseek-flash',
        imported: true,
        pinned: row?.pinned === true || file.pinned === true,
        source: 'deepseek-export',
        messages: messages,
      };
    }

    function normalizeRole(value) {
      const role = String(value || '').toLowerCase();
      if (role === 'assistant' || role === 'ai' || role === 'bot' || role === 'model' || role === 'gpt' || role === 'chatgpt' || role === 'deepseek' || role === '助手' || role === '回答') return 'assistant';
      if (role === 'system' || role === 'developer') return 'system';
      return 'user';
    }

    function normalizeMessage(raw) {
      if (!raw || typeof raw !== 'object') return null;
      const role = raw.is_user === true
        ? 'user'
        : raw.is_user === false
          ? 'assistant'
          : normalizeRole(raw.role !== undefined ? raw.role : raw.sender !== undefined ? raw.sender : raw.author);
      let content = '';
      const source = raw.content !== undefined ? raw.content : raw.text !== undefined ? raw.text : raw.message;
      if (typeof source === 'string') content = source;
      else if (Array.isArray(source)) {
        content = source.map(function part(entry) {
          if (typeof entry === 'string') return entry;
          if (entry && typeof entry.text === 'string') return entry.text;
          if (entry && typeof entry.content === 'string') return entry.content;
          return '';
        }).join('');
      } else if (source && typeof source === 'object' && typeof source.text === 'string') {
        content = source.text;
      }
      const reasoning = typeof raw.reasoning_content === 'string'
        ? raw.reasoning_content
        : typeof raw.reasoning === 'string' ? raw.reasoning : '';
      if (role === 'system') return null;
      if (content.trim() === '' && reasoning.trim() === '') return null;
      return {
        id: newId('m'),
        role: role,
        content: content,
        reasoning: reasoning,
        reasoningSeconds: 0,
        createdAt: timeValue(raw.createdAt !== undefined ? raw.createdAt : raw.created_at !== undefined ? raw.created_at : raw.inserted_at),
        attachments: [],
        tools: [],
        status: '',
        exclude: false,
        error: '',
        stopped: false,
      };
    }

    function conversationFromMessages(list, title, meta) {
      const messages = [];
      for (const entry of list) {
        const message = normalizeMessage(entry);
        if (message) messages.push(message);
      }
      if (messages.length === 0) return null;
      const firstUser = messages.find(function find(message) { return message.role === 'user' && message.content.trim() !== ''; });
      const resolvedTitle = typeof title === 'string' && title.trim() !== ''
        ? title.trim()
        : firstUser
          ? firstUser.content.replace(/\s+/g, ' ').trim().slice(0, 40)
          : tr('brand.newChat');
      return {
        id: stableId('imp_', resolvedTitle + '|' + messages.length + '|' + messages[0].content + '|' + messages[messages.length - 1].content),
        title: resolvedTitle,
        createdAt: meta && meta.createdAt ? meta.createdAt : messages[0].createdAt,
        updatedAt: meta && meta.updatedAt ? meta.updatedAt : messages[messages.length - 1].createdAt,
        model: 'deepseek-flash',
        imported: true,
        pinned: false,
        source: 'import',
        messages: messages,
      };
    }

    function conversationFromObject(raw) {
      if (!raw || typeof raw !== 'object') return null;
      if (Array.isArray(raw.messages) && raw.messages.some(function official(message) { return message && Array.isArray(message.fragments); })) {
        return convertExportSession(raw, null);
      }
      const list = Array.isArray(raw.messages)
        ? raw.messages
        : Array.isArray(raw.chat_messages)
          ? raw.chat_messages
          : Array.isArray(raw.history)
            ? raw.history
            : Array.isArray(raw.turns)
              ? raw.turns
              : null;
      if (!list) return null;
      return conversationFromMessages(list, raw.title !== undefined ? raw.title : raw.name, {
        createdAt: raw.createdAt !== undefined ? timeValue(raw.createdAt) : raw.created_at !== undefined ? timeValue(raw.created_at) : undefined,
        updatedAt: raw.updatedAt !== undefined ? timeValue(raw.updatedAt) : raw.updated_at !== undefined ? timeValue(raw.updated_at) : undefined,
      });
    }

    function parseJsonText(text) {
      let data;
      try { data = JSON.parse(text); } catch (error) { throw new Error(tr('parse.json')); }
      const conversations = [];
      if (Array.isArray(data)) {
        if (data.length === 0) throw new Error(tr('parse.json'));
        if (data.every(function message(item) { return item && typeof item === 'object' && (item.role !== undefined || item.sender !== undefined) && item.messages === undefined; })) {
          const conversation = conversationFromMessages(data, null, null);
          if (conversation) conversations.push(conversation);
        } else {
          for (const entry of data) {
            const conversation = conversationFromObject(entry);
            if (conversation) conversations.push(conversation);
          }
        }
      } else if (data && typeof data === 'object') {
        if (Array.isArray(data.conversations)) {
          for (const entry of data.conversations) {
            const conversation = conversationFromObject(entry);
            if (conversation) conversations.push(conversation);
          }
        } else if (Array.isArray(data.sessions)) {
          for (const entry of data.sessions) {
            const conversation = conversationFromObject(entry);
            if (conversation) conversations.push(conversation);
          }
        } else {
          const conversation = conversationFromObject(data);
          if (conversation) conversations.push(conversation);
        }
      }
      if (conversations.length === 0) throw new Error(tr('parse.json'));
      return conversations;
    }

    function parseMarkdownText(text, name) {
      const lines = String(text || '').replace(/\r\n?/g, '\n').split('\n');
      const heading = /^\s{0,3}#{1,6}\s*(user|you|human|assistant|ai|bot|deepseek|用户|我|提问|助手|回答)\s*$/i;
      const label = /^\s{0,3}(?:\*\*)?(user|you|human|assistant|ai|bot|deepseek|用户|我|提问|助手|回答)(?:\*\*)?\s*[:：]\s*(.*)$/i;
      const sections = [];
      let current = null;
      for (const line of lines) {
        const head = heading.exec(line);
        const inline = label.exec(line);
        if (head) {
          if (current) sections.push(current);
          current = { role: head[1].toLowerCase(), lines: [] };
        } else if (inline) {
          if (current) sections.push(current);
          current = { role: inline[1].toLowerCase(), lines: inline[2].trim() === '' ? [] : [inline[2]] };
        } else if (current) {
          current.lines.push(line);
        }
      }
      if (current) sections.push(current);
      if (sections.length === 0) throw new Error(tr('parse.markdown'));
      const messages = [];
      for (const section of sections) {
        const content = section.lines.join('\n').trim();
        if (content === '') continue;
        const role = /^(assistant|ai|bot|deepseek|助手|回答)$/i.test(section.role) ? 'assistant' : 'user';
        messages.push({
          id: newId('m'),
          role: role,
          content: content,
          reasoning: '',
          reasoningSeconds: 0,
          createdAt: now(),
          attachments: [],
          tools: [],
          status: '',
          exclude: false,
          error: '',
          stopped: false,
        });
      }
      if (messages.length === 0) throw new Error(tr('parse.markdown'));
      const firstUser = messages.find(function find(message) { return message.role === 'user'; });
      return [{
        id: stableId('imp_', (firstUser ? firstUser.content : name || '') + '|' + messages.length),
        title: firstUser ? firstUser.content.replace(/\s+/g, ' ').slice(0, 40) : (name || tr('brand.newChat')),
        createdAt: now(),
        updatedAt: now(),
        model: 'deepseek-flash',
        imported: true,
        pinned: false,
        source: 'markdown',
        messages: messages,
      }];
    }

    async function readZip(file) {
      const buffer = new Uint8Array(await file.arrayBuffer());
      const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
      const decoder = new TextDecoder('utf-8');
      let eocd = -1;
      const min = Math.max(0, buffer.length - 65557);
      for (let index = buffer.length - 22; index >= min; index -= 1) {
        if (view.getUint32(index, true) === 0x06054b50) { eocd = index; break; }
      }
      if (eocd < 0) throw new Error(tr('parse.zip'));
      const total = view.getUint16(eocd + 10, true);
      const offset0 = view.getUint32(eocd + 16, true);
      if (total === 0xffff || offset0 === 0xffffffff) throw new Error(tr('parse.bigArchive'));
      const entries = new Map();
      let offset = offset0;
      for (let index = 0; index < total; index += 1) {
        if (offset + 46 > buffer.length || view.getUint32(offset, true) !== 0x02014b50) throw new Error(tr('parse.zip'));
        const flags = view.getUint16(offset + 8, true);
        if ((flags & 0x1) !== 0) throw new Error(tr('parse.zip'));
        const method = view.getUint16(offset + 10, true);
        const compressedSize = view.getUint32(offset + 20, true);
        const nameLength = view.getUint16(offset + 28, true);
        const extraLength = view.getUint16(offset + 30, true);
        const commentLength = view.getUint16(offset + 32, true);
        const localOffset = view.getUint32(offset + 42, true);
        const name = decoder.decode(buffer.subarray(offset + 46, offset + 46 + nameLength));
        entries.set(name, { method: method, compressedSize: compressedSize, localOffset: localOffset });
        offset += 46 + nameLength + extraLength + commentLength;
      }

      async function readEntry(name) {
        const entry = entries.get(name);
        if (!entry) return null;
        if (entry.method !== 0 && entry.method !== 8) throw new Error(tr('parse.zip'));
        if (entry.method === 8 && typeof DecompressionStream !== 'function') throw new Error(tr('parse.inflate'));
        if (view.getUint32(entry.localOffset, true) !== 0x04034b50) throw new Error(tr('parse.zip'));
        const nameLength = view.getUint16(entry.localOffset + 26, true);
        const extraLength = view.getUint16(entry.localOffset + 28, true);
        const start = entry.localOffset + 30 + nameLength + extraLength;
        const data = buffer.subarray(start, start + entry.compressedSize);
        if (entry.method === 0) return decoder.decode(data);
        const stream = new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
        const inflated = new Uint8Array(await new Response(stream).arrayBuffer());
        return decoder.decode(inflated);
      }

      return { names: Array.from(entries.keys()), read: readEntry };
    }

    async function parseArchive(archive) {
      const manifestRaw = await archive.read('manifest.json');
      if (manifestRaw === null) throw new Error(tr('parse.manifest'));
      let manifest;
      try { manifest = JSON.parse(manifestRaw); } catch (error) { throw new Error(tr('parse.manifest')); }
      if (manifest.export_format_version !== 3) throw new Error(tr('parse.version'));
      const indexRaw = await archive.read('chat_session_index.json');
      if (indexRaw === null) throw new Error(tr('parse.index'));
      let index;
      try { index = JSON.parse(indexRaw); } catch (error) { throw new Error(tr('parse.index')); }
      const rows = Array.isArray(index) ? index : Array.isArray(index && index.sessions) ? index.sessions : [];
      if (rows.length === 0) throw new Error(tr('parse.empty'));
      rows.sort(function byUpdate(left, right) {
        return timeValue(right.updated_at !== undefined ? right.updated_at : right.inserted_at) - timeValue(left.updated_at !== undefined ? left.updated_at : left.inserted_at);
      });
      const conversations = [];
      for (const row of rows.slice(0, 2000)) {
        if (!row || typeof row.id !== 'string') continue;
        let raw = await archive.read('chat_sessions/' + row.id + '.json');
        if (raw === null) raw = await archive.read('chat_session_' + row.id + '.json');
        if (raw === null) continue;
        let file;
        try { file = JSON.parse(raw); } catch (error) { continue; }
        if (!file || !Array.isArray(file.messages)) continue;
        const conversation = convertExportSession(file, row);
        if (conversation && conversation.messages.length > 0) conversations.push(conversation);
      }
      if (conversations.length === 0) throw new Error(tr('parse.empty'));
      return conversations;
    }

    async function parseExportFolder(files) {
      const byPath = new Map();
      for (const file of files) {
        const relative = file.webkitRelativePath || file.name;
        byPath.set(relative.replace(/\\/g, '/'), file);
      }
      let indexFile = null;
      for (const [path, file] of byPath.entries()) {
        if (path.endsWith('/chat_session_index.json')) { indexFile = { path: path, file: file }; break; }
      }
      if (!indexFile) throw new Error(tr('parse.index'));
      const prefix = indexFile.path.slice(0, -'chat_session_index.json'.length);
      const manifestFile = byPath.get(prefix + 'manifest.json');
      if (manifestFile) {
        const manifest = JSON.parse(await manifestFile.text());
        if (manifest.export_format_version !== 3) throw new Error(tr('parse.version'));
      }
      const index = JSON.parse(await indexFile.file.text());
      const rows = Array.isArray(index) ? index : [];
      const conversations = [];
      for (const row of rows) {
        if (!row || typeof row.id !== 'string') continue;
        const file = byPath.get(prefix + 'chat_sessions/' + row.id + '.json');
        if (!file) continue;
        let session;
        try { session = JSON.parse(await file.text()); } catch (error) { continue; }
        const conversation = convertExportSession(session, row);
        if (conversation && conversation.messages.length > 0) conversations.push(conversation);
      }
      if (conversations.length === 0) throw new Error(tr('parse.empty'));
      return conversations;
    }

    /* ================================================================== *
     * App
     * ================================================================== */

    function Panel() {
      const localeRevisionValue = useLocaleRevision();
      const [booting, setBooting] = React.useState(true);
      const [bootError, setBootError] = React.useState('');
      const [settings, setSettings] = React.useState(null);
      const [profile, setProfile] = React.useState({ name: 'DeepSeek', avatar: '' });
      const [summaries, setSummaries] = React.useState([]);
      const [active, setActive] = React.useState(null);
      const [activeId, setActiveId] = React.useState(null);
      const [busy, setBusy] = React.useState(false);
      const [live, setLive] = React.useState(null);
      const [modal, setModal] = React.useState(null);
      const [toast, setToast] = React.useState('');
      const [focusSignal, setFocusSignal] = React.useState(0);
      const [model, setModel] = React.useState(DEFAULT_MODEL);
      const [thinking, setThinking] = React.useState(false);
      const [webSearch, setWebSearch] = React.useState(false);
      const [reasoningEffort, setReasoningEffort] = React.useState('high');
      const [apiMode, setApiMode] = React.useState('deepseek');
      const [pendingAttachments, setPendingAttachments] = React.useState([]);
      const [uploading, setUploading] = React.useState(null);
      const [attachFile, setAttachFile] = React.useState(null);
      const [collapsed, setCollapsed] = React.useState(false);
      const [mobileSidebar, setMobileSidebar] = React.useState(false);
      const [searchOpen, setSearchOpen] = React.useState(false);
      const [query, setQuery] = React.useState('');
      const [filterQuery, setFilterQuery] = React.useState('');
      const [accountMenu, setAccountMenu] = React.useState(false);
      const [menuId, setMenuId] = React.useState(null);

      const abortRef = React.useRef(null);
      const scrollRef = React.useRef(null);
      const rootRef = React.useRef(null);
      const toastTimerRef = React.useRef(null);
      const activeRef = React.useRef(null);
      const settingsRef = React.useRef(null);
      const modelRef = React.useRef(DEFAULT_MODEL);
      const thinkingRef = React.useRef(false);
      const webSearchRef = React.useRef(false);
      const reasoningEffortRef = React.useRef('high');
      const apiModeRef = React.useRef('deepseek');
      const pendingAttachmentsRef = React.useRef([]);
      const uploadAbortRef = React.useRef(null);

      activeRef.current = active;
      settingsRef.current = settings;
      modelRef.current = model;
      thinkingRef.current = thinking;
      webSearchRef.current = webSearch;
      reasoningEffortRef.current = reasoningEffort;
      apiModeRef.current = apiMode;
      pendingAttachmentsRef.current = pendingAttachments;

      React.useEffect(function restoreChrome() {
        try {
          setCollapsed(window.localStorage.getItem(COLLAPSED_KEY) === '1');
        } catch (error) {
          // Storage can be unavailable; defaults stay.
        }
      }, []);

      React.useEffect(function debounceQuery() {
        if (query === '') {
          setFilterQuery('');
          return undefined;
        }
        const timer = window.setTimeout(function applyQuery() { setFilterQuery(query); }, 140);
        return function cancel() { window.clearTimeout(timer); };
      }, [query]);

      function showToast(message) {
        setToast(message);
        if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
        toastTimerRef.current = window.setTimeout(function clear() { setToast(''); }, 2800);
      }

      function openSettingsModal() {
        if (!settingsRef.current) return;
        setAccountMenu(false);
        setModal({ kind: 'settings' });
      }

      React.useEffect(function cleanup() {
        return function unmount() {
          if (abortRef.current) abortRef.current.abort();
          if (uploadAbortRef.current) uploadAbortRef.current.abort();
          if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
        };
      }, []);

      React.useEffect(function closeMenus() {
        function onPointer(event) {
          const target = event.target;
          if (!(target instanceof Element)) return;
          if (target.closest('.dsc-row-menu') || target.closest('.dsc-row-more')) return;
          if (target.closest('.dsc-account-menu') || target.closest('.dsc-account-main')) return;
          setMenuId(null);
          setAccountMenu(false);
        }
        document.addEventListener('mousedown', onPointer);
        return function cleanupMenus() { document.removeEventListener('mousedown', onPointer); };
      }, []);

      React.useEffect(function keepModelValid() {
        if (!settings) return;
        const list = Array.isArray(settings.models) && settings.models.length > 0 ? settings.models.map(normalizeModelId) : DEFAULT_MODELS;
        const normalized = normalizeModelId(model);
        if (model !== normalized) setCurrentModel(normalized);
        else if (list.length > 0 && list.indexOf(model) < 0) setCurrentModel(normalizeModelId(settings.model));
      }, [settings, model]);

      function setCurrentModel(next) {
        const normalized = normalizeModelId(next);
        setModel(normalized);
        try { window.localStorage.setItem(MODEL_KEY, normalized); } catch (error) { /* ignore */ }
      }

      function toggleThinking() {
        const next = !thinkingRef.current;
        setThinking(next);
        try { window.localStorage.setItem(THINKING_KEY, next ? '1' : '0'); } catch (error) { /* ignore */ }
      }

      function toggleWebSearch() {
        const next = !webSearchRef.current;
        setWebSearch(next);
        if (next && apiModeRef.current === 'deepseek' && normalizeModelId(modelRef.current) !== 'deepseek-flash') {
          setCurrentModel('deepseek-flash');
          showToast(tr('model.flashOnly'));
        }
        try { window.localStorage.setItem(SEARCH_KEY, next ? '1' : '0'); } catch (error) { /* ignore */ }
      }

      function toggleCollapsed() {
        const next = !collapsed;
        setCollapsed(next);
        setMobileSidebar(false);
        try { window.localStorage.setItem(COLLAPSED_KEY, next ? '1' : '0'); } catch (error) { /* ignore */ }
      }

      function toggleSidebar() {
        const element = rootRef.current;
        if (element && element.clientWidth <= 760) {
          setCollapsed(false);
          setMobileSidebar(!mobileSidebar);
          return;
        }
        toggleCollapsed();
      }

      function upsertSummary(summary) {
        setSummaries(function upsert(previous) {
          const next = previous.filter(function keep(row) { return row.id !== summary.id; });
          next.push(summary);
          next.sort(function byUpdated(left, right) { return right.updatedAt - left.updatedAt; });
          return next;
        });
      }

      async function persist(conversation) {
        try {
          const data = await api('conversation/save', { conversation: conversation });
          upsertSummary(data.summary);
          return data.conversation;
        } catch (error) {
          showToast(error.message || tr('toast.failed'));
          return null;
        }
      }

      async function openConversation(id) {
        if (busy) { showToast(tr('toast.busy')); return; }
        if (uploadAbortRef.current) uploadAbortRef.current.abort();
        setUploading(null);
        setAttachFile(null);
        setPendingAttachments([]);
        try {
          const data = await api('conversation/get', { id: id });
          setActive(data.conversation);
          setActiveId(id);
          setMobileSidebar(false);
          setMenuId(null);
          if (!data.conversation.imported && data.conversation.model) setCurrentModel(data.conversation.model);
          setFocusSignal(function bump(value) { return value + 1; });
        } catch (error) {
          showToast(error.message || tr('toast.failed'));
          refreshList();
        }
      }

      async function refreshList() {
        try {
          const data = await api('conversation/list');
          setSummaries(data.conversations);
        } catch (error) {
          // Keep the current list.
        }
      }

      React.useEffect(function bootstrap() {
        let cancelled = false;
        (async function load() {
          try {
            const data = await api('bootstrap');
            if (cancelled) return;
            setSettings(data.settings);
            setProfile(data.profile || { name: 'DeepSeek', avatar: '' });
            setSummaries(data.conversations);
            setApiMode(data.settings.apiMode || 'deepseek');
            try {
              const savedModel = window.localStorage.getItem(MODEL_KEY);
              setModel(savedModel ? normalizeModelId(savedModel) : normalizeModelId(data.settings.model));
              const savedThinking = window.localStorage.getItem(THINKING_KEY);
              const legacyThinking = savedModel === 'deepseek-reasoner' || data.settings.model === 'deepseek-reasoner';
              setThinking(savedThinking === null ? (data.settings.thinking === true || legacyThinking) : savedThinking !== '0');
              const savedSearch = window.localStorage.getItem(SEARCH_KEY);
              setWebSearch(savedSearch === '1');
              const savedEffort = window.localStorage.getItem(EFFORT_KEY);
              setReasoningEffort(normalizeEffort(savedEffort || data.settings.reasoningEffort));
            } catch (error) {
              setModel(normalizeModelId(data.settings.model));
              setThinking(data.settings.thinking === true);
              setReasoningEffort(normalizeEffort(data.settings.reasoningEffort));
            }
            setBooting(false);
          } catch (error) {
            if (!cancelled) {
              setBootError(error.message || tr('toast.failed'));
              setBooting(false);
            }
          }
        })();
        return function stop() { cancelled = true; };
      }, []);

      React.useEffect(function scrollOnChange() {
        const element = scrollRef.current;
        if (!element) return;
        const near = element.scrollHeight - element.scrollTop - element.clientHeight < 260;
        if (near) element.scrollTop = element.scrollHeight;
      }, [active ? active.messages.length : 0, live ? live.content : '', live ? live.reasoning : '']);

      React.useEffect(function scrollOnSwitch() {
        const element = scrollRef.current;
        if (element) element.scrollTop = element.scrollHeight;
      }, [activeId]);

      function makeConversation() {
        const current = settingsRef.current;
        return {
          id: 'c_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
          title: tr('brand.newChat'),
          createdAt: now(),
          updatedAt: now(),
          model: normalizeModelId(modelRef.current),
          imported: false,
          pinned: false,
          source: 'panel',
          messages: [],
        };
      }

      function makeTitle(content) {
        const flat = String(content || '').replace(/\s+/g, ' ').trim();
        return flat === '' ? tr('brand.newChat') : flat.slice(0, 42);
      }

      async function runGeneration(conversation, existingController) {
        const current = settingsRef.current;
        if (!current) return;
        setBusy(true);
        const controller = existingController || new AbortController();
        abortRef.current = controller;
        if (controller.signal.aborted) {
          if (abortRef.current === controller) abortRef.current = null;
          setBusy(false);
          return;
        }
        const startedAt = now();
        setLive({ content: '', reasoning: '', startedAt: startedAt });
        let latest = { content: '', reasoning: '' };
        let lastPaint = 0;
        try {
          const result = await streamChat({
            conversation: conversation,
            model: modelRef.current,
            temperature: current.temperature,
            thinking: thinkingRef.current,
            webSearch: webSearchRef.current,
            reasoningEffort: reasoningEffortRef.current,
            apiMode: apiModeRef.current,
            systemPrompt: current.systemPrompt,
            signal: controller.signal,
            onProgress: function progress(value) {
              latest = value;
              const stamp = now();
              if (stamp - lastPaint > 55) {
                lastPaint = stamp;
                setLive({ content: value.content, reasoning: value.reasoning, startedAt: startedAt });
              }
            },
          });
          const content = result.content;
          const reasoning = result.reasoning;
          const status = result.finishReason === 'content_filter' ? 'CONTENT_FILTER' : result.finishReason === 'length' ? 'INCOMPLETE' : 'FINISHED';
          if (String(content).trim() === '' && String(reasoning).trim() === '') {
            if (status === 'CONTENT_FILTER') {
              // Keep the refusal visible; it is excluded from later context.
            } else {
              throw new ApiError(tr('error.empty'), 'deepseek-chat/empty');
            }
          }
          setLive({ content: content || (status === 'CONTENT_FILTER' ? tr('status.refused') : ''), reasoning: reasoning, startedAt: startedAt });
          const assistant = {
            id: newId('m'),
            role: 'assistant',
            content: content || (status === 'CONTENT_FILTER' ? tr('status.refused') : ''),
            reasoning: reasoning,
            reasoningSeconds: reasoning ? Math.max(1, Math.round((now() - startedAt) / 1000)) : 0,
            createdAt: now(),
            attachments: [],
            tools: toolsFromServerCalls(result.serverToolCalls),
            serverToolCalls: result.serverToolCalls || [],
            annotations: result.annotations || [],
            status: status,
            exclude: status === 'CONTENT_FILTER',
            error: '',
            stopped: false,
          };
          const next = Object.assign({}, conversation, {
            messages: conversation.messages.concat([assistant]),
            model: normalizeModelId(modelRef.current),
            updatedAt: now(),
          });
          const saved = await persist(next);
          setActive(saved || next);
        } catch (error) {
          if (controller.signal.aborted) {
            if (String(latest.content).trim() !== '' || String(latest.reasoning).trim() !== '') {
              const assistant = {
                id: newId('m'),
                role: 'assistant',
                content: latest.content,
                reasoning: latest.reasoning,
                reasoningSeconds: latest.reasoning ? Math.max(1, Math.round((now() - startedAt) / 1000)) : 0,
                createdAt: now(),
                attachments: [],
                tools: [],
                serverToolCalls: [],
                annotations: [],
                status: 'WIP',
                exclude: true,
                error: '',
                stopped: true,
              };
              const next = Object.assign({}, conversation, {
                messages: conversation.messages.concat([assistant]),
                updatedAt: now(),
              });
              const saved = await persist(next);
              setActive(saved || next);
            }
            showToast(tr('toast.stopped'));
          } else {
            if (error && error.code === 'deepseek-chat/missing-key') openSettingsModal();
            const assistant = {
              id: newId('m'),
              role: 'assistant',
              content: latest.content || '',
              reasoning: latest.reasoning || '',
              reasoningSeconds: latest.reasoning ? Math.max(1, Math.round((now() - startedAt) / 1000)) : 0,
              createdAt: now(),
              attachments: [],
              tools: [],
              serverToolCalls: [],
              annotations: [],
              status: '',
              exclude: true,
              error: error && error.message ? error.message : tr('error.request'),
              stopped: false,
            };
            const next = Object.assign({}, conversation, {
              messages: conversation.messages.concat([assistant]),
              updatedAt: now(),
            });
            const saved = await persist(next);
            setActive(saved || next);
          }
        } finally {
          if (abortRef.current === controller) abortRef.current = null;
          setLive(null);
          setBusy(false);
        }
      }

      function submit(raw) {
        const textContent = String(raw === undefined || raw === null ? '' : raw).trim();
        const attachments = pendingAttachmentsRef.current.slice();
        if ((textContent === '' && attachments.length === 0) || busy || uploading) return false;
        const current = settingsRef.current;
        if (!current || !current.hasKey) {
          showToast(tr('toast.needKey'));
          openSettingsModal();
          return false;
        }
        const base = activeRef.current || makeConversation();
        const userMessage = {
          id: newId('m'),
          role: 'user',
          content: textContent,
          reasoning: '',
          reasoningSeconds: 0,
          createdAt: now(),
          attachments: attachments,
          tools: [],
          serverToolCalls: [],
          annotations: [],
          status: '',
          exclude: false,
          error: '',
          stopped: false,
        };
        const next = Object.assign({}, base, {
          title: base.messages.length === 0 ? makeTitle(textContent || attachments[0].name) : base.title,
          messages: base.messages.concat([userMessage]),
          model: normalizeModelId(modelRef.current),
          updatedAt: now(),
        });
        setActive(next);
        setActiveId(next.id);
        setPendingAttachments([]);
        setBusy(true);
        const controller = new AbortController();
        abortRef.current = controller;
        const usable = next.messages.filter(function sendable(message) {
          return (message.content.trim() !== '' || (message.attachments || []).some(function hasFile(item) { return item && (item.fileId || item.ocrText); })) && !message.exclude && !message.error;
        }).length;
        if (usable > 400) showToast(tr('toast.trimmed'));
        void (async function sendFlow() {
          const saved = await persist(next);
          if (saved) setActive(saved);
          if (controller.signal.aborted) {
            if (abortRef.current === controller) abortRef.current = null;
            showToast(tr('toast.stopped'));
            setBusy(false);
            return;
          }
          await runGeneration(saved || next, controller);
        })();
        return true;
      }

      function stop() {
        if (abortRef.current) abortRef.current.abort();
      }

      function chooseFile(file) {
        if (!file) return;
        const current = settingsRef.current;
        if (!current || !current.hasKey) {
          showToast(tr('toast.needKey'));
          openSettingsModal();
          return;
        }
        if (apiModeRef.current === 'deepseek' && normalizeModelId(modelRef.current) !== 'deepseek-flash') {
          setCurrentModel('deepseek-flash');
          showToast(tr('model.flashOnly'));
        }
        const category = fileCategory(file);
        const limit = fileLimitFor(category);
        if (file.size > limit) {
          showToast(tr('attach.tooLarge', { max: formatSize(limit) }));
          return;
        }
        if (category === 'text') {
          void startUpload(file, 'file');
          return;
        }
        setAttachFile(file);
      }

      async function startUpload(file, mode) {
        if (uploading) { showToast(tr('toast.busy')); return; }
        if (pendingAttachmentsRef.current.length >= 20) { showToast(tr('attach.tooMany')); return; }
        setAttachFile(null);
        const category = fileCategory(file);
        const qwen = apiModeRef.current === 'qwen';
        const controller = new AbortController();
        uploadAbortRef.current = controller;
        setUploading({ name: file.name, mode: mode });
        try {
          if (qwen && category === 'image' && mode === 'image') {
            if (file.size > 8 * 1024 * 1024) {
              throw new Error(tr('attach.tooLarge', { max: '8 MB' }));
            }
            const dataUrl = await readAsDataUrl(file);
            const attachment = {
              name: file.name,
              size: file.size,
              mime: file.type || '',
              kind: 'image',
              purpose: 'user_data',
              fileId: '',
              pageCount: 0,
              ocrText: '',
              text: '',
              dataUrl: dataUrl,
            };
            setPendingAttachments(function add(previous) { return previous.concat([attachment]); });
            showToast(tr('attach.uploaded', { name: file.name }));
          } else if (mode === 'ocr' || (qwen && category === 'image')) {
            const result = await uploadApi('ocr', file, 'text_recognition', controller.signal);
            const pages = Array.isArray(result.pages) ? result.pages : [];
            const ocrText = joinOcrPages(pages).trim();
            if (ocrText === '') throw new Error(tr('error.ocr'));
            const pageCount = Number.isFinite(result.page_count) ? result.page_count : pages.length;
            const attachment = {
              name: file.name,
              size: file.size,
              mime: file.type || '',
              kind: 'ocr',
              purpose: '',
              fileId: '',
              pageCount: pageCount,
              ocrText: ocrText,
              text: '',
            };
            setPendingAttachments(function add(previous) { return previous.concat([attachment]); });
            showToast(tr('attach.ocrDone', { name: file.name, pages: pageCount }));
          } else if (qwen) {
            const result = await uploadApi('files/upload', file, 'file-extract', controller.signal);
            if (!result || typeof result.text !== 'string' || result.text.trim() === '') throw new Error(tr('error.upload'));
            const attachment = {
              name: typeof result.filename === 'string' && result.filename !== '' ? result.filename : file.name,
              size: Number.isFinite(result.bytes) ? result.bytes : file.size,
              mime: file.type || '',
              kind: 'file',
              purpose: 'file-extract',
              fileId: '',
              pageCount: 0,
              ocrText: '',
              text: result.text,
            };
            setPendingAttachments(function add(previous) { return previous.concat([attachment]); });
            showToast(tr('attach.fileParsed', { name: attachment.name }));
          } else {
            const purpose = mode === 'rich' ? 'rich_layout_recognition' : mode === 'text' ? 'text_recognition' : 'user_data';
            const result = await uploadApi('files/upload', file, purpose, controller.signal);
            if (!result || typeof result.id !== 'string' || result.id === '') throw new Error(tr('error.upload'));
            const attachment = {
              name: typeof result.filename === 'string' && result.filename !== '' ? result.filename : file.name,
              size: Number.isFinite(result.bytes) ? result.bytes : file.size,
              mime: file.type || '',
              kind: category === 'image' && mode === 'image' ? 'image' : 'file',
              purpose: purpose,
              fileId: result.id,
              pageCount: 0,
              ocrText: '',
              text: '',
            };
            setPendingAttachments(function add(previous) { return previous.concat([attachment]); });
            showToast(tr('attach.uploaded', { name: attachment.name }));
          }
        } catch (error) {
          if (controller.signal.aborted) showToast(tr('error.aborted'));
          else showToast(tr('attach.failed', { message: error && error.message ? error.message : tr('error.upload') }));
        } finally {
          if (uploadAbortRef.current === controller) uploadAbortRef.current = null;
          setUploading(null);
        }
      }

      function cancelUpload() {
        if (uploadAbortRef.current) uploadAbortRef.current.abort();
      }

      function removeAttachment(index) {
        setPendingAttachments(function remove(previous) {
          return previous.filter(function keep(_item, itemIndex) { return itemIndex !== index; });
        });
      }

      async function regenerate() {
        if (busy) { showToast(tr('toast.busy')); return; }
        const current = activeRef.current;
        if (!current) return;
        const messages = current.messages.slice();
        while (messages.length > 0 && messages[messages.length - 1].role === 'assistant') messages.pop();
        if (!messages.some(function hasUser(message) { return message.role === 'user'; })) return;
        const trimmed = Object.assign({}, current, { messages: messages, updatedAt: now() });
        setActive(trimmed);
        setBusy(true);
        const controller = new AbortController();
        abortRef.current = controller;
        const saved = await persist(trimmed);
        if (saved) setActive(saved);
        await runGeneration(saved || trimmed, controller);
      }

      function newChat() {
        if (busy) { showToast(tr('toast.busy')); return; }
        if (uploadAbortRef.current) uploadAbortRef.current.abort();
        setUploading(null);
        setAttachFile(null);
        setPendingAttachments([]);
        setActive(null);
        setActiveId(null);
        setMobileSidebar(false);
        setAccountMenu(false);
        setMenuId(null);
        setSearchOpen(false);
        setQuery('');
        setFocusSignal(function bump(value) { return value + 1; });
      }

      async function deleteConversation(row) {
        setModal(null);
        try {
          await api('conversation/delete', { id: row.id });
          setSummaries(function drop(previous) { return previous.filter(function keep(item) { return item.id !== row.id; }); });
          if (activeRef.current && activeRef.current.id === row.id) {
            setActive(null);
            setActiveId(null);
          }
          showToast(tr('toast.deleted'));
        } catch (error) {
          showToast(error.message || tr('toast.failed'));
        }
      }

      async function renameConversation(id, title) {
        setModal(null);
        try {
          const data = await api('conversation/rename', { id: id, title: title });
          upsertSummary(data.summary);
          if (activeRef.current && activeRef.current.id === id) setActive(data.conversation);
        } catch (error) {
          showToast(error.message || tr('toast.failed'));
        }
      }

      async function pinConversation(row, pinned) {
        setMenuId(null);
        try {
          const data = await api('conversation/pin', { id: row.id, pinned: pinned });
          upsertSummary(data.summary);
          if (activeRef.current && activeRef.current.id === row.id) setActive(data.conversation);
        } catch (error) {
          showToast(error.message || tr('toast.failed'));
        }
      }

      function exportConversation(row) {
        setMenuId(null);
        const current = activeRef.current && activeRef.current.id === row.id ? activeRef.current : null;
        const run = async function runExport() {
          try {
            const conversation = current || (await api('conversation/get', { id: row.id })).conversation;
            const payload = {
              id: conversation.id,
              title: conversation.title,
              createdAt: conversation.createdAt,
              updatedAt: conversation.updatedAt,
              model: conversation.model,
              messages: conversation.messages.map(function plain(message) {
                return {
                  role: message.role,
                  content: message.content,
                  reasoning: message.reasoning,
                  reasoningSeconds: message.reasoningSeconds,
                  createdAt: message.createdAt,
                  status: message.status,
                  attachments: message.attachments,
                  serverToolCalls: message.serverToolCalls,
                  annotations: message.annotations,
                };
              }),
            };
            const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = (conversation.title || 'deepseek-chat').replace(/[\\/:*?"<>|]/g, '_') + '.json';
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.setTimeout(function revoke() { URL.revokeObjectURL(url); }, 1000);
            showToast(tr('export.done'));
          } catch (error) {
            showToast(error.message || tr('toast.failed'));
          }
        };
        run();
      }

      function onSettingsSaved(nextSettings) {
        setSettings(nextSettings);
        setApiMode(nextSettings.apiMode || 'deepseek');
        setCurrentModel(nextSettings.model);
        setThinking(nextSettings.thinking === true);
        setReasoningEffort(normalizeEffort(nextSettings.reasoningEffort));
        try {
          window.localStorage.setItem(THINKING_KEY, nextSettings.thinking === true ? '1' : '0');
          window.localStorage.setItem(EFFORT_KEY, nextSettings.reasoningEffort || 'high');
        } catch (error) {
          // Storage can be unavailable.
        }
        setModal(null);
        showToast(nextSettings.hasKey ? tr('settings.saved') : tr('settings.savedNoKey'));
        setFocusSignal(function bump(value) { return value + 1; });
      }

      function onImported(ids) {
        setModal(null);
        showToast(tr('import.done', { n: ids.length }));
        refreshList().then(function refresh() {
          if (ids.length > 0) openConversation(ids[0]);
        });
      }

      function onPartialImport(ids) {
        if (!ids || ids.length === 0) return;
        refreshList();
      }

      const hasKey = !!(settings && settings.hasKey);
      const groupCacheRef = React.useRef({ summaries: null, filterQuery: null, revision: -1, groups: [] });
      if (groupCacheRef.current.summaries !== summaries || groupCacheRef.current.filterQuery !== filterQuery || groupCacheRef.current.revision !== localeRevisionValue) {
        groupCacheRef.current = { summaries: summaries, filterQuery: filterQuery, revision: localeRevisionValue, groups: buildGroups(summaries, filterQuery) };
      }
      const groups = groupCacheRef.current.groups;
      const liveMessage = live
        ? {
          id: 'live',
          role: 'assistant',
          content: live.content,
          reasoning: live.reasoning,
          reasoningSeconds: 0,
          createdAt: live.startedAt,
          attachments: [],
          tools: [],
          status: '',
          exclude: false,
          error: '',
          stopped: false,
        }
        : null;
      const canRegenerate = !!active && !busy && active.messages.some(function hasUser(message) { return message.role === 'user'; });

      let body;
      if (booting) {
        body = h('div', { className: 'dsc-boot' }, h(Spinner, { size: 20 }), tr('loading'));
      } else if (bootError !== '') {
        body = h('div', { className: 'dsc-boot' },
          h(Icon, { name: 'alert', size: 20 }),
          h('p', null, bootError),
          h('button', { type: 'button', className: 'dsc-btn', onClick: function retry() { window.location.reload(); } }, tr('retry')));
      } else {
        body = null;
      }

      return h('section',
        { className: 'dsc-root' + (collapsed ? ' is-collapsed' : ''), ref: rootRef },
        h('style', null, STYLES),
        mobileSidebar ? h('button', { type: 'button', className: 'dsc-scrim', 'aria-label': tr('close'), onClick: function close() { setMobileSidebar(false); } }) : null,
        collapsed ? null : h(SidebarView, {
          busy: busy,
          revision: localeRevisionValue,
          profile: profile,
          groups: groups,
          query: query,
          searchOpen: searchOpen,
          activeId: activeId,
          menuId: menuId,
          accountOpen: accountMenu,
          mobileOpen: mobileSidebar,
          onQuery: function change(value) { setQuery(value); },
          onToggleSearch: function toggle() {
            if (searchOpen) {
              setQuery('');
              setSearchOpen(false);
            } else {
              setSearchOpen(true);
            }
          },
          onCollapse: toggleCollapsed,
          onNewChat: newChat,
          onOpen: openConversation,
          onMenu: function menu(id) { setMenuId(menuId === id ? null : id); setAccountMenu(false); },
          onPin: function pin(row) { pinConversation(row, !row.pinned); },
          onRename: function rename(row) { setModal({ kind: 'rename', row: row }); },
          onDelete: function remove(row) { setModal({ kind: 'delete', row: row }); },
          onExport: exportConversation,
          onAccountMenu: function toggleAccount() { setAccountMenu(!accountMenu); setMenuId(null); },
          onSettings: openSettingsModal,
          onImport: function openImport() { setAccountMenu(false); setModal({ kind: 'import' }); },
        }),
        h(
          'div',
          { className: 'dsc-main' },
          body
            ? body
            : [
              h(
                'header',
                { key: 'top', className: 'dsc-top' },
                h(IconButton, { title: collapsed ? tr('brand.expand') : tr('brand.collapse'), onClick: toggleSidebar }, h(SidebarLines, { size: 18 })),
                h('div', { className: 'dsc-top-spacer' }),
                h(IconButton, { title: tr('brand.newChat'), onClick: newChat }, h(NewChatIcon, { size: 18 }))
              ),
              h(
                'div',
                { key: 'body', className: 'dsc-body' },
                active
                  ? h(
                    'div',
                    { className: 'dsc-scroll', ref: scrollRef },
                    h(
                      'div',
                      { className: 'dsc-thread' },
                      active.messages.map(function render(message, index) {
                        const isLast = index === active.messages.length - 1;
                        return h(MessageRowView, {
                          key: message.id,
                          message: message,
                          revision: localeRevisionValue,
                          onRegenerate: canRegenerate && isLast ? regenerate : null,
                        });
                      }),
                      liveMessage ? h(MessageRowView, { key: 'live', message: liveMessage, streaming: true, revision: localeRevisionValue }) : null
                    )
                  )
                  : h(
                    'div',
                    { className: 'dsc-welcome' },
                    hasKey ? null : h(
                      'div',
                      { className: 'dsc-key-banner' },
                      h(Icon, { name: 'key', size: 16 }),
                      h('span', null, tr('welcome.keyTitle')),
                      h('button', { type: 'button', className: 'dsc-btn is-small', onClick: openSettingsModal }, tr('welcome.keyAction'))
                    ),
                    h('div', { className: 'dsc-greeting' }, h(Whale, { size: 35 }), h('span', null, tr('welcome.greeting'))),
                    h(Composer, {
                      welcome: true,
                      resetKey: 'welcome',
                      onSend: function send(text) { return submit(text); },
                      onStop: stop,
                      busy: busy,
                      hasKey: hasKey,
                      model: model,
                      thinking: thinking,
                      webSearch: webSearch,
                      onToggleThinking: toggleThinking,
                      onToggleSearch: toggleWebSearch,
                      attachments: pendingAttachments,
                      uploading: uploading,
                      onPickFile: chooseFile,
                      onRemoveAttachment: removeAttachment,
                      onCancelUpload: cancelUpload,
                      focusSignal: focusSignal,
                    })
                  ),
                active
                  ? h('div', { className: 'dsc-composer-wrap' },
                    h(Composer, {
                      resetKey: activeId || 'chat',
                      onSend: function send(text) { return submit(text); },
                      onStop: stop,
                      busy: busy,
                      hasKey: hasKey,
                      model: model,
                      thinking: thinking,
                      webSearch: webSearch,
                      onToggleThinking: toggleThinking,
                      onToggleSearch: toggleWebSearch,
                      attachments: pendingAttachments,
                      uploading: uploading,
                      onPickFile: chooseFile,
                      onRemoveAttachment: removeAttachment,
                      onCancelUpload: cancelUpload,
                      focusSignal: focusSignal,
                    }))
                  : null
              ),
            ],
          modal
            ? h(
              React.Fragment,
              { key: 'modal' },
              modal.kind === 'settings'
                ? h(SettingsModal, { settings: settings, onClose: function close() { setModal(null); }, onSaved: onSettingsSaved })
                : modal.kind === 'import'
                  ? h(ImportModal, { onClose: function close() { setModal(null); }, onImported: onImported, onPartial: onPartialImport })
                  : modal.kind === 'rename'
                    ? h(RenameModal, { title: modal.row.title, onClose: function close() { setModal(null); }, onSubmit: function save(title) { renameConversation(modal.row.id, title); } })
                    : modal.kind === 'delete'
                      ? h(DeleteModal, { title: modal.row.title, onClose: function close() { setModal(null); }, onConfirm: function confirm() { deleteConversation(modal.row); } })
                      : null
            )
            : null,
          attachFile
            ? h(FileModal, {
              key: 'attach',
              file: attachFile,
              apiMode: apiMode,
              onClose: function close() { setAttachFile(null); },
              onChoose: function choose(mode) { void startUpload(attachFile, mode); },
            })
            : null,
          toast !== '' ? h('div', { className: 'dsc-toast', role: 'status' }, toast) : null
        )
      );
    }

    /* ================================================================== *
     * Styles
     * ================================================================== */

    const STYLES = [
      '.dsc-root { --dsc-brand: #4d6bfe; --dsc-bg: var(--dsw-alias-bg-base, #ffffff); --dsc-side: var(--dsw-alias-bg-layer-1, #f9f9fb); --dsc-hover: var(--dsw-alias-bg-layer-2, #f2f3f5); --dsc-border: var(--dsw-alias-border-l1, #e8eaed); --dsc-text: var(--dsw-alias-label-primary, #0f1114); --dsc-muted: var(--dsw-alias-label-secondary, #6b7280); --dsc-bubble: color-mix(in srgb, var(--dsc-text) 8%, transparent); height: 100%; min-height: 0; display: flex; position: relative; overflow: hidden; background: var(--dsc-bg); color: var(--dsc-text); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; font-size: 14px; line-height: 1.55; container-type: inline-size; }',
      '.dsc-root *, .dsc-root *::before, .dsc-root *::after { box-sizing: border-box; }',
      '.dsc-root button, .dsc-root input, .dsc-root textarea { font: inherit; color: inherit; }',
      '.dsc-root ::selection { background: color-mix(in srgb, var(--dsc-brand) 24%, transparent); }',
      '.dsc-root ::-webkit-scrollbar { width: 6px; height: 6px; }',
      '.dsc-root ::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--dsc-muted) 26%, transparent); border-radius: 6px; }',
      '.dsc-root ::-webkit-scrollbar-track { background: transparent; }',

      /* sidebar */
      '.dsc-sidebar { width: 260px; flex: 0 0 260px; min-height: 0; display: flex; flex-direction: column; background: var(--dsc-side); border-right: 1px solid var(--dsc-border); }',
      '.dsc-side-head { height: 56px; flex: 0 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 0 12px 0 14px; }',
      '.dsc-logo { display: block; width: 143px; height: 23px; object-fit: contain; }',
      '.dsc-side-actions { display: flex; align-items: center; gap: 2px; }',
      '.dsc-search { display: flex; align-items: center; gap: 6px; margin: 0 10px 6px; padding: 6px 9px; border: 1px solid var(--dsc-border); border-radius: 9px; background: var(--dsc-bg); color: var(--dsc-muted); }',
      '.dsc-search input { flex: 1; min-width: 0; border: 0; outline: none; background: transparent; font-size: 13px; }',
      '.dsc-search input::placeholder { color: var(--dsc-muted); }',
      '.dsc-newchat { appearance: none; flex: 0 0 auto; height: 40px; margin: 2px 10px 6px; padding: 0 12px; display: flex; align-items: center; justify-content: center; gap: 6px; border: 0; border-radius: 10px; background: transparent; color: var(--dsc-text); font-size: 14px; font-weight: 500; cursor: pointer; }',
      '.dsc-newchat:hover { background: var(--dsc-hover); }',
      '.dsc-newchat:focus-visible { outline: 2px solid var(--dsc-brand); outline-offset: 1px; }',
      '.dsc-newchat-icon { display: inline-flex; color: var(--dsc-text); }',
      '.dsc-list { flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden; padding: 0 8px 8px; }',
      '.dsc-group { padding-top: 4px; }',
      '.dsc-group-label { position: sticky; top: 0; z-index: 2; padding: 8px 10px 4px; color: var(--dsc-muted); background: var(--dsc-side); font-size: 12px; line-height: 1.4; }',
      '.dsc-row { position: relative; display: flex; align-items: center; min-height: 34px; border-radius: 9px; content-visibility: auto; contain-intrinsic-size: 34px; }',
      '.dsc-row.is-menu-open { content-visibility: visible; z-index: 3; background: var(--dsc-hover); }',
      '.dsc-row.is-active .dsc-row-more, .dsc-row.is-menu-open .dsc-row-more { display: inline-flex; }',
      '.dsc-row:hover { background: var(--dsc-hover); }',
      '.dsc-row.is-active { background: var(--dsc-hover); }',
      '.dsc-row-main { appearance: none; flex: 1; min-width: 0; height: 34px; padding: 0 30px 0 10px; border: 0; border-radius: 9px; background: transparent; display: flex; align-items: center; text-align: left; cursor: pointer; }',
      '.dsc-row-main:focus-visible { outline: 2px solid var(--dsc-brand); outline-offset: -1px; }',
      '.dsc-row-title { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; }',
      '.dsc-row-more { appearance: none; position: absolute; right: 4px; width: 26px; height: 26px; display: none; align-items: center; justify-content: center; border: 0; border-radius: 7px; background: transparent; color: var(--dsc-muted); cursor: pointer; }',
      '.dsc-row:hover .dsc-row-more, .dsc-row:focus-within .dsc-row-more { display: inline-flex; }',
      '.dsc-row-more:hover { background: color-mix(in srgb, var(--dsc-text) 10%, transparent); color: var(--dsc-text); }',
      '.dsc-row-menu, .dsc-account-menu, .dsc-model-menu { position: absolute; z-index: 20; min-width: 168px; padding: 5px; border: 1px solid var(--dsc-border); border-radius: 11px; background: var(--dsc-bg); box-shadow: 0 10px 34px color-mix(in srgb, #000 18%, transparent); }',
      '.dsc-row-menu { top: 31px; right: 4px; }',
      '.dsc-row-menu button, .dsc-account-menu button, .dsc-model-menu button { appearance: none; width: 100%; border: 0; border-radius: 7px; background: transparent; color: var(--dsc-text); padding: 7px 9px; display: flex; align-items: center; gap: 8px; font-size: 13px; text-align: left; cursor: pointer; }',
      '.dsc-row-menu button:hover, .dsc-account-menu button:hover, .dsc-model-menu button:hover { background: var(--dsc-hover); }',
      '.dsc-row-menu button.is-danger { color: var(--dsw-alias-state-error-primary, #d93a3a); }',
      '.dsc-account { position: relative; flex: 0 0 auto; padding: 8px 10px 10px; border-top: 1px solid var(--dsc-border); }',
      '.dsc-account-main { appearance: none; width: 100%; height: 40px; padding: 0 8px; display: flex; align-items: center; gap: 8px; border: 0; border-radius: 9px; background: transparent; cursor: pointer; position: relative; }',
      '.dsc-account-main:hover { background: var(--dsc-hover); }',
      '.dsc-avatar-wrap { position: relative; width: 26px; height: 26px; flex: 0 0 auto; }',
      '.dsc-avatar { width: 26px; height: 26px; flex: 0 0 auto; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #6f8bff, #3c57e8); color: #fff; font-size: 12px; font-weight: 600; }',
      '.dsc-avatar-img { position: absolute; inset: 0; width: 26px; height: 26px; border-radius: 50%; object-fit: cover; }',
      '.dsc-account-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; text-align: left; }',
      '.dsc-account-more { display: inline-flex; color: var(--dsc-muted); }',
      '.dsc-account-menu { bottom: 58px; left: 10px; }',
      '.dsc-focus-ring { display: none; }',
      '.dsc-empty { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 36px 14px; text-align: center; color: var(--dsc-muted); }',
      '.dsc-empty-title { margin: 4px 0 0; color: var(--dsc-text); font-size: 13px; }',
      '.dsc-empty-hint { margin: 0; max-width: 190px; font-size: 12px; line-height: 1.5; }',

      /* main */
      '.dsc-main { flex: 1; min-width: 0; min-height: 0; display: flex; flex-direction: column; position: relative; background: var(--dsc-bg); }',
      '.dsc-top { flex: 0 0 auto; height: 56px; padding: 0 12px; display: flex; align-items: center; justify-content: space-between; gap: 4px; }',
      '.dsc-top-spacer { flex: 1; }',
      '.dsc-model-wrap { position: relative; }',
      '.dsc-model-btn { appearance: none; height: 32px; padding: 0 9px; display: inline-flex; align-items: center; gap: 4px; border: 0; border-radius: 8px; background: transparent; color: var(--dsc-text); font-size: 14px; font-weight: 500; cursor: pointer; }',
      '.dsc-model-btn:hover { background: var(--dsc-hover); }',
      '.dsc-model-menu { top: 36px; left: 0; min-width: 190px; }',
      '.dsc-model-menu button.is-active { color: var(--dsc-brand); }',
      '.dsc-model-menu button svg { margin-left: auto; }',
      '.dsc-title { flex: 1; min-width: 0; margin-left: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; color: var(--dsc-text); }',
      '.dsc-top-actions { display: flex; align-items: center; gap: 2px; }',
      '.dsc-icon-btn { appearance: none; width: 32px; height: 32px; padding: 0; display: inline-flex; align-items: center; justify-content: center; border: 0; border-radius: 8px; background: transparent; color: var(--dsc-muted); cursor: pointer; }',
      '.dsc-icon-btn:hover { background: var(--dsc-hover); color: var(--dsc-text); }',
      '.dsc-icon-btn:focus-visible { outline: 2px solid var(--dsc-brand); outline-offset: 1px; }',
      '.dsc-chevron { display: inline-flex; transition: transform 0.15s ease; }',
      '.dsc-chevron.is-open { transform: rotate(90deg); }',
      '.dsc-model-btn .dsc-chevron.is-open { transform: rotate(180deg); }',
      '.dsc-mobile-only { display: none; }',

      /* body */
      '.dsc-body { flex: 1; min-height: 0; display: flex; flex-direction: column; }',
      '.dsc-scroll { flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden; }',
      '.dsc-thread { width: 100%; max-width: 780px; margin: 0 auto; padding: 18px 28px 34px; display: flex; flex-direction: column; gap: 28px; }',
      '.dsc-welcome { flex: 1; min-height: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px 24px 10vh; }',
      '.dsc-key-banner { display: flex; align-items: center; gap: 8px; margin-bottom: 18px; padding: 8px 10px; border: 1px solid var(--dsc-border); border-radius: 10px; background: var(--dsc-side); color: var(--dsc-muted); font-size: 12px; }',
      '.dsc-greeting { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; color: var(--dsc-text); font-size: 16px; font-weight: 500; }',
      '.dsc-whale { display: block; object-fit: contain; }',
      '.dsc-composer { width: min(760px, calc(100% - 40px)); margin: 0 auto; }',
      '.dsc-composer-wrap { flex: 0 0 auto; width: 100%; padding: 2px 24px 14px; }',
      '.dsc-composer-card { border: 1px solid var(--dsc-border); border-radius: 24px; background: var(--dsc-bg); padding: 6px; box-shadow: 0 2px 10px color-mix(in srgb, #000 5%, transparent); transition: border-color 0.15s ease, box-shadow 0.15s ease; }',
      '.dsc-composer-card:focus-within { border-color: color-mix(in srgb, var(--dsc-brand) 45%, var(--dsc-border)); box-shadow: 0 3px 14px color-mix(in srgb, #000 7%, transparent); }',
      '.dsc-textarea { display: block; width: 100%; min-height: 54px; max-height: 196px; padding: 13px 14px 4px; border: 0; outline: none; background: transparent; resize: none; font-size: 15px; line-height: 1.6; }',
      '.dsc-textarea::placeholder { color: var(--dsc-muted); }',
      '.dsc-composer-tools { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 2px 7px 5px; }',
      '.dsc-tools-left { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; min-width: 0; }',
      '.dsc-tools-right { display: flex; align-items: center; gap: 4px; }',
      '.dsc-chip { appearance: none; display: inline-flex; align-items: center; gap: 5px; height: 30px; padding: 0 10px; border: 1px solid transparent; border-radius: 15px; background: transparent; color: var(--dsc-muted); font-size: 12.5px; cursor: pointer; white-space: nowrap; }',
      '.dsc-chip:hover { background: var(--dsc-hover); color: var(--dsc-text); }',
      '.dsc-chip.is-on { color: var(--dsc-brand); border-color: color-mix(in srgb, var(--dsc-brand) 35%, transparent); background: color-mix(in srgb, var(--dsc-brand) 9%, transparent); }',
      '.dsc-chip:focus-visible { outline: 2px solid var(--dsc-brand); outline-offset: 1px; }',
      '.dsc-send { appearance: none; width: 32px; height: 32px; padding: 0; display: inline-flex; align-items: center; justify-content: center; border: 0; border-radius: 50%; background: var(--dsc-brand); color: #fff; cursor: pointer; }',
      '.dsc-send:hover { filter: brightness(1.05); }',
      '.dsc-send:disabled { background: var(--dsc-hover); color: var(--dsc-muted); cursor: default; }',
      '.dsc-send.is-stop { background: var(--dsc-text); color: var(--dsc-bg); }',
      '.dsc-disclaimer { margin: 8px 0 0; text-align: center; color: var(--dsc-muted); font-size: 11px; }',
      '.dsc-file-input { display: none; }',
      '.dsc-pending { display: flex; flex-wrap: wrap; gap: 6px; padding: 8px 9px 2px; }',
      '.dsc-pending-chip { display: inline-flex; align-items: center; gap: 4px; max-width: 100%; min-height: 26px; padding: 2px 4px 2px 7px; border: 1px solid var(--dsc-border); border-radius: 8px; background: var(--dsc-side); color: var(--dsc-muted); font-size: 11.5px; }',
      '.dsc-pending-chip.is-busy { border-color: color-mix(in srgb, var(--dsc-brand) 32%, var(--dsc-border)); color: var(--dsc-brand); }',
      '.dsc-pending-name { max-width: 230px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
      '.dsc-pending-chip em { font-style: normal; opacity: 0.75; white-space: nowrap; }',
      '.dsc-pending-chip .dsc-icon-btn { width: 20px; height: 20px; }',

      /* messages */
      '.dsc-msg { display: flex; gap: 12px; min-width: 0; }',
      '.dsc-msg-user { justify-content: flex-end; flex-direction: column; align-items: flex-end; }',
      '.dsc-user-bubble { max-width: 82%; padding: 10px 14px; border-radius: 18px 18px 4px 18px; background: var(--dsc-bubble); font-size: 15px; line-height: 1.65; }',
      '.dsc-user-text { white-space: pre-wrap; overflow-wrap: anywhere; }',
      '.dsc-attachments { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 8px; }',
      '.dsc-attachment { display: inline-flex; align-items: center; gap: 4px; max-width: 260px; padding: 3px 7px; border: 1px solid var(--dsc-border); border-radius: 7px; background: var(--dsc-bg); color: var(--dsc-muted); font-size: 11.5px; }',
      '.dsc-attachment span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
      '.dsc-attachment em { font-style: normal; opacity: 0.7; }',
      '.dsc-attachment-thumb { width: 22px; height: 22px; flex: 0 0 auto; border-radius: 4px; object-fit: cover; }',
      '.dsc-attachment-badge { padding: 0 4px; border-radius: 4px; background: color-mix(in srgb, var(--dsc-brand) 12%, transparent); color: var(--dsc-brand) !important; font-size: 10px; font-weight: 600; opacity: 1 !important; }',
      '.dsc-attachment.is-ocr { border-color: color-mix(in srgb, var(--dsc-brand) 30%, var(--dsc-border)); }',
      '.dsc-ocr-details { width: min(82%, 640px); margin-top: 6px; padding: 7px 10px; border: 1px solid var(--dsc-border); border-radius: 9px; background: var(--dsc-side); color: var(--dsc-muted); font-size: 11.5px; }',
      '.dsc-ocr-details summary { cursor: pointer; color: var(--dsc-muted); }',
      '.dsc-ocr-details pre { max-height: 220px; margin: 6px 0 0; overflow: auto; white-space: pre-wrap; overflow-wrap: anywhere; font: inherit; font-size: 12px; line-height: 1.6; color: var(--dsc-text); }',
      '.dsc-msg-assistant { align-items: flex-start; }',
      '.dsc-avatar-mark { width: 28px; height: 28px; flex: 0 0 auto; display: flex; align-items: flex-start; justify-content: center; padding-top: 2px; }',
      '.dsc-msg-body { flex: 1; min-width: 0; padding-top: 1px; font-size: 15px; line-height: 1.75; }',
      '.dsc-msg-actions { display: flex; gap: 1px; margin-top: 4px; opacity: 0; transition: opacity 0.12s ease; }',
      '.dsc-msg:hover .dsc-msg-actions, .dsc-msg:focus-within .dsc-msg-actions { opacity: 1; }',
      '.dsc-msg-actions .dsc-icon-btn { width: 28px; height: 28px; }',
      '.dsc-status-note { display: flex; align-items: center; gap: 5px; margin-top: 8px; color: var(--dsw-alias-state-warn-primary, #b7791f); font-size: 12px; }',
      '.dsc-error { margin-top: 10px; padding: 9px 11px; border: 1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary, #d93a3a) 35%, transparent); border-radius: 9px; background: color-mix(in srgb, var(--dsw-alias-state-error-primary, #d93a3a) 7%, transparent); font-size: 13px; }',
      '.dsc-error-title { display: flex; align-items: center; gap: 5px; color: var(--dsw-alias-state-error-primary, #d93a3a); font-weight: 550; }',
      '.dsc-error-body { margin-top: 3px; color: var(--dsc-muted); overflow-wrap: anywhere; }',
      '.dsc-typing { display: inline-flex; gap: 4px; align-items: center; height: 24px; }',
      '.dsc-typing i { width: 5px; height: 5px; border-radius: 50%; background: var(--dsc-muted); animation: dsc-bounce 1.1s ease-in-out infinite; }',
      '.dsc-typing i:nth-child(2) { animation-delay: 0.12s; }',
      '.dsc-typing i:nth-child(3) { animation-delay: 0.24s; }',
      '@keyframes dsc-bounce { 0%, 70%, 100% { opacity: 0.35; transform: translateY(0); } 35% { opacity: 1; transform: translateY(-3px); } }',
      '.dsc-caret { display: inline-block; width: 7px; height: 16px; margin-left: 2px; border-radius: 1px; background: var(--dsc-text); vertical-align: -2px; animation: dsc-blink 1.05s steps(1) infinite; }',
      '@keyframes dsc-blink { 50% { opacity: 0; } }',
      '.dsc-spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid color-mix(in srgb, currentColor 28%, transparent); border-top-color: currentColor; border-radius: 50%; animation: dsc-spin 0.8s linear infinite; }',
      '@keyframes dsc-spin { to { transform: rotate(360deg); } }',

      /* reasoning + tools */
      '.dsc-reasoning { margin: 0 0 8px; }',
      '.dsc-reasoning-head { appearance: none; display: inline-flex; align-items: center; gap: 6px; padding: 4px 8px; border: 0; border-radius: 8px; background: var(--dsc-side); color: var(--dsc-muted); font-size: 12.5px; cursor: pointer; }',
      '.dsc-reasoning-head:hover { color: var(--dsc-text); background: var(--dsc-hover); }',
      '.dsc-reasoning-meta { font-size: 11.5px; }',
      '.dsc-reasoning-body { margin: 6px 0 0; padding: 8px 12px; border-left: 2px solid var(--dsc-border); color: var(--dsc-muted); font-size: 13.5px; line-height: 1.7; }',
      '.dsc-reasoning-body p { margin: 0 0 8px; white-space: pre-wrap; }',
      '.dsc-reasoning-body > *:last-child { margin-bottom: 0; }',
      '.dsc-tools { margin-top: 10px; }',
      '.dsc-tools-head { appearance: none; display: inline-flex; align-items: center; gap: 6px; padding: 4px 9px; border: 1px solid var(--dsc-border); border-radius: 14px; background: transparent; color: var(--dsc-muted); font-size: 12px; cursor: pointer; }',
      '.dsc-tools-head:hover { background: var(--dsc-hover); color: var(--dsc-text); }',
      '.dsc-tools-body { margin-top: 7px; padding: 8px 10px; border-radius: 9px; background: var(--dsc-side); display: flex; flex-direction: column; gap: 6px; }',
      '.dsc-citations { margin-top: 9px; padding: 8px 10px; border: 1px solid var(--dsc-border); border-radius: 9px; background: var(--dsc-side); font-size: 12px; }',
      '.dsc-citations-title { color: var(--dsc-muted); font-size: 11.5px; margin-bottom: 3px; }',
      '.dsc-citations ol { margin: 0; padding-left: 18px; }',
      '.dsc-citations li { margin: 2px 0; overflow-wrap: anywhere; }',
      '.dsc-citations a { color: var(--dsc-brand); text-decoration: none; }',
      '.dsc-citations a:hover { text-decoration: underline; }',
      '.dsc-tools-query { margin: 0; color: var(--dsc-muted); font-size: 12px; }',
      '.dsc-tools-link { display: flex; flex-direction: column; gap: 1px; padding: 4px 2px; color: var(--dsc-brand); text-decoration: none; font-size: 12.5px; }',
      '.dsc-tools-link:hover .dsc-tools-title { text-decoration: underline; }',
      '.dsc-tools-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
      '.dsc-tools-snippet { color: var(--dsc-muted); font-size: 11.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',

      /* markdown */
      '.dsc-md { overflow-wrap: anywhere; }',
      '.dsc-md > *:first-child { margin-top: 0; }',
      '.dsc-md > *:last-child { margin-bottom: 0; }',
      '.dsc-md-p { margin: 0 0 10px; white-space: pre-wrap; }',
      '.dsc-md-h { margin: 18px 0 8px; font-weight: 600; line-height: 1.4; }',
      'h1.dsc-md-h { font-size: 20px; }',
      'h2.dsc-md-h { font-size: 17px; }',
      'h3.dsc-md-h { font-size: 15.5px; }',
      'h4.dsc-md-h { font-size: 14px; }',
      '.dsc-md-list { margin: 0 0 10px; padding-left: 24px; }',
      '.dsc-md-list li { margin: 2px 0; }',
      '.dsc-md-quote { margin: 0 0 10px; padding: 1px 0 1px 12px; border-left: 3px solid var(--dsc-border); color: var(--dsc-muted); }',
      '.dsc-md-quote p { margin: 0; white-space: pre-wrap; }',
      '.dsc-md-hr { margin: 16px 0; border: 0; border-top: 1px solid var(--dsc-border); }',
      '.dsc-inline-code { padding: 1px 5px; border-radius: 5px; background: var(--dsc-side); font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.9em; }',
      '.dsc-code { margin: 4px 0 12px; border-radius: 10px; overflow: hidden; background: #1f2430; color: #e6edf3; }',
      '.dsc-code-head { display: flex; align-items: center; justify-content: space-between; padding: 6px 11px; background: #181c25; color: #9aa4b2; font-size: 11px; }',
      '.dsc-code-lang { text-transform: lowercase; }',
      '.dsc-code-copy { appearance: none; border: 0; background: transparent; color: inherit; font-size: 11px; padding: 2px 4px; border-radius: 4px; cursor: pointer; }',
      '.dsc-code-copy:hover { color: #fff; background: rgba(255,255,255,0.08); }',
      '.dsc-code-pre { margin: 0; padding: 12px; overflow: auto; }',
      '.dsc-code-pre code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 12.5px; line-height: 1.65; white-space: pre; }',
      '.dsc-table-wrap { margin: 0 0 12px; overflow: auto; border: 1px solid var(--dsc-border); border-radius: 8px; }',
      '.dsc-table { border-collapse: collapse; width: 100%; font-size: 13px; }',
      '.dsc-table th, .dsc-table td { padding: 6px 10px; border-bottom: 1px solid var(--dsc-border); text-align: left; vertical-align: top; }',
      '.dsc-table th { background: var(--dsc-side); font-weight: 600; }',
      '.dsc-table tr:last-child td { border-bottom: 0; }',

      /* buttons + dialogs */
      '.dsc-btn { appearance: none; display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 34px; padding: 0 13px; border: 1px solid var(--dsc-border); border-radius: 9px; background: var(--dsc-bg); color: var(--dsc-text); font-size: 13px; cursor: pointer; white-space: nowrap; }',
      '.dsc-btn:hover { background: var(--dsc-hover); }',
      '.dsc-btn:disabled { opacity: 0.5; cursor: default; }',
      '.dsc-btn.is-primary { border-color: var(--dsc-brand); background: var(--dsc-brand); color: #fff; }',
      '.dsc-btn.is-primary:hover { filter: brightness(1.05); }',
      '.dsc-btn.is-danger { border-color: var(--dsw-alias-state-error-primary, #d93a3a); background: var(--dsw-alias-state-error-primary, #d93a3a); color: #fff; }',
      '.dsc-btn.is-small { height: 28px; padding: 0 10px; font-size: 12px; }',
      '.dsc-input { width: 100%; height: 36px; padding: 0 10px; border: 1px solid var(--dsc-border); border-radius: 8px; outline: none; background: var(--dsc-bg); color: var(--dsc-text); font-size: 13px; }',
      '.dsc-input:focus { border-color: var(--dsc-brand); box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsc-brand) 12%, transparent); }',
      '.dsc-textarea-field { height: auto; min-height: 70px; padding: 8px 10px; resize: vertical; line-height: 1.55; }',
      '.dsc-number { width: 82px; flex: 0 0 auto; }',
      '.dsc-backdrop { position: fixed; inset: 0; z-index: 60; display: flex; align-items: center; justify-content: center; padding: 24px; background: color-mix(in srgb, #000 38%, transparent); }',
      '.dsc-modal { width: min(560px, 100%); max-height: min(86vh, 760px); display: flex; flex-direction: column; border: 1px solid var(--dsc-border); border-radius: 15px; background: var(--dsc-bg); box-shadow: 0 24px 70px color-mix(in srgb, #000 28%, transparent); overflow: hidden; }',
      '.dsc-modal.is-wide { width: min(660px, 100%); }',
      '.dsc-modal-head { flex: 0 0 auto; display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding: 15px 16px 12px; border-bottom: 1px solid var(--dsc-border); }',
      '.dsc-modal-title { margin: 0; font-size: 16px; font-weight: 600; }',
      '.dsc-modal-subtitle { margin: 2px 0 0; color: var(--dsc-muted); font-size: 12px; }',
      '.dsc-modal-body { flex: 1; min-height: 0; overflow-y: auto; padding: 16px; }',
      '.dsc-modal-foot { flex: 0 0 auto; display: flex; justify-content: flex-end; gap: 8px; padding: 11px 16px; border-top: 1px solid var(--dsc-border); }',
      '.dsc-modal-text { margin: 0; color: var(--dsc-muted); font-size: 13px; line-height: 1.6; }',
      '.dsc-field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }',
      '.dsc-field-label { font-size: 12.5px; font-weight: 550; }',
      '.dsc-field-hint { color: var(--dsc-muted); font-size: 11.5px; line-height: 1.5; }',
      '.dsc-file-pick { display: flex; flex-direction: column; gap: 14px; }',
      '.dsc-file-summary { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; background: var(--dsc-side); color: var(--dsc-brand); }',
      '.dsc-file-name { color: var(--dsc-text); font-size: 13px; font-weight: 550; overflow-wrap: anywhere; }',
      '.dsc-file-options { display: flex; flex-direction: column; gap: 8px; }',
      '.dsc-file-option { appearance: none; display: block; width: 100%; padding: 10px 12px; border: 1px solid var(--dsc-border); border-radius: 10px; background: var(--dsc-bg); text-align: left; cursor: pointer; }',
      '.dsc-file-option:hover { border-color: color-mix(in srgb, var(--dsc-brand) 40%, var(--dsc-border)); background: color-mix(in srgb, var(--dsc-brand) 4%, var(--dsc-bg)); }',
      '.dsc-file-option:focus-visible { outline: 2px solid var(--dsc-brand); outline-offset: 1px; }',
      '.dsc-file-option-title { display: block; color: var(--dsc-text); font-size: 13px; font-weight: 550; }',
      '.dsc-file-option-desc { display: block; margin-top: 2px; color: var(--dsc-muted); font-size: 12px; line-height: 1.5; }',
      '.dsc-key-row { display: flex; align-items: center; gap: 4px; }',
      '.dsc-check-row { display: inline-flex; align-items: center; gap: 6px; margin-top: 6px; color: var(--dsc-muted); font-size: 12px; }',
      '.dsc-range-row { display: flex; align-items: center; gap: 10px; }',
      '.dsc-range-row input[type="range"] { flex: 1; accent-color: var(--dsc-brand); }',
      '.dsc-check { margin: 4px 0 0; padding: 8px 10px; border-radius: 8px; font-size: 12px; }',
      '.dsc-check.is-ok { color: var(--dsw-alias-state-success-primary, #1d8a4a); background: color-mix(in srgb, var(--dsw-alias-state-success-primary, #1d8a4a) 9%, transparent); }',
      '.dsc-check.is-error { color: var(--dsw-alias-state-error-primary, #d93a3a); background: color-mix(in srgb, var(--dsw-alias-state-error-primary, #d93a3a) 8%, transparent); }',
      '.dsc-drop { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 26px 16px; border: 1.5px dashed var(--dsc-border); border-radius: 12px; text-align: center; color: var(--dsc-muted); cursor: pointer; }',
      '.dsc-drop:hover, .dsc-drop.is-dragging { border-color: var(--dsc-brand); background: color-mix(in srgb, var(--dsc-brand) 7%, transparent); }',
      '.dsc-drop-title { margin: 4px 0 0; color: var(--dsc-text); font-size: 13px; }',
      '.dsc-drop-hint { margin: 0; font-size: 11.5px; }',
      '.dsc-folder-row { display: flex; align-items: center; gap: 8px; margin-top: 12px; flex-wrap: wrap; }',
      '.dsc-import-reading { display: flex; align-items: center; gap: 6px; margin: 10px 0 0; color: var(--dsc-muted); font-size: 12px; }',
      '.dsc-import-result { margin-top: 12px; padding: 10px 12px; border: 1px solid var(--dsc-border); border-radius: 10px; background: var(--dsc-side); }',
      '.dsc-import-count { margin: 0 0 6px; font-size: 12.5px; font-weight: 550; }',
      '.dsc-import-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 3px; }',
      '.dsc-import-list li { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; font-size: 12px; }',
      '.dsc-import-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
      '.dsc-muted { margin: 4px 0 0; color: var(--dsc-muted); font-size: 11.5px; }',
      '.dsc-paste { margin-top: 10px; }',
      '.dsc-paste summary { cursor: pointer; color: var(--dsc-muted); font-size: 12px; padding: 4px 0; }',
      '.dsc-paste textarea { margin: 8px 0; }',
      '.dsc-boot { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 40px 24px; color: var(--dsc-muted); font-size: 13px; text-align: center; }',
      '.dsc-boot p { margin: 0; max-width: 420px; }',
      '.dsc-toast { position: fixed; left: 50%; bottom: 26px; z-index: 80; max-width: min(520px, 90vw); transform: translateX(-50%); padding: 9px 14px; border: 1px solid var(--dsc-border); border-radius: 10px; background: var(--dsc-bg); color: var(--dsc-text); font-size: 12.5px; box-shadow: 0 12px 34px color-mix(in srgb, #000 20%, transparent); }',
      '.dsc-scrim { display: none; }',
      '.dsc-root.is-collapsed .dsc-sidebar { display: none; }',

      /* responsive to the panel, not the viewport */
      '@container (max-width: 760px) {',
      '  .dsc-sidebar { position: absolute; inset: 0 auto 0 0; z-index: 30; width: 280px; flex-basis: 280px; transform: translateX(-102%); transition: transform 0.18s ease; box-shadow: 0 0 40px color-mix(in srgb, #000 22%, transparent); }',
      '  .dsc-sidebar.is-mobile-open { transform: none; }',
      '  .dsc-scrim { display: block; position: absolute; inset: 0; z-index: 25; border: 0; padding: 0; background: color-mix(in srgb, #000 30%, transparent); }',
      '  .dsc-mobile-only { display: inline-flex; }',
      '  .dsc-thread { padding: 14px 16px 28px; }',
      '  .dsc-composer-wrap { padding: 2px 14px 12px; }',
      '  .dsc-composer { width: calc(100% - 24px); }',
      '  .dsc-greeting { font-size: 15px; }',
      '  .dsc-welcome { padding-bottom: 6vh; }',
      '  .dsc-title { display: none; }',
      '}',
    ].join('\n');

    /* ================================================================== *
     * Plugin
     * ================================================================== */

    return {
      inject: ['slots', 'locale'],
      apply: function apply(ctx) {
        currentLocale = function activeLocale() {
          try { return ctx.locale.getLocale().active || 'zh'; } catch (error) { return 'zh'; }
        };
        translate = ctx.locale.bind(NS);

        const dictionaries = { en: EN, zh: ZH };
        const localeIds = ['en', 'en-US', 'en-GB', 'zh', 'zh-CN', 'zh-Hans', 'zh-TW', 'zh-HK', 'zh-Hant'];
        for (const localeId of localeIds) {
          const dictionary = localeId.toLowerCase().indexOf('zh') === 0 ? dictionaries.zh : dictionaries.en;
          ctx.effect(
            function registerDictionary() { return ctx.locale.register(NS, localeId, dictionary); },
            'deepseek-chat: ' + localeId + ' dictionary'
          );
        }

        ctx.effect(
          function watchLocale() {
            return ctx.locale.subscribe(function onLocaleChange() {
              localeRevision += 1;
              for (const listener of Array.from(localeListeners)) listener();
            });
          },
          'deepseek-chat: locale changes'
        );

        ctx.slots.inject('sidebar.panellist', function registerPanel() {
          return [
            ctx.slots.register(
              {
                name: 'sidebar.panellist',
                id: PANEL_ID,
                order: 25,
                label: function panelLabel() { return translate('nav.title'); },
              },
              PanelIcon
            ),
            ctx.slots.register({ name: 'main', key: PANEL_ID }, Panel),
          ];
        });
      },
    };
  },
});