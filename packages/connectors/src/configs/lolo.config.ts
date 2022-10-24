import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Lolo {
  export type Entity = { accounts: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  interface LoloApiKeyBase {
    'auth:Lolo-Api-Key': string
  }

  interface LoloBearerBase {
    'auth:Authorization': string
  }

  export interface ListAccounts extends LoloBearerBase, RequestParams {
    kind: 'lolo.accounts.list'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'lolo',
      name: 'Lolo',
      url: 'https://www.lolo.co/',
      docs: 'https://docs.lolo.company/reference',
      signup: 'https://developer.lolo.company/',
      pricing: 'https://www.lolo.co/pricing',
      tags: ['web2'],
      category: 'infra',
      type: 'serverless',
      social: {
        twitter: 'lolo_code',
        github: 'lolocompany',
      },
    },
    base: [
      {
        id: 'default',
        url: 'https://dev.lolo.company/api',
      },
      {
        id: 'pvpc',
        url: 'https://dev.pvpc.lolo.company/api',
      },
    ],
    auth: {
      'Lolo-Api-Key': {
        type: 'header',
      },
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      accounts: {
        list: {
          interface: 'ListAccounts',
          meta: {
            title: 'List all accounts',
            description: `List all accounts`,
            docs: 'https://docs.lolo.company/reference/get_accounts',
          },
          method: 'GET',
          paths: [
            {
              name: 'accounts',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Lolo
