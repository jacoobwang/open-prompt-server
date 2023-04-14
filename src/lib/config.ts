/* eslint-disable @typescript-eslint/no-var-requires */
import { merge } from 'lodash'
import os from 'os'
import * as path from 'path'

const env = process.env.NODE_ENV || 'development'

interface Config {
  env: string
  isDev: boolean
  isProd: boolean
  isTest: boolean
  isLocal: boolean
  port: number
  TENCENT_SECRET_ID: string
  TENCENT_SECRET_KEY: string
}

const config: Config = merge(
  {
    env,
    isDev: env === 'development',
    isProd: env === 'production',
    isTest: process.env.TEST_FLAG === '1',
    isLocal: env === 'development' || (env === 'test' && os.platform() !== 'linux'),
    root: path.resolve(__dirname, '../../'),
  },
  require('configly/configure')({
    parsers: {
      yml: require('js-yaml').load,
    },
    directories: path.join(path.resolve(__dirname, '../../'), 'config'),
  })
)

export function overrides(overrides) {
  if (overrides) {
    merge(config, overrides)
  }
  return config
}

export default config
