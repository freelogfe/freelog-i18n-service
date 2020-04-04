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
      let retcode = retCodeEnum.serverError
      let erreode = errCodeEnum.autoSnapError
      let errMsg = 'not defined error'
      if (is.error(e)) {
        errMsg = e.stack
      } else {
        if (is.int(e.retcode)) {
          retcode = e.retcode
        }
        if (is.int(e.erreode)) {
          erreode = e.erreode
        }
        if (is.string(e.message)) {
          errMsg = e.message
        }
      }
      ctx.body = ctx.toBody(retcode, erreode, errMsg, null)
    }
  }
}
