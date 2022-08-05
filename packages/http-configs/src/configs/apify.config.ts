import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Apify {
  export type Entity = { actors: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  interface ApifyBase {
    'auth:Authorization': string
  }

  export interface ListActors extends ApifyBase, RequestParams {
    kind: 'apify.actors.list'
    'query:my'?: boolean
    'query:offset'?: number
    'query:limit'?: number
    'query:desc'?: boolean
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'apify',
      name: 'Apify',
      url: 'https://apify.com',
      docs: 'https://docs.apify.com',
      social: {
        twitter: 'apify',
        github: 'apify',
        instagram: 'apifytech',
      },
      tags: ['web2'],
      category: 'utils',
      type: 'web-scraping',
    },
    base: 'https://api.apify.com/v2',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      actors: {
        list: {
          interface: 'ListActors',
          meta: {
            title: 'Get list of actors',
            description: `Get list of actors`,
            docs: 'https://docs.apify.com/api/v2#/reference/actors/actor-collection/get-list-of-actors',
          },
          method: 'GET',
          paths: [
            {
              name: 'acts',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Apify
