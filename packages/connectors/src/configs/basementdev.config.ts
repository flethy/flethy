import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace BasementDev {
  export type Entity = { graphql: any }
  export type Endpoint = { query: ApiDescriptionEndpoint }

  interface BasementDevBase {
    'auth:X-Basement-API-Key'?: string
  }

  export interface GraphQLQuery extends BasementDevBase, RequestParams {
    kind: 'basementdev.graphql.query'
    'header:Content-Type': 'application/graphql'
    'body:body': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'basementdev',
      name: 'BasementDev',
      url: 'https://basement.dev/',
      docs: 'https://docs.basement.dev/',
      signup: 'https://basement.dev/pricing',
      pricing: 'https://basement.dev/pricing',
      tags: ['web3'],
      category: 'aggregation',
      type: 'indexer',
      social: {
        twitter: 'basementapp_xyz',
        github: 'basementdev',
      },
    },
    base: 'https://beta.basement.dev/v2',
    auth: {
      'X-Basement-API-Key': {
        type: 'header',
      },
    },
    api: {
      graphql: {
        query: {
          interface: 'GraphQLQuery',
          meta: {
            title: 'GraphQL API',
            description: `GraphQL API`,
            docs: 'https://docs.basement.dev/api/',
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

export default BasementDev
