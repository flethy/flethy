import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Unsplash {
  export type Entity = { photos: any; search: any }
  export type Endpoint =
    | { list: ApiDescriptionEndpoint }
    | { photos: ApiDescriptionEndpoint }

  interface UnsplashBase {
    'auth:Authorization': string
  }

  export interface ListPhotos extends UnsplashBase, RequestParams {
    kind: 'unsplash.photos.list'
    'query:page'?: number
    'query:per_page'?: number
    'query:order_by'?: 'latest' | 'oldest' | 'popular'
  }

  export interface SearchPhotos extends UnsplashBase, RequestParams {
    kind: 'unsplash.search.photos'
    'query:query': string
    'query:collections'?: string
    'query:content_filter'?: 'low' | 'high'
    'query:color'?:
      | 'black_and_white'
      | 'black'
      | 'white'
      | 'yellow'
      | 'orange'
      | 'red'
      | 'purple'
      | 'magenta'
      | 'green'
      | 'teal'
      | 'blue'
    'query:orientation'?: 'landscape' | 'portrait' | 'squarish'
    'query:page'?: number
    'query:per_page'?: number
    'query:order_by'?: 'latest' | 'oldest' | 'popular'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'unsplash',
      name: 'Unsplash',
      url: 'https://unsplash.com',
      docs: 'https://unsplash.com/documentation',
      tags: ['web2'],
      category: 'data',
      type: 'image-provider',
      social: {
        twitter: 'unsplash',
        instagram: 'unsplash',
      },
    },
    base: 'https://api.unsplash.com',
    auth: {
      Authorization: {
        type: 'header:custom',
        custom: {
          prefix: 'Client-ID ',
        },
      },
    },
    api: {
      photos: {
        list: {
          interface: 'ListPhotos',
          meta: {
            title: 'List photos',
            description: `Get a single page from the Editorial feed.`,
            docs: 'https://unsplash.com/documentation#list-photos',
          },
          method: 'GET',
          paths: [
            {
              name: 'photos',
              type: 'static',
            },
          ],
        },
      },
      search: {
        photos: {
          interface: 'SearchPhotos',
          meta: {
            title: 'Search photos',
            description: `Get a single page of photo results for a query.`,
            docs: 'https://unsplash.com/documentation#search-photos',
          },
          method: 'GET',
          paths: [
            {
              name: 'search',
              type: 'static',
            },
            {
              name: 'photos',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Unsplash
