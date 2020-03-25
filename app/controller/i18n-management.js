'use strict'

const Controller = require('egg').Controller
// const fse = require('fs-extra')
// const errorCode = require('../enum/error-code')
// const retCode = require('../enum/ret-code')

class I18nManagement extends Controller {
  async getTrackedRepositories(ctx) {
    const result = await ctx.service.i18nManagement.scanAllRepositories()
    ctx.success(result)
  }

  async trackedRepository(ctx) {
    const { repositoryName } = ctx.query
    const result = await ctx.service.i18nManagement.scanRepository(repositoryName)
    if (result != null) {
      ctx.success(result)
    } else {
      ctx.error({ msg: '仓库不存在或仓库未完全克隆！' })
    }
  }

  async reTrackRepository(ctx) {
    ctx.success(null)
    await ctx.service.i18nManagement.reTrackRepository()
  }

  async getRepositoryI18nData(ctx) {
    const result = await ctx.service.i18nManagement.getI18nDataByPath()
    ctx.success(result)
  }

  async updateRepositoryI18nData(ctx) {
    const result = await ctx.service.i18nManagement.updateI18nData()
    ctx.success(result)
  }

  async pullRepository(ctx) {
    const result = await ctx.service.i18nManagement.pullRepository()
    ctx.success(result)
  }

  async commitAndPushChanges(ctx) {
    const result = await ctx.service.i18nManagement.commitAndPushChanges()
    ctx.success(result)
  }

  async getGithubOAuthAccessToken(ctx) {
    const { client_id, client_secret, code } = ctx.request.body
    const response = await this.app.curl(`https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`, {
      method: 'post',
      dataType: 'json',
    })
    const oAuthData = response.data
    if (oAuthData.error) {
      throw new Error(oAuthData.error)
    } else {
      ctx.success(oAuthData)
    }
  }

  async getGithubUserInfo(ctx) {
    const { accessToken } = ctx.request.query
    const response = await this.app.curl('https://api.github.com/user', {
      method: 'get',
      dataType: 'json',
      headers: {
        accept: 'application/json',
        Authorization: `token ${accessToken}`,
      },
    })
    ctx.success(response.data)
  }

  async creaetI18nNewModule(ctx) {
    const result = await ctx.service.i18nManagement.creaetNewModule()
    ctx.success(result)
  }

  async deleteI18nModule(ctx) {
    const result = await ctx.service.i18nManagement.deleteModule()
    ctx.success(result)
  }

  async downloadFile(ctx) {
    await ctx.service.i18nManagement.downloadI18nFile()
  }

  async checkRepository(ctx) {
    const result = await ctx.service.i18nManagement.checkRepository()
    ctx.success(result)
  }

  async getRepositoryInfo(ctx) {
    const { repositoryName } = ctx.query
    const result = await ctx.service.keysInfoMapHandler.getKeysInfoMappingTable(repositoryName)
    ctx.success(result)
  }

  async updateKeyInfo(ctx) {
    const { repositoryName, moduleName, key, keyInfo } = ctx.request.body
    await ctx.service.keysInfoMapHandler.updateKeyInfo(repositoryName, moduleName, key, keyInfo)
    ctx.success(null)
  }
}

module.exports = I18nManagement
