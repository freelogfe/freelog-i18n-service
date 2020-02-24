'use strict'
const Service = require('egg').Service
const path = require('path')
const fse = require('fs-extra')
const objectPath = require('object-path')
const CWD = process.cwd()
const nodegit = require(path.join(CWD, 'nodegit/dist/nodegit.js'))
const getRepositoryInfo = require('./nodegit-core/getRepositoryInfo')
const getChangesByStatus = require('./nodegit-core/getChangesByStatus')
const addAndCommit = require('./nodegit-core/addAndCommit')
const push = require('./nodegit-core/push')

class I18nManagementService extends Service {
  async index() {
    const result = await this.getRepositories()
    return result
  }

  async getRepositories() {
    const config = this.app.config.nodegit
    const i18nRepositoriesDirPath = path.resolve(process.cwd(), config.i18nRepositoriesDirPath)
    const result = []
    for (const repositoryName of fse.readdirSync(i18nRepositoriesDirPath)) {
      let repositoryChanges = []
      const reposInfo = getRepositoryInfo(config, repositoryName)
      if (reposInfo === null) continue
      const { reposI18nPath, reposDirPath } = reposInfo
      const repository = await nodegit.Repository.open(reposDirPath).catch(e => e)
      if (repository instanceof nodegit.Repository) {
        const changes = await getChangesByStatus(repository)
        repositoryChanges = [ ...changes ]
      }
      const reposI18nDir = this.getRepositoryI18nDir(i18nRepositoriesDirPath, reposI18nPath)
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
      result.push({
        repositoryName, repositoryChanges,
        directoryTree: reposI18nDir,
      })
    }
    return result
  }

  getRepositoryI18nDir(i18nRepositoriesDirPath, reposI18nPath) {
    const target = []
    for (const tmpName of fse.readdirSync(reposI18nPath)) {
      const tmpPath = path.join(reposI18nPath, tmpName)
      const stats = fse.statSync(tmpPath)
      if (stats.isDirectory()) {
        target.push({
          name: tmpName,
          children: this.getRepositoryI18nDir(i18nRepositoriesDirPath, tmpPath),
        })
        target[tmpName] = this.getRepositoryI18nDir(i18nRepositoriesDirPath, tmpPath)
      } else if (stats.isFile() && /(\.json)$/.test(tmpName)) {
        const fileName = tmpName.replace(/(\.json)$/, '')
        if (fileName !== 'package' && fileName !== 'package-lock') {
          const targetRegExp = new RegExp(i18nRepositoriesDirPath + '(\/?)')
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

  // eslint-disable-next-line valid-jsdoc
  /**
   * pathType (String):
   * 1: 文件路径，如freelogfe-web-repos/packages/@freelog/freelog-i18n/console/en/common.json
   * 2: module文件夹路径：如freelogfe-web-repos/packages/@freelog/freelog-i18n/console
   * 3: lang文件夹路径：如freelogfe-web-repos/packages/@freelog/freelog-i18n/console/en
   */
  async getI18nDataByPath() {
    const { i18nRepositoriesDirPath } = this.app.config.nodegit
    const { targetPath, pathType } = this.ctx.query
    const result = {}
    let tmpPath = decodeURIComponent(targetPath).replace(/^(\/)|(\/)$/g, '')
    const tmpArr = tmpPath.split('/')
    tmpPath = path.join(process.cwd(), i18nRepositoriesDirPath, tmpPath)
    const repositoryName = tmpArr[0]
    if (fse.pathExistsSync(tmpPath)) {
      switch (+pathType) {
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
    const { repositoryName, changedFiles } = this.ctx.request.body
    for (const item of changedFiles) {
      const { targetPath, targetJSONString } = item
      await this.updateI18nFileData(targetPath, targetJSONString)
    }
    let repositoryChanges = []
    const reposInfo = getRepositoryInfo(this.app.config.nodegit, repositoryName)
    if (reposInfo === null) {
      throw new Error(`参数repositoryName有误：仓库（${repositoryName}）未备追踪`)
    }
    const { reposDirPath } = reposInfo
    const repository = await nodegit.Repository.open(reposDirPath).catch(e => e)
    if (repository instanceof nodegit.Repository) {
      const changes = await getChangesByStatus(repository)
      repositoryChanges = [ ...changes ]
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

  async commitAndPushChanges() {
    const { repositoryName, commitMsg } = this.ctx.request.body
    const nodegitConfig = this.app.config.nodegit
    const reposInfo = getRepositoryInfo(nodegitConfig, repositoryName)
    if (reposInfo === null) {
      throw new Error(`参数repositoryName有误：仓库（${repositoryName}）未备追踪`)
    }
    const { reposDirPath } = reposInfo
    const repository = await nodegit.Repository.open(reposDirPath).catch(e => e)
    let repositoryChanges = []
    if (repository instanceof nodegit.Repository) {
      const { user, REMOTE_ORIGIN } = nodegitConfig
      await addAndCommit(repository, user.name, user.email, commitMsg)
      await push(repository, REMOTE_ORIGIN, user.token)
      const changes = await getChangesByStatus(repository)
      repositoryChanges = [ ...changes ]
    }
    return repositoryChanges
  }
}

module.exports = I18nManagementService

