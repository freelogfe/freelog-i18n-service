// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
import path = require('path');
import { provide, config } from 'midway'
import { INodegitConfig } from '../../interface/index'
import { IRepositoryInfoService, IRepositoryInfoResult } from '../../interface/repositoryInfo'

@provide('repositoryInfoService')
export class RepositoryInfoService implements IRepositoryInfoService {

  @config('nodegit')
  nodegitConfig: INodegitConfig

  getRepositoryInfo(repositoryName: string): IRepositoryInfoResult {
    const { trackedRepositories, i18nRepositoriesDirPath } = this.nodegitConfig
    for (const reposName in trackedRepositories) {
      const { reposUrl, reposI18nPath, reposI18nBranch } = trackedRepositories[reposName]
      if (reposName === repositoryName) {
        const reposDirPath = path.resolve(process.cwd(), i18nRepositoriesDirPath, reposName)
        return {
          reposName,
          reposUrl,
          reposDirPath,
          reposI18nPath: path.join(reposDirPath, reposI18nPath),
          reposI18nBranch,
        }
      }
    }
    return null
  }
}
