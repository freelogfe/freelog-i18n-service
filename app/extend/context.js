'use strict'

const extend = require('extend')
const is = require('is-type-of')
const _ = require('lodash')
const retCodeEnum = require('../enum/ret-code')
const errCodeEnum = require('../enum/error-code')

module.exports = {

  /* 定义成功返回的API数据结构 */
  success(data) {
    this.body = this.toBody(retCodeEnum.success, errCodeEnum.success, 'success', data)
    return this
  },

  /* 定义错误返回的API数据结构 */
  error(params) {
    const { msg, errcode, ret: retcode, data } = params
    const message = msg || 'proxy内部异常'
    throw Object.assign(new Error(message), {
      retcode: retcode ? retcode : retCodeEnum.success,
      errcode: errcode ? errcode : errCodeEnum.apiError,
      data: !is.undefined(data) ? data : is.error(arguments[0]) ? arguments[0].data : undefined,
    })
  },

  /* 校验参数,有错误就抛出异常 */
  validate() {
    if (!this.errors || !this.errors.length) {
      return this
    }

    const msg = `参数校验失败,details:${JSON.stringify(this.errors)}`
    this.error({
      msg,
      errcode: errCodeEnum.paramValidateError,
    })
  },

  /* 构建API返回数据格式 */
  toBody(ret, errcode, msg, data) {
    const result = {
      ret: is.int32(ret) ? ret : retCodeEnum.success,
      errcode: is.int32(errcode) ? errcode : errCodeEnum.success,
      msg: (is.string(msg) || is.number(msg)) ? msg.toString() : 'success',
      data: is.nullOrUndefined(data) ? null : data,
    }
    return result
  },

  /* 获取内部REST-API数据 */
  async curlRequest(url, options) {
    const { app } = this
    const req = this.request

    url = url[0] === '/' ? (app.config.httpProxy.target + url) : url
    options = options || {}

    options = extend(true, {
      method: req.method,
      headers: this.headers,
      dataType: 'json',
      timeout: 1e4,
    }, options)

    if (!options.data && !_.isEmpty(req.body)) {
      options.data = req.body
    }

    const result = await this.curl(url, options)
    return result
  },

  /**
   * 获取配置
   */
  get config() {
    return this.app.config
  },
}
