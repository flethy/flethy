import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Beew {
  export type Entity = { schedule: any }
  export type Endpoint = {
    create: ApiDescriptionEndpoint
    update: ApiDescriptionEndpoint
  }

  interface BeewBase {
    'auth:X-API-KEY': string
  }

  export interface CreateSchedule extends BeewBase, RequestParams {
    kind: 'beew.schedule.create'
    'body:name': string
    'body:desc'?: string
    'body:url': string
    'body:type': 'ONE_TIME' | 'RECURRING'
    'body:method': 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    'body:responseType':
      | 'arraybuffer'
      | 'blob'
      | 'document'
      | 'json'
      | 'text'
      | 'stream'
    'body:trigger'?: string
    'body:cronExpression'?: string
    'body:notifyOnError': boolean
    'body:notifyEmail'?: string
    'body:timezone': string
    'body:headers': Array<{ key: string; value: string }>
    'body:payload': string
  }

  export interface UpdateSchedule extends BeewBase, RequestParams {
    kind: 'beew.schedule.update'
    'body:id': string
    'body:name': string
    'body:desc'?: string
    'body:url'?: string
    'body:type'?: 'ONE_TIME' | 'RECURRING'
    'body:method'?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    'body:responseType'?:
      | 'arraybuffer'
      | 'blob'
      | 'document'
      | 'json'
      | 'text'
      | 'stream'
    'body:trigger'?: string
    'body:cronExpression'?: string
    'body:notifyOnError'?: boolean
    'body:notifyEmail'?: string
    'body:timezone'?: string
    'body:headers'?: Array<{ key: string; value: string }>
    'body:payload'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'beew',
      name: 'Beew',
      url: 'https://beew.io/',
      docs: 'https://beew.io/api',
      signup: 'https://app.beew.io/en/auth/sign-up',
      pricing: 'https://beew.io/pricing',
      tags: ['web2'],
      category: 'tools',
      type: 'cron',
      social: {
        twitter: 'caio_rolla',
        github: 'Beew-io',
      },
    },
    base: 'https://beew.io/api/v1',
    auth: {
      'X-API-KEY': {
        type: 'header',
      },
    },
    api: {
      schedule: {
        create: {
          interface: 'CreateSchedule',
          meta: {
            title: 'Create Schedule',
            description: `Create Schedule`,
            docs: 'https://beew.io/api#/Schedule/S_create',
          },
          method: 'POST',
          paths: [
            {
              name: 'schedule',
              type: 'static',
            },
          ],
        },
        update: {
          interface: 'UpdateSchedule',
          meta: {
            title: 'Update Schedule',
            description: `Update Schedule`,
            docs: 'https://beew.io/api#/Schedule/S_patch',
          },
          method: 'PATCH',
          paths: [
            {
              name: 'schedule',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Beew
