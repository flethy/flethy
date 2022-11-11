import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Rebrandly {
  export type Entity = { links: any }
  export type Endpoint = { post: ApiDescriptionEndpoint }

  interface RebrandlyBase {
    'auth:apikey': string
    'auth:workspace': string
  }

  export interface CreateLink extends RebrandlyBase, RequestParams {
    kind: 'rebrandly.links.post'
    'body:destination': string
    'body:slashtag'?: string
    'body:domain'?: {
      id?: string
      fullName?: string
    }
    'body:title'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'rebrandly',
      name: 'Rebrandly',
      url: 'https://www.rebrandly.com/',
      docs: 'https://developers.rebrandly.com/',
      signup: 'https://www.rebrandly.com/signup',
      pricing: 'https://www.rebrandly.com/pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'url-shortener',
      social: {
        twitter: 'rebrandlybuzz',
        instagram: 'rebrandlybuzz',
      },
    },
    base: 'https://api.rebrandly.com/v1',
    auth: {
      apikey: {
        type: 'header',
      },
      workspace: {
        type: 'header',
      },
    },
    api: {
      links: {
        post: {
          interface: 'CreateLink',
          meta: {
            title: 'CreateLink',
            description: `Create a new link`,
            docs: 'https://developers.rebrandly.com/reference/createlink',
          },
          method: 'POST',
          paths: [
            {
              name: 'links',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Rebrandly
