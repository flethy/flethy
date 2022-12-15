import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace WonderPush {
  export type Entity = { users: any; notifications: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  interface WonderPushBase {
    'auth:accessToken': string
  }

  export interface ListUsers extends WonderPushBase, RequestParams {
    kind: 'wonderpush.users.list'
  }

  export interface ListNotifications extends WonderPushBase, RequestParams {
    kind: 'wonderpush.notifications.list'
    'query:fields'?: string
    'query:offset'?: number
    'query:limit'?: number
    'query:sort'?: string
    'query:creationDateFrom'?: string
    'query:creationDateTo'?: string
    'query:updateDateFrom'?: string
    'query:updateDateTo'?: string
    'query:campaignIds'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'wonderpush',
      name: 'WonderPush',
      url: 'https://www.wonderpush.com/',
      docs: 'https://docs.wonderpush.com/',
      signup: 'https://dashboard.wonderpush.com/account/signup',
      pricing: 'https://www.wonderpush.com/pricing/',
      tags: ['web2'],
      category: 'communication',
      type: 'multichannel',
      social: {
        twitter: 'wonderpush',
      },
    },
    base: 'https://management-api.wonderpush.com/v1',
    auth: {
      accessToken: {
        type: 'query',
      },
    },
    api: {
      users: {
        list: {
          interface: 'ListUsers',
          meta: {
            title: 'List users',
            description: `List users`,
            docs: 'https://docs.wonderpush.com/reference/get-users',
          },
          method: 'GET',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
          ],
        },
      },
      notifications: {
        list: {
          interface: 'ListNotifications',
          meta: {
            title: 'List notifications',
            description: `List notifications`,
            docs: 'https://docs.wonderpush.com/reference/get-notifications',
          },
          method: 'GET',
          paths: [
            {
              name: 'notifications',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default WonderPush
