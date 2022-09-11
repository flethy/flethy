import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace APIFlash {
  export type Entity = { core: any }
  export type Endpoint = { screenshot: ApiDescriptionEndpoint }

  interface APIFlashBase {
    'auth:access_key': string
  }

  export interface Screenshot extends APIFlashBase, RequestParams {
    kind: 'apiflash.core.screenshot'
    'query:url': string
    'query:format'?: 'jpeg' | 'png' | 'webp'
    'query:width'?: number
    'query:height'?: number
    'query:fresh'?: boolean
    'query:full_page'?: boolean
    'query:quality'?: number
    'query:delay'?: number
    'query:scroll_page'?: boolean
    'query:ttl'?: number
    'query:response_type'?: 'image' | 'json'
    'query:thumbnail_width'?: number
    'query:no_cookie_banners'?: boolean
    'query:no_ads'?: boolean
    'query:no_tracking'?: boolean
    'query:scale_factor'?: number
    'query:element'?: string
    'query:element_overlap'?: boolean
    'query:user_agent'?: string
    'query:extract_html'?: boolean
    'query:extract_text'?: boolean
    'query:transparent'?: boolean
    'query:wait_for'?: string
    'query:wait_until'?: 'network_idle' | 'dom_loaded' | 'page_loaded'
    'query:fail_on_status'?: string
    'query:accept_language'?: string
    'query:css'?: string
    'query:cookies'?: string
    'query:proxy'?: string
    'query:latitude'?: string
    'query:longitude'?: string
    'query:accuracy'?: number
    'query:js'?: string
    'query:headers'?: string
    'query:time_zone'?: string
    'query:ip_location'?: string
    'query:s3_access_key_id'?: string
    'query:s3_secret_key'?: string
    'query:s3_bucket'?: string
    'query:s3_key'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'apiflash',
      name: 'APIFlash',
      url: 'https://apiflash.com/',
      docs: 'https://apiflash.com/documentation',
      signup: 'https://apiflash.com/register',
      pricing: 'https://apiflash.com/#pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
      social: {
        twitter: 'apiflash_com',
      },
    },
    base: 'https://api.apiflash.com/v1',
    auth: {
      access_key: {
        type: 'query',
      },
    },
    api: {
      core: {
        screenshot: {
          interface: 'Screenshot',
          meta: {
            title: 'Screenshot',
            description: `Screenshot`,
            docs: 'https://apiflash.com/documentation',
          },
          method: 'GET',
          paths: [
            {
              name: 'urltoimage',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default APIFlash
