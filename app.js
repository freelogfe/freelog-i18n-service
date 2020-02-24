'use strict'

const koaValidate = require('koa-validate')
console.log('[Test Log]: 启动 app.js')

module.exports = async app => {
  koaValidate(app)
  app.config.coreMiddleware.unshift('httpProxy')
}
