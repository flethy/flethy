import { RequestParams } from '../controllers/HttpRequestConfig'
import { ApiDescription } from '../types/ApiDescription.type'

export type TheGraphEntity = { hostedservice }
export type TheGraphEndpoint = { query }

export interface TheGraphQuery extends RequestParams {
  kind: 'thegraph.hostedservice.query'
  'body:query': string
  'auth:subgraphId': string
}

export const THE_GRAPH: ApiDescription<TheGraphEntity, TheGraphEndpoint> = {
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
