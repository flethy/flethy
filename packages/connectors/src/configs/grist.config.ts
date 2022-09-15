import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Grist {
  export type Entity = { records: any; docs: any }
  export type Endpoint =
    | { add: ApiDescriptionEndpoint; fetch: ApiDescriptionEndpoint }
    | { describe: ApiDescriptionEndpoint }

  export interface GristBase {
    'auth:Authorization': string
    'subdomain:teamId'?: string
  }

  export interface AddRecords extends GristBase, RequestParams {
    kind: 'grist.records.add'
    baseId: 'docs' | 'team'
    'param:docId': string
    'param:tableId': string
    'body:records': Array<{ fields: any }>
  }

  export interface FetchRecords extends GristBase, RequestParams {
    kind: 'grist.records.fetch'
    baseId: 'docs' | 'team'
    'param:docId': string
    'param:tableId': string
    'query:filter'?: string
    'query:sort'?: string
    'query:limit'?: number
  }

  export interface DescribeDocument extends GristBase, RequestParams {
    kind: 'grist.docs.describe'
    baseId: 'docs' | 'team'
    'param:docId': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'grist',
      name: 'Grist',
      url: 'https://getgrist.com',
      docs: 'https://support.getgrist.com/api',
      signup: 'https://docs.getgrist.com/signup',
      pricing: 'https://www.getgrist.com/pricing/',
      social: {
        twitter: 'getgrist',
      },
      tags: ['web2'],
      category: 'storage',
      type: 'database',
    },
    base: [
      {
        id: 'docs',
        url: 'https://docs.getgrist.com/api',
      },
      {
        id: 'team',
        url: 'https://subdomain:teamId.getgrist.com/api',
      },
    ],
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      records: {
        add: {
          interface: 'AddRecords',
          meta: {
            title: 'Add records to a table',
            description: `Add records to a table`,
            docs: 'https://support.getgrist.com/api/#tag/records/paths/~1docs~1{docId}~1tables~1{tableId}~1records/post',
          },
          method: 'POST',
          paths: [
            {
              name: 'docs',
              type: 'static',
            },
            {
              name: 'docId',
              type: 'param',
            },
            {
              name: 'tables',
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
        fetch: {
          interface: 'FetchRecords',
          meta: {
            title: 'Fetch records from a table',
            description: `Fetch records from a table`,
            docs: 'https://support.getgrist.com/api/#tag/records/paths/~1docs~1{docId}~1tables~1{tableId}~1records/get',
          },
          method: 'GET',
          paths: [
            {
              name: 'docs',
              type: 'static',
            },
            {
              name: 'docId',
              type: 'param',
            },
            {
              name: 'tables',
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
      docs: {
        describe: {
          interface: 'DescribeDocument',
          meta: {
            title: 'Describe a document',
            description: `Describe a document`,
            docs: 'https://support.getgrist.com/api/#tag/docs/paths/~1docs~1{docId}/get',
          },
          method: 'GET',
          paths: [
            {
              name: 'docs',
              type: 'static',
            },
            {
              name: 'docId',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Grist
