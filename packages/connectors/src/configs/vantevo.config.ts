import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Vantevo {
  export type Entity = { event: any; statistics: any }
  export type Endpoint =
    | { send: ApiDescriptionEndpoint }
    | { get: ApiDescriptionEndpoint; events: ApiDescriptionEndpoint }

  interface VantevoBase {
    'auth:Authorization': string
  }

  export interface SendEvent extends RequestParams {
    kind: 'vantevo.event.send'
    'body:event': string
    'body:url': string
    'header:User-Agent': string
    'header:X-Forwarded-For': string
    'body:title'?: string
    'body:referrer'?: string
    'body:width'?: number
    'body:height'?: number
    'body:domain'?: string
    'body:meta'?: any
  }

  interface StatisticsBase {
    'query:source':
      | 'totals'
      | 'pages'
      | 'entry-pages'
      | 'exit-pages'
      | 'referrals'
      | 'utm-source'
      | 'utm-medium'
      | 'utm-campaign'
      | 'utm-content'
      | 'utm-term'
      | 'devices'
      | 'browsers'
      | 'os'
      | 'screen'
      | 'countries'
      | 'regions'
      | 'cities'
      | 'languages'
      | 'goals'
      | 'events'
    'query:domain': string
    'query:period':
      | 'day'
      | 'yesterday'
      | '1m'
      | '1y'
      | '7d'
      | '30d'
      | '6m'
      | '12m'
      | 'custom'
    'query:start'?: string
    'query:end'?: string
    'query:limit'?: number
    'query:offset'?: number
    'query:filters'?: string
  }

  export interface GetStatistics
    extends VantevoBase,
      StatisticsBase,
      RequestParams {
    kind: 'vantevo.statistics.get'
  }

  export interface GetEventStatistics
    extends VantevoBase,
      StatisticsBase,
      RequestParams {
    kind: 'vantevo.statistics.events'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'vantevo',
      name: 'Vantevo',
      url: 'https://vantevo.io/',
      docs: 'https://vantevo.io/docs/api-sdk/api-event',
      signup: 'https://vantevo.io/register',
      pricing: 'https://vantevo.io/pricing',
      tags: ['web2'],
      category: 'analytics',
      type: 'webinsights',
      social: {
        twitter: 'vantevoHQ',
        instagram: 'vantevoanalytics',
      },
    },
    base: 'https://api.vantevo.io/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      event: {
        send: {
          interface: 'SendEvent',
          meta: {
            title: 'API Event',
            description: `Record a pageview or custom event.`,
            docs: 'https://vantevo.io/docs/api-sdk/api-event',
          },
          method: 'POST',
          paths: [
            {
              name: 'event',
              type: 'static',
            },
          ],
        },
      },
      statistics: {
        get: {
          interface: 'GetStatistics',
          meta: {
            title: 'Statistics',
            description: `With this request you get: number of unique visitors, number of visited pages, bounce frequency, sessions and the average duration of the current and previous period, it helps you to make the comparison between the 2 periods.`,
            docs: 'https://vantevo.io/docs/api-sdk/api-statistics',
          },
          method: 'POST',
          paths: [
            {
              name: 'stats',
              type: 'static',
            },
          ],
        },
        events: {
          interface: 'GetEventStatistics',
          meta: {
            title: 'Statistics',
            description: `With this request you get: number of unique visitors, number of unique events, total events and total visitors of the current and previous period, it helps you to make the comparison between the 2 periods.`,
            docs: 'https://vantevo.io/docs/api-sdk/api-statistics',
          },
          method: 'POST',
          paths: [
            {
              name: 'events',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Vantevo
