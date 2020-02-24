'use strict'

const httpProxy = require('http-proxy-middleware')
const k2c = require('koa2-connect')
const helper = require('../extend/helper')

module.exports = options => {
  const proxyHandler = k2c(httpProxy({
    target: options.target,
    changeOrigin: true,
    secure: false,
    pathRewrite: options.pathRewrite || {},
    onProxyRes(proxyRes, req/* , res*/) {
      const origin = req.headers.origin
      if (helper.isSafeOrigin(origin)) {
        proxyRes.headers['Access-Control-Allow-Origin'] = origin
        proxyRes.headers['Access-Control-Allow-Credentials'] = true
      }
    },
    onError(e) {
      console.log('Middleware Proxy Error: ', e)
    },
  }))

  return async function _proxyHandler(ctx, next) {
    const isPass = options.ignore.some(re => !!re.exec(ctx.request.path))
    const isPublic = /^\/public\//.test(ctx.request.path)
    if (isPass || isPublic || ctx.method === 'OPTIONS') {
      await next()
    } else {
      proxyHandler(ctx, next)
    }
  }
}
