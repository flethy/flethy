import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace APITemplateIo {
  export type Entity = { core: any }
  export type Endpoint = { createImage: ApiDescriptionEndpoint }

  export interface APITemplateBase {
    'auth:X-API-KEY': string
  }

  export interface CreateImage extends APITemplateBase, RequestParams {
    kind: 'apitemplateio.core.createImage'
    'query:template_id': string
    'query:expiration': number
    'body:overrides': Array<{ [key: string]: string }>
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'apitemplateio',
      name: 'APITemplateIo',
      url: 'https://apitemplate.io/',
      docs: 'https://apitemplate.io/apiv2/#section/Introduction',
      social: {
        twitter: 'apitemplateio',
        instagram: 'apitemplateio',
      },
      tags: ['web2'],
      category: 'marketing',
      type: 'media',
    },
    base: [
      {
        id: 'default',
        url: 'https://rest.apitemplate.io/v2',
      },
      {
        id: 'eu',
        url: 'https://rest-de.apitemplate.io/v2',
      },
      {
        id: 'us',
        url: 'https://rest-us.apitemplate.io/v2',
      },
      {
        id: 'aus',
        url: 'https://rest-au.apitemplate.io/v2',
      },
    ],
    auth: {
      'X-API-KEY': {
        type: 'header',
      },
    },
    api: {
      core: {
        createImage: {
          interface: 'CreateImage',
          meta: {
            title: 'Create an Image',
            description: `This endpoint creates a JPEG file(along with PNG) with JSON data and your template`,
            docs: 'https://apitemplate.io/apiv2/#tag/API-Integration/operation/create-image',
          },
          method: 'POST',
          paths: [
            {
              name: 'create-image',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default APITemplateIo
