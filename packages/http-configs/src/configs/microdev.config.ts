import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace MicroDev {
  export type Entity = { storage: any }
  export type Endpoint = {
    dbCreateRecord: ApiDescriptionEndpoint
    dbReadRecord: ApiDescriptionEndpoint
    dbUpdateRecord: ApiDescriptionEndpoint
    dbDeleteRecord: ApiDescriptionEndpoint
    cacheDecrement: ApiDescriptionEndpoint
    cacheDelete: ApiDescriptionEndpoint
    cacheGet: ApiDescriptionEndpoint
    cacheIncrement: ApiDescriptionEndpoint
    cacheListKeys: ApiDescriptionEndpoint
    cacheSet: ApiDescriptionEndpoint
  }

  export interface MicroDevBase {
    'auth:Authorization': string
  }

  export interface StorageDbCreateRecord extends MicroDevBase, RequestParams {
    kind: 'microdev.storage.dbCreateRecord'
    'body:record': any
    'body:table': string
    'body:id'?: string
  }

  export interface StorageDbReadRecord extends MicroDevBase, RequestParams {
    kind: 'microdev.storage.dbReadRecord'
    'body:id'?: string
    'body:query'?: string
    'body:table'?: string
    'body:limit'?: number
    'body:offset'?: number
    'body:order'?: 'asc' | 'desc'
    'body:orderBy'?: string
  }

  export interface StorageDbUpdateRecord extends MicroDevBase, RequestParams {
    kind: 'microdev.storage.dbUpdateRecord'
    'body:record': any
    'body:table': string
    'body:id': string
  }

  export interface StorageDbDeleteRecord extends MicroDevBase, RequestParams {
    kind: 'microdev.storage.dbDeleteRecord'
    'body:table': string
    'body:id': string
  }

  export interface StorageCacheDecrement extends MicroDevBase, RequestParams {
    kind: 'microdev.storage.cacheDecrement'
    'body:key': string
    'body:value': number
  }

  export interface StorageCacheDelete extends MicroDevBase, RequestParams {
    kind: 'microdev.storage.cacheDelete'
    'body:key': string
  }

  export interface StorageCacheGet extends MicroDevBase, RequestParams {
    kind: 'microdev.storage.cacheGet'
    'body:key': string
  }

  export interface StorageCacheIncrement extends MicroDevBase, RequestParams {
    kind: 'microdev.storage.cacheIncrement'
    'body:key': string
    'body:value': number
  }

  export interface StorageCacheListKeys extends MicroDevBase, RequestParams {
    kind: 'microdev.storage.cacheListKeys'
  }

  export interface StorageCacheSet extends MicroDevBase, RequestParams {
    kind: 'microdev.storage.cacheSet'
    'body:key': string
    'body:value': string | number
    'body:ttl'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'microdev',
      name: 'MicroDev',
      url: 'https://m3o.com',
      docs: 'https://m3o.com/',
      tags: ['web2', 'web2'],
      category: 'cloud',
      type: 'services',
    },
    base: 'https://api.m3o.com/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      storage: {
        dbCreateRecord: {
          interface: 'StorageDbCreateRecord',
          meta: {
            title: 'Database: Create Record',
            description: `Create a record in the database. Optionally include an "id" field otherwise it's set automatically.`,
            docs: 'https://m3o.com/db/api#Create',
          },
          method: 'POST',
          paths: [
            {
              name: 'db',
              type: 'static',
            },
            {
              name: 'Create',
              type: 'static',
            },
          ],
        },
        dbReadRecord: {
          interface: 'StorageDbReadRecord',
          meta: {
            title: 'Database: Read Record',
            description: `Read data from a table. Lookup can be by ID or via querying any field in the record.`,
            docs: 'https://m3o.com/db/api#read',
          },
          method: 'POST',
          paths: [
            {
              name: 'db',
              type: 'static',
            },
            {
              name: 'Read',
              type: 'static',
            },
          ],
        },
        dbUpdateRecord: {
          interface: 'StorageDbUpdateRecord',
          meta: {
            title: 'Database: Update Record',
            description: `Update a record in the database. Include an "id" in the record to update.`,
            docs: 'https://m3o.com/db/api#Update',
          },
          method: 'POST',
          paths: [
            {
              name: 'db',
              type: 'static',
            },
            {
              name: 'Update',
              type: 'static',
            },
          ],
        },
        dbDeleteRecord: {
          interface: 'StorageDbDeleteRecord',
          meta: {
            title: 'Database: Delete Record',
            description: `Delete a record in the database by id.`,
            docs: 'https://m3o.com/db/api#Delete',
          },
          method: 'POST',
          paths: [
            {
              name: 'db',
              type: 'static',
            },
            {
              name: 'Delete',
              type: 'static',
            },
          ],
        },
        cacheDecrement: {
          interface: 'StorageCacheDecrement',
          meta: {
            title: 'Cache: Decrement',
            description: `Decrement a value (if it's a number). If key not found it is equivalent to set.`,
            docs: 'https://m3o.com/cache/api#Decrement',
          },
          method: 'POST',
          paths: [
            {
              name: 'cache',
              type: 'static',
            },
            {
              name: 'Decrement',
              type: 'static',
            },
          ],
        },
        cacheDelete: {
          interface: 'StorageCacheDelete',
          meta: {
            title: 'Cache: Delete',
            description: `Delete a value from the cache. If key not found a success response is returned.`,
            docs: 'https://m3o.com/cache/api#Delete',
          },
          method: 'POST',
          paths: [
            {
              name: 'cache',
              type: 'static',
            },
            {
              name: 'Delete',
              type: 'static',
            },
          ],
        },
        cacheGet: {
          interface: 'StorageCacheGet',
          meta: {
            title: 'Cache: Get',
            description: `Get an item from the cache by key. If key is not found, an empty response is returned.`,
            docs: 'https://m3o.com/cache/api#Get',
          },
          method: 'POST',
          paths: [
            {
              name: 'cache',
              type: 'static',
            },
            {
              name: 'Get',
              type: 'static',
            },
          ],
        },
        cacheIncrement: {
          interface: 'StorageCacheIncrement',
          meta: {
            title: 'Cache: Increment',
            description: `Increment a value (if it's a number). If key not found it is equivalent to set.`,
            docs: 'https://m3o.com/cache/api#Increment',
          },
          method: 'POST',
          paths: [
            {
              name: 'cache',
              type: 'static',
            },
            {
              name: 'Increment',
              type: 'static',
            },
          ],
        },
        cacheListKeys: {
          interface: 'StorageCacheListKeys',
          meta: {
            title: 'Cache: List Keys',
            description: `List all the available keys`,
            docs: 'https://m3o.com/cache/api#ListKeys',
          },
          method: 'POST',
          paths: [
            {
              name: 'cache',
              type: 'static',
            },
            {
              name: 'ListKeys',
              type: 'static',
            },
          ],
        },
        cacheSet: {
          interface: 'StorageCacheSet',
          meta: {
            title: 'Cache: Set',
            description: `Set an item in the cache. Overwrites any existing value already set.`,
            docs: 'https://m3o.com/cache/api#Set',
          },
          method: 'POST',
          paths: [
            {
              name: 'cache',
              type: 'static',
            },
            {
              name: 'Set',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default MicroDev
