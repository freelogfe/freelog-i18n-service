'use strict'

const koaValidate = require('koa-validate')
console.log('[Test Log]: 启动 app.js')

module.exports = async app => {
  koaValidate(app)
  app.config.coreMiddleware.unshift('httpProxy')
  app.ready(async err => {
    if (err) {
      console.log(`[Error]: ${err}`)
    }
    await app.serviceClasses.nodegitCore.initialTrackRepositories(app.config.nodegit)
  })
}
