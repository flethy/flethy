import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Fibery {
  export type Entity = { schema: any; graphql: any }
  export type Endpoint =
    | { get: ApiDescriptionEndpoint }
    | { query: ApiDescriptionEndpoint }

  interface FiberyBase {
    'auth:Authorization': string
    'subdomain:workspace': string
  }

  export interface GetSchema extends FiberyBase, RequestParams {
    kind: 'fibery.schema.get'
    'body:body': [{ command: 'fibery.schema/query' }]
  }

  export interface GraphQLQuery extends FiberyBase, RequestParams {
    kind: 'fibery.graphql.query'
    'param:spaceId': string
    'body:query': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'fibery',
      name: 'Fibery',
      url: 'https://fibery.io',
      docs: 'https://api.fibery.io/#introduction',
      signup: 'https://fibery.io/sign-up',
      pricing: 'https://fibery.io/pricing',
      tags: ['web2'],
      category: 'collaboration',
      type: 'spreadsheet',
      social: {
        twitter: 'fibery_io',
      },
    },
    base: 'https://subdomain:workspace.fibery.io/api',
    auth: {
      Authorization: {
        type: 'header:token',
      },
    },
    api: {
      schema: {
        get: {
          interface: 'GetSchema',
          meta: {
            title: 'Schema',
            description: `Schema`,
            docs: 'https://api.fibery.io/#schema',
          },
          method: 'POST',
          paths: [
            {
              name: 'commands',
              type: 'static',
            },
          ],
        },
      },
      graphql: {
        query: {
          interface: 'GraphQLQuery',
          meta: {
            title: 'GraphQL Query',
            description: `GraphQL Query`,
            docs: 'https://api.fibery.io/graphql.html#queries',
          },
          method: 'POST',
          paths: [
            {
              name: 'graphql',
              type: 'static',
            },
            {
              name: 'space',
              type: 'static',
            },
            {
              name: 'spaceId',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Fibery
