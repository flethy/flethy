import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace WordsAPI {
  export type Entity = { words: any }
  export type Endpoint = {
    get: ApiDescriptionEndpoint
    getDetails: ApiDescriptionEndpoint
  }

  interface WordsAPIBase {
    'auth:X-Mashape-Key': string
  }

  export interface GetAWord extends WordsAPIBase, RequestParams {
    kind: 'wordsapi.words.get'
    'param:word': string
  }

  export interface GetWordDetails extends WordsAPIBase, RequestParams {
    kind: 'wordsapi.words.getDetails'
    'param:word': string
    'param:type':
      | 'definitions'
      | 'synonyms'
      | 'antonyms'
      | 'examples'
      | 'typeOf'
      | 'hasTypes'
      | 'partOf'
      | 'hasParts'
      | 'instanceOf'
      | 'hasInstances'
      | 'similarTo'
      | 'also'
      | 'entails'
      | 'memberOf'
      | 'hasMembers'
      | 'substanceOf'
      | 'hasSubstances'
      | 'inCategory'
      | 'hasCategories'
      | 'usageOf'
      | 'hasUsages'
      | 'inRegion'
      | 'regionOf'
      | 'pertainsTo'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'wordsapi',
      name: 'WordsAPI',
      url: 'https://www.wordsapi.com/',
      docs: 'https://www.wordsapi.com/docs',
      signup: 'https://rapidapi.com/dpventures/api/wordsapi/pricing',
      pricing: 'https://rapidapi.com/dpventures/api/wordsapi/pricing',
      tags: ['web2', 'words'],
      category: 'utils',
      type: 'other',
      social: {
        twitter: 'wordsapi',
        github: 'wordsapi',
      },
    },
    base: 'https://wordsapiv1.p.mashape.com',
    auth: {
      'X-Mashape-Key': {
        type: 'header',
      },
    },
    api: {
      words: {
        get: {
          interface: 'GetAWord',
          meta: {
            title: 'Get a Word',
            description: `To retrieve all details of a word, make a GET request to the API endpoint with the word itself as the final part of the URL.`,
            docs: 'https://www.wordsapi.com/docs/#get-a-word',
          },
          method: 'GET',
          paths: [
            {
              name: 'words',
              type: 'static',
            },
            {
              name: 'word',
              type: 'param',
            },
          ],
        },
        getDetails: {
          interface: 'GetWordDetails',
          meta: {
            title: 'Get Word Details',
            description: `To retrieve a specific set of details of a word, for instance, a word's synonyms, append the detail type to the URL string.`,
            docs: 'https://www.wordsapi.com/docs/#get-word-details',
          },
          method: 'GET',
          paths: [
            {
              name: 'words',
              type: 'static',
            },
            {
              name: 'word',
              type: 'param',
            },
            {
              name: 'type',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default WordsAPI
