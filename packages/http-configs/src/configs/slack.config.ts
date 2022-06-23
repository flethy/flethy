import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Slack {
  export type Entity = { incomingWebhooks: any }
  export type Endpoint = { message: ApiDescriptionEndpoint }

  export interface IncomingWebhooksMessage extends RequestParams {
    kind: 'slack.incomingWebhooks.message'
    'auth:webhookid': string
    'body:text'?: string
    'body:blocks'?: any[]
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'slack',
      name: 'Slack',
      url: 'https://slack.com',
      docs: 'https://api.slack.com/',
      config: 'https://api.slack.com/apps',
      tags: ['web2'],
      category: 'communication',
      type: 'messenger',
    },
    base: 'https://api.slack.com',
    api: {
      incomingWebhooks: {
        message: {
          interface: 'IncomingWebhooksMessage',
          meta: {
            title: 'Post message to Slack Channel',
            description: 'Post message to Slack Channel',
            docs: 'https://api.slack.com/messaging/webhooks',
          },
          base: `https://hooks.slack.com`,
          method: 'POST',
          paths: [
            {
              name: 'services',
              type: 'static',
            },
            {
              name: 'webhookid',
              type: 'auth',
            },
          ],
        },
      },
    },
  }
}

export default Slack
