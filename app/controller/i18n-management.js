'use strict'

const Controller = require('egg').Controller
// const fse = require('fs-extra')
const errorCode = require('../enum/error-code')
const retCode = require('../enum/ret-code')

class I18nManagement extends Controller {
  async getTrackedRepositories(ctx) {
    try {
      const result = await ctx.service.i18nManagement.index()
      ctx.success(result)
    } catch (e) {
      ctx.error({ data: e, errorCode: errorCode.autoSnapError, ret: retCode.serverError })
    }
  }

  async getRepositoryI18nData(ctx) {
    try {
      const result = await ctx.service.i18nManagement.getI18nDataByPath()
      ctx.success(result)
    } catch (e) {
      ctx.error({ data: e, errorCode: errorCode.autoSnapError, ret: retCode.serverError })
    }
  }

  async updateRepositoryI18nData(ctx) {
    try {
      const result = await ctx.service.i18nManagement.updateI18nData()
      ctx.success(result)
    } catch (e) {
      ctx.error({ data: e, errorCode: errorCode.autoSnapError, ret: retCode.serverError })
    }
  }

  async commitAndPushChanges(ctx) {
    try {
      const result = await ctx.service.i18nManagement.commitAndPushChanges()
      ctx.success(result)
    } catch (e) {
      console.log('e --', e)
      ctx.error({ msg: e, errorCode: errorCode.autoSnapError, ret: retCode.serverError })
    }
  }
}

module.exports = I18nManagement
