import path = require('path')
import fse = require('fs-extra')
import objectPath = require('object-path')
import nodegit = require('nodegit')
import { provide, inject, Context, config } from 'midway'

import { INodegitConfig, PlainObject } from '../../interface'
import { II18nRepositorySerive } from '../../interface/i18nRepository'
import { IRepositoryInfoService } from '../../interface/repositoryInfo'
import { INodegitService, IRepositoryChanges, ICheckResult } from '../../interface/nodegit'
import { ITrackedRepositoriesService, IRepositoryResult } from '../../interface/trackRepositories'

@provide('i18nRepositorySerive')
export class I18nRepositorySerive implements II18nRepositorySerive {

  @inject()
  ctx: Context

  @config('nodegit')
  nodegitConfig: INodegitConfig

  @inject('repositoryInfoService')
  riService: IRepositoryInfoService

  @inject('nodegitService')
  nodegitService: INodegitService

  @inject('trackRepositoriesService')
  trService: ITrackedRepositoriesService

  async getAllI18nData(): Promise<PlainObject> {
    const { repositoryName } = this.ctx.query
    const reposInfo = this.riService.getRepositoryInfo(repositoryName)
    if (reposInfo == null) {
      throw new Error(`仓库${repositoryName}不存在！`)
    }
    const result: PlainObject = {}
    const { reposI18nPath } = reposInfo
    fse.readdirSync(reposI18nPath).filter((moduleName: string) => {
      return fse.statSync(path.join(reposI18nPath, moduleName)).isDirectory()
    }).forEach((moduleName: string) => {
      const modulePath = path.join(reposI18nPath, moduleName)
      for (const language of fse.readdirSync(modulePath)) {
        const data = this.getI18nByDirPath(path.join(modulePath, language))
        objectPath.set(result, [ repositoryName, moduleName, language ], data)
      }
    })
    return result
  }

  /**
   * pathType (String):
   * 1: 文件路径，如packages/@freelog/freelog-i18n/console/en/common.json
   * 2: lang文件夹路径：如packages/@freelog/freelog-i18n/console/en
   * 3: module文件夹路径：如packages/@freelog/freelog-i18n/console
   */
  async getI18nDataByPath(): Promise<PlainObject> {
    const { targetPath, pathType, repositoryName } = this.ctx.query
    const reposInfo = this.riService.getRepositoryInfo(repositoryName)
    if (reposInfo == null) {
      throw new Error(`仓库${repositoryName}不存在！`)
    }
    const result = {}
    let tmpPath: string = decodeURIComponent(targetPath).replace(/^(\/)|(\/)$/g, '')
    tmpPath = path.join(reposInfo.reposDirPath, tmpPath)

    switch (+pathType) {
      case 1: {
        const [ moduleName, lang, _file ] = tmpPath.split('/').slice(-3)
        if (/(\.json)$/.test(_file)) {
          const fileName = _file.replace(/(\.json)$/i, '')
          const data = fse.readJSONSync(tmpPath)
          if (fileName === 'index') {
            objectPath.set(result, [ repositoryName, moduleName, lang ], data)
          } else {
            objectPath.set(result, [ repositoryName, moduleName, lang, fileName ], data)
          }
        }
        break
      }
      case 2: {
        const [ moduleName, lang ] = tmpPath.split('/').slice(-2)
        const data = this.getI18nByDirPath(tmpPath)
        objectPath.set(result, [ repositoryName, moduleName, lang ], data)
        break
      }
      case 3: {
        const [ moduleName ] = tmpPath.split('/').slice(-1)
        for (const lang of fse.readdirSync(tmpPath)) {
          const data = this.getI18nByDirPath(path.join(tmpPath, lang))
          objectPath.set(result, [ repositoryName, moduleName, lang ], data)
        }
        break
      }
      default:
    }
    return result
  }

  getI18nByDirPath(dirPath: string): PlainObject {
    console.log('[GetI18n dirPath]:', dirPath)
    let result: PlainObject = {}
    const files = fse.readdirSync(dirPath)
    for (const file of files) {
      const filePath: string = path.join(dirPath, file)
      const stats = fse.statSync(filePath)
      if (/(\.json)$/.test(file) && stats.isFile()) {
        const fileName: string = file.replace(/(\.json)$/i, '')
        const data = fse.readJSONSync(path.join(dirPath, file))
        if (fileName === 'index') {
          result = Object.assign(result, data)
        } else {
          result[fileName] = data
        }
      }
    }
    return result
  }

