'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {

  async index(ctx) {
    ctx.success('Hello, I\'m an i18n-service!')
  }
}

module.exports = HomeController
