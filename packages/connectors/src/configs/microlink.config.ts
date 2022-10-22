import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Microlink {
  export type Entity = { core: any }
  export type Endpoint = { url: ApiDescriptionEndpoint }

  interface MicrolinkBase {
    'auth:x-api-key'?: string
  }

  export interface Url extends MicrolinkBase, RequestParams {
    kind: 'microlink.core.url'
    'query:url': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'microlink',
      name: 'Microlink',
      url: 'https://microlink.io',
      docs: 'https://microlink.io/docs',
      pricing: 'https://microlink.io/#pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
      social: {
        twitter: 'microlinkhq',
        github: 'microlinkhq',
      },
    },
    base: 'https://api.microlink.io',
    auth: {
      'x-api-key': {
        type: 'header',
      },
    },
    api: {
      core: {
        url: {
          interface: 'Url',
          meta: {
            title: 'url',
            description: `url`,
            docs: 'https://microlink.io/docs/api/parameters/url',
          },
          method: 'GET',
        },
      },
    },
  }
}

export default Microlink
