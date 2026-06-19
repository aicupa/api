export interface NpmPackageInfo {
  name: string
  description: string
  version: string
  publisher?: string
  date?: string
  downloads?: number
  npmLink?: string
}

export interface InstalledPlugin {
  name: string
  version: string
  description: string
  enabled: boolean
  hasView: boolean
  hasService: boolean
  path: string
}

export interface PluginInstallResult {
  ok: boolean
  error?: string
  plugin?: {
    name: string
    version: string
    description: string
    enabled: boolean
    path: string
  }
}

export interface PluginViewResult {
  ok: boolean
  error?: string
  html?: string
  viewDir?: string
}

export interface PluginServiceResult {
  ok: boolean
  error?: string
  result?: any
}

export interface PluginSelectDirResult {
  path: string
}

export interface PluginApi {
  reload(filePath?: string): void
  getTree(filePath?: string): Promise<any>
  relaunch(): void
  setTitle(title: string, filePath?: string): void
  store(key: string, value: any, filePath?: string): void
  getConfig(): any
  readFile(path: string): Promise<string>
  writeFile(path: string, content: string): Promise<void>
  readdir(dir: string): Promise<string[]>
  mkdir(dir: string): Promise<void>
  remove(path: string): Promise<void>
  pathJoin(...args: string[]): string
  mapTree: (tree: any, fn: (node: any) => any) => any
  isWindows: boolean
  getArray: (val: any) => any[]
  base64: {
    encode(str: any): string;
    decode(base64Str: any): string;
  }
  clipboard: {
    writeText(text: string): void
    readText(): string
  }
  fs: typeof import('fs')
  os: typeof import('os')
  path: typeof import('path')
  crypto: typeof import('crypto')
  fetch(url: string, options?: {
    method?: string
    headers?: Record<string, string>
    body?: string
    timeout?: number
  }): Promise<{
    ok: boolean
    status: number
    statusText: string
    headers: Record<string, string>
    body: string
  }>
}

export interface Plugin {
  [method: string]: (params?: any) => any | Promise<any>
}

export type PluginModule =
  | ((api: PluginApi) => Plugin | Promise<Plugin>)
  | { init?: (api: PluginApi) => void | Promise<void>; [method: string]: any }

export interface PluginContextMenuItem {
  title: string
  title_zh?: string
  command: string
}

export interface PluginEventPasteHandler {
  check: string
  handler: string
}

export interface PluginContributes {
  contextMenus?: PluginContextMenuItem[]
  events?: {
    paste?: PluginEventPasteHandler
  }
}

export interface PluginContributesResult {
  contextMenus: Array<
    PluginContextMenuItem & { pluginName: string }
  >
  pasteHandlers: Array<
    PluginEventPasteHandler & { pluginName: string }
  >
}

export interface PluginServiceMap {
  pluginList(params: {}): Promise<InstalledPlugin[]>
  pluginInstall(params: { name: string }): Promise<PluginInstallResult>
  pluginInstallLocal(params: { path: string }): Promise<PluginInstallResult>
  pluginUninstall(params: { name: string }): Promise<{ ok: boolean }>
  pluginEnable(params: { name: string }): Promise<{ ok: boolean }>
  pluginDisable(params: { name: string }): Promise<{ ok: boolean }>
  pluginSearch(params: { keyword?: string }): Promise<NpmPackageInfo[]>
  pluginGetView(params: { name: string }): Promise<PluginViewResult>
  pluginCallService(params: {
    name: string
    method: string
    params?: any
  }): Promise<PluginServiceResult>
  pluginSelectDir(params: {}): Promise<PluginSelectDirResult | null>
  pluginGetContributes(params: {}): Promise<PluginContributesResult>
}
