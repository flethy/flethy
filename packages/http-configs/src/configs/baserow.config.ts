import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace BaseRow {
  export type Entity = { core: any }
  export type Endpoint = {
    create: ApiDescriptionEndpoint
    get: ApiDescriptionEndpoint
  }

  export interface BaseRowBase {
    'auth:Authorization': string
  }

  export interface CreateRow extends BaseRowBase, RequestParams {
    kind: 'baserow.core.create'
    'param:tableId': string
    'body:body': any
    'query:user_field_names'?: boolean
    'query:before'?: number
  }

  export interface GetRows extends BaseRowBase, RequestParams {
    kind: 'baserow.core.get'
    'param:tableId': string
    'query:user_field_names'?: boolean
    'query:page'?: number
    'query:size'?: number
    'query:search'?: string
    'query:orderby'?: string
    'query:include'?: string
    'query:exclude'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'baserow',
      name: 'BaseRow',
      url: 'https://baserow.io/',
      docs: 'https://baserow.io/api-docs/',
      social: {
        twitter: 'baserow',
      },
      tags: ['web2'],
      category: 'storage',
      type: 'database',
    },
    base: 'https://api.baserow.io',
    auth: {
      Authorization: {
        type: 'header:token',
      },
    },
    api: {
      core: {
        create: {
          interface: 'CreateRow',
          meta: {
            title: 'CreateRow',
            description: `CreateRow`,
            docs: 'https://baserow.io/api-docs',
          },
          method: 'POST',
          options: {
            pathTailingSlash: true,
          },
          paths: [
            {
              name: 'api',
              type: 'static',
            },
            {
              name: 'database',
              type: 'static',
            },
            {
              name: 'rows',
              type: 'static',
            },
            {
              name: 'table',
              type: 'static',
            },
            {
              name: 'tableId',
              type: 'param',
            },
          ],
        },
        get: {
          interface: 'GetRows',
          meta: {
            title: 'GetRows',
            description: `GetRows`,
            docs: 'https://baserow.io/api-docs',
          },
          method: 'GET',
          options: {
            pathTailingSlash: true,
          },
          paths: [
            {
              name: 'api',
              type: 'static',
            },
            {
              name: 'database',
              type: 'static',
            },
            {
              name: 'rows',
              type: 'static',
            },
            {
              name: 'table',
              type: 'static',
            },
            {
              name: 'tableId',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default BaseRow
