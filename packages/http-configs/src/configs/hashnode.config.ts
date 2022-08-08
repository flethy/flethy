import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Hashnode {
  export type Entity = { graphql: any }
  export type Endpoint = { query: ApiDescriptionEndpoint }

  interface HashnodeBase {
    Authorization: string
  }

  export interface GraphQLQuery extends HashnodeBase, RequestParams {
    kind: 'hashnode.graphql.query'
    'body:query': string
    'body:variables'?: any
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'hashnode',
      name: 'Hashnode',
      url: 'https://hashnode.com/',
      docs: 'https://api.hashnode.com/',
      tags: ['web2'],
      category: 'marketing',
      type: 'blogging',
      social: {
        twitter: 'hashnode',
        instagram: 'hashnode',
      },
    },
    base: 'https://api.hashnode.com',
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
            docs: 'https://api.hashnode.com/',
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

export default Hashnode
