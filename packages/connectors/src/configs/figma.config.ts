import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Figma {
  export type Entity = { files: any }
  export type Endpoint = {
    get: ApiDescriptionEndpoint
    getNodes: ApiDescriptionEndpoint
    getImages: ApiDescriptionEndpoint
    getImageFills: ApiDescriptionEndpoint
  }

  interface FigmaBase {
    'auth:X-Figma-Token': string
  }

  export interface GetFile extends FigmaBase, RequestParams {
    kind: 'figma.files.get'
    'param:key': string
    'query:version'?: string
    'query:ids'?: string
    'query:depth'?: number
    'query:geometry'?: string
    'query:plugin_data'?: string
    'query:branch_data'?: boolean
  }

  export interface GetFileNodes extends FigmaBase, RequestParams {
    kind: 'figma.files.getNodes'
    'param:key': string
    'query:ids': string
    'query:version'?: string
    'query:depth'?: number
    'query:geometry'?: string
    'query:plugin_data'?: string
  }

  export interface GetImages extends FigmaBase, RequestParams {
    kind: 'figma.files.getImages'
    'param:key': string
    'query:ids': string
    'query:scale'?: number
    'query:format'?: 'jpg' | 'png' | 'svg' | 'pdf'
    'query:svg_include_id'?: boolean
    'query:svg_simplify_stroke'?: boolean
    'query:use_absolute_bounds'?: boolean
    'query:version'?: string
  }

  export interface GetImageFills extends FigmaBase, RequestParams {
    kind: 'figma.files.getImageFills'
    'param:key': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'figma',
      name: 'Figma',
      url: 'https://www.figma.com/',
      docs: 'https://www.figma.com/developers/api',
      signup: 'https://www.figma.com/signup',
      pricing: 'https://www.figma.com/pricing/',
      tags: ['web2'],
      category: 'design',
      type: 'editor',
      social: {
        twitter: 'figma',
        instagram: 'figma',
      },
    },
    base: 'https://api.figma.com/v1',
    auth: {
      'X-Figma-Token': {
        type: 'header',
      },
    },
    api: {
      files: {
        get: {
          interface: 'GetFile',
          meta: {
            title: 'Get File',
            description: `Get File`,
            docs: 'https://www.figma.com/developers/api#get-files-endpoint',
          },
          method: 'GET',
          paths: [
            {
              name: 'files',
              type: 'static',
            },
            {
              name: 'key',
              type: 'param',
            },
          ],
        },
        getNodes: {
          interface: 'GetFileNodes',
          meta: {
            title: 'Get File Nodes',
            description: `Get File Nodes`,
            docs: 'https://www.figma.com/developers/api#get-file-nodes-endpoint',
          },
          method: 'GET',
          paths: [
            {
              name: 'files',
              type: 'static',
            },
            {
              name: 'key',
              type: 'param',
            },
            {
              name: 'nodes',
              type: 'static',
            },
          ],
        },
        getImages: {
          interface: 'GetImages',
          meta: {
            title: 'Get Image',
            description: `Get Image`,
            docs: 'https://www.figma.com/developers/api#get-images-endpoint',
          },
          method: 'GET',
          paths: [
            {
              name: 'images',
              type: 'static',
            },
            {
              name: 'key',
              type: 'param',
            },
          ],
        },
        getImageFills: {
          interface: 'GetImageFills',
          meta: {
            title: 'Get Image Fills',
            description: `Get Image Fills`,
            docs: 'https://www.figma.com/developers/api#get-image-fills-endpoint',
          },
          method: 'GET',
          paths: [
            {
              name: 'files',
              type: 'static',
            },
            {
              name: 'key',
              type: 'param',
            },
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

export default Figma
