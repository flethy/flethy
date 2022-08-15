import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Zora {
  export type Entity = { graphql: any }
  export type Endpoint = { query: ApiDescriptionEndpoint }

  export interface Query extends RequestParams {
    kind: 'zora.graphql.query'
    'body:query': string
    'auth:X-API-KEY'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'zora',
      name: 'Zora',
      url: 'https://zora.co/',
      docs: 'https://docs.zora.co/',
      social: {
        twitter: 'ourzora',
        instagram: 'our.zora',
      },
      tags: ['web3', 'nft'],
      category: 'aggregation',
      type: 'indexer',
    },
    base: 'https://api.zora.co/graphql',
    auth: {
      'X-API-KEY': {
        type: 'header',
      },
    },
    api: {
      graphql: {
        query: {
          interface: 'Query',
          meta: {
            title: 'Query',
            description: 'GraphQL Interface',
            docs: 'https://docs.zora.co/docs/zora-api/query-formatting',
          },
          method: 'POST',
        },
      },
    },
  }
}

export default Zora
