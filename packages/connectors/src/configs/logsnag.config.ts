import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace LogSnag {
  export type Entity = { log: any; insight: any }
  export type Endpoint =
    | { publishEvent: ApiDescriptionEndpoint }
    | { publishInsight: ApiDescriptionEndpoint }

  interface LogSnagBase {
    'auth:Authorization': string
  }

  export interface PublishEvent extends LogSnagBase, RequestParams {
    kind: 'logsnag.log.publishEvent'
    'body:project': string
    'body:channel': string
    'body:event': string
    'body:description'?: string
    'body:icon'?: string
    'body:notify'?: boolean
    'body:tags'?: {
      [key: string]: string | number | boolean
    }
  }

  export interface PublishInsight extends LogSnagBase, RequestParams {
    kind: 'logsnag.insight.publishInsight'
    'body:project': string
    'body:title': string
    'body:value': string | number
    'body:icon'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'logsnag',
      name: 'LogSnag',
      url: 'https://logsnag.com/',
      docs: 'https://docs.logsnag.com/',
      signup: 'https://app.logsnag.com/auth/sign-up',
      pricing: 'https://logsnag.com/pricing',
      tags: ['web2'],
      category: 'analytics',
      type: 'webinsights',
      social: {
        twitter: 'logsnag',
        github: 'logsnag',
      },
    },
    base: 'https://api.logsnag.com/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      log: {
        publishEvent: {
          interface: 'PublishEvent',
          meta: {
            title: 'Publish an event to LogSnag.',
            description: `This route is used to publish your events to LogSnag. These events may be designed in any way that makes sense for your application.`,
            docs: 'https://docs.logsnag.com/endpoints/log',
          },
          method: 'POST',
          paths: [
            {
              name: 'log',
              type: 'static',
            },
          ],
        },
      },
      insight: {
        publishInsight: {
          interface: 'PublishInsight',
          meta: {
            title: 'Publish an insight to LogSnag.',
            description: `Insights are real-time events such as KPI, performance, and other metrics that are not captured as a regular event. You can publish them periodically or as soon as they occur and the latest value will be stored in LogSnag.`,
            docs: 'https://docs.logsnag.com/endpoints/insight',
          },
          method: 'POST',
          paths: [
            {
              name: 'insight',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default LogSnag
