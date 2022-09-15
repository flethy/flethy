import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace DatoCMS {
  export type Entity = { graphql: any }
  export type Endpoint = { query: ApiDescriptionEndpoint }

  interface DatoCMSBase {
    'auth:Authorization': string
    'header:X-Environment'?: string
    'header:X-Exclude-Invalid'?: boolean
  }

  export interface Query extends DatoCMSBase, RequestParams {
    kind: 'datocms.graphql.query'
    'body:query': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'datocms',
      name: 'DatoCMS',
      url: 'https://www.datocms.com',
      docs: 'https://www.datocms.com/docs',
      signup: 'https://dashboard.datocms.com/signup',
      pricing: 'https://www.datocms.com/pricing',
      tags: ['web2'],
      category: 'marketing',
      type: 'content',
      social: {
        twitter: 'datocms',
      },
    },
    base: 'https://graphql.datocms.com',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      graphql: {
        query: {
          interface: 'Query',
          meta: {
            title: 'Query',
            description: `Query`,
            docs: 'https://www.datocms.com/docs/content-delivery-api/your-first-request',
          },
          method: 'POST',
        },
      },
    },
  }
}

export default DatoCMS
