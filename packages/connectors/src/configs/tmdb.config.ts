import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace TMDB {
  export type Entity = { core: any }
  export type Endpoint = { trending: ApiDescriptionEndpoint }

  interface TMDBBase {
    'auth:Authorization': string
  }

  export interface Trending extends TMDBBase, RequestParams {
    kind: 'tmdb.core.trending'
    'param:mediaType': 'all' | 'movie' | 'tv' | 'person'
    'param:timeWindow': 'day' | 'week'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'tmdb',
      name: 'TMDB',
      url: 'https://www.themoviedb.org',
      docs: 'https://developers.themoviedb.org',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
      social: {
        twitter: 'themoviedb',
      },
    },
    base: 'https://api.themoviedb.org/3',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      core: {
        trending: {
          interface: 'Trending',
          meta: {
            title: 'Trending',
            description: `Trending`,
            docs: 'https://developers.themoviedb.org/3/trending/get-trending',
          },
          method: 'GET',
          paths: [
            {
              name: 'trending',
              type: 'static',
            },
            {
              name: 'mediaType',
              type: 'param',
            },
            {
              name: 'timeWindow',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default TMDB
