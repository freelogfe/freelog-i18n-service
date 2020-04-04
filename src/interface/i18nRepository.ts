import { PlainObject } from '.'
import { IRepositoryChanges, ICheckResult } from './nodegit'
import { IRepositoryResult } from './trackRepositories'

export interface II18nRepositorySerive {
  getAllI18nData(): Promise<PlainObject>
  getI18nDataByPath(): Promise<PlainObject>
  getI18nByDirPath(dirPath: string): PlainObject
  updateI18nData(): Promise<IRepositoryChanges>
  creaetNewModule(): Promise<IRepositoryResult[]>
  deleteModule(): Promise<IRepositoryResult[]>
  downloadI18nFile(): Promise<void>
  pullRepository(): Promise<IRepositoryChanges>
  commitAndPushChanges(): Promise<void>
  checkRepository(): Promise<ICheckResult>
}
