import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace BitIo {
  export type Entity = { database: any }
  export type Endpoint = { query: ApiDescriptionEndpoint }

  interface BitIoBase {
    'auth:Authorization': string
  }

  export interface DatabaseQuery extends BitIoBase, RequestParams {
    kind: 'bitio.database.query'
    'query:data_format'?: string
    'body:query_string': string
    'body:database_name': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'bitio',
      name: 'BitIo',
      url: 'https://bit.io/',
      docs: 'https://docs.bit.io/docs',
      signup: 'https://bit.io/register',
      pricing: 'https://bit.io/pricing',
      tags: ['web2'],
      category: 'storage',
      type: 'database',
      social: {
        twitter: 'bitdotioinc',
      },
    },
    base: 'https://api.bit.io/v2beta',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      database: {
        query: {
          interface: 'DatabaseQuery',
          meta: {
            title: 'Execute a query',
            description: `Execute a query`,
            docs: 'https://docs.bit.io/reference/query_v2beta_query_post',
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

export default BitIo
