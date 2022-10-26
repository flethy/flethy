import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Prerender {
  export type Entity = { core: any }
  export type Endpoint = {
    recache: ApiDescriptionEndpoint
    recacheMultiple: ApiDescriptionEndpoint
    search: ApiDescriptionEndpoint
    sitemap: ApiDescriptionEndpoint
    clearCache: ApiDescriptionEndpoint
  }

  interface PrerenderBase {
    'auth:prerenderToken': string
  }

  export interface Recache extends PrerenderBase, RequestParams {
    kind: 'prerender.core.recache'
    'body:url': string
    'body:adaptiveType'?: 'mobile' | 'desktop'
  }

  export interface RecacheMultiple extends PrerenderBase, RequestParams {
    kind: 'prerender.core.recacheMultiple'
    'body:urls': string[]
    'body:adaptiveType'?: 'mobile' | 'desktop'
  }

  export interface Search extends PrerenderBase, RequestParams {
    kind: 'prerender.core.search'
    'body:query'?: string
    'body:exactMatch'?: string
    'body:start'?: number
    'body:adaptiveType'?: 'mobile' | 'desktop'
  }

  export interface Sitemap extends PrerenderBase, RequestParams {
    kind: 'prerender.core.sitemap'
    'body:url': string
  }

  export interface ClearCache extends PrerenderBase, RequestParams {
    kind: 'prerender.core.clearCache'
    'body:query': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'prerender',
      name: 'Prerender',
      url: 'https://prerender.io/',
      docs: 'https://docs.prerender.io/docs',
      signup: 'https://prerender.io/signup',
      pricing: 'https://prerender.io/pricing/',
      tags: ['web2'],
      category: 'marketing',
      type: 'seo',
      social: {
        twitter: 'prerender',
      },
    },
    base: 'https://api.prerender.io',
    auth: {
      prerenderToken: {
        type: 'body',
      },
    },
    api: {
      core: {
        recache: {
          interface: 'Recache',
          meta: {
            title: 'Recache',
            description: `You can use the recache API to cache a URL for the first time or recache a URL cached previously. This POST request needs to be in JSON format; otherwise, it won't work.`,
            docs: 'https://docs.prerender.io/docs/6-api',
          },
          method: 'POST',
          paths: [
            {
              name: 'recache',
              type: 'static',
            },
          ],
        },
        recacheMultiple: {
          interface: 'RecacheMultiple',
          meta: {
            title: 'Recache Multiple',
            description: `The recache API can take up to 1,000 URLs per request. Make sure to change the parameter to "urls" if you want to add more than 1 url per request.`,
            docs: 'https://docs.prerender.io/docs/6-api',
          },
          method: 'POST',
          paths: [
            {
              name: 'recache',
              type: 'static',
            },
          ],
        },
        search: {
          interface: 'Search',
          meta: {
            title: 'Search',
            description: `The search API lets you search for cached URLs within your account and see their cache status.`,
            docs: 'https://docs.prerender.io/docs/6-api',
          },
          method: 'POST',
          paths: [
            {
              name: 'search',
              type: 'static',
            },
          ],
        },
        sitemap: {
          interface: 'Sitemap',
          meta: {
            title: 'Sitemap',
            description: `The sitemap API lets you add new URLs via sitemap XML files. Existing URLs will not be recached.`,
            docs: 'https://docs.prerender.io/docs/6-api',
          },
          method: 'POST',
          paths: [
            {
              name: 'sitemap',
              type: 'static',
            },
          ],
        },
        clearCache: {
          interface: 'ClearCache',
          meta: {
            title: 'Clear Cache',
            description: `This API will enable you to clear your cache, totally or partially. It is only available for users in our current plans. Users in our legacy plans will not have access to this API and should reach out to us to clear their cache. This call schedules a clear job. The job usually runs quite fast, but it is dependent on the size of the cache. It’s possible to check the job’s status, as shown below. There can only be one scheduled job per user. This is a POST request with two parameters.`,
            docs: 'https://docs.prerender.io/docs/6-api',
          },
          method: 'POST',
          paths: [
            {
              name: 'cache-clear',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Prerender
