'use strict'
const Service = require('egg').Service
const path = require('path')
const fse = require('fs-extra')
const objectPath = require('object-path')
const getRepositoryInfo = require('./nodegit-core/getRepositoryInfo')
const getChangesByStatus = require('./nodegit-core/getChangesByStatus')
const push = require('./nodegit-core/push')
const pull = require('./nodegit-core/pull')
const checkRepository = require('./nodegit-core/checkRepository')
const repositoryStatusMap = require('./repositoryStatusMap')

class I18nManagementService extends Service {
  async index() {
    const result = await this.scanAllRepositories()
    return result
  }

  async scanAllRepositories() {
    const config = this.app.config.nodegit
    const i18nRepositoriesDirPath = path.resolve(process.cwd(), config.i18nRepositoriesDirPath)
    const result = []
    for (const repositoryName of fse.readdirSync(i18nRepositoriesDirPath)) {
      const tmpResult = await this.scanRepository(repositoryName)
      if (tmpResult !== null) {
        result.push(tmpResult)
      }
    }
    return result
  }

  async scanRepository(repositoryName) {
    const config = this.app.config.nodegit
    const checkResult = await checkRepository(repositoryName, config)
    if (!checkResult.isOK) return null
    await this.ctx.service.keysInfoMapHandler.ensureKeysInfoMappingTable(repositoryName)
    const nodegit = require('nodegit')
    const reposInfo = await getRepositoryInfo(config, repositoryName)
    const { reposUrl, reposI18nPath, reposDirPath, reposI18nBranch } = reposInfo
    const repository = await nodegit.Repository.open(reposDirPath).catch(e => e)
    let repositoryChanges = []
    if (repository instanceof nodegit.Repository) {
      repositoryChanges = await getChangesByStatus(repository)
      repositoryChanges = repositoryStatusMap.saveChanges(repositoryName, [ ...repositoryChanges ])
    }
    const i18nRepositoriesDirPath = path.resolve(process.cwd(), config.i18nRepositoriesDirPath)
    let reposI18nDir = this.getRepositoryI18nDir(i18nRepositoriesDirPath, reposI18nPath)
    reposI18nDir = reposI18nDir.filter(m => m.fileName == null)
    reposI18nDir.forEach(_module => {
      _module.keys = [ repositoryName, _module.name ]
      _module.keysType = 'module'
      if (_module.children) {
        _module.children.forEach(lang => {
          lang.keys = [ repositoryName, _module.name, lang.name ]
          lang.keysType = 'language'
          if (lang.children) {
            lang.children.forEach(file => {
              file.keys = [ repositoryName, _module.name, lang.name, file.fileName ]
              file.keysType = 'file'
              file.language = lang.name
            })
          }
        })
      }
    })
    return {
      repositoryName,
      repositoryUrl: reposUrl,
      repositoryI18nBranch: reposI18nBranch,
      directoryTree: reposI18nDir,
      repositoryChanges,
    }
  }

