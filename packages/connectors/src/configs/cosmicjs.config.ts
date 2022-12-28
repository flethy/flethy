import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace CosmicJS {
  export type Entity = { auth: any; graphql: any; products: any }
  export type Endpoint =
    | { token: ApiDescriptionEndpoint }
    | { query: ApiDescriptionEndpoint }
    | { byMetadataValue: ApiDescriptionEndpoint }

  interface CosmicJSBase {
    'auth:read_key': string
  }

  export interface Authenticate extends RequestParams {
    kind: 'cosmicjs.auth.token'
    'auth:email': string
    'auth:password': string
  }

  export interface GraphQLQuery extends RequestParams {
    kind: 'cosmicjs.graphql.query'
    'body:query': string
  }

  export interface GetProductsByMetadataValue
    extends CosmicJSBase,
      RequestParams {
    kind: 'cosmicjs.products.byMetadataValue'
    'param:bucketSlug': string
    'query:query': string
    'query:props': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'cosmicjs',
      name: 'CosmicJS',
      url: 'https://www.cosmicjs.com/',
      docs: 'https://docs.cosmicjs.com/',
      signup: 'https://app.cosmicjs.com/signup',
      pricing: 'https://www.cosmicjs.com/pricing',
      tags: ['web2'],
      category: 'marketing',
      type: 'content',
      social: {
        twitter: 'CosmicJS',
        github: 'cosmicjs',
      },
    },
    base: 'https://api.cosmicjs.com/v2',
    auth: {
      read_key: {
        type: 'query',
      },
    },
    api: {
      auth: {
        token: {
          interface: 'Authenticate',
          meta: {
            title: 'Authenticate',
            description: 'Authenticate',
            docs: 'https://docs.cosmicjs.com/api-reference/authentication',
          },
          method: 'POST',
          auth: {
            email: {
              type: 'body',
            },
            password: {
              type: 'body',
            },
          },
          paths: [
            {
              name: 'authenticate',
              type: 'static',
            },
          ],
        },
      },
      graphql: {
        query: {
          interface: 'GraphQLQuery',
          meta: {
            title: 'GraphQLQuery',
            description: 'GraphQLQuery',
            docs: 'https://docs.cosmicjs.com/examples/advanced-queries',
          },
          method: 'POST',
          base: 'https://graphql.cosmicjs.com',
          paths: [
            {
              name: 'v3',
              type: 'static',
            },
          ],
        },
      },
      products: {
        byMetadataValue: {
          interface: 'GetProductsByMetadataValue',
          meta: {
            title: 'Get products by metadata value',
            description: 'Get products by metadata value',
            docs: 'https://docs.cosmicjs.com/examples/advanced-queries',
          },
          method: 'GET',
          paths: [
            {
              name: 'buckets',
              type: 'static',
            },
            {
              name: 'bucketSlug',
              type: 'param',
            },
            {
              name: 'objects',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default CosmicJS
