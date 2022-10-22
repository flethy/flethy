import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace NewRelic {
  export type Entity = { insights: any }
  export type Endpoint = { events: ApiDescriptionEndpoint }

  export interface NewRelicBase {
    'param:accountId': string
    'auth:Api-Key': string
  }

  export interface InsightsEvents extends NewRelicBase, RequestParams {
    kind: 'newrelic.insights.events'
    baseId: string
    'body:body': Array<{
      eventType: string
      [key: string]: string | number
    }>
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'newrelic',
      name: 'NewRelic',
      url: 'https://newrelic.com/',
      docs: 'https://docs.newrelic.com/docs/data-apis/',
      pricing: 'https://newrelic.com/pricing',
      signup: 'https://newrelic.com/signup',
      social: {
        twitter: 'newrelic',
        github: 'newrelic',
        instagram: 'newrelic',
      },
      tags: ['web2'],
      category: 'analytics',
      type: 'webinsights',
    },
    base: [
      {
        id: 'regular',
        url: `https://insights-collector.newrelic.com`,
      },
      {
        id: 'eu',
        url: `https://insights-collector.eu01.nr-data.net`,
      },
    ],
    auth: {
      'Api-Key': {
        type: 'header',
      },
    },
    api: {
      insights: {
        events: {
          interface: 'InsightsEvents',
          meta: {
            title: 'Event API',
            description: `The Event API lets you send custom event data to New Relic. These events can then be queried and charted.`,
            docs: 'https://docs.newrelic.com/docs/data-apis/ingest-apis/event-api/introduction-event-api',
          },
          method: 'POST',
          paths: [
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'accounts',
              type: 'static',
            },
            {
              name: 'accountId',
              type: 'param',
            },
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

export default NewRelic
