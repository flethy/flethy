import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace NewsApi {
  export type Entity = { core: any }
  export type Endpoint = { everything: ApiDescriptionEndpoint }

  interface NewsApiBase {
    'auth:X-Api-Key': string
  }

  export interface SearchEverything extends NewsApiBase, RequestParams {
    kind: 'newsapi.core.everything'
    'query:q': string
    'query:searchIn'?: 'title' | 'description' | 'content'
    'query:sources'?: string
    'query:domains'?: string
    'query:excludeDomains'?: string
    'query:from'?: string
    'query:to'?: string
    'query:language'?: string
    'query:sortBy'?: 'relevancy' | 'popularity' | 'publishedAt'
    'query:pageSize'?: number
    'query:page'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'newsapi',
      name: 'NewsApi',
      url: 'https://newsapi.org',
      docs: 'https://newsapi.org/docs',
      pricing: 'https://newsapi.org/pricing',
      signup: 'https://newsapi.org/register',
      social: {
        twitter: 'NewsAPIorg',
      },
      tags: ['web2'],
      category: 'news',
      type: 'indexer',
    },
    base: 'https://newsapi.org/v2',
    auth: {
      'X-Api-Key': {
        type: 'header',
      },
    },
    api: {
      core: {
        everything: {
          interface: 'SearchEverything',
          meta: {
            title: 'Everything',
            description: `Search through millions of articles from over 80,000 large and small news sources and blogs.`,
            docs: 'https://newsapi.org/docs/endpoints/everything',
          },
          method: 'GET',
          paths: [
            {
              name: 'everything',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default NewsApi
