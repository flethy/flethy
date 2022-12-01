import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Prismic {
  export type Entity = { entries: any; graphql: any }
  export type Endpoint =
    | { list: ApiDescriptionEndpoint }
    | { query: ApiDescriptionEndpoint }

  interface PrismicBase {
    'subdomain:repo': string
    'auth:access_token'?: string
  }

  export interface ListEntries extends PrismicBase, RequestParams {
    kind: 'prismic.entries.list'
  }

  export interface GraphQLQuery extends PrismicBase, RequestParams {
    kind: 'prismic.graphql.query'
    'body:query': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'prismic',
      name: 'Prismic',
      url: 'https://prismic.io/',
      docs: 'https://prismic.io/docs',
      signup: 'https://prismic.io/dashboard/signup',
      pricing: 'https://prismic.io/pricing',
      tags: ['web2'],
      category: 'marketing',
      type: 'content',
      social: {
        twitter: 'prismicio',
      },
    },
    base: 'https://subdomain:repo.cdn.prismic.io',
    auth: {
      access_token: {
        type: 'query',
      },
    },
    api: {
      entries: {
        list: {
          interface: 'ListEntries',
          meta: {
            title: 'List Entries',
            description: `List Entries`,
            docs: 'https://prismic.io/docs/api',
          },
          method: 'GET',
          paths: [
            {
              name: 'api',
              type: 'static',
            },
            {
              name: 'v2',
              type: 'static',
            },
          ],
        },
      },
      graphql: {
        query: {
          interface: 'GraphQLQuery',
          meta: {
            title: 'GraphQL',
            description: `GraphQL`,
            docs: 'https://prismic.io/docs/api',
          },
          method: 'POST',
          paths: [
            {
              name: 'graphql',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Prismic
