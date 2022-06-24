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
      },
    },
  }
}

export default MicroDev
