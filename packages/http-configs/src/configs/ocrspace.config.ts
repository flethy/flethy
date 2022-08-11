import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace OCRSpace {
  export type Entity = { core: any }
  export type Endpoint = {
    url: ApiDescriptionEndpoint
    base64: ApiDescriptionEndpoint
  }

  interface OCRSpaceBase {
    'auth:apikey': string
    'bodyform:language'?: string
    'bodyform:isOverlayRequired'?: boolean
    'bodyform:filetype'?: 'PDF' | 'GIF' | 'PNG' | 'JPG' | 'TIF' | 'BMP'
    'bodyform:detectOrientation'?: boolean
    'bodyform:isCreateSearchablePdf'?: boolean
    'bodyform:isSearchablePdfHideTextLayer'?: boolean
    'bodyform:scale'?: boolean
    'bodyform:isTable'?: boolean
    'bodyform:OCREngine'?: 1 | 2 | 3
  }

  export interface ParseURL extends OCRSpaceBase, RequestParams {
    kind: 'ocrspace.core.url'
    'bodyform:url': string
  }

  export interface ParseBase64 extends OCRSpaceBase, RequestParams {
    kind: 'ocrspace.core.base64'
    'bodyform:base64Image': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'ocrspace',
      name: 'OCRSpace',
      url: 'https://ocr.space',
      docs: 'https://ocr.space/OCRAPI',
      tags: ['web2'],
      category: 'utils',
      type: 'ocr',
      social: {
        twitter: 'A9T9_com',
      },
    },
    base: 'https://api.ocr.space',
    auth: {
      apikey: {
        type: 'header',
      },
    },
    api: {
      core: {
        url: {
          interface: 'ParseURL',
          meta: {
            title: 'Provide image/PDF to be OCRed via URL',
            description: `Provide image/PDF to be OCRed via URL`,
            docs: 'https://ocr.space/OCRAPI',
          },
          method: 'POST',
          paths: [
            {
              name: 'Parse',
              type: 'static',
            },
            {
              name: 'Image',
              type: 'static',
            },
          ],
        },
        base64: {
          interface: 'ParseBase64',
          meta: {
            title: 'Send image as string in Base64 format',
            description: `Send image as string in Base64 format`,
            docs: 'https://ocr.space/OCRAPI',
          },
          method: 'POST',
          paths: [
            {
              name: 'Parse',
              type: 'static',
            },
            {
              name: 'Image',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default OCRSpace
