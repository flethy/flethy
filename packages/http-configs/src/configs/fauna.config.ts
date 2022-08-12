import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Fauna {
  export type Entity = { graphql: any }
  export type Endpoint = { query: ApiDescriptionEndpoint }

  export interface FaunaBase {
    'auth:Authorization': string
  }

  type FaunaBaseUrl = 'classic' | 'us' | 'eu' | 'preview'

  export interface GraphQLQuery extends FaunaBase, RequestParams {
    kind: 'fauna.graphql.query'
    'body:query': string
    baseId: FaunaBaseUrl
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'fauna',
      name: 'Fauna',
      url: 'https://fauna.com',
      docs: 'https://docs.fauna.com',
      social: {
        twitter: 'fauna',
      },
      tags: ['web2'],
      category: 'storage',
      type: 'database',
    },
    base: [
      {
        id: 'classic',
        url: 'https://graphql.fauna.com',
      },
      {
        id: 'us',
        url: 'https://graphql.us.fauna.com',
      },
      {
        id: 'eu',
        url: 'https://graphql.eu.fauna.com',
      },
      {
        id: 'preview',
        url: 'https://graphql.fauna-preview.com',
      },
    ],
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      graphql: {
        query: {
          interface: 'GraphQLQuery',
          meta: {
            title: 'GraphQL Query',
            description: `GraphQL Query`,
            docs: 'https://docs.fauna.com/fauna/v4/api/graphql/',
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

export default Fauna
