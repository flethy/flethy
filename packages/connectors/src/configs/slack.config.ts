import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Slack {
  export type Entity = { incomingWebhooks: any; chat: any; conversations: any }
  export type Endpoint =
    | { message: ApiDescriptionEndpoint }
    | { postMessage: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint }

  export interface IncomingWebhooksMessage extends RequestParams {
    kind: 'slack.incomingWebhooks.message'
    'auth:webhookid': string
    'body:text'?: string
    'body:blocks'?: any[]
  }

  export interface SlackApiBase {
    'auth:Authorization': string
  }

  export interface ChatPostMessage extends SlackApiBase, RequestParams {
    kind: 'slack.chat.postMessage'
    'body:channel': string
    'body:text': string
  }

  export interface ConversationsList extends SlackApiBase, RequestParams {
    kind: 'slack.conversations.list'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'slack',
      name: 'Slack',
      url: 'https://slack.com',
      docs: 'https://api.slack.com/',
      config: 'https://api.slack.com/apps',
      social: {
        twitter: 'slackhq',
      },
      tags: ['web2'],
      category: 'communication',
      type: 'messenger',
    },
    base: 'https://slack.com/api',
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
      chat: {
        postMessage: {
          interface: 'ChatPostMessage',
          meta: {
            title: 'Publishing your message',
            description: 'Publishing your message',
            docs: 'https://api.slack.com/messaging/sending#publishing',
          },
          method: 'POST',
          auth: {
            Authorization: {
              type: 'header:bearer',
            },
          },
          paths: [
            {
              name: 'chat.postMessage',
              type: 'static',
            },
          ],
        },
      },
      conversations: {
        list: {
          interface: 'ConversationsList',
          meta: {
            title: 'Picking the right conversation',
            description: 'Picking the right conversation',
            docs: 'https://api.slack.com/messaging/sending#conversations',
          },
          method: 'GET',
          auth: {
            Authorization: {
              type: 'header:bearer',
            },
          },
          paths: [
            {
              name: 'conversations.list',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Slack
