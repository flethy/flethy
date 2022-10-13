import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Imglab {
  export type Entity = { core: any }
  export type Endpoint = { api: ApiDescriptionEndpoint }

  type PositionValue =
    | 'left'
    | 'right'
    | 'center'
    | 'top'
    | 'bottom'
    | 'middle'
    | string

  export interface Api extends RequestParams {
    kind: 'imglab.core.api'
    'subdomain:appSource': string
    'param:image': string
    'query:width'?: number
    'query:height'?: number
    'query:dpr'?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    'query:flip'?: 'horizontal' | 'vertical' | 'horizontal,vertical'
    'query:orientation'?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    'query:mode'?: 'crop' | 'contain' | 'face' | 'force'
    'query:crop'?: 'attention' | 'entropy' | 'face' | PositionValue
    'query:contain'?: 'blur' | 'mirror' | 'clamp'
    'query:contain-color'?: string
    'query:face-padding'?: number
    'query:upsalce'?: boolean
    'query:download'?: '' | string
    'query:format'?:
      | 'jpeg'
      | 'png'
      | 'webp'
      | 'avif'
      | 'gif'
      | 'blurhash'
      | 'json'
    'query:quality'?: number
    'query:subsample'?: 420 | 444
    'query:interlace'?: boolean
    'query:quantise'?: boolean
    'query:lossless'?: boolean
    'query:blurhash'?: string
    'query:page'?: number
    'query:strip'?: 'all' | 'metadata'
    'query:hue'?: number
    'query:saturate'?: number
    'query:invert'?: boolean
    'query:sepia'?: number
    'query:background-color'?: string
    'query:color-transform'?: 'srgb' | 'tinysrgb' | 'adobe'
    'query:face-number'?: number
    // TODO: add remaining query params - there are a lot
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'imglab',
      name: 'Imglab',
      url: 'https://imglab.io',
      docs: 'https://imglab.io/docs/overview/introduction',
      signup: 'https://imglab.io/signup',
      pricing: 'https://imglab.io/pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'image-processing',
      social: {
        twitter: 'imglab_io',
        github: 'imglab-io',
      },
    },
    base: 'https://subdomain:appSource.imglab-cdn.net',
    api: {
      core: {
        api: {
          interface: 'Api',
          meta: {
            title: 'Image API',
            description: `Image API`,
            docs: 'https://imglab.io/docs/render/introduction',
          },
          method: 'GET',
          paths: [
            {
              name: 'image',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Imglab
