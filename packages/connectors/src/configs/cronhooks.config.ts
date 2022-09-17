import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Cronhooks {
  export type Entity = { schedules: any }
  export type Endpoint = { create: ApiDescriptionEndpoint }

  interface CronhooksBase {
    'auth:Authorization': string
  }

  export interface ScheduleNewWebhool extends CronhooksBase, RequestParams {
    kind: 'cronhooks.schedules.create'
    'body:group'?: string
    'body:title': string
    'body:url': string
    'body:timezone': string
    'body:method': string
    'body:headers'?: any
    'body:payload'?: any
    'body:contentType': string
    'body:isRecurring': boolean
    'body:runAt'?: string
    'body:sendCronhookObject': boolean
    'body:sendFailureAlert': false
    'body:cronExpression'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'cronhooks',
      name: 'Cronhooks',
      url: 'https://cronhooks.io/',
      docs: 'https://docs.cronhooks.io/',
      signup: 'https://app.cronhooks.io/#/account/register',
      pricing: 'https://cronhooks.io/#pricing',
      tags: ['web3'],
      category: 'aggregation',
      type: 'indexer',
      social: {
        github: 'cronhooks',
        twitter: 'cronhooks',
      },
    },
    base: 'https://api.cronhooks.io',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      schedules: {
        create: {
          interface: 'ScheduleNewWebhool',
          meta: {
            title: 'Schedule a new webhook',
            description: `This endpoint creates a new scheduled webhook.`,
            docs: 'https://docs.cronhooks.io/#schedule-a-new-webhook',
          },
          method: 'POST',
          paths: [
            {
              name: 'schedules',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Cronhooks
