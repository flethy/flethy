import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Flatfile {
  export type Entity = { auth: any; workspaces: any; batch: any }
  export type Endpoint =
    | { keyExchange: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint }
    | {
        downloadUpload: ApiDescriptionEndpoint
        deleteUpload: ApiDescriptionEndpoint
      }

  interface FlatfileBaseKeyExchange {
    'auth:accessKeyId': string
    'auth:secretAccessKey': string
  }

  interface FlatfileBase {
    'auth:Authorization'?: string
    'auth:X-Api-Key'?: {
      accessKeyId: string
      secretAccessKey: string
    }
  }

  export interface ExchangeAccessKey
    extends FlatfileBaseKeyExchange,
      RequestParams {
    kind: 'flatfile.auth.keyExchange'
    'body:expiresIn'?: number
  }

  export interface ListWorkspaces extends FlatfileBase, RequestParams {
    kind: 'flatfile.workspaces.list'
    'param:teamId': number
    'query:environmentId'?: string
    'query:skip'?: number
    'query:take'?: number
  }

  export interface DownloadUpload extends FlatfileBase, RequestParams {
    kind: 'flatfile.batch.downloadUpload'
    'param:batchId': string
    'query:type': 'original' | 'processed'
  }

  export interface DeleteUpload extends FlatfileBase, RequestParams {
    kind: 'flatfile.batch.deleteUpload'
    'param:batchId': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'flatfile',
      name: 'Flatfile',
      url: 'https://flatfile.com/',
      docs: 'https://flatfile.com/docs/api-reference/',
      signup: 'https://app.flatfile.com/login',
      tags: ['web2'],
      category: 'utils',
      type: 'data-exchange',
      social: {
        twitter: 'flatfilers',
        github: 'flatfilers',
      },
    },
    base: 'https://api.us.flatfile.io',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
      'X-Api-Key': {
        type: 'header:custom',
        custom: {
          concat: {
            keys: ['accessKeyId', 'secretAccessKey'],
            separator: '+',
          },
        },
      },
    },
    api: {
      auth: {
        keyExchange: {
          interface: 'ExchangeAccessKey',
          meta: {
            title: 'Exchange access key for JWT',
            description: `Exchange access key for JWT`,
            docs: 'https://flatfile.com/docs/api-reference/#post-exchange-access-key-for-jwt',
          },
          auth: {
            accessKeyId: {
              type: 'body',
            },
            secretAccessKey: {
              type: 'body',
            },
          },
          method: 'POST',
          paths: [
            {
              name: 'auth',
              type: 'static',
            },
            {
              name: 'access-key',
              type: 'static',
            },
            {
              name: 'exchange',
              type: 'static',
            },
          ],
        },
      },
      workspaces: {
        list: {
          interface: 'ListWorkspaces',
          meta: {
            title: 'List team Workspaces',
            description: `List team Workspaces`,
            docs: 'https://flatfile.com/docs/api-reference/#get-list-team-workspaces',
          },
          method: 'GET',
          paths: [
            {
              name: 'rest',
              type: 'static',
            },
            {
              name: 'teams',
              type: 'static',
            },
            {
              name: 'teamId',
              type: 'param',
            },
            {
              name: 'workspaces',
              type: 'static',
            },
          ],
        },
      },
      batch: {
        downloadUpload: {
          interface: 'DownloadUpload',
          meta: {
            title: 'Download an upload',
            description: `Download an upload`,
            docs: 'https://flatfile.com/docs/api-reference/#get-download-an-upload',
          },
          method: 'GET',
          paths: [
            {
              name: 'batch',
              type: 'static',
            },
            {
              name: 'batchId',
              type: 'param',
            },
            {
              name: 'export.csv',
              type: 'static',
            },
          ],
        },
        deleteUpload: {
          interface: 'DeleteUpload',
          meta: {
            title: 'Delete an upload',
            description: `Delete an upload`,
            docs: 'https://flatfile.com/docs/api-reference/#delete-delete-an-upload',
          },
          method: 'GET',
          paths: [
            {
              name: 'batch',
              type: 'static',
            },
            {
              name: 'batchId',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Flatfile
