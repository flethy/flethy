import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Hasura {
  export type Entity = { graphql: any }
  export type Endpoint = { query: ApiDescriptionEndpoint }

  interface HasuraBase {
    'auth:x-hasura-admin-secret': string
  }

  export interface GraphQLQuery extends HasuraBase, RequestParams {
    kind: 'hasura.graphql.query'
    'subdomain:project': string
    'body:query': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'hasura',
      name: 'Hasura',
      url: 'https://hasura.io/',
      docs: 'https://hasura.io/docs/latest/index/',
      signup: 'https://cloud.hasura.io/signup',
      pricing: 'https://hasura.io/pricing/',
      tags: ['web2'],
      category: 'infra',
      type: 'database',
      social: {
        twitter: 'hasurahq',
        github: 'hasura',
        instagram: 'hasurahq',
      },
    },
    base: 'https://subdomain:project.hasura.app/v1',
    auth: {
      'x-hasura-admin-secret': {
        type: 'header',
      },
    },
    api: {
      graphql: {
        query: {
          interface: 'GraphQLQuery',
          meta: {
            title: 'GraphQL API Reference',
            description: `All GraphQL requests for queries, subscriptions and mutations are made to the GraphQL API.`,
            docs: 'https://hasura.io/docs/latest/api-reference/graphql-api/index/',
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

export default Hasura
