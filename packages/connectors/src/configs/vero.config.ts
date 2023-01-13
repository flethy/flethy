import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Vero {
  export type Entity = { events: any; users: any }
  export type Endpoint =
    | { track: ApiDescriptionEndpoint }
    | { identify: ApiDescriptionEndpoint }

  interface VeroBase {
    'auth:auth_token': string
  }

  export interface TrackEvent extends VeroBase, RequestParams {
    kind: 'vero.events.track'
    'body:identity': {
      id: string
      email: string
    }
    'body:event_name': string
    'body:data'?: { [key: string]: string }
    'body:extras'?: { [key: string]: string }
  }

  export interface IdentifyUser extends VeroBase, RequestParams {
    kind: 'vero.users.identify'
    'body:id': string
    'body:email': string
    'body:channels'?: { [key: string]: string }
    'body:data'?: { [key: string]: string }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'vero',
      name: 'Vero',
      url: 'https://www.getvero.com/',
      docs: 'https://developers.getvero.com/?bash',
      signup: 'https://www.getvero.com/signup/',
      pricing: 'https://www.getvero.com/pricing/',
      tags: ['web2'],
      category: 'marketing',
      type: 'inbound',
      social: {
        twitter: 'getvero',
      },
    },
    base: 'https://api.getvero.com/api/v2',
    auth: {
      auth_token: {
        type: 'body',
      },
    },
    api: {
      events: {
        track: {
          interface: 'TrackEvent',
          meta: {
            title: 'Track',
            description:
              'This endpoint tracks an event for a specific user. If the user profile doesn’t exist Vero will create it.',
            docs: 'https://developers.getvero.com/?bash#events-track',
          },
          method: 'POST',
          paths: [
            {
              name: 'events',
              type: 'static',
            },
            {
              name: 'track',
              type: 'static',
            },
          ],
        },
      },
      users: {
        identify: {
          interface: 'IdentifyUser',
          meta: {
            title: 'Identify',
            description: `This endpoint creates a new user profile if the user doesn't exist yet. Otherwise, the user profile is updated based on the properties provided.`,
            docs: 'https://developers.getvero.com/?bash#users-object',
          },
          method: 'POST',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
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

export default Vero
