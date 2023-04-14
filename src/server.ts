import createApp from './app'
import { getBootstrapTips } from '~/lib/bootstrap-info'
import config from '~/lib/config'

createApp().listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(getBootstrapTips())
})