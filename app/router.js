'use strict'
const objectPath = require('object-path')
const routeMap = require('./router-map')

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app

  Object.keys(routeMap).forEach(key => {
    const [ method, path ] = key.split(' ')
    router[method](path, objectPath.get(controller, routeMap[key]))
  })

}
