import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Yapily {
  export type Entity = { app: any; consents: any }
  export type Endpoint =
    | { info: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint }

  interface YapilyBase {
    'auth:Authorization': {
      username: string
      password: string
    }
  }

  export interface AppInfo extends YapilyBase, RequestParams {
    kind: 'yapily.app.info'
  }

  export interface ListConsents extends YapilyBase, RequestParams {
    kind: 'yapily.consents.list'
    'query:filter[applicationUserId]'?: string
    'query:filter[userUuid]'?: string
    'query:filter[institution]'?: string
    'query:filter[status]'?: string
    'query:from'?: string
    'query:before'?: string
    'query:limit'?: number
    'query:offset'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'yapily',
      name: 'Yapily',
      url: 'https://www.yapily.com/',
      docs: 'https://docs.yapily.com/',
      signup: 'https://accounts.yapily.com/register',
      pricing: 'https://www.yapily.com/pricing',
      tags: ['web2'],
      category: 'finance',
      type: 'openbanking',
      social: {
        twitter: 'YapilyLtd',
        instagram: 'weareyapily',
        github: 'yapily',
      },
    },
    base: [
      {
        id: 'default',
        url: 'https://api.yapily.com',
      },
    ],
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      app: {
        info: {
          interface: 'AppInfo',
          meta: {
            title: 'Get Application Self',
            description: `Get Application Self`,
            docs: 'https://docs.yapily.com/api/reference/#operation/getApplicationMe',
          },
          method: 'GET',
          paths: [
            {
              name: 'me',
              type: 'static',
            },
          ],
        },
      },
      consents: {
        list: {
          interface: 'ListConsents',
          meta: {
            title: 'Get Consents',
            description: `Get Consents`,
            docs: 'https://docs.yapily.com/api/reference/#operation/getConsents',
          },
          method: 'GET',
          paths: [
            {
              name: 'consents',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Yapily
