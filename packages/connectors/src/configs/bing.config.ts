import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Bing {
  export type Entity = { webmastertools: any }
  export type Endpoint = { indexnow: ApiDescriptionEndpoint }

  export interface IndexNow extends RequestParams {
    kind: 'bing.webmastertools.indexnow'
    'auth:key': string
    'auth:keyLocation': string
    'body:host': string
    'body:urlList': string[]
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'bing',
      name: 'Bing',
      url: 'https://www.bing.com',
      docs: 'https://www.bing.com',
      tags: ['web2'],
      category: 'marketing',
      type: 'seo',
      social: {
        twitter: 'bing',
      },
    },
    base: 'https://www.bing.com',
    auth: {
      key: {
        type: 'body',
      },
      keyLocation: {
        type: 'body',
      },
    },
    api: {
      webmastertools: {
        indexnow: {
          interface: 'IndexNow',
          meta: {
            title: 'IndexNow',
            description: `Easy to use protocol that websites can call to notify Bing whenever website contents on any URL is updated or created allowing instant crawling, and discovery of the URL`,
            docs: 'https://www.bing.com/indexnow',
          },
          method: 'POST',
          paths: [
            {
              name: 'IndexNow',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Bing
