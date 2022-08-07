import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace DevTo {
  export type Entity = { articles: any }
  export type Endpoint = { post: ApiDescriptionEndpoint }

  interface DevToBase {
    'auth:api-key': string
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

  export interface PostArticle extends DevToBase, RequestParams {
    kind: 'devto.articles.post'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'devto',
      name: 'DevTo',
      url: 'https://dev.to',
      docs: 'https://developers.forem.com/api',
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
      },
    },
  }
}

export default DevTo