  async updateI18nData(): Promise<IRepositoryChanges> {
    const { repositoryName, changedFiles } = this.ctx.request.body
    const reposInfo = this.riService.getRepositoryInfo(repositoryName)
    if (reposInfo == null) {
      throw new Error(`仓库${repositoryName}不存在！`)
    }
    for (const item of changedFiles) {
      const filePath = path.join(reposInfo.reposDirPath, item.targetPath)
      if (fse.pathExistsSync(filePath)) {
        fse.writeFileSync(filePath, item.targetJSONString)
      }
    }
    let repositoryChanges: IRepositoryChanges = []
    const [ repository ] = await this.nodegitService.openRepositoryByName(repositoryName)
    if (repository instanceof nodegit.Repository) {
      repositoryChanges = await this.nodegitService.getChangesByStatus(repository)
      // repositoryChanges = repositoryStatusMap.saveChanges(repositoryName, [ ...repositoryChanges ])
    }
    return repositoryChanges
  }

  async creaetNewModule(): Promise<IRepositoryResult[]> {
    const { repositoryName, moduleName, languages } = this.ctx.request.body
    const reposInfo = this.riService.getRepositoryInfo(repositoryName)
    if (reposInfo == null) {
      throw new Error(`仓库${repositoryName}不存在！`)
    }
    const { reposI18nPath } = reposInfo
    for (const lang of languages) {
      const fileName = path.join(reposI18nPath, moduleName, lang, 'index.json')
      fse.ensureFileSync(fileName)
      fse.writeJsonSync(fileName, {})
    }
    const result = await this.trService.scanAllRepositories()
    return result
  }

  async deleteModule(): Promise<IRepositoryResult[]> {
    const { repositoryName, moduleName } = this.ctx.request.body
    const reposInfo = this.riService.getRepositoryInfo(repositoryName)
    if (reposInfo == null) {
      throw new Error(`仓库${repositoryName}不存在！`)
    }
    const reposModuleDirPath = path.join(reposInfo.reposI18nPath, moduleName)
    fse.removeSync(reposModuleDirPath)
    const result = await this.trService.scanAllRepositories()
    return result
  }

  async downloadI18nFile(): Promise<void> {
    const ctx = this.ctx
    const { filePath, repositoryName } = this.ctx.query
    const reposInfo = this.riService.getRepositoryInfo(repositoryName)
    if (reposInfo != null) {
      const fileName = filePath.split('/').pop()
      const _filePath = path.join(reposInfo.reposDirPath, filePath)
      ctx.attachment(fileName)
      ctx.set('Content-Type', 'application/octet-stream')
      ctx.body = fse.createReadStream(_filePath)
    }
  }

  async pullRepository(): Promise<IRepositoryChanges> {
    const { repositoryName } = this.ctx.query
    const [ repository, repositoryInfo ] = await this.nodegitService.openRepositoryByName(repositoryName)
    if (repository instanceof nodegit.Repository && repositoryInfo != null) {
      await this.nodegitService.pull(repository, repositoryInfo.reposI18nBranch)
      const changes = await this.nodegitService.getChangesByStatus(repository)
      return changes
    }
    return []
  }

  async commitAndPushChanges(): Promise<void> {
    const { repositoryName, commitMsg, accessToken } = this.ctx.request.body
    const nodegitConfig = this.nodegitConfig
    const [ repository ] = await this.nodegitService.openRepositoryByName(repositoryName)
    if (repository instanceof nodegit.Repository) {
      const { user, i18nRemote } = nodegitConfig
      await this.nodegitService.addAndCommit(repository, user.name, user.email || '', commitMsg)
      // await pull(repository, nodegitConfig)
      // console.log(`[Pull success]: ${repositoryName}`)
      await this.nodegitService.push(repository, i18nRemote, user, accessToken)
      console.log('[Push success]')
    }
    // return repositoryStatusMap.clearChanges(repositoryName)
  }

  async checkRepository(): Promise<ICheckResult> {
    const { repositoryName } = this.ctx.query
    const result = await this.nodegitService.checkRepository(repositoryName)
    return result
  }
}
