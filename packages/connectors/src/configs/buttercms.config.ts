import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace ButterCMS {
  export type Entity = { pages: any }
  export type Endpoint = { getMultiple: ApiDescriptionEndpoint }

  interface ButterCMSBase {
    'auth:auth_token': string
  }

  export interface GetMultiplePages extends ButterCMSBase, RequestParams {
    kind: 'buttercms.pages.getMultiple'
    'param:page_type': '*' | string
    'query:preview'?: 0 | 1
    'query:page'?: number
    'query:page_size'?: number
    'query:locale'?: string
    'query:lvels'?: number
    'query:limit'?: number
    'query:offset'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'buttercms',
      name: 'ButterCMS',
      url: 'https://buttercms.com/',
      docs: 'https://buttercms.com/docs/api/',
      signup: 'https://buttercms.com/join/',
      pricing: 'https://buttercms.com/pricing/',
      tags: ['web2'],
      category: 'marketing',
      type: 'content',
      social: {
        twitter: 'ButterCMS',
        github: 'buttercms',
      },
    },
    base: 'https://api.buttercms.com/v2',
    auth: {
      auth_token: {
        type: 'query',
      },
    },
    api: {
      pages: {
        getMultiple: {
          interface: 'GetMultiplePages',
          meta: {
            title: 'Get Multiple Pages',
            description: `Get Multiple Pages`,
            docs: 'https://buttercms.com/docs/api/#get-multiple-pages-(single-pages)',
          },
          method: 'GET',
          paths: [
            {
              name: 'pages',
              type: 'static',
            },
            {
              name: 'page_type',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default ButterCMS
