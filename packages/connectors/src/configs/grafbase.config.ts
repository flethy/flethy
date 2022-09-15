import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace GrafBase {
  export type Entity = { graphql: any }
  export type Endpoint = { query: ApiDescriptionEndpoint }

  interface GrafbaseBase {
    'auth:Authorization': string
    'subdomain:project': string
  }

  export interface GraphQLQuery extends GrafbaseBase, RequestParams {
    kind: 'grafbase.graphql.query'
    'body:query': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'grafbase',
      name: 'GrafBase',
      url: 'https://grafbase.com',
      docs: 'https://grafbase.com/docs',
      signup: 'https://grafbase.com/sign-up',
      social: {
        twitter: 'grafbase',
        github: 'grafbase',
      },
      tags: ['web2'],
      category: 'infra',
      type: 'serverless',
    },
    base: 'https://subdomain:project.grafbase.app',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      graphql: {
        query: {
          interface: 'GraphQLQuery',
          meta: {
            title: 'GraphQL Query',
            description: `GraphQL Query`,
            docs: 'https://grafbase.com/docs',
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

export default GrafBase
