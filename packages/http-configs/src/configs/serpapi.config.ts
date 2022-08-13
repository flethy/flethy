import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { FetchParams } from '../types/FetchParams.type'
import { RequestParams } from '../types/Request.types'

export namespace SerpApi {
  export type Entity = { core: any }
  export type Endpoint = { search: ApiDescriptionEndpoint }

  interface SerpApiBase {
    'auth:api_key': string
  }

  export interface Search extends SerpApiBase, RequestParams {
    kind: 'serpapi.core.search'
    'query:q': string
    'query:engine': 'google'
    'query:location'?: string
    'query:uule'?: string
    'query:ludocid'?: string
    'query:lsig'?: string
    'query:google_domain'?: string
    'query:gl'?: string
    'query:hl'?: string
    'query:lr'?: string
    'query:tbs'?: string
    'query:safe'?: 'active' | 'off'
    'query:nfpr'?: 0 | 1
    'query:filter'?: 0 | 1
    'query:tbm'?: 'isch' | 'lcl' | 'vid' | 'nws' | 'shop'
    'query:start'?: number
    'query:num'?: number
    'query:ijn'?: number
    'query:device'?: 'desktop' | 'tablet' | 'mobile'
    'query:no_cache'?: boolean
    'query:async'?: boolean
    'query:output'?: 'json' | 'html'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'serpapi',
      name: 'SerpApi',
      url: 'https://serpapi.com',
      docs: 'https://serpapi.com/search-api',
      tags: ['web2'],
      category: 'search',
      type: 'serp',
      social: {
        github: 'serpapi',
        twitter: 'serp_api',
        instagram: 'serpapicom',
      },
    },
    base: 'https://serpapi.com',
    auth: {
      api_key: {
        type: 'body',
        authHandler: (fetchParams: FetchParams, authValue: string) => {
          if (fetchParams.body) {
            fetchParams.body.api_key = authValue
          } else {
            fetchParams.body = {
              api_key: authValue,
            }
          }
        },
      },
    },
    api: {
      core: {
        search: {
          interface: 'Search',
          meta: {
            title: 'Google Search Engine Results API',
            description: `Google Search Engine Results API`,
            docs: 'https://serpapi.com/search-api',
          },
          method: 'GET',
          paths: [
            {
              name: 'search',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default SerpApi
