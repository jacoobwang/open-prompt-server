import { Context } from 'koa'
import Router, { Joi, Spec } from 'koa-joi-router'
import config from '~/lib/config'

import * as tencentcloud from "tencentcloud-sdk-nodejs"
const TmtClient = tencentcloud.tmt.v20180321.Client

const clientConfig = {
  credential: {
      secretId: config.TENCENT_SECRET_ID,
      secretKey: config.TENCENT_SECRET_KEY,
  },
  region: "ap-beijing",
  profile: {
      httpProfile: {
          endpoint: "tmt.tencentcloudapi.com",
      },
  },
}
const client = new TmtClient(clientConfig)

export const prompts: Router.Spec = {
  path: '/translate/prompts',
  method: 'post',
  validate: {
    type: 'json',
    body: {
      words: Joi.array().description('翻译的单词'),
      to: Joi.string().description('语言'),
    }
  },
  handler: async (ctx: Context) => {
    const { words, to } = ctx.request.body
    const inputText = words.join('\n')
    
    let params: any = {
      SourceText: inputText,
      Source: 'auto',
      Target: to ?? 'zh',
      ProjectId: 0,
    }

    let re = await client.TextTranslate(params)
    ctx.body = re.TargetText.split('\n')
  },
}