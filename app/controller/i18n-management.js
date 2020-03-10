'use strict'

const Controller = require('egg').Controller
// const fse = require('fs-extra')
// const errorCode = require('../enum/error-code')
// const retCode = require('../enum/ret-code')

class I18nManagement extends Controller {
  async getTrackedRepositories(ctx) {
    const result = await ctx.service.i18nManagement.getRepositories()
    ctx.success(result)
  }

  async getRepositoryI18nData(ctx) {
    const result = await ctx.service.i18nManagement.getI18nDataByPath()
    ctx.success(result)
  }

  async updateRepositoryI18nData(ctx) {
    const result = await ctx.service.i18nManagement.updateI18nData()
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
}

module.exports = I18nManagement
