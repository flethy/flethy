import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace RapidApi {
  export type Entity = { data: any }
  export type Endpoint = { articleExtractor: ApiDescriptionEndpoint }

  interface RapidApiBase {
    'auth:X-RapidAPI-Key': string
  }

  export interface ArticleExtractor extends RapidApiBase, RequestParams {
    kind: 'rapidapi.data.articleExtractor'
    'query:url': string
    'header:X-RapidAPI-Host': 'article-extractor2.p.rapidapi.com'
    'subdomain:api': 'article-extractor2'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'rapidapi',
      name: 'RapidApi',
      url: 'https://rapidapi.com',
      docs: 'https://rapidapi.com',
      social: {
        twitter: 'rapid_api',
      },
      tags: ['web2'],
      category: 'utils',
      type: 'api-wrapper',
    },
    base: 'https://subdomain:api.p.rapidapi.com',
    auth: {
      'X-RapidAPI-Key': {
        type: 'header',
      },
    },
    api: {
      data: {
        articleExtractor: {
          interface: 'ArticleExtractor',
          meta: {
            title: 'Extract Article',
            description: `Extract main article and meta data from a news entry or blog post.`,
            docs: 'https://rapidapi.com/pwshub-pwshub-default/api/article-extractor2/',
          },
          method: 'GET',
          paths: [
            {
              name: 'article',
              type: 'static',
            },
            {
              name: 'parse',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default RapidApi
