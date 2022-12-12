import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace OneSignal {
  export type Entity = { apps: any; notifications: any }
  export type Endpoint =
    | { list: ApiDescriptionEndpoint }
    | { create: ApiDescriptionEndpoint }

  interface OneSignalBase {
    'auth:Authorization': string
  }

  export interface ListApps extends OneSignalBase, RequestParams {
    kind: 'onesignal.apps.list'
  }

  export interface CreateNotification extends OneSignalBase, RequestParams {
    kind: 'onesignal.notifications.create'
    'body:app_id': string
    'body:included_segments'?: string[]
    'body:external_id'?: string
    'body:contents': { [key: string]: string }
    'body:name'?: string
    'body:send_after'?: string
    'body:delayed_option'?: string
    'body:delivery_time_of_day'?: string
    'body:throttle_rate_per_minute'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'onesignal',
      name: 'OneSignal',
      url: 'https://onesignal.com/',
      docs: 'https://documentation.onesignal.com/reference',
      signup: 'https://dashboard.onesignal.com/signup',
      pricing: 'https://onesignal.com/pricing',
      tags: ['web2'],
      category: 'communication',
      type: 'multichannel',
      social: {
        twitter: 'onesignal',
        instagram: 'onesignal',
      },
    },
    base: 'https://onesignal.com/api/v1',
    auth: {
      Authorization: {
        type: 'header:basic:encoded',
      },
    },
    api: {
      apps: {
        list: {
          interface: 'ListApps',
          meta: {
            title: 'View apps',
            description: `View apps`,
            docs: 'https://documentation.onesignal.com/reference/view-apps-apps',
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
      notifications: {
        create: {
          interface: 'CreateNotification',
          meta: {
            title: 'Create notification',
            description: `Create notification`,
            docs: 'https://documentation.onesignal.com/reference/create-notification',
          },
          method: 'POST',
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

export default OneSignal
