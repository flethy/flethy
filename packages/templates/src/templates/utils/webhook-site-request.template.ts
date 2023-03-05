import { Template } from '../../types/template.types'

export const WebhookSite: Template = {
  id: 'webhook-site-request',
  level: 'Beginner',
  meta: {
    name: 'First Http Request',
    description: 'Send your first HTTP request with WebhookSite',
    prereq: [
      {
        text: 'Navigate to webhook site and copy the UUID',
        link: {
          href: 'https://webhook.site',
          label: 'webhook.site',
        },
        envs: [
          {
            key: 'WEBHOOKSITE_UUID',
            description: 'The UUID of your WebhookSite',
          },
        ],
      },
    ],
    services: ['webhook.site'],
    category: 'utils',
    tags: ['http', 'webhook'],
  },
  flow: {
    nodes: [
      {
        id: 'webhooksite-post',
        kind: 'webhooksite.core.post',
        'param:uuid': '==>env==>WEBHOOKSITE_UUID',
        'header:x-test-header': 'flethy',
        'body:body': {
          hello: 'world!',
        },
      },
    ],
    env: {
      WEBHOOKSITE_UUID: 'webhooksite_uuid',
    },
  },
}
