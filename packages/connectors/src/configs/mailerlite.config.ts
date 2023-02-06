import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace MailerLite {
  export type Entity = { subscribers: any }
  export type Endpoint = {
    list: ApiDescriptionEndpoint
    create: ApiDescriptionEndpoint
  }

  interface MailerLiteBase {
    'auth:Authorization': string
  }

  export interface ListSubscribers extends MailerLiteBase, RequestParams {
    kind: 'mailerlite.subscribers.list'
    'query:filter[status]'?:
      | 'active'
      | 'unsubscribed'
      | 'unconfirmed'
      | 'bounced'
      | 'junk'
    'query:limit'?: number
    'query:cursor'?: string
  }

  export interface CreateSubscriber extends MailerLiteBase, RequestParams {
    kind: 'mailerlite.subscribers.create'
    'body:email': string
    'body:fields'?: { [key: string]: string }
    'body:groups'?: string[]
    'body:status'?:
      | 'active'
      | 'unsubscribed'
      | 'unconfirmed'
      | 'bounced'
      | 'junk'
    'body:subscribed_at'?: string
    'body:ip_address'?: string
    'body:opted_in_at'?: string
    'body:optin_ip'?: string
    'body:unsubscribed_at'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'mailerlite',
      name: 'MailerLite',
      url: 'https://www.mailerlite.com/',
      docs: 'https://developers.mailerlite.com/',
      signup: 'https://www.mailerlite.com/signup',
      pricing: 'https://www.mailerlite.com/pricing',
      tags: ['web2'],
      category: 'marketing',
      type: 'email',
      social: {
        twitter: 'mailerlite',
        github: 'mailerlite',
      },
    },
    base: 'https://connect.mailerlite.com/api',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      subscribers: {
        list: {
          interface: 'ListSubscribers',
          meta: {
            title: 'List all subscribers',
            description: 'List all subscribers',
            docs: 'https://developers.mailerlite.com/docs/subscribers.html#list-all-subscribers',
          },
          method: 'GET',
          paths: [
            {
              name: 'subscribers',
              type: 'static',
            },
          ],
        },
        create: {
          interface: 'CreateSubscriber',
          meta: {
            title: 'Create/upsert subscriber',
            description: 'Create/upsert subscriber',
            docs: 'https://developers.mailerlite.com/docs/subscribers.html#create-upsert-subscriber',
          },
          method: 'POST',
          paths: [
            {
              name: 'subscribers',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default MailerLite
