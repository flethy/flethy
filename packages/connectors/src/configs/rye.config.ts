import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Rye {
  export type Entity = { graphql: any }
  export type Endpoint = { query: ApiDescriptionEndpoint }

  interface RyeBase {
    'auth:Authorization': {
      username: string
    }
  }

  export interface GraphQLQuery extends RyeBase, RequestParams {
    kind: 'rye.graphql.query'
    'body:query': string
    'body:variables'?: any
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'rye',
      name: 'Rye',
      url: 'https://www.rye.com/',
      docs: 'https://docs.rye.com/start-here/readme',
      signup: 'https://console.rye.com/register',
      tags: ['web2'],
      category: 'ecommerce',
      type: 'aggregation',
      social: {
        twitter: 'rye',
        github: 'rye-com',
      },
    },
    base: 'https://graphql.api.rye.com/v1',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      graphql: {
        query: {
          interface: 'GraphQLQuery',
          meta: {
            title: 'GraphQL Query',
            description: `GraphQL Query`,
            docs: 'https://docs.rye.com/start-here/quick-start',
          },
          method: 'POST',
          paths: [
            {
              name: 'query',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Rye
