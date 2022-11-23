import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Sheetson {
  export type Entity = { manage: any }
  export type Endpoint = {
    add: ApiDescriptionEndpoint
    read: ApiDescriptionEndpoint
    update: ApiDescriptionEndpoint
    delete: ApiDescriptionEndpoint
  }

  interface SheetsonBase {
    'auth:Authorization': string
    'auth:X-Spreadsheet-Id': string
  }

  export interface ReadData extends SheetsonBase, RequestParams {
    kind: 'sheetson.manage.read'
    'param:sheetTab': string
    'param:rowIndex': number
  }

  export interface AddData extends SheetsonBase, RequestParams {
    kind: 'sheetson.manage.add'
    'param:sheetTab': string
    'body:body': { [key: string]: string | number | boolean }
  }

  export interface UpdateData extends SheetsonBase, RequestParams {
    kind: 'sheetson.manage.add'
    'param:sheetTab': string
    'param:rowIndex': number
    'body:body': { [key: string]: string | number | boolean }
  }

  export interface DeleteData extends SheetsonBase, RequestParams {
    kind: 'sheetson.manage.delete'
    'param:sheetTab': string
    'param:rowIndex': number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'sheetson',
      name: 'Sheetson',
      url: 'https://sheetson.com/',
      docs: 'https://docs.sheetson.com',
      signup: 'https://sheetson.com/',
      pricing: 'https://sheetson.com/#pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'spreadsheet',
      social: {
        twitter: 'sheetson',
      },
    },
    base: 'https://api.sheetson.com/v2',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
      'X-Spreadsheet-Id': {
        type: 'header',
      },
    },
    api: {
      manage: {
        read: {
          interface: 'ReadData',
          meta: {
            title: 'Retrieving Rows',
            description: `Retrieving Rows`,
            docs: 'https://docs.sheetson.com/manage-data/retrieve-rows/',
          },
          method: 'GET',
          paths: [
            {
              name: 'sheets',
              type: 'static',
            },
            {
              name: 'sheetTab',
              type: 'param',
            },
            {
              name: 'rowIndex',
              type: 'param',
            },
          ],
        },
        add: {
          interface: 'AddData',
          meta: {
            title: 'Creating Rows',
            description: `Creating Rows`,
            docs: 'https://docs.sheetson.com/manage-data/create-rows/',
          },
          method: 'POST',
          paths: [
            {
              name: 'sheets',
              type: 'static',
            },
            {
              name: 'sheetTab',
              type: 'param',
            },
          ],
        },
        delete: {
          interface: 'DeleteData',
          meta: {
            title: 'Deleting Rows',
            description: `Deleting Rows`,
            docs: 'https://docs.sheetson.com/manage-data/delete-rows/',
          },
          method: 'DELETE',
          paths: [
            {
              name: 'sheets',
              type: 'static',
            },
            {
              name: 'sheetTab',
              type: 'param',
            },
            {
              name: 'rowIndex',
              type: 'param',
            },
          ],
        },
        update: {
          interface: 'UpdateData',
          meta: {
            title: 'Updating Rows',
            description: `Updating Rows`,
            docs: 'https://docs.sheetson.com/manage-data/update-rows/',
          },
          method: 'DELETE',
          paths: [
            {
              name: 'sheets',
              type: 'static',
            },
            {
              name: 'sheetTab',
              type: 'param',
            },
            {
              name: 'rowIndex',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Sheetson
