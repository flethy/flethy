import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Airtable {
  export type Entity = { table: any }
  export type Endpoint = {
    listrecords: ApiDescriptionEndpoint
    createrecords: ApiDescriptionEndpoint
  }

  export interface ListTableRecords extends RequestParams {
    kind: 'airtable.table.listrecords'
    'auth:Authorization': string
    'param:baseId': string
    'param:tableId': string
    'query:fields'?: string
    'query:filterByFormula'?: string
    'query:maxRecords'?: number
    'query:pageSize'?: number
    'query:sort'?: string
    'query:view'?: string
    'query:cellFormat'?: string
    'query:timeZone'?: string
    'query:userLocale'?: string
    'query:returnFieldsByFieldId'?: boolean
  }

  export interface CreateTableRecords extends RequestParams {
    kind: 'airtable.table.createrecords'
    'auth:Authorization': string
    'param:baseId': string
    'param:tableId': string
    'body:records': any
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'airtable',
      name: 'Airtable',
      url: 'https://airtable.com',
      docs: 'https://airtable.com/api',
      social: {
        twitter: 'airtable',
        instagram: 'airtable',
      },
      tags: ['web2'],
      category: 'collaboration',
      type: 'spreadsheet',
    },
    base: 'https://api.airtable.com/v0',
    api: {
      table: {
        listrecords: {
          interface: 'ListTableRecords',
          meta: {
            title: 'List Table Records',
            description: 'List records of a table.',
            docs: 'https://airtable.com/api',
          },
          method: 'GET',
          auth: {
            Authorization: {
              type: 'header:bearer',
            },
          },
          paths: [
            {
              name: 'baseId',
              type: 'param',
            },
            {
              name: 'tableId',
              type: 'param',
            },
          ],
        },
        createrecords: {
          interface: 'CreateTableRecords',
          meta: {
            title: 'Create Table Records',
            description: 'Create records in a table.',
            docs: 'https://airtable.com/api',
          },
          method: 'POST',
          auth: {
            Authorization: {
              type: 'header:bearer',
            },
          },
          paths: [
            {
              name: 'baseId',
              type: 'param',
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

export default Airtable
