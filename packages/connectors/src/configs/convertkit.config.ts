import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace ConvertKit {
  export type Entity = { account: any; subscribers: any }
  export type Endpoint =
    | { get: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint }

  export interface ConvertKitApiKey {
    'auth:api_key': string
  }

  export interface ConvertKitApiSecret {
    'auth:api_secret': string
  }

  export interface GetAccount extends ConvertKitApiSecret, RequestParams {
    kind: 'convertkit.account.get'
  }

  export interface ListSubscribers extends ConvertKitApiSecret, RequestParams {
    kind: 'convertkit.subscribers.list'
    'query:page'?: number
    'query:from'?: string
    'query:to'?: string
    'query:updated_from'?: string
    'query:updated_to'?: string
    'query:sort_order'?: 'asc' | 'desc'
    'query:sort_field'?: string
    'query:email_address'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'convertkit',
      name: 'ConvertKit',
      url: 'https://convertkit.com',
      docs: 'https://developers.convertkit.com',
      signup: 'https://app.convertkit.com/users/signup',
      pricing: 'https://convertkit.com/pricing',
      social: {
        twitter: 'convertkit',
        instagram: 'convertkit',
      },
      tags: ['web2'],
      category: 'marketing',
      type: 'email',
    },
    base: 'https://api.convertkit.com/v3',
    auth: {
      api_secret: {
        type: 'query',
      },
      api_key: {
        type: 'query',
      },
    },
    api: {
      account: {
        get: {
          interface: 'GetAccount',
          meta: {
            title: 'Show the current account',
            description: `Show the current account`,
            docs: 'https://developers.convertkit.com/#show-the-current-account',
          },
          method: 'GET',
          paths: [
            {
              name: 'account',
              type: 'static',
            },
          ],
        },
      },
      subscribers: {
        list: {
          interface: 'ListSubscribers',
          meta: {
            title: 'List subscribers',
            description: `Returns a list of your subscribers. For unsubscribes only, use the cancelled_at value for sort_field param (currently the only supported extra sort field). Search subscribers by email address by providing the email_address param.`,
            docs: 'https://developers.convertkit.com/#list-subscribers',
          },
          method: 'GET',
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

export default ConvertKit
