import Router from 'koa-joi-router'
import * as TranslateApi from './translate'

const router = Router()
router.route(TranslateApi.prompts)

export default router