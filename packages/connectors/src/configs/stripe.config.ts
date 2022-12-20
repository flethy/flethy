import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Stripe {
  export type Entity = { products: any; prices: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  interface StripeBase {
    'auth:Authorization': {
      username: string
    }
  }

  export interface ListProducts extends StripeBase, RequestParams {
    kind: 'stripe.products.list'
    'query:active'?: boolean
    'query:created'?: string
    'query:ending_before'?: string
    'query:ids'?: string
    'query:limit'?: string
    'query:shippable'?: string
    'query:starting_after'?: string
    'query:url'?: string
  }

  export interface ListPrices extends StripeBase, RequestParams {
    kind: 'stripe.prices.list'
    'query:active'?: boolean
    'query:currency'?: string
    'query:product'?: string
    'query:type'?: 'recurring' | 'one_time'
    'query:created'?: string
    'query:ending_before'?: string
    'query:ids'?: string
    'query:limit'?: string
    'query:lookup_keys'?: string
    'query:starting_after'?: string
    'query:recurring'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'stripe',
      name: 'Stripe',
      url: 'https://stripe.com',
      docs: 'https://stripe.com/docs/api',
      signup: 'https://dashboard.stripe.com/register',
      pricing: 'https://stripe.com/pricing',
      tags: ['web2'],
      category: 'finance',
      type: 'payment',
      social: {
        twitter: 'stripe',
      },
    },
    base: 'https://api.stripe.com/v1',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      products: {
        list: {
          interface: 'ListProducts',
          meta: {
            title: 'List all products',
            description: `List all products`,
            docs: 'https://stripe.com/docs/api/products/list',
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
      prices: {
        list: {
          interface: 'ListPrices',
          meta: {
            title: 'List all prices',
            description: `List all prices`,
            docs: 'https://stripe.com/docs/api/prices/list',
          },
          method: 'GET',
          paths: [
            {
              name: 'prices',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Stripe
