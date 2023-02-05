import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Cronitor {
  export type Entity = { telemetry: any }
  export type Endpoint = { sendEvent: ApiDescriptionEndpoint }

  interface CronitorBase {
    'auth:apikey': string
  }

  export interface SendEvent extends CronitorBase, RequestParams {
    kind: 'cronitor.telemetry.sendEvent'
    'param:monitorKey': string
    'query:env'?: string
    'query:host'?: string
    'query:message'?: string
    'query:metric'?: string
    'query:series'?: string
    'query:state'?: 'run' | 'complete' | 'fail' | 'ok'
    'query:status_code'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'cronitor',
      name: 'Cronitor',
      url: 'https://cronitor.io',
      docs: 'https://cronitor.io/docs/api',
      signup: 'https://cronitor.io/sign-up',
      pricing: 'https://cronitor.io/pricing',
      tags: ['web2'],
      category: 'infra',
      type: 'monitoring',
      social: {
        twitter: 'cronitorio',
      },
    },
    base: 'https://cronitor.link',
    auth: {
      apikey: {
        type: 'path',
      },
    },
    api: {
      telemetry: {
        sendEvent: {
          interface: 'SendEvent',
          meta: {
            title: 'Sending Events',
            description: 'Sending Events',
            docs: 'https://cronitor.io/docs/telemetry-api#send-events',
          },
          method: 'GET',
          responseType: 'text',
          paths: [
            {
              name: 'p',
              type: 'static',
            },
            {
              name: 'apikey',
              type: 'auth',
            },
            {
              name: 'monitorKey',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Cronitor
