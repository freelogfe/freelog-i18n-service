'use strict'

const koaValidate = require('koa-validate')
const initialTrackRepositories = require('./nodegit-core/initialTrackRepositories')

module.exports = async app => {
  koaValidate(app)
  app.config.coreMiddleware.unshift('httpProxy')
  app.ready(async err => {
    if (err) throw err
    await initialTrackRepositories(app.config.nodegit)
  })
}
