import { PlainObject } from './index'

export interface IKeysInfoService {
  getFilePath(repositoryName: string): Promise<string>
  ensureKeysInfoFile(repositoryName: string): Promise<void>
  readKeysInfoFile(repositoryName: string): Promise<PlainObject>
  getKeyInfo(repositoryName: string, moduleName: string, key: string): Promise<any>
  updateKeyInfo(repositoryName: string, moduleName: string, key: string, info: PlainObject): Promise<void>
}
