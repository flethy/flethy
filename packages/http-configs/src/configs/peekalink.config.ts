import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Peekalink {
  export type Entity = { core: any }
  export type Endpoint = {
    preview: ApiDescriptionEndpoint
    isAvailable: ApiDescriptionEndpoint
  }

  interface PeekalinkBase {
    'auth:X-API-Key': string
  }

  export interface Preview extends PeekalinkBase, RequestParams {
    kind: 'peekalink.core.preview'
    'body:link': string
  }

  export interface IsAvailable extends PeekalinkBase, RequestParams {
    kind: 'peekalink.core.isAvailable'
    'body:link': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'peekalink',
      name: 'Peekalink',
      url: 'https://peekalink.io',
      docs: 'https://docs.peekalink.io',
      tags: ['web2'],
      category: 'aggregation',
      type: 'indexer',
    },
    base: 'https://api.peekalink.io',
    auth: {
      'X-API-Key': {
        type: 'header',
      },
    },
    api: {
      core: {
        preview: {
          interface: 'Preview',
          meta: {
            title: 'Preview',
            description: `The primary endpoint of Peekalink. Given a link, it will return a preview for it.`,
            docs: 'https://docs.peekalink.io/preview-endpoint',
          },
          method: 'POST',
        },
        isAvailable: {
          interface: 'IsAvailable',
          meta: {
            title: 'Is Available',
            description: `An endpoint to check whether preview for a given link is available.`,
            docs: 'https://docs.peekalink.io/is-available-endpoint',
          },
          method: 'POST',
          paths: [
            {
              name: 'is-available',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Peekalink
