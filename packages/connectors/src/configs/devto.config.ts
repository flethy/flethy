import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace DevTo {
  export type Entity = { articles: any }
  export type Endpoint = {
    post: ApiDescriptionEndpoint
    list: ApiDescriptionEndpoint
  }

  interface DevToBase {
    'auth:api-key': string
  }

  export interface PostArticle extends DevToBase, RequestParams {
    kind: 'devto.articles.post'
    'body:article': {
      title: string
      description?: string
      published: boolean
      body_markdown: string
      tags: string[]
      series?: string
      canonical_url?: string
      main_image: string
    }
  }

  export interface ListArticle extends RequestParams {
    kind: 'devto.articles.list'
    'query:username': string
    'query:page'?: number
    'query:per_page'?: number
    'query:tag'?: string
    'query:tags'?: string
    'query:tags_exclude'?: string
    'query:state'?: 'fresh' | 'rising' | 'all'
    'query:top'?: number
    'query:collection_id'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'devto',
      name: 'DevTo',
      url: 'https://dev.to',
      docs: 'https://developers.forem.com/api',
      signup: 'https://dev.to/enter?state=new-user',
      tags: ['web2'],
      category: 'marketing',
      type: 'blogging',
      social: {
        twitter: 'ThePracticalDev',
        github: 'forem',
        instagram: 'thepracticaldev',
      },
    },
    base: 'https://dev.to/api',
    auth: {
      'api-key': {
        type: 'header',
      },
    },
    api: {
      articles: {
        post: {
          interface: 'PostArticle',
          meta: {
            title: 'Create a new Article',
            description: `This endpoint allows the client to create a new article.`,
            docs: 'https://developers.forem.com/api#operation/createArticle',
          },
          method: 'POST',
          paths: [
            {
              name: 'articles',
              type: 'static',
            },
          ],
        },
        list: {
          interface: 'ListArticle',
          meta: {
            title: 'Published articles',
            description: `This endpoint allows the client to retrieve a list of articles.`,
            docs: 'https://developers.forem.com/api/v1#tag/articles/operation/getArticles',
          },
          method: 'GET',
          paths: [
            {
              name: 'articles',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default DevTo
