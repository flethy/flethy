import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace EasyDb {
  export type Entity = { core: any }
  export type Endpoint = {
    get: ApiDescriptionEndpoint
    put: ApiDescriptionEndpoint
    list: ApiDescriptionEndpoint
    delete: ApiDescriptionEndpoint
  }

  interface EasyDbBase {
    'param:databaseId': string
    'auth:token': string
  }

  export interface Get extends EasyDbBase, RequestParams {
    kind: 'easydb.core.get'
    'param:key': string
  }

  export interface List extends EasyDbBase, RequestParams {
    kind: 'easydb.core.list'
  }

  export interface Put extends EasyDbBase, RequestParams {
    kind: 'easydb.core.put'
    'body:key': string
    'body:value': string
  }

  export interface Delete extends EasyDbBase, RequestParams {
    kind: 'easydb.core.delete'
    'body:key': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'easydb',
      name: 'EasyDb',
      url: 'https://easydb.io',
      docs: 'https://easydb.io/docs',
      tags: ['web3'],
      category: 'aggregation',
      type: 'indexer',
      social: {
        twitter: 'JustJake',
      },
    },
    base: 'https://app.easydb.io',
    auth: {
      token: {
        type: 'header',
      },
    },
    api: {
      core: {
        get: {
          interface: 'Get',
          meta: {
            title: 'Get',
            description: `Get`,
            docs: 'https://easydb.io/docs',
          },
          method: 'GET',
          paths: [
            {
              name: 'database',
              type: 'static',
            },
            {
              name: 'databaseId',
              type: 'param',
            },
            {
              name: 'key',
              type: 'param',
            },
          ],
        },
        put: {
          interface: 'Put',
          meta: {
            title: 'Put',
            description: `Put`,
            docs: 'https://easydb.io/docs',
          },
          method: 'POST',
          paths: [
            {
              name: 'database',
              type: 'static',
            },
            {
              name: 'databaseId',
              type: 'param',
            },
          ],
        },
        list: {
          interface: 'List',
          meta: {
            title: 'List',
            description: `List`,
            docs: 'https://easydb.io/docs',
          },
          method: 'GET',
          paths: [
            {
              name: 'database',
              type: 'static',
            },
            {
              name: 'databaseId',
              type: 'param',
            },
          ],
        },
        delete: {
          interface: 'Delete',
          meta: {
            title: 'Delete',
            description: `Delete`,
            docs: 'https://easydb.io/docs',
          },
          method: 'DELETE',
          paths: [
            {
              name: 'database',
              type: 'static',
            },
            {
              name: 'databaseId',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default EasyDb
