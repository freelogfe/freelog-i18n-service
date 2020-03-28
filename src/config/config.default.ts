import { EggAppConfig, EggAppInfo, PowerPartial, Context } from 'midway'

export type DefaultConfig = PowerPartial<EggAppConfig>

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1585202352797_7394'

  config.middleware = [ 'errorHandler' ]
  // add your config here

  config.nodegit = {
    user: {
      token: '3c9653aec77ac77203670043bb34b554cffaf1e4',
      name: 'Wweizhi',
      email: '790727372@qq.com',
      password: 'Wwz_3110641',
    },
    i18nRepositoriesDirPath: 'i18n-repositories/',
    i18nRemote: 'origin',
    trackedRepositories: {
      'freelogfe-web-repos': {
        reposI18nPath: 'packages/@freelog/freelog-i18n/',
        reposUrl: 'https://github.com/freelogfe/freelogfe-web-repos',
        reposI18nBranch: 'i18n-test'
      },
      'freelog-node-provider': {
        reposI18nPath: 'config/i18n-text/',
        reposUrl: 'https://github.com/freelogfe/freelog-node-provider',
        reposI18nBranch: 'i18n-test'
      },
    },
  }

  /**
   * 内部中间件没有处理到的异常,在此处统一处理
   */
  config.onerror = {
    all(err: any, ctx: Context) {
      ctx.body = {
        ret: 0,
        errCode: 1,
        msg: '未处理的异常',
        data: err.stack || err.toString(),
      }
    },
  }

  return config
}