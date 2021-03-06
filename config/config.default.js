'use strict'
const pathToRegexp = require('path-to-regexp')
const routeMap = require('../app/router-map')

module.exports = appInfo => {
  const config = {}

  config.keys = appInfo.name + '_1535620905039_1459'

  config.middleware = [ 'errorHandler' ]

  config.security = {
    csrf: {
      enable: false,
    },
  }

  /**
   * 内部中间件没有处理到的异常,在此处统一处理
   */
  config.onerror = {
    all(err, ctx) {
      ctx.body = {
        ret: 0,
        errCode: 1,
        msg: '未处理的异常',
        data: err.stack || err.toString(),
      }
    },
  }

  config.httpProxy = {
    ignore: Object.keys(routeMap).map(key => {
      return pathToRegexp(key.split(' ')[1])
    }),
  }

  config.cors = {
    credentials: true,
    origin(ctx) {
      return ctx.request.headers.origin || '*'
    },
    exposeHeaders: 'freelog-resource-type,freelog-meta,freelog-system-meta,freelog-sub-dependencies,freelog-entity-nid',
  }

  config.assets = {
    publicPath: '/public/',
  }

  config.nodegit = {
    user: {
      token: '3c9653aec77ac77203670043bb34b554cffaf1e4',
      name: 'Wweizhi',
      email: '790727372@qq.com',
      password: 'Wwz_3110641',
    },
    i18nRepositoriesDirPath: 'i18n-repositories/',
    trackedRepositories: {
      'freelogfe-web-repos': {
        reposI18nPath: 'packages/@freelog/freelog-i18n/',
        reposUrl: 'https://github.com/freelogfe/freelogfe-web-repos',
      },
    },
    REMOTE_ORIGIN: 'origin',
    I18N_BRANCH_NAME: 'i18n-test',
    REMOTE_BRANCH_NAME: 'i18n-test',
  }

  return config
}
