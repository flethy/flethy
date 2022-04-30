import { RequestParams } from '../types/Request.types'
import { ApiDescription } from '../types/ApiDescription.type'

export namespace Mixpanel {
  export type Entity = { events }
  export type Endpoint = { track }

  export interface TrackEvents extends RequestParams {
    kind: 'mixpanel.events.track'
    'body:body': Array<{
      properties: {
        token: string
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
    },
    base: 'https://api.mixpanel.com',
    api: {
      events: {
        track: {
          meta: {
            title: 'Track Events',
            description: 'Track events to Mixpanel from client devices.',
            docs: 'https://developer.mixpanel.com/reference/track-event',
            tags: ['web2'],
            category: 'analytics',
            type: 'webinsights',
          },
          method: 'POST',
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
