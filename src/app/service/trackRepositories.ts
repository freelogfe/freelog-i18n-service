
// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
import path = require('path')
import fse = require('fs-extra')
import nodegit = require('nodegit')
import { provide, config, inject, Context } from 'midway'

// import { Repository } from 'nodegit'
import { INodegitConfig } from '../../interface/index'
import { INodegitService, IRepository, IRepositoryChanges } from '../../interface/nodegit'
import { IKeysInfoService } from '../../interface/keysInfo'
import { ITrackedRepositoriesService, IRepositoryResult, IReposDirResult } from '../../interface/trackRepositories'
import { IRepositoryInfoService, IRepositoryInfo } from '../../interface/repositoryInfo'

@provide('trackRepositoriesService')
export class TrackRepositoriesService implements ITrackedRepositoriesService {

  @config('nodegit')
  nodegitConfig: INodegitConfig

  @inject('nodegitService')
  nodegitService: INodegitService

  @inject('keysInfoService')
  kiService: IKeysInfoService

  @inject('repositoryInfoService')
  riService: IRepositoryInfoService

  @inject()
  ctx: Context

  async scanAllRepositories(): Promise<IRepositoryResult[]> {
    const i18nRepositoriesDirPath = path.resolve(process.cwd(), this.nodegitConfig.i18nRepositoriesDirPath)
    const result = []
    for (const repositoryName of fse.readdirSync(i18nRepositoriesDirPath)) {
      const tmpResult = await this.scanRepository(repositoryName)
      if (tmpResult !== null) {
        result.push(tmpResult)
      }
    }
    return result
  }

  async scanRepository(repositoryName: string): Promise<IRepositoryResult | null> {
    await this.kiService.ensureKeysInfoFile(repositoryName)
    const reposInfo = this.riService.getRepositoryInfo(repositoryName)
    if (reposInfo != null) {
      const checkResult = await this.nodegitService.checkRepository(repositoryName)
      if (!checkResult.isOK) {
        return null
      }
      let reposI18nDir = this.getRepositoryI18nDir(reposInfo, reposInfo.reposI18nPath)
      reposI18nDir = this.formatRepositoryI18nDir(repositoryName, reposI18nDir)
      const repositoryChanges = await this.getRepositoryChanges(repositoryName)
      return {
        repositoryName,
        repositoryUrl: reposInfo.reposUrl,
        repositoryI18nBranch: reposInfo.reposI18nBranch,
        directoryTree: reposI18nDir,
        repositoryChanges,
      }
    }
    return null
  }

  getRepositoryI18nDir(reposInfo: IRepositoryInfo, tragetDirPath: string): IReposDirResult[] {
    const { reposDirPath } = reposInfo
    const target: IReposDirResult[] = []
    const targetRegExp = new RegExp(`${reposDirPath}` + '(\/?)')
    for (const tmpName of fse.readdirSync(tragetDirPath)) {
      const tmpPath = path.join(tragetDirPath, tmpName)
      const stats = fse.statSync(tmpPath)
      if (stats.isDirectory()) {
        target.push({
          name: tmpName,
          path: tmpPath.replace(targetRegExp, ''),
          children: this.getRepositoryI18nDir(reposInfo, tmpPath),
        })
      } else if (stats.isFile() && /(\.json)$/.test(tmpName)) {
        const fileName = tmpName.replace(/(\.json)$/, '')
        if (fileName !== 'package' && fileName !== 'package-lock') {
          target.push({
            name: tmpName,
            fileName,
            path: tmpPath.replace(targetRegExp, ''),
          })
        }
      }
    }
    return target
  }

  formatRepositoryI18nDir(repositoryName: string, reposI18nDir: IReposDirResult[]): IReposDirResult[] {
    reposI18nDir = reposI18nDir.filter((_module: IReposDirResult) => _module.fileName == null)
    reposI18nDir.forEach((_module: IReposDirResult) => {
      _module.keys = [ repositoryName, _module.name ]
      _module.keysType = 'module'
      if (_module.children) {
        _module.children.forEach(lang => {
          lang.keys = [ repositoryName, _module.name, lang.name ]
          lang.keysType = 'language'
          if (lang.children) {
            lang.children.forEach(file => {
              file.keys = [ repositoryName, _module.name, lang.name ]
              if (file.fileName != null) {
                file.keys.push(file.fileName)
              }
              file.keysType = 'file'
              file.language = lang.name
            })
          }
        })
      }
    })
    return reposI18nDir
  }

  async getRepositoryChanges(repositoryName: string): Promise<IRepositoryChanges> {
    const repository = await this.nodegitService.openRepositoryByName(repositoryName)
    if (repository instanceof nodegit.Repository) {
      const repositoryChanges = await this.nodegitService.getChangesByStatus(repository)
      // repositoryChanges = repositoryStatusMap.saveChanges(repositoryName, [ ...repositoryChanges ])
      return repositoryChanges
    } else {
      return []
    }
  }

  async cloneAllTrackedRepositories(): Promise<void> {
    console.log('[Track Repositories]: start cloning!')
    interface IRItem {
      repositoryName: string
      repository: IRepository
    }
    const repositories: IRItem[] = []
    const { trackedRepositories } = this.nodegitConfig
    for (const repositoryName of Object.keys(trackedRepositories)) {
      const repository = await this.cloneTrackedRepository(repositoryName)
      repositories.push({ repositoryName, repository })
    }
    repositories.forEach(async ({ repositoryName, repository }) => {
      const reposInfo = this.riService.getRepositoryInfo(repositoryName)
      if (repository instanceof nodegit.Repository) {
        if (reposInfo != null) {
          await this.nodegitService.checkRemoteBranch(repository, reposInfo.reposI18nBranch)
        }
      }
    })
  }

  async cloneTrackedRepository(reposName: string): Promise<IRepository> {
    const reposInfo = this.riService.getRepositoryInfo(reposName)
    let repository: IRepository = null
    if (reposInfo != null) {
      const { reposDirPath } = reposInfo
      repository = await nodegit.Repository.open(reposDirPath).catch((e: Error) => e)
      if (repository instanceof nodegit.Repository) {
        console.log(`Repository '${reposName}' already exists!`)
      } else {
        if (fse.pathExistsSync(reposDirPath)) {
          fse.removeSync(reposDirPath)
        }
        repository = await this.nodegitService.cloneRepository(reposInfo, this.nodegitConfig.user)
      }
    }
    return repository
  }
}
