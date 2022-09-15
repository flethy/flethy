import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace WordSimi {
  export type Entity = { core: any }
  export type Endpoint = { get: ApiDescriptionEndpoint }

  export interface MostSimilarWords extends RequestParams {
    kind: 'wordsimi.core.get'
    'param:word': string
    'query:count': number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'wordsimi',
      name: 'WordSimi',
      url: 'https://word-simi.herokuapp.com',
      docs: 'https://word-simi.herokuapp.com',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
      social: {
        twitter: 'rvigneshw',
      },
    },
    base: 'https://word-simi.herokuapp.com/api/v1/most_similar',
    api: {
      core: {
        get: {
          interface: 'MostSimilarWords',
          meta: {
            title: 'MostSimilarWords',
            description: `MostSimilarWords`,
            docs: 'https://word-simi.herokuapp.com',
          },
          method: 'GET',
          paths: [
            {
              name: 'word',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default WordSimi
