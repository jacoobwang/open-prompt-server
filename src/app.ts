import Koa from 'koa'
import { endsWith, includes, replace, some } from 'lodash'

import route from '~/lib/route'

function checkAllowDomains(origin) {
  const corsAllowDomains = ['focus163.com']
  return some(corsAllowDomains, (domain) => {
    if (includes(domain, '***')) {
      return endsWith(origin, replace(domain, '***', ''))
    } else {
      return domain === origin
    }
  })
}

export default function (): Koa {
  const app = new Koa()

  app.proxy = true
  // CORS
  app.use(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('@koa/cors')({
      credentials: true,
      origin: (ctx) => {
        const origin = ctx.get('Origin')
        if (checkAllowDomains(replace(origin, /^https?:\/\//, ''))) {
          return origin
        }
      },
    })
  )

  app.use(route().middleware())

  return app
}
