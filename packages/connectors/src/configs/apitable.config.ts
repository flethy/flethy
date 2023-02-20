import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace APITable {
  export type Entity = { records: any }
  export type Endpoint = { get: ApiDescriptionEndpoint }

  interface APITableBase {
    'auth:Authorization': string
  }

  export interface GetRecords extends APITableBase, RequestParams {
    kind: 'apitable.records.get'
    'param:tableId': string
    'query:gridViewId'?: string
    'query:fields'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'apitable',
      name: 'APITable',
      url: 'https://apitable.com/',
      docs: 'https://developers.apitable.com/',
      signup: 'https://apitable.com/login',
      pricing: 'https://apitable.com/pricing/',
      tags: ['web2'],
      category: 'collaboration',
      type: 'spreadsheet',
      social: {
        github: 'apitable',
        twitter: 'apitable_com',
      },
    },
    base: 'https://api.apitable.com/fusion/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      records: {
        get: {
          interface: 'GetRecords',
          meta: {
            title: 'Get Records',
            description: 'Get Records',
            docs: 'https://developers.apitable.com/api/get-records',
          },
          method: 'GET',
          paths: [
            {
              name: 'datasheets',
              type: 'static',
            },
            {
              name: 'tableId',
              type: 'param',
            },
            {
              name: 'records',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default APITable
