import { nao, WebhookSite } from '@flethy/connectors'

const config = nao<WebhookSite.CoreGet>({
  kind: 'webhooksite.core.get',
  'param:uuid': process.env.WEBHOOKSITE_UUID,
  'header:x-test-header': 'flethy',
})

console.log(config)

