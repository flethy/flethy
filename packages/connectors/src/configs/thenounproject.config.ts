import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace TheNounProject {
  export type Entity = { collections: any }
  export type Endpoint = {
    iconsById: ApiDescriptionEndpoint
    list: ApiDescriptionEndpoint
  }

  interface TheNounProjectBase {
    'auth:Authorization': {
      consumerKey: string
      consumerSecret: string
    }
  }

  interface TheNounProjectQueryBase {
    'query:limit'?: number
    'query:offset'?: number
    'query:page'?: number
  }

  export interface GetCollectionIconsById
    extends TheNounProjectBase,
      TheNounProjectQueryBase,
      RequestParams {
    kind: 'thenounproject.collections.iconsById'
    'param:collectionId': number
  }

  export interface ListCollections
    extends TheNounProjectBase,
      TheNounProjectQueryBase,
      RequestParams {
    kind: 'thenounproject.collections.list'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'thenounproject',
      name: 'TheNounProject',
      url: 'https://thenounproject.com/',
      docs: 'https://api.thenounproject.com/explorer',
      signup: 'https://thenounproject.com/',
      pricing: 'https://thenounproject.com/pricing/',
      tags: ['web2'],
      category: 'data',
      type: 'icons',
      social: {
        twitter: 'nounproject',
        instagram: 'nounproject',
      },
    },
    base: 'https://api.thenounproject.com',
    auth: {
      Authorization: {
        type: 'header:oauth1a',
      },
    },
    api: {
      collections: {
        iconsById: {
          interface: 'GetCollectionIconsById',
          meta: {
            title: 'Get collection icons by id',
            description: `Returns a list of icons associated with a collection`,
            docs: 'https://api.thenounproject.com/explorer#!/collection/getCollectionIconsById',
          },
          method: 'GET',
          paths: [
            {
              name: 'collection',
              type: 'static',
            },
            {
              name: 'collectionId',
              type: 'param',
            },
            {
              name: 'icons',
              type: 'static',
            },
          ],
        },
        list: {
          interface: 'ListCollections',
          meta: {
            title: 'Get all collections',
            description: `Return's a list of all collections`,
            docs: 'https://api.thenounproject.com/explorer#!/collections/getAllCollections',
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

export default TheNounProject
