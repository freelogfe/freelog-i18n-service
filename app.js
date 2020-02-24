'use strict'

const koaValidate = require('koa-validate')

module.exports = async app => {
  koaValidate(app)
  app.config.coreMiddleware.unshift('httpProxy')
  app.ready(async err => {
    if (err) throw err
    try {
      await app.serviceClasses.nodegitCore.initialTrackRepositories(app.config.nodegit)
    } catch (e) {
      console.log('[Error]:', e)
    }
  })
}
