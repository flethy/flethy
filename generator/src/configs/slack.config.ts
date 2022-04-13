import { RequestParams } from '../controllers/HttpRequestConfig'
import { ApiDescription } from '../types/ApiDescription.type'

export type SlackEntity = { incomingWebhooks }
export type SlackEndpoint = { message }
export type SlackRequestOptionsAuth = {
  webhookid
}
export type SlackRequestOptionsParams = {
  text
  blocks
}

export interface SlackIncomingWebhooksMessage extends RequestParams {
  kind: 'slack.incomingWebhooks.message'
  'auth:webhookid': string
  'body:text'?: string
  'body:blocks'?: any[]
}

export const SLACK: ApiDescription<SlackEntity, SlackEndpoint> = {
  meta: {
    name: 'Slack',
    url: 'https://slack.com',
    docs: 'https://api.slack.com/',
    config: 'https://api.slack.com/apps',
  },
  base: 'https://api.slack.com',
  api: {
    incomingWebhooks: {
      message: {
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
