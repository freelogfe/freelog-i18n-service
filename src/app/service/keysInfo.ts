// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
import path = require('path')
import fse = require('fs-extra')
import objectPath = require('object-path')
import { provide, config, inject } from 'midway'
import { INodegitConfig, PlainObject } from '../../interface/index'
import { IKeysInfoService } from '../../interface/keysInfo'
import { IRepositoryInfoService } from '../../interface/repositoryInfo'

const I18N_KEYS_INFO_MAPPING_TABLE = 'keysInfo-mappingTable'

@provide('keysInfoService')
export class KeysInfoService implements IKeysInfoService {

  @inject('repositoryInfoService')
  riService: IRepositoryInfoService

  @config('nodegit')
  nodegitConfig: INodegitConfig

  async getKeysInfoFilePath(repositoryName: string): Promise<string> {
    const reposInfo = this.riService.getRepositoryInfo(repositoryName)
    if (reposInfo != null) {
      return path.join(reposInfo.reposI18nPath, `${I18N_KEYS_INFO_MAPPING_TABLE}.json`)
    } else {
      return ''
    }
  }

  async ensureKeysInfoFile(repositoryName: string): Promise<any> {
    const filePath = await this.getKeysInfoFilePath(repositoryName)
    if (!fse.pathExistsSync(filePath)) {
      fse.ensureFileSync(filePath)
      fse.writeJSONSync(filePath, {}, { spaces: '\t' })
    }
  }

  async readKeysInfoFile(repositoryName: string): Promise<any> {
    const filePath = await this.getKeysInfoFilePath(repositoryName)
    return fse.readJSONSync(filePath)
  }

  async getKeyInfo(repositoryName: string, moduleName: string, key: string): Promise<any> {
    const keyInfoMappingTable = await this.readKeysInfoFile(repositoryName)
    return objectPath.get(keyInfoMappingTable, [ moduleName, key ])
  }

  async updateKeyInfo(repositoryName: string, moduleName: string, key: string, info: PlainObject): Promise<void> {
    const filePath = await this.getKeysInfoFilePath(repositoryName)
    const keyInfoMappingTable = await this.readKeysInfoFile(repositoryName)
    console.log('In updateKeyInfo', filePath, keyInfoMappingTable, repositoryName, moduleName, key, info)
    const tmpInfo = objectPath.get(keyInfoMappingTable, [ moduleName, key ]) || {}
    objectPath.set(keyInfoMappingTable, [ moduleName, key ], Object.assign(tmpInfo, info))
    fse.writeJSONSync(filePath, keyInfoMappingTable, { spaces: '\t' })
  }
}
