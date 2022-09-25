import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace PolyScale {
  export type Entity = { cache: any }
  export type Endpoint = {
    getAll: ApiDescriptionEndpoint
    purge: ApiDescriptionEndpoint
  }

  interface PolyScaleBase {
    'auth:Authorization': string
  }

  export interface GetCaches extends PolyScaleBase, RequestParams {
    kind: 'polyscale.cache.getAll'
  }

  export interface PurgeCache extends PolyScaleBase, RequestParams {
    kind: 'polyscale.cache.purge'
    'param:cacheId': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'polyscale',
      name: 'PolyScale',
      url: 'https://www.polyscale.ai',
      docs: 'https://docs.polyscale.ai/api/',
      signup: 'https://app.polyscale.ai/signup',
      pricing: 'https://www.polyscale.ai/pricing/',
      tags: ['web2'],
      category: 'infra',
      type: 'database',
      social: {
        twitter: 'PolyScaleAi',
      },
    },
    base: 'https://api.polyscale.ai/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      cache: {
        getAll: {
          interface: 'GetCaches',
          meta: {
            title: 'Get caches',
            description: `Retrieves all caches in the workspace associated with the provided api key.`,
            docs: 'https://docs.polyscale.ai/api/#tag/cache',
          },
          method: 'GET',
          paths: [
            {
              name: 'caches',
              type: 'static',
            },
          ],
        },
        purge: {
          interface: 'PurgeCache',
          meta: {
            title: 'Purge a cache',
            description: `Purge a cache in the workspace associated with the provided api key.`,
            docs: 'https://docs.polyscale.ai/api/#tag/cache',
          },
          method: 'PUT',
          paths: [
            {
              name: 'caches',
              type: 'static',
            },
            {
              name: 'cacheId',
              type: 'param',
            },
            {
              name: 'purge',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default PolyScale
