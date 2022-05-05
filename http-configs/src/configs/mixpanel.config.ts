import { ApiDescription } from '../types/ApiDescription.type'
import { FetchParams } from '../types/FetchParams.type'
import { RequestParams } from '../types/Request.types'

export namespace Mixpanel {
  export type Entity = { events }
  export type Endpoint = { track }

  export interface TrackEvents extends RequestParams {
    kind: 'mixpanel.events.track'
    'auth:token': string
    'body:body': Array<{
      properties: {
        time: number
        distinct_id: string
        [key: string]: string | number
      }
      event: string
    }>
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'mixpanel',
      name: 'Mixpanel',
      url: 'https://mixpanel.com',
      docs: 'https://developer.mixpanel.com/reference/overview',
      tags: ['web2'],
      category: 'analytics',
      type: 'webinsights',
    },
    base: 'https://api.mixpanel.com',
    api: {
      events: {
        track: {
          meta: {
            title: 'Track Events',
            description: 'Track events to Mixpanel from client devices.',
            docs: 'https://developer.mixpanel.com/reference/track-event',
          },
          method: 'POST',
          auth: {
            token: {
              type: 'body',
              authHandler: (fetchParams: FetchParams, authValue: string) => {
                fetchParams.body.forEach((entry) => {
                  entry.properties.token = authValue
                })
              },
            },
          },
          paths: [
            {
              name: 'track',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Mixpanel
