'use strict'
const is = require('is-type-of')

module.exports = {
  // this 是 helper 对象，在其中可以调用其他 helper 方法
  // this.ctx => context 对象
  // this.app => application 对象
  /**
   *
   * @param {array} target 被合并的目标数组
   * @param {array} src 合并的源数组
   * @param {string|object} key 合并的key值
   * @param {function} mergeFn 合并的规则函数
   * @return {array} 合并后的结果
   */
  mergeBy(target, src, key, mergeFn) {
    if (!key) {
      throw new Error('need key parameter for mergeBy function')
    }

    const srcMap = {}
    let srcKey = key
    let targetKey

    if (is.string(key)) {
      srcKey = targetKey = key
    } else if (is.object(key)) { // key map
      srcKey = key.src
      targetKey = key.target
    }
    src.forEach(val => {
      srcMap[val[srcKey]] = val
    })

    return target.map(val => {
      const srcVal = srcMap[val[targetKey]]
      if (srcVal) {
        if (is.function(mergeFn)) {
          val = mergeFn(val, srcVal)
        } else if (is.string(mergeFn)) {
          val[mergeFn] = srcVal
        } else {
          val = Object.assign(val, srcVal)
        }
      }

      return val
    })
  },
  isSafeOrigin(origin) {
    return /^https?:\/\/(t\.)?[\w-]+\.(test)?freelog\.com$/.test(origin)
  },
}
