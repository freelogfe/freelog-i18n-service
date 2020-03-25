'use strict'
const Service = require('egg').Service
const path = require('path')
const fse = require('fs-extra')
const objectPath = require('object-path')
const getRepositoryInfo = require('./nodegit-core/getRepositoryInfo')
const I18N_KEYS_INFO_MAPPING_TABLE = 'keysInfo-mappingTable'

class keysInfoMappingService extends Service {

  async getKeysInfoMappingTableFilePath(repositoryName) {
    const reposInfo = await getRepositoryInfo(this.app.config.nodegit, repositoryName)
    return path.join(reposInfo.reposI18nPath, `${I18N_KEYS_INFO_MAPPING_TABLE}.json`)
  }

  async ensureKeysInfoMappingTable(repositoryName) {
    const filePath = await this.getKeysInfoMappingTableFilePath(repositoryName)
    if (!fse.pathExistsSync(filePath)) {
      fse.ensureFileSync(filePath)
      fse.writeJSONSync(filePath, {}, { spaces: '\t' })
    }
  }

  async getKeysInfoMappingTable(repositoryName) {
    const filePath = await this.getKeysInfoMappingTableFilePath(repositoryName)
    return fse.readJSONSync(filePath)
  }

  async getKeyInfo(repositoryName, moduleName, key) {
    const keyInfoMappingTable = await this.getKeysInfoMappingTable(repositoryName)
    return objectPath.get(keyInfoMappingTable, [ moduleName, key ])
  }

  async updateKeyInfo(repositoryName, moduleName, key, info) {
    const filePath = await this.getKeysInfoMappingTableFilePath(repositoryName)
    const keyInfoMappingTable = await this.getKeysInfoMappingTable(repositoryName)
    console.log('In updateKeyInfo', filePath, keyInfoMappingTable, repositoryName, moduleName, key, info)
    const tmpInfo = objectPath.get(keyInfoMappingTable, [ moduleName, key ]) || {}
    objectPath.set(keyInfoMappingTable, [ moduleName, key ], Object.assign(tmpInfo, info))
    fse.writeJSONSync(filePath, keyInfoMappingTable, { spaces: '\t' })
  }
}

module.exports = keysInfoMappingService

