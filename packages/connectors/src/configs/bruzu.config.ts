import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Bruzu {
  export type Entity = { image: any }
  export type Endpoint = { create: ApiDescriptionEndpoint }

  interface ElementAndProperties {
    [element: string]: string | number | boolean | undefined
  }

  export interface CreateImage extends ElementAndProperties, RequestParams {
    kind: 'bruzu.image.create'
    'auth:apiKey': string
    'query:height'?: number
    'query:width'?: number
    'query:backgroundColor'?: string
    'query:backgroundImage'?: string
    'query:backgroundImage.opacity'?: number
    'query:scale'?: number
    'query:download'?: 0 | 1
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'bruzu',
      name: 'Bruzu',
      url: 'https://bruzu.com',
      docs: 'https://docs.bruzu.com',
      signup: 'https://img.bruzu.com/twitter',
      pricing: 'https://bruzu.com/pricing',
      social: {
        twitter: 'bruzuHQ',
        instagram: 'bruzuHQ',
      },
      tags: ['web2'],
      category: 'utils',
      type: 'image-processing',
    },
    base: 'https://img.bruzu.com',
    auth: {
      apiKey: {
        type: 'query',
      },
    },
    api: {
      image: {
        create: {
          interface: 'CreateImage',
          meta: {
            title: 'Creating an image',
            description: `Creating an image`,
            docs: 'https://docs.bruzu.com/getting-started/using-the-api/#creating-an-image',
          },
          method: 'GET',
        },
      },
    },
  }
}

export default Bruzu
