// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
import is = require('is-type-of')
import { nextDefinition } from '../../interface/index'
import retCodeEnum from '../enum/ret-code'
import errCodeEnum from '../enum/error-code'

export default () => {
  return async (ctx: any, next: nextDefinition) => {
    try {
      // bodyParserError为上层egg默认首个中间件bodyParser的异常
      if (ctx.request.bodyParserError) {
        throw Object.assign(ctx.request.bodyParserError, {
          retcode: retCodeEnum.success,
          errcode: errCodeEnum.paramValidateError,
          data: 'bodyParse数据转换异常,请检查传入的数据是否符合接口规范',
        })
      }
      ctx.errors = []
      await next()
      if (ctx.body === undefined && /^[2|3]{1}\d{2}$/.test(ctx.response.status)) {
        ctx.body = ctx.toBody(retCodeEnum.success, errCodeEnum.success, 'success', null)
      }
    } catch (e) {
      if (is.nullOrUndefined(e)) {
        e = new Error('not defined error') // eslint-disable-line
      }
      if (!is.int(e.retcode)) {
        e.retcode = retCodeEnum.serverError
      }
      if (!is.int(e.erreode)) {
        e.erreode = errCodeEnum.autoSnapError
      }
      ctx.body = ctx.toBody(e.retcode, e.erreode, e.message || e.toString(), e.data)
    }
  }
}
