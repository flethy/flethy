import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Xkcd {
  export type Entity = { core: any }
  export type Endpoint = {
    current: ApiDescriptionEndpoint
    get: ApiDescriptionEndpoint
  }

  export interface GetCurrentComic extends RequestParams {
    kind: 'xkcd.core.current'
  }

  export interface GetComic extends RequestParams {
    kind: 'xkcd.core.get'
    'param:comicId': number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'xkcd',
      name: 'Xkcd',
      url: 'https://xkcd.com/',
      docs: 'https://xkcd.com/json.html',
      signup: 'https://xkcd.com/',
      pricing: 'https://xkcd.com/',
      tags: ['web2'],
      category: 'fun',
      type: 'comic',
      social: {
        twitter: 'xkcdComic',
      },
    },
    base: 'https://xkcd.com',
    api: {
      core: {
        current: {
          interface: 'GetCurrentComic',
          meta: {
            title: 'Current Comic',
            description: 'Current Comic',
            docs: 'https://xkcd.com/json.html',
          },
          method: 'GET',
          paths: [
            {
              name: 'info.0.json',
              type: 'static',
            },
          ],
        },
        get: {
          interface: 'GetComic',
          meta: {
            title: 'Comic',
            description: 'Comic',
            docs: 'https://xkcd.com/json.html',
          },
          method: 'GET',
          paths: [
            {
              name: 'param:comicId',
              type: 'param',
            },
            {
              name: 'info.0.json',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Xkcd
