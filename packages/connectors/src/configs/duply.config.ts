import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Duply {
  export type Entity = { account: any; templates: any; images: any }
  export type Endpoint =
    | { usage: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint }
    | { generate: ApiDescriptionEndpoint; list: ApiDescriptionEndpoint }

  interface DuplyBase {
    'auth:Authorization': {
      username: string
      password: string
    }
  }

  export interface GetUsage extends DuplyBase, RequestParams {
    kind: 'duply.account.usage'
  }

  export interface ListTemplates extends DuplyBase, RequestParams {
    kind: 'duply.templates.list'
  }

  export interface GenerateImage extends DuplyBase, RequestParams {
    kind: 'duply.images.generate'
    'body:templateId': string
    'body:formats': Array<'jpg' | 'png' | 'thumb'>
    'body:fill:': any
    'body:requestName': string
    'body:transparent'?: boolean
    'body:variantName'?: string
  }

  export interface ListGeneratedImages extends DuplyBase, RequestParams {
    kind: 'duply.images.list'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'duply',
      name: 'Duply',
      url: 'https://duply.co/',
      docs: 'https://app.duply.co/docs',
      signup: 'https://app.duply.co/signup',
      pricing: 'https://duply.co/pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'image-processing',
      social: {},
    },
    base: 'https://gen.duply.co/v1',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      account: {
        usage: {
          interface: 'GetUsage',
          meta: {
            title: 'Get Usage',
            description: `Get Usage`,
            docs: 'https://app.duply.co/docs#get-usage',
          },
          method: 'GET',
          paths: [
            {
              name: 'usage',
              type: 'static',
            },
          ],
        },
      },
      templates: {
        list: {
          interface: 'ListTemplates',
          meta: {
            title: 'List Templates',
            description: `List Templates`,
            docs: 'https://app.duply.co/docs#get-list-template',
          },
          method: 'GET',
          paths: [
            {
              name: 'template',
              type: 'static',
            },
          ],
        },
      },
      images: {
        generate: {
          interface: 'GenerateImage',
          meta: {
            title: 'Generate Image',
            description: `Generate Image`,
            docs: 'https://app.duply.co/docs#post-generate-image',
          },
          method: 'POST',
          paths: [
            {
              name: 'generate',
              type: 'static',
            },
          ],
        },
        list: {
          interface: 'ListGeneratedImages',
          meta: {
            title: 'List Generated Images',
            description: `List Generated Images`,
            docs: 'https://app.duply.co/docs#get-generate-api-list',
          },
          method: 'GET',
          paths: [
            {
              name: 'generate',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Duply
