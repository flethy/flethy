import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Koyeb {
  export type Entity = { profile: any; apps: any }
  export type Endpoint =
    | { get: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint }

  interface KoyebBase {
    'auth:Authorization': string
  }

  export interface GetCurrentUser extends KoyebBase, RequestParams {
    kind: 'koyeb.profile.get'
  }

  export interface ListApps extends KoyebBase, RequestParams {
    kind: 'koyeb.apps.list'
    'query:limit'?: number
    'query:offset'?: number
    'query:name'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'koyeb',
      name: 'Koyeb',
      url: 'https://www.koyeb.com/',
      docs: 'https://www.koyeb.com/docs/api',
      signup: 'https://app.koyeb.com/auth/signup',
      pricing: 'https://www.koyeb.com/pricing',
      tags: ['web2'],
      category: 'infra',
      type: 'serverless',
      social: {
        twitter: 'gokoyeb',
        github: 'koyeb',
      },
    },
    base: 'https://app.koyeb.com/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      profile: {
        get: {
          interface: 'GetCurrentUser',
          meta: {
            title: 'GetCurrentUser',
            description: `GetCurrentUser`,
            docs: 'https://www.koyeb.com/docs/api#operation/GetCurrentUser',
          },
          method: 'GET',
          paths: [
            {
              name: 'account',
              type: 'static',
            },
            {
              name: 'profile',
              type: 'static',
            },
          ],
        },
      },
      apps: {
        list: {
          interface: 'ListApps',
          meta: {
            title: 'List App',
            description: `List App`,
            docs: 'https://www.koyeb.com/docs/api#operation/ListApps',
          },
          method: 'GET',
          paths: [
            {
              name: 'apps',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Koyeb
