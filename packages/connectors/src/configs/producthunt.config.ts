import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace ProductHunt {
  export type Entity = { collections: any }
  export type Endpoint = { get: ApiDescriptionEndpoint }

  interface ProductHuntBase {
    'auth:Authorization': string
  }

  export interface GetCollections extends ProductHuntBase, RequestParams {
    kind: 'producthunt.collections.get'
    'query:older'?: string
    'query:newer'?: string
    'query:page'?: number
    'query:per_page'?: number
    'query:sort_by'?: 'id' | 'created_at' | 'updated_at'
    'query:order'?: 'asc' | 'desc'
    'query:search[featured]'?: boolean
    'query:search[slug]'?: string
    'query:search[user_username]'?: string
    'query:search[subscriber_id]'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'producthunt',
      name: 'ProductHunt',
      url: 'https://www.producthunt.com',
      docs: 'https://api.producthunt.com/v1/docs',
      signup: 'https://www.producthunt.com',
      tags: ['web2'],
      category: 'news',
      type: 'software',
      social: {},
    },
    base: 'https://api.producthunt.com/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      collections: {
        get: {
          interface: 'GetCollections',
          meta: {
            title: 'Get newest collections',
            description: `Get newest collections`,
            docs: 'https://api.producthunt.com/v1/docs/collections/collections_index_get_newest_collections',
          },
          method: 'GET',
          paths: [
            {
              name: 'collections',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default ProductHunt
