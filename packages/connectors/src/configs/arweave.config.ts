import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Arweave {
  export type Entity = { graphql: any; data: any }
  export type Endpoint =
    | {
        query: ApiDescriptionEndpoint
      }
    | { get: ApiDescriptionEndpoint }

  export interface GraphQLQuery extends RequestParams {
    kind: 'arweave.graphql.query'
    'body:query': string
    'body:variables'?: any
  }

  export interface GetData extends RequestParams {
    kind: 'arweave.data.get'
    'param:transactionId': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'arweave',
      name: 'Arweave',
      url: 'https://www.arweave.org/',
      docs: 'https://www.arweave.org/',
      signup: 'https://www.arweave.org/',
      pricing: 'https://www.arweave.org/',
      tags: ['web3'],
      category: 'infra',
      type: 'storage',
      social: {
        twitter: 'ArweaveEco',
        github: 'ArweaveTeam',
      },
    },
    base: 'https://arweave.net',
    api: {
      graphql: {
        query: {
          interface: 'GraphQLQuery',
          meta: {
            title: 'GraphQL Query',
            description: 'GraphQL Query',
            docs: 'https://arweave.net/graphql',
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
      data: {
        get: {
          interface: 'GetData',
          meta: {
            title: 'Get Data',
            description: 'Get Data',
            docs: 'https://arweave.net',
          },
          method: 'GET',
          paths: [
            {
              name: 'transactionId',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Arweave
