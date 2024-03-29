import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace ReadMe {
  export type Entity = { apispec: any; docs: any; categories: any }
  export type Endpoint =
    | {
        getMetadata: ApiDescriptionEndpoint
        upload: ApiDescriptionEndpoint
        delete: ApiDescriptionEndpoint
        update: ApiDescriptionEndpoint
      }
    | {
        create: ApiDescriptionEndpoint
      }
    | {
        list: ApiDescriptionEndpoint
      }

  interface ReadMeBase {
    'auth:Authorization': string
  }

  export interface APISpecGetMetadata extends ReadMeBase, RequestParams {
    kind: 'readme.apispec.getMetadata'
    'query:perPage'?: number
    'query:page'?: number
    'header:x-readme-version'?: string
  }

  export interface APISpecUpload extends ReadMeBase, RequestParams {
    kind: 'readme.apispec.upload'
    'body:spec': string
    'header:x-readme-version'?: string
  }

  export interface APISpecDelete extends ReadMeBase, RequestParams {
    kind: 'readme.apispec.delete'
    'param:id': string
  }

  export interface APISpecUpdate extends ReadMeBase, RequestParams {
    kind: 'readme.apispec.update'
    'param:id': string
    'body:spec': string
  }

  export interface CreateDoc extends ReadMeBase, RequestParams {
    kind: 'readme.docs.create'
    'body:title': string
    'body:type'?: 'basic' | 'error' | 'link'
    'body:bodyattribute'?: string
    'body:category': string
    'body:hidden'?: boolean
    'body:order'?: number
    'body:parentDoc'?: string
    'body:error'?: {
      code: string
    }
    'header:x-readme-version'?: string
  }

  export interface ListCategories extends ReadMeBase, RequestParams {
    kind: 'readme.categories.list'
    'query:perPage'?: number
    'query:page'?: number
    'header:x-readme-version'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'readme',
      name: 'ReadMe',
      url: 'https://readme.com/',
      docs: 'https://readme.com/documentation',
      signup: 'https://dash.readme.com/signup',
      pricing: 'https://readme.com/pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'documentation',
      social: {
        twitter: 'readme',
      },
    },
    base: 'https://dash.readme.com/api/v1',
    auth: {
      Authorization: {
        type: 'header:basic:encoded',
      },
    },
    api: {
      apispec: {
        getMetadata: {
          interface: 'APISpecGetMetadata',
          meta: {
            title: 'Get metadata',
            description: `Get API specification metadata.`,
            docs: 'https://docs.readme.com/main/reference/getapispecification',
          },
          method: 'GET',
          paths: [
            {
              name: 'api-specification',
              type: 'static',
            },
          ],
        },
        upload: {
          interface: 'APISpecUpload',
          meta: {
            title: 'Upload specification',
            description: `Upload specification`,
            docs: 'https://docs.readme.com/main/reference/uploadapispecification',
          },
          method: 'POST',
          paths: [
            {
              name: 'api-specification',
              type: 'static',
            },
          ],
        },
        delete: {
          interface: 'APISpecDelete',
          meta: {
            title: 'Delete specification',
            description: `Delete specification`,
            docs: 'https://docs.readme.com/main/reference/deleteapispecification',
          },
          method: 'DELETE',
          paths: [
            {
              name: 'api-specification',
              type: 'static',
            },
            {
              name: 'id',
              type: 'param',
            },
          ],
        },
        update: {
          interface: 'APISpecUpdate',
          meta: {
            title: 'Update specification',
            description: `Update specification`,
            docs: 'https://docs.readme.com/main/reference/updateapispecification',
          },
          method: 'PUT',
          paths: [
            {
              name: 'api-specification',
              type: 'static',
            },
            {
              name: 'id',
              type: 'param',
            },
          ],
        },
      },
      docs: {
        create: {
          interface: 'CreateDoc',
          meta: {
            title: 'Create doc',
            description: `Create doc`,
            docs: 'https://docs.readme.com/main/reference/createdoc',
          },
          method: 'POST',
          paths: [
            {
              name: 'docs',
              type: 'static',
            },
          ],
        },
      },
      categories: {
        list: {
          interface: 'ListCategories',
          meta: {
            title: 'Get all categories',
            description: `Get all categories`,
            docs: 'https://docs.readme.com/main/reference/getcategories',
          },
          method: 'GET',
          paths: [
            {
              name: 'categories',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default ReadMe
