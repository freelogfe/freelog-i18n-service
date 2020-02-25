'use strict'

const Controller = require('egg').Controller
const path = require('path')
const fse = require('fs-extra')
const errorCode = require('../enum/error-code')
const retCode = require('../enum/ret-code')

class HomeController extends Controller {

  async index(ctx) {
    ctx.success('Hello, I\'m an i18n-service!')
  }

  async helloPackageJson() {
    const result = fse.readJSONSync(path.resolve(process.cwd(), 'package.json'))
    this.ctx.success(result)
  }

  async initialTrackRepositories() {
    const { ctx, app } = this
    try {
      const { i18nRepositoriesDirPath } = app.config.nodegit
      await app.serviceClasses.nodegitCore.initialTrackRepositories(app.config.nodegit)
      ctx.success(fse.readdirSync(path.resolve(process.cwd(), i18nRepositoriesDirPath, 'freelogfe-web-repos')))
    } catch (e) {
      ctx.error({ msg: e, errorCode: errorCode.autoSnapError, ret: retCode.serverError })
    }
  }
}

module.exports = HomeController
