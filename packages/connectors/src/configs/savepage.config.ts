import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Savepage {
  export type Entity = { core: any }
  export type Endpoint = { screenshot: ApiDescriptionEndpoint }

  interface SavepageBase {
    'auth:key': string
  }

  export interface Screenshot extends SavepageBase, RequestParams {
    kind: 'savepage.core.screenshot'
    // 'body:q': string
    'body:q': string
    'body:width'?: number
    'body:height'?: number
    'body:fullpage'?: boolean
    'body:thumb_width'?: number
    'body:delay'?: number
    'body:nocookie'?: boolean
    'body:noads'?: boolean
    'body:format'?: 'jpeg' | 'png'
    'body:refresh'?: number
    'body:user_agent'?: string
    'body:accept_language'?: string
    'body:maxage'?: number
    'body:cookie'?: string
    'body:hash'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'savepage',
      name: 'Savepage',
      url: 'https://www.savepage.io/',
      docs: 'https://docs.savepage.io/',
      signup: 'https://my.savepage.io/auth/new',
      pricing: 'https://www.savepage.io/#pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
      social: {
        github: 'interactive32',
      },
    },
    base: 'https://api.savepage.io',
    auth: {
      key: {
        type: 'body',
      },
    },
    api: {
      core: {
        screenshot: {
          interface: 'Screenshot',
          meta: {
            title: 'Screenshot',
            description: `Screenshot`,
            docs: 'https://docs.savepage.io/',
          },
          method: 'POST',
          paths: [
            {
              name: 'v1',
              type: 'static',
            },
          ],
          options: {
            pathTailingSlash: true,
          },
        },
      },
    },
  }
}

export default Savepage
