import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Prepr {
  export type Entity = { graphql: any; items: any }
  export type Endpoint =
    | { query: ApiDescriptionEndpoint }
    | { singleItems: ApiDescriptionEndpoint }

  interface PreprBase {
    'auth:Authorization': string
  }

  export interface GraphQLQuery extends RequestParams {
    kind: 'prepr.graphql.query'
    'auth:access_token': string
    'body:query': string
  }

  export interface SingleItems extends PreprBase, RequestParams {
    kind: 'prepr.items.singleItems'
    'param:contentItemId': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'prepr',
      name: 'Prepr',
      url: 'https://prepr.io/',
      docs: 'https://docs.prepr.io/',
      signup: 'https://signup.prepr.io/',
      pricing: 'https://prepr.io/pricing',
      tags: ['web2'],
      category: 'marketing',
      type: 'content',
      social: {
        github: 'preprio',
        instagram: 'preprcms',
        twitter: 'preprcms',
      },
    },
    base: [
      {
        id: 'default',
        url: 'https://cdn.prepr.io',
      },
      {
        id: 'direct',
        url: 'https://api.eu1.prepr.io',
      },
    ],
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
            title: 'GraphQL API',
            description: `GraphQL API reference`,
            docs: 'https://docs.prepr.io/reference/graphql/v1/introduction',
          },
          method: 'POST',
          base: 'https://graphql.prepr.io',
          auth: {
            access_token: {
              type: 'path',
            },
          },
          paths: [
            {
              name: 'access_token',
              type: 'auth',
            },
          ],
        },
      },
      items: {
        singleItems: {
          interface: 'SingleItems',
          meta: {
            title: 'Fetching single items',
            description: `When you want to fetch just one content item of a given model you can use the single content item request.`,
            docs: 'https://docs.prepr.io/reference/rest/v1/fetching-single-items',
          },
          method: 'GET',
          paths: [
            {
              name: 'content_items',
              type: 'static',
            },
            {
              name: 'contentItemId',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Prepr
