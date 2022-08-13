import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Linear {
  export type Entity = { graphql: any }
  export type Endpoint = { query: ApiDescriptionEndpoint }

  export interface LinearBase {
    'auth:Authorization': string
  }

  export interface GraphQLQuery extends LinearBase, RequestParams {
    kind: 'linear.graphql.query'
    'body:query': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'linear',
      name: 'Linear',
      url: 'https://linear.app',
      docs: 'https://developers.linear.app/docs',
      social: {
        twitter: 'linear',
        github: 'linear',
      },
      tags: ['web2'],
      category: 'utils',
      type: 'issueticketing',
    },
    base: 'https://api.linear.app/graphql',
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
            title: 'GraphQL API',
            description: `GraphQL API`,
            docs: 'https://developers.linear.app/docs/graphql/working-with-the-graphql-api',
          },
          method: 'POST',
        },
      },
    },
  }
}

export default Linear
