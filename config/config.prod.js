'use strict'
module.exports = () => {
  const config = {}

  config.httpProxy = {
    // target: 'http://172.18.215.224:8895',
    // target: 'https://api.freelog.com',
    target: 'http://api-gateway-service.production:8895',
  }

  return config
}
