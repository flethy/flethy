import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Shopify {
  export type Entity = { graphql: any; products: any }
  export type Endpoint =
    | { query: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint }

  interface ShopifyBase {
    'auth:X-Shopify-Access-Token': string
    'subdomain:shopId': string
  }

  export interface GraphQLQuery extends ShopifyBase, RequestParams {
    kind: 'shopify.graphql.query'
    'header:Content-Type': 'application/graphql'
    'body:body': string
  }

  export interface ListProducts extends ShopifyBase, RequestParams {
    kind: 'shopify.products.list'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'shopify',
      name: 'Shopify',
      url: 'https://www.shopify.com/',
      docs: 'https://shopify.dev/api',
      signup: 'https://accounts.shopify.com/signup',
      pricing: 'https://www.shopify.com/pricing',
      tags: ['web2'],
      category: 'ecommerce',
      type: 'shop',
      social: {
        twitter: 'Shopify',
      },
    },
    base: 'https://subdomain:shopId.myshopify.com/admin/api/2022-10',
    auth: {
      'X-Shopify-Access-Token': {
        type: 'header',
      },
    },
    api: {
      graphql: {
        query: {
          interface: 'GraphQLQuery',
          meta: {
            title: 'GraphQL Query',
            description: 'GraphQL Query',
            docs: 'https://shopify.dev/apps/auth/admin-app-access-tokens',
          },
          method: 'POST',
          paths: [
            {
              name: 'graphql.json',
              type: 'static',
            },
          ],
        },
      },
      products: {
        list: {
          interface: 'ListProducts',
          meta: {
            title: 'List Products',
            description: 'List Products',
            docs: 'https://shopify.dev/apps/auth/admin-app-access-tokens',
          },
          method: 'GET',
          paths: [
            {
              name: 'products.json',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Shopify
