import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Discord {
  export type Entity = { webhooks: any }
  export type Endpoint = { execute: ApiDescriptionEndpoint }

  export interface ExecuteWebhook extends RequestParams {
    kind: 'discord.webhooks.execute'
    'auth:webhookId': string
    'auth:webhookToken': string
    'query:wait'?: boolean
    'query:thread_id'?: string
    'body:content': string
    'body:username'?: string
    'body:avatar_url'?: string
    'body:tts'?: boolean
    'body:embeds'?: any[]
    'body:allowed_mentions'?: any
    'body:components'?: any
    'body:payload_json'?: string
    'body:attachments'?: any
    'body:flags'?: number
    'body:thread_name'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'discord',
      name: 'Discord',
      url: 'https://discord.com/',
      docs: 'https://discord.com/developers/docs',
      signup: 'https://discord.com/register',
      pricing: 'https://discord.com',
      tags: ['web2'],
      category: 'communication',
      type: 'messenger',
      social: {
        twitter: 'discord',
        instagram: 'discord',
      },
    },
    base: 'https://discord.com/api',
    api: {
      webhooks: {
        execute: {
          interface: 'ExecuteWebhook',
          meta: {
            title: 'Execute Webhook',
            description: 'Execute Webhook',
            docs: 'https://discord.com/developers/docs/resources/webhook#execute-webhook',
          },
          method: 'POST',
          responseType: 'text',
          paths: [
            {
              name: 'webhooks',
              type: 'static',
            },
            {
              name: 'webhookId',
              type: 'auth',
            },
            {
              name: 'webhookToken',
              type: 'auth',
            },
          ],
        },
      },
    },
  }
}

export default Discord
