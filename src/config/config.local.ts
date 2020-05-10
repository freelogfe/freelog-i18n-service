import { EggAppConfig, PowerPartial } from 'midway'

export type DefaultConfig = PowerPartial<EggAppConfig>

export default () => {
  const config = {} as DefaultConfig
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/nodeReportRecord'
  }
  return config
}
