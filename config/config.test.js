'use strict'
module.exports = () => {
  const config = {}

  config.httpProxy = {
    // target: 'http://api.testfreelog.com',
    target: 'http://api-gateway-service.development:6895',
  }

  return config
}
