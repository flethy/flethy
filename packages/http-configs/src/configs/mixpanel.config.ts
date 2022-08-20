import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { FetchParams } from '../types/FetchParams.type'
import { RequestParams } from '../types/Request.types'

export namespace Mixpanel {
  export type Entity = { events: any }
  export type Endpoint = {
    track: ApiDescriptionEndpoint
    import: ApiDescriptionEndpoint
  }

  type MixpanelBaseId = 'api' | 'api-eu'

  interface MixpanelBaseProjectToken {
    baseId: MixpanelBaseId
    'auth:token': string
  }

  interface MixpanelBaseServiceAccount {
    baseId: MixpanelBaseId
    'auth:Authorization': {
      username: string
      password: string
    }
  }

  export interface TrackEvents extends MixpanelBaseProjectToken, RequestParams {
    kind: 'mixpanel.events.track'
    baseId: MixpanelBaseId
    'body:body': Array<{
      properties: {
        time: number
        distinct_id: string
        [key: string]: string | number
      }
      event: string
    }>
  }

  export interface ImportEvents
    extends MixpanelBaseServiceAccount,
      RequestParams {
    kind: 'mixpanel.events.import'
    baseId: MixpanelBaseId
    'query:project_id': string
    'body:body': Array<{
      properties: {
        time: number
        distinct_id: string
        $insert_id: string
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
    base: [
      {
        id: 'api',
        url: 'https://api.mixpanel.com',
      },
      {
        id: 'api-eu',
        url: 'https://api-eu.mixpanel.com',
      },
    ],
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
        import: {
          interface: 'ImportEvents',
          meta: {
            title: 'Import Events',
            description:
              'Send batches of events from your servers to Mixpanel.',
            docs: 'https://developer.mixpanel.com/reference/import-events',
          },
          method: 'POST',
          auth: {
            Authorization: {
              type: 'header:basic',
            },
          },
          paths: [
            {
              name: 'import',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Mixpanel
