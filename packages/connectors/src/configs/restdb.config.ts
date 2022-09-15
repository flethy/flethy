import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace RestDB {
  export type Entity = { collections: any }
  export type Endpoint = { get: ApiDescriptionEndpoint }

  interface RestDbBase {
    'auth:x-apikey': string
    'subdomain:databaseId': string
  }

  export interface GetItemsFromCollection extends RestDbBase, RequestParams {
    kind: 'restdb.collections.get'
    'param:collection': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'restdb',
      name: 'RestDB',
      url: 'https://restdb.io',
      docs: 'https://restdb.io/docs/rest-api',
      tags: ['web2'],
      category: 'infra',
      type: 'database',
      social: {
        twitter: 'restdbio',
      },
    },
    base: 'https://subdomain:databaseId.restdb.io/rest',
    auth: {
      'x-apikey': {
        type: 'header',
      },
    },
    api: {
      collections: {
        get: {
          interface: 'GetItemsFromCollection',
          meta: {
            title: 'Get Items from Collection',
            description: `Get Items from Collection`,
            docs: 'https://restdb.io/docs/rest-api',
          },
          method: 'GET',
          paths: [
            {
              name: 'collection',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default RestDB
