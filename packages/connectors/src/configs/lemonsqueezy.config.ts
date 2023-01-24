import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace LemonSqueezy {
  export type Entity = { users: any; products: any; subscriptions: any }
  export type Endpoint =
    | { me: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint }

  interface LemonSqueezyBase {
    'auth:Authorization': string
    'content-type': 'application/vnd.api+json'
    accept: 'application/vnd.api+json'
  }

  export interface RetrieveUser extends LemonSqueezyBase, RequestParams {
    kind: 'lemonsqueezy.users.me'
  }

  export interface ListProducts extends LemonSqueezyBase, RequestParams {
    kind: 'lemonsqueezy.products.list'
    'query:store_id'?: string
  }

  export interface ListSubscriptions extends LemonSqueezyBase, RequestParams {
    kind: 'lemonsqueezy.subscriptions.list'
    'query:store_id'?: string
    'query:order_id'?: string
    'query:order_item_id'?: string
    'query:product_id'?: string
    'query:variant_id'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'lemonsqueezy',
      name: 'LemonSqueezy',
      url: 'https://www.lemonsqueezy.com/',
      docs: 'https://docs.lemonsqueezy.com/',
      signup: 'https://app.lemonsqueezy.com/register',
      pricing: 'https://www.lemonsqueezy.com/pricing',
      tags: ['web2'],
      category: 'finance',
      type: 'payment',
      social: {
        twitter: 'lmsqueezy',
      },
    },
    base: 'https://api.lemonsqueezy.com/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      users: {
        me: {
          interface: 'RetrieveUser',
          meta: {
            title: 'Retrieve the authenticated user',
            description: 'Retrieve the authenticated user',
            docs: 'https://docs.lemonsqueezy.com/api/users#retrieve-the-authenticated-user',
          },
          method: 'GET',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
            {
              name: 'me',
              type: 'static',
            },
          ],
        },
      },
      products: {
        list: {
          interface: 'ListProducts',
          meta: {
            title: 'List all products',
            description: 'List all products',
            docs: 'https://docs.lemonsqueezy.com/api/products#list-all-products',
          },
          method: 'GET',
          paths: [
            {
              name: 'products',
              type: 'static',
            },
          ],
        },
      },
      subscriptions: {
        list: {
          interface: 'ListSubscriptions',
          meta: {
            title: 'List all subscriptions',
            description: 'List all subscriptions',
            docs: 'https://docs.lemonsqueezy.com/api/subscriptions#list-all-subscriptions',
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

export default LemonSqueezy
