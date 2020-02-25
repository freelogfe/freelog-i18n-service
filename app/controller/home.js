'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {

  async index(ctx) {
    ctx.success('Hello, I\'m an i18n-service!')
  }

  async helloPackageJson() {
    const path = require('path')
    const fse = require('fs-extra')
    const result = fse.readJSONSync(path.resolve(process.cwd(), 'package.json'))
    this.ctx.success(result)
  }
}

module.exports = HomeController
