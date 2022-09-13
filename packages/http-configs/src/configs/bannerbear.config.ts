import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace BannerBear {
  export type Entity = { images: any }
  export type Endpoint = {
    create: ApiDescriptionEndpoint
    retrieve: ApiDescriptionEndpoint
    list: ApiDescriptionEndpoint
  }

  interface BannerBearBase {
    'auth:Authorization': string
  }

  export interface CreateImage extends BannerBearBase, RequestParams {
    kind: 'bannerbear.images.create'
    'body:template': string
    'body:modifications': Array<{
      name: string
      color?: string
      // text container
      text?: string
      background?: string
      font_family?: string
      text_align_h?: string
      text_align_v?: string
      font_family_2?: string
      color_2?: string
      // image container
      image_url?: string
      effect?: string
      anchor_x?: string
      anchor_y?: string
      fill_type?: string
      disable_face_detect?: boolean
      disable_smart_crop?: boolean
      // bar/line chart
      chart_data?: string
      // star rating
      rating?: number
      // qr code
      target?: string
      // bar code
      bar_code_data?: string
      // ANY LAYER TYPE
      gradient?: string[]
      border_width?: number
      border_color?: string
      shift_x?: number
      shift_y?: number
      hide?: boolean
    }>
    webhook_url?: string
    transparent?: boolean
    render_pdf?: boolean
    template_version?: number
    metadata?: string
  }

  export interface RetrieveImage extends BannerBearBase, RequestParams {
    kind: 'bannerbear.images.retrieve'
    'param:imageId': string
  }

  export interface ListImages extends BannerBearBase, RequestParams {
    kind: 'bannerbear.images.list'
    'query:page'?: number
    'query:limit'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'bannerbear',
      name: 'BannerBear',
      url: 'https://bannerbear.com',
      docs: 'https://developers.bannerbear.com',
      signup: 'https://app.bannerbear.com/',
      pricing: 'https://www.bannerbear.com/pricing/',
      tags: ['web2'],
      category: 'utils',
      type: 'image-processing',
      social: {
        twitter: 'bannerbearHQ',
      },
    },
    base: 'https://api.bannerbear.com/v2',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      images: {
        create: {
          interface: 'CreateImage',
          meta: {
            title: 'Create an image',
            description: `Creating an image on Bannerbear is achieved via this endpoint.`,
            docs: 'https://developers.bannerbear.com/#post-v2-images',
          },
          method: 'POST',
          paths: [
            {
              name: 'images',
              type: 'static',
            },
          ],
        },
        retrieve: {
          interface: 'RetrieveImage',
          meta: {
            title: 'Retrieve an image',
            description: `Retrieves a single Image object referenced by its unique ID.`,
            docs: 'https://developers.bannerbear.com/#get-v2-images-uid',
          },
          method: 'GET',
          paths: [
            {
              name: 'images',
              type: 'static',
            },
            {
              name: 'imageId',
              type: 'param',
            },
          ],
        },
        list: {
          interface: 'ListImages',
          meta: {
            title: 'List all images',
            description: `Lists images inside a project.`,
            docs: 'https://developers.bannerbear.com/#get-v2-images',
          },
          method: 'GET',
          paths: [
            {
              name: 'images',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default BannerBear
