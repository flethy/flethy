import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Beehiiv {
  export type Entity = { core: any }
  export type Endpoint = {
    createSubscriber: ApiDescriptionEndpoint
    getPublications: ApiDescriptionEndpoint
  }

  interface BeehiivBase {
    'auth:X-ApiKey': string
  }

  export interface CreateSubscriber extends BeehiivBase, RequestParams {
    kind: 'beehiiv.core.createSubscriber'
    'body:email': string
    'body:publication_id': string
    'body:send_welcome_email'?: boolean
    'body:utm_source'?: string
  }

  export interface GetPublications extends BeehiivBase, RequestParams {
    kind: 'beehiiv.core.getPublications'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'beehiiv',
      name: 'Beehiiv',
      url: 'https://www.beehiiv.com/',
      docs: 'https://www.beehiiv.com/developers/docs',
      signup: 'https://app.beehiiv.com/signup',
      pricing: 'https://www.beehiiv.com/pricing',
      tags: ['web2'],
      category: 'communication',
      type: 'email',
      social: {
        twitter: 'beehiiv',
        instagram: 'beehiiv',
      },
    },
    base: 'https://api.beehiiv.com/v1',
    auth: {
      'X-ApiKey': {
        type: 'header',
      },
    },
    api: {
      core: {
        createSubscriber: {
          interface: 'CreateSubscriber',
          meta: {
            title: 'Create Subscriber',
            description: `Create Subscriber`,
            docs: 'https://www.beehiiv.com/developers/docs',
          },
          method: 'POST',
          paths: [
            {
              name: 'subscribers',
              type: 'static',
            },
          ],
        },
        getPublications: {
          interface: 'GetPublications',
          meta: {
            title: 'All Publications',
            description: `All Publications`,
            docs: 'https://www.beehiiv.com/developers/docs',
          },
          method: 'GET',
          paths: [
            {
              name: 'publications',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Beehiiv
