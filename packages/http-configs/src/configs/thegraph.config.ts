import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace TheGraph {
  export type Entity = { hostedservice: any }
  export type Endpoint = {
    queryById: ApiDescriptionEndpoint
    queryByName: ApiDescriptionEndpoint
  }

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
      social: {
        twitter: 'graphprotocol',
        github: 'graphprotocol',
      },
      tags: ['web3'],
      category: 'aggregation',
      type: 'indexer',
    },
    base: 'https://api.thegraph.com',
    api: {
      hostedservice: {
        queryById: {
          interface: 'QueryById',
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
          interface: 'QueryByName',
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
