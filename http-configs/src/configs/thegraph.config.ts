import { RequestParams } from '../types/Request.types'
import { ApiDescription } from '../types/ApiDescription.type'

export namespace TheGraph {
  export type Entity = { hostedservice }
  export type Endpoint = { queryById; queryByName }

  export interface QueryById extends RequestParams {
    kind: 'thegraph.hostedservice.queryById'
    'body:query': string
    'auth:subgraphId': string
  }

  export interface QueryByName extends RequestParams {
    kind: 'thegraph.hostedservice.queryByName'
    'body:query': string
    'param:account': string
    'param:name': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'thegraph',
      name: 'TheGraph',
      url: 'https://thegraph.com/',
      docs: 'https://thegraph.com/docs/en/',
      tags: ['web3'],
      category: 'aggregation',
      type: 'indexer',
    },
    base: 'https://api.thegraph.com',
    api: {
      hostedservice: {
        queryById: {
          meta: {
            title: 'query',
            description: 'Query the GraphQL API of a hosted subgraph.',
            docs: 'https://thegraph.com/docs/en/',
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
        queryByName: {
          meta: {
            title: 'query',
            description: 'Query the GraphQL API of a hosted subgraph.',
            docs: 'https://thegraph.com/docs/en/',
          },
          method: 'POST',
          paths: [
            {
              name: 'subgraphs',
              type: 'static',
            },
            {
              name: 'name',
              type: 'static',
            },
            {
              name: 'account',
              type: 'param',
            },
            {
              name: 'name',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default TheGraph
