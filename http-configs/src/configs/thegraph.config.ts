import { RequestParams } from '../types/Request.types'
import { ApiDescription } from '../types/ApiDescription.type'

export namespace TheGraph {
  export type Entity = { hostedservice }
  export type Endpoint = { query }

  export interface Query extends RequestParams {
    kind: 'thegraph.hostedservice.query'
    'body:query': string
    'auth:subgraphId': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      name: 'TheGraph',
      url: 'https://thegraph.com/',
      docs: 'https://thegraph.com/docs/en/',
    },
    base: 'https://api.thegraph.com',
    api: {
      hostedservice: {
        query: {
          meta: {
            title: 'query',
            description: 'Query the GraphQL API of a hosted subgraph.',
            docs: 'https://thegraph.com/docs/en/',
            tags: ['web3'],
            category: 'aggregation',
            type: 'indexer',
          },
          method: 'POST',
          paths: [
            {
              name: 'subgraphs',
              type: 'static',
            },
            {
              name: 'id',
              type: 'static',
            },
            {
              name: 'subgraphId',
              type: 'auth',
            },
          ],
        },
      },
    },
  }
}
