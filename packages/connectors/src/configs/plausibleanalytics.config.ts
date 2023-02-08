import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace PlausibleAnalytics {
  export type Entity = { events: any }
  export type Endpoint = { send: ApiDescriptionEndpoint }

  export interface SendEvent extends RequestParams {
    kind: 'plausibleanalytics.events.send'
    'header:User-Agent': string
    'header:X-Forwarded-For': string
    'body:domain': string
    'body:name': string
    'body:url': string
    'body:referrer'?: string
    'body:screen_width'?: string
    'body:props'?: { [key: string]: string | number }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'plausibleanalytics',
      name: 'PlausibleAnalytics',
      url: 'https://plausible.io/',
      docs: 'https://plausible.io/docs',
      signup: 'https://plausible.io/register',
      pricing: 'https://plausible.io/#pricing',
      tags: ['web2'],
      category: 'analytics',
      type: 'webinsights',
      social: {
        twitter: 'PlausibleHQ',
        github: 'plausible',
      },
    },
    base: 'https://plausible.io/api',
    api: {
      events: {
        send: {
          interface: 'SendEvent',
          meta: {
            title: 'Events API reference',
            description: 'Events API reference',
            docs: 'https://plausible.io/docs/events-api',
          },
          method: 'POST',
          paths: [
            {
              name: 'event',
              type: 'static',
            },
          ],
          responseType: 'text',
        },
      },
    },
  }
}

export default PlausibleAnalytics
