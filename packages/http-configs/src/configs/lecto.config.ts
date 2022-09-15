import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Lecto {
  export type Entity = { translate: any }
  export type Endpoint = {
    text: ApiDescriptionEndpoint
    json: ApiDescriptionEndpoint
  }

  interface LectoBase {
    'auth:X-API-Key': string
  }

  export interface TranslateText extends LectoBase, RequestParams {
    kind: 'lecto.translate.text'
    'body:from'?: string
    'body:texts': string[]
    'body:to': string[]
  }

  export interface TranslateJson extends LectoBase, RequestParams {
    kind: 'lecto.translate.json'
    'body:from': string
    'body:json': string
    'body:protected_keys'?: string[]
    'body:to': string[]
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'lecto',
      name: 'Lecto',
      url: 'https://lecto.ai/',
      docs: 'https://dashboard.lecto.ai/docs',
      signup: 'https://dashboard.lecto.ai/signin',
      pricing: 'https://lecto.ai/#pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'translation',
      social: {
        twitter: 'lectoai',
        github: 'lecto-ai',
      },
    },
    base: 'https://api.lecto.ai/v1',
    auth: {
      'X-API-Key': {
        type: 'header',
      },
    },
    api: {
      translate: {
        text: {
          interface: 'TranslateText',
          meta: {
            title: 'Translate Text or HTML',
            description: `Translate Text or HTML`,
            docs: 'https://dashboard.lecto.ai/docs',
          },
          method: 'POST',
          paths: [
            {
              name: 'translate',
              type: 'static',
            },
            {
              name: 'text',
              type: 'static',
            },
          ],
        },
        json: {
          interface: 'TranslateJson',
          meta: {
            title: 'Translate JSON payload',
            description: `Translate JSON payload`,
            docs: 'https://dashboard.lecto.ai/docs',
          },
          method: 'POST',
          paths: [
            {
              name: 'translate',
              type: 'static',
            },
            {
              name: 'json',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Lecto
