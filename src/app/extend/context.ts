// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
import _ = require('lodash')
import extend = require('extend')
import is = require('is-type-of')
import retCodeEnum from '../enum/ret-code'
import errCodeEnum from '../enum/error-code'

import { Context } from 'midway'
import { CurlRequestOption } from '../../interface/index'

export interface IExtendedCtx extends Context {
  success(data: any): void
  toBody(ret: number, errcode: number, msg: string | number, data: any): any
  error(params: any): void
  curlRequest(url: string, options?: CurlRequestOption): Promise<any>
}

const ctx = {
  success(data: any): void {
    this.body = this.toBody(retCodeEnum.success, errCodeEnum.success, 'success', data)
  },
  /* 构建API返回数据格式 */
  toBody(ret: number, errcode: number, msg: string | number, data: any): any {
    const result = {
      ret: is.int32(ret) ? ret : retCodeEnum.success,
      errcode: is.int32(errcode) ? errcode : errCodeEnum.success,
      msg: (is.string(msg) || is.number(msg)) ? msg.toString() : 'success',
      data: is.nullOrUndefined(data) ? null : data,
    }
    return result
  },
  // /* 定义错误返回的API数据结构 */
  error(params: any): void {
    const { msg, errcode, ret: retcode, data } = params
    const message = msg || 'proxy内部异常'
    throw Object.assign(new Error(message), {
      retcode: retcode ? retcode : retCodeEnum.success,
      errcode: errcode ? errcode : errCodeEnum.apiError,
      data: !is.undefined(data) ? data : is.error(arguments[0]) ? arguments[0].data : undefined,
    })
  },
  /* 获取内部REST-API数据 */
  async curlRequest(url: string, options: CurlRequestOption): Promise<any> {
    const { app } = this
    const req = this.request

    url = url[0] === '/' ? (app.config.apiProxy.target + url) : url
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

} as IExtendedCtx

export default ctx
