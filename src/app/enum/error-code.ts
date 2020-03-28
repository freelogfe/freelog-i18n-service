'use strict'

/**
 * 以8开头定义错误码，方便区别于后端的错误码
 */
export default {
  success: 0,
  // 参数校验
  paramValidateError: 81,
  // 接口出错
  apiError: 82,
  // 自动捕捉错误
  autoSnapError: 83,
}
