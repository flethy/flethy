import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Fleek {
  export type Entity = { graphql: any }
  export type Endpoint = { query: ApiDescriptionEndpoint }

  interface FleekBase {
    'auth:Authorization': string
  }

  export interface GraphQLQuery extends FleekBase, RequestParams {
    kind: 'fleek.graphql.query'
    'body:query': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'fleek',
      name: 'Fleek',
      url: 'https://fleek.co/',
      docs: 'https://docs.fleek.co/',
      signup: 'http://app.fleek.co/',
      pricing: 'https://fleek.co/pricing/',
      tags: ['web3'],
      category: 'infra',
      type: 'hosting',
      social: {
        twitter: 'fleekxyz',
      },
    },
    base: 'https://api.fleek.co',
    auth: {
      Authorization: {
        type: 'header',
      },
    },
    api: {
      graphql: {
        query: {
          interface: 'GraphQLQuery',
          meta: {
            title: 'GraphQL Query',
            description: `GraphQL Query`,
            docs: 'https://docs.fleek.co/fleek-api/overview/',
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

export default Fleek