  getRepositoryI18nDir(i18nRepositoriesDirPath, reposI18nPath) {
    const target = []
    const targetRegExp = new RegExp(i18nRepositoriesDirPath + '(\/?)')
    for (const tmpName of fse.readdirSync(reposI18nPath)) {
      const tmpPath = path.join(reposI18nPath, tmpName)
      const stats = fse.statSync(tmpPath)
      if (stats.isDirectory()) {
        target.push({
          name: tmpName,
          path: tmpPath.replace(targetRegExp, ''),
          children: this.getRepositoryI18nDir(i18nRepositoriesDirPath, tmpPath),
        })
        target[tmpName] = this.getRepositoryI18nDir(i18nRepositoriesDirPath, tmpPath)
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

  async reTrackRepository() {
    const { repositoryName } = this.ctx.query
    const reTrackRepository = require('./nodegit-core/reTrackRepository')
    await reTrackRepository(repositoryName, this.app.config.nodegit)
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * pathType (String):
   * 0: 所有文件
   * 1: 文件路径，如freelogfe-web-repos/packages/@freelog/freelog-i18n/console/en/common.json
   * 2: module文件夹路径：如freelogfe-web-repos/packages/@freelog/freelog-i18n/console
   * 3: lang文件夹路径：如freelogfe-web-repos/packages/@freelog/freelog-i18n/console/en
   */
  async getI18nDataByPath() {
    const { i18nRepositoriesDirPath } = this.app.config.nodegit
    const { targetPath, pathType, repositoryName } = this.ctx.query
    const result = {}
    let tmpPath = decodeURIComponent(targetPath).replace(/^(\/)|(\/)$/g, '')
    const tmpArr = tmpPath.split('/')
    tmpPath = path.join(process.cwd(), i18nRepositoriesDirPath, tmpPath)

    switch (+pathType) {
      case 0: {
        const reposInfo = await getRepositoryInfo(this.app.config.nodegit, repositoryName)
        fse.readdirSync(reposInfo.reposI18nPath).filter(moduleName => {
          const stats = fse.statSync(path.join(reposInfo.reposI18nPath, moduleName))
          return stats.isDirectory()
        }).forEach(moduleName => {
          const modulePath = path.join(reposInfo.reposI18nPath, moduleName)
          for (const lang of fse.readdirSync(modulePath)) {
            const data = this.getI18nByLangPath(path.join(modulePath, lang))
            objectPath.set(result, [ repositoryName, moduleName, lang ], data)
          }
        })
        break
      }
      case 1: {
        const [ moduleName, lang, fileName ] = tmpArr.slice(-3)
        if (/(\.json)$/.test(fileName)) {
          const file = fileName.replace(/(\.json)$/i, '')
          const data = fse.readJSONSync(tmpPath)
          if (file === 'index') {
            objectPath.set(result, [ repositoryName, moduleName, lang ], data)
          } else {
            objectPath.set(result, [ repositoryName, moduleName, lang, file ], data)
          }
        }
        break
      }
      case 2: {
        const [ moduleName ] = tmpArr.slice(-1)
        for (const lang of fse.readdirSync(tmpPath)) {
          const data = this.getI18nByLangPath(path.join(tmpPath, lang))
          objectPath.set(result, [ repositoryName, moduleName, lang ], data)
        }
        break
      }
      case 3: {
        const [ moduleName, lang ] = tmpArr.slice(-2)
        const data = this.getI18nByLangPath(tmpPath)
        objectPath.set(result, [ repositoryName, moduleName, lang ], data)
        break
      }
      default:
    }
    return result
  }

  getI18nByLangPath(langPath) {
    console.log('[getI18nByLangPath langPath]:', langPath)
    let result = {}
    const files = fse.readdirSync(langPath)
    for (const file of files) {
      if (/(\.json)$/.test(file)) {
        const fileName = file.replace(/(\.json)$/i, '')
        const data = fse.readJSONSync(path.join(langPath, file))
        if (fileName === 'index') {
          result = Object.assign(result, data)
        } else {
          result[fileName] = data
        }
      }
    }
    return result
  }

  async updateI18nData() {
    const nodegit = require('nodegit')
    const { repositoryName, changedFiles } = this.ctx.request.body
    for (const item of changedFiles) {
      const { targetPath, targetJSONString } = item
      await this.updateI18nFileData(targetPath, targetJSONString)
    }
    let repositoryChanges = []
    const repository = await this.openRepositoryByName(repositoryName)
    if (repository instanceof nodegit.Repository) {
      repositoryChanges = await getChangesByStatus(repository)
      repositoryChanges = repositoryStatusMap.saveChanges(repositoryName, [ ...repositoryChanges ])
    }
    return repositoryChanges
  }

  async updateI18nFileData(targetPath, targetJSONString) {
    const { app } = this
    const { i18nRepositoriesDirPath } = app.config.nodegit
    const tmpPath = path.join(process.cwd(), i18nRepositoriesDirPath, targetPath)
    if (fse.pathExistsSync(tmpPath)) {
      fse.writeFileSync(tmpPath, targetJSONString)
    }
  }

  async openRepositoryByName(repositoryName) {
    const nodegit = require('nodegit')
    const nodegitConfig = this.app.config.nodegit
    const reposInfo = await getRepositoryInfo(nodegitConfig, repositoryName)
    if (reposInfo === null) {
      throw new Error(`参数repositoryName有误：仓库（${repositoryName}）未备追踪`)
    }
    const { reposDirPath } = reposInfo
    const repository = await nodegit.Repository.open(reposDirPath).catch(e => e)
    return repository
  }

  async pullRepository() {
    const { repositoryName } = this.ctx.query
    const repository = await this.openRepositoryByName(repositoryName)
    await pull(repository, this.app.config.nodegit)
    const changes = await getChangesByStatus(repository)
    return changes
  }

  async commitAndPushChanges() {
    const nodegit = require('nodegit')
    const addAndCommit = require('./nodegit-core/addAndCommit')
    const { repositoryName, commitMsg, accessToken } = this.ctx.request.body
    const nodegitConfig = this.app.config.nodegit
    const repository = await this.openRepositoryByName(repositoryName)
    if (repository instanceof nodegit.Repository) {
      const { user, REMOTE_ORIGIN } = nodegitConfig
      await addAndCommit(repository, user.name, user.email, commitMsg)
      // await pull(repository, nodegitConfig)
      // console.log(`[Pull success]: ${repositoryName}`)
      await push(repository, REMOTE_ORIGIN, user, accessToken)
      console.log('[Push success]')
    }
    return repositoryStatusMap.clearChanges(repositoryName)
  }

  async creaetNewModule() {
    const { repositoryName, moduleName, languages } = this.ctx.request.body
    const reposInfo = await getRepositoryInfo(this.app.config.nodegit, repositoryName)
    const { reposI18nPath } = reposInfo
    for (let i = 0; i < languages.length; i++) {
      const fileName = path.join(reposI18nPath, moduleName, languages[i], 'index.json')
      fse.ensureFileSync(fileName)
      fse.writeJsonSync(fileName, {})
    }
    const result = await this.getRepositories()
    return result
  }

  async deleteModule() {
    const { repositoryName, moduleName } = this.ctx.request.body
    const reposInfo = await getRepositoryInfo(this.app.config.nodegit, repositoryName)
    const { reposI18nPath } = reposInfo
    const reposModuleDirPath = path.join(reposI18nPath, moduleName)
    fse.removeSync(reposModuleDirPath)
    const result = await this.getRepositories()
    return result
  }

  async downloadI18nFile() {
    const ctx = this.ctx
    const { filePath, repositoryName } = this.ctx.query
    const reposInfo = await getRepositoryInfo(this.app.config.nodegit, repositoryName)
    if (reposInfo != null) {
      const fileName = filePath.split('/').pop()
      const _filePath = path.join(reposInfo.reposDirPath, filePath)
      ctx.attachment(fileName)
      ctx.set('Content-Type', 'application/octet-stream')
      ctx.body = fse.createReadStream(_filePath)
    }
  }

  async checkRepository() {
    const { repositoryName } = this.ctx.query
    const result = await checkRepository(repositoryName, this.app.config.nodegit)
    return result
  }
}

module.exports = I18nManagementService

