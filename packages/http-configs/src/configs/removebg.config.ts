import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace RemoveBg {
  export type Entity = { core: any }
  export type Endpoint = { remove: ApiDescriptionEndpoint }

  export interface RemoveBgBase {
    'auth:X-API-Key': string
  }

  export interface Remove extends RemoveBgBase, RequestParams {
    kind: 'removebg.core.remove'
    'body:image_file'?: string
    'body:image_file_b64'?: string
    'body:image_url'?: string
    'body:size'?: 'preview' | 'full' | 'auto'
    'body:type'?: 'auto' | 'person' | 'car' | 'product'
    'body:type_level'?: 'none' | '1' | '2' | 'latest'
    'body:format'?: 'auto' | 'png' | 'jpg' | 'zip'
    'body:roi'?: string
    'body:crop'?: boolean
    'body:crop_margin'?: string
    'body:scale'?: string
    'body:position'?: string
    'body:channels'?: string
    'body:add_shadow'?: boolean
    'body:semitransparency'?: boolean
    'body:bg_color'?: string
    'body:bg_image_url'?: string
    'body:bg_image_file'?: string
    'header:Content-Type'?: 'application/json'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'removebg',
      name: 'RemoveBg',
      url: 'https://www.remove.bg',
      docs: 'https://www.remove.bg/en/api',
      tags: ['web2'],
      category: 'utils',
      type: 'image-processing',
    },
    base: 'https://api.remove.bg/v1.0',
    auth: {
      'X-API-Key': {
        type: 'header',
      },
    },
    api: {
      core: {
        remove: {
          interface: 'Remove',
          meta: {
            title: 'Remove',
            description: `Remove Background`,
            docs: 'https://www.remove.bg/de/api#api-reference',
          },
          method: 'POST',
          paths: [
            {
              name: 'removebg',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default RemoveBg
