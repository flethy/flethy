import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Pendo {
  export type Entity = { events: any; reports: any }
  export type Endpoint =
    | { track: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint }

  interface PendoBase {
    'auth:x-pendo-integration-key': string
  }

  export interface TrackEvents extends PendoBase, RequestParams {
    kind: 'pendo.events.track'
    'body:type': 'track'
    'body:event': string
    'body:visitorId': string
    'body:accountId'?: string
    'body:timestamp': number
    'body:properties'?: {
      [key: string]: string | number | boolean
    }
    'body:context'?: {
      ip?: string
      userAgent?: string
      url?: string
      title?: string
    }
  }

  export interface ListReports extends PendoBase, RequestParams {
    kind: 'pendo.reports.list'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'pendo',
      name: 'Pendo',
      url: 'https://www.pendo.io/',
      docs: 'https://developers.pendo.io/docs',
      signup: 'https://www.pendo.io/pendo-free/',
      pricing: 'https://www.pendo.io/pricing/',
      tags: ['web2'],
      category: 'analytics',
      type: 'webinsights',
      social: {
        twitter: 'pendoio',
      },
    },
    base: 'https://app.pendo.io',
    auth: {
      'x-pendo-integration-key': {
        type: 'header',
      },
    },
    api: {
      events: {
        track: {
          interface: 'TrackEvents',
          meta: {
            title: 'Track',
            description: 'Track',
            docs: 'https://developers.pendo.io/docs/?bash#track',
          },
          method: 'POST',
          paths: [
            {
              name: 'data',
              type: 'static',
            },
            {
              name: 'track',
              type: 'static',
            },
          ],
        },
      },
      reports: {
        list: {
          interface: 'ListReports',
          meta: {
            title: 'Return a list of public reports',
            description: 'Return a list of public reports',
            docs: 'https://developers.pendo.io/docs/?bash#return-a-list-of-public-reports',
          },
          method: 'GET',
          paths: [
            {
              name: 'api',
              type: 'static',
            },
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'report',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Pendo
