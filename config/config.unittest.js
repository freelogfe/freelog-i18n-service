'use strict'
module.exports = () => {
  const config = {}

  config.httpProxy = {
    target: 'http://api.testfreelog.com',
  }

  return config
}
