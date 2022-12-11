import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

// auth is similar to oauth1a
// see https://pusher.com/docs/channels/library_auth_reference/rest-api/#worked-authentication-example

export namespace Pusher {
  export type Entity = { test: any }
  export type Endpoint = { test: ApiDescriptionEndpoint }

  export interface Test extends RequestParams {
    kind: 'pusher..'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'pusher',
      name: 'Pusher',
      url: 'https://pusher.com/',
      docs: 'https://pusher.com/docs/channels/library_auth_reference/rest-api/',
      signup: 'https://dashboard.pusher.com/accounts/sign_up',
      pricing: 'https://pusher.com/beams/pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
      social: {
        twitter: 'pusher',
        github: 'pusher',
      },
    },
    base: '',
    api: {
      test: {
        test: {
          interface: '',
          meta: {
            title: '',
            description: ``,
            docs: '',
          },
          method: 'GET',
          paths: [
            {
              name: '',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Pusher
