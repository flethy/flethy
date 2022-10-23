import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Stackby {
  export type Entity = { core: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  interface StackbyBase {
    'auth:api-key': string
  }

  export interface ListRows extends StackbyBase, RequestParams {
    kind: 'stackby.core.list'
    'param:stackId': string
    'param:tableId': string
    'query:filter'?: string
    'query:sort'?: string
    'query:view'?: string
    'query:maxrecord'?: number
    'query:pageSize'?: number
    'query:offset'?: number
    'query:latest'?: boolean
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'stackby',
      name: 'Stackby',
      url: 'https://stackby.com',
      docs: 'https://documenter.getpostman.com/view/7317658/SzmZbfQP?version=latest#5d63ae05-501a-4f7a-9f26-18ed9b9fda24',
      pricing: 'https://stackby.com/pricing',
      signup: 'https://stackby.com/signup',
      social: {
        twitter: 'stackbyhq',
        github: 'stackbyhq',
      },
      tags: ['web2'],
      category: 'collaboration',
      type: 'spreadsheet',
    },
    base: 'https://stackby.com/api/betav1',
    auth: {
      'api-key': {
        type: 'header',
      },
    },
    api: {
      core: {
        list: {
          interface: 'ListRows',
          meta: {
            title: 'List rows from table',
            description: `List rows from table`,
            docs: 'https://documenter.getpostman.com/view/7317658/SzmZbfQP?version=latest#5d63ae05-501a-4f7a-9f26-18ed9b9fda24',
          },
          method: 'GET',
          paths: [
            {
              name: 'rowlist',
              type: 'static',
            },
            {
              name: 'stackId',
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

export default Stackby
