import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Tinify {
  export type Entity = { core: any }
  export type Endpoint = { shrink: ApiDescriptionEndpoint }

  interface TinifyBase {
    'auth:Authorization': {
      username: 'api'
      password: string
    }
  }

  export interface Shrink extends TinifyBase, RequestParams {
    kind: 'tinify.core.shrink'
    'body:source': {
      url: string
    }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'tinify',
      name: 'Tinify',
      url: 'https://tinypng.com',
      docs: 'https://tinypng.com/developers/reference',
      tags: ['web2'],
      category: 'utils',
      type: 'image-processing',
      social: {
        twitter: 'tinypng',
      },
    },
    base: 'https://api.tinify.com',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      core: {
        shrink: {
          interface: 'Shrink',
          meta: {
            title: 'Shrink',
            description: `Shrink`,
            docs: 'https://tinypng.com/developers/reference',
          },
          method: 'POST',
          paths: [
            {
              name: 'shrink',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Tinify
