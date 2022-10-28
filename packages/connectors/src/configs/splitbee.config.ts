import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Splitbee {
  export type Entity = { events: any; users: any }
  export type Endpoint =
    | { track: ApiDescriptionEndpoint }
    | { set: ApiDescriptionEndpoint }

  interface SplitbeeBase {
    'auth:sbp': string
    'header:userId': string
  }

  export interface TrackEvent extends SplitbeeBase, RequestParams {
    kind: 'splitbee.events.track'
    'body:event': string
    'body:data'?: any
    'body:options'?: any
  }

  export interface SetCustomUserData extends SplitbeeBase, RequestParams {
    kind: 'splitbee.users.set'
    'body:body': {
      [key: string]: string | number | boolean
    }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'splitbee',
      name: 'Splitbee',
      url: 'https://splitbee.io/',
      docs: 'https://splitbee.io/docs/splitbee-api',
      signup: 'https://splitbee.io/register',
      pricing: 'https://splitbee.io/pricing',
      tags: ['web2'],
      category: 'analytics',
      type: 'webinsights',
      social: {
        twitter: 'splitbee',
        github: 'splitbee',
      },
    },
    base: 'https://hive.splitbee.io',
    auth: {
      sbp: {
        type: 'header',
      },
    },
    api: {
      events: {
        track: {
          interface: 'TrackEvent',
          meta: {
            title: 'Track Events',
            description: `Track Events`,
            docs: 'https://splitbee.io/docs/splitbee-api',
          },
          method: 'POST',
          paths: [
            {
              name: 't',
              type: 'static',
            },
          ],
        },
      },
      users: {
        set: {
          interface: 'SetCustomUserData',
          meta: {
            title: 'Set custom user data',
            description: `Set custom user data`,
            docs: 'https://splitbee.io/docs/splitbee-api',
          },
          method: 'POST',
          paths: [
            {
              name: 'user',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Splitbee
