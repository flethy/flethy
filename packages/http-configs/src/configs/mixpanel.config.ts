import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { FetchParams } from '../types/FetchParams.type'
import { RequestParams } from '../types/Request.types'

export namespace Mixpanel {
  export type Entity = { events: any }
  export type Endpoint = { track: ApiDescriptionEndpoint }

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
      social: {
        twitter: 'mixpanel',
        instagram: 'mixpanel',
      },
      tags: ['web2'],
      category: 'analytics',
      type: 'webinsights',
    },
    base: 'https://api.mixpanel.com',
    api: {
      events: {
        track: {
          interface: 'TrackEvents',
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
                fetchParams.body.forEach(
                  (entry: { properties: { token: string } }) => {
                    entry.properties.token = authValue
                  },
                )
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
