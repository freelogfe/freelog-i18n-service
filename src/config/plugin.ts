import { EggPlugin } from 'midway'
export default {
  static: true, // default is true
  freelogDataBase: {
    enable: true,
    package: 'egg-freelog-database',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
} as EggPlugin
