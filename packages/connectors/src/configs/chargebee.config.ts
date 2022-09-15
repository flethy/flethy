import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Chargebee {
  export type Entity = { subscriptions: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  interface ChargebeeBase {
    'auth:Authorization': {
      username: string
    }
    'subdomain:chargebeeSlug': string
  }

  export interface ListSubscriptions extends ChargebeeBase, RequestParams {
    kind: 'chargebee.subscriptions.list'
    'query:limit'?: number
    'query:offset'?: number
    'query:include_deleted'?: boolean
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'chargebee',
      name: 'Chargebee',
      url: 'https://www.chargebee.com',
      docs: 'https://apidocs.eu.chargebee.com/docs/api',
      signup: 'https://www.chargebee.com/trial-signup',
      pricing: 'https://www.chargebee.com/pricing',
      tags: ['web2'],
      category: 'finance',
      type: 'subscription-management',
      social: {
        twitter: 'chargebee',
      },
    },
    base: 'https://subdomain:chargebeeSlug.chargebee.com/api/v2',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      subscriptions: {
        list: {
          interface: 'ListSubscriptions',
          meta: {
            title: 'List subscriptions',
            description: `Returns a list of subscriptions meeting all the conditions specified in the filter parameters below.`,
            docs: 'https://apidocs.eu.chargebee.com/docs/api/subscriptions?prod_cat_ver=2#list_subscriptions',
          },
          method: 'GET',
          paths: [
            {
              name: 'subscriptions',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Chargebee
