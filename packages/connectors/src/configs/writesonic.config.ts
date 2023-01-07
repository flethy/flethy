import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace WriteSonic {
  export type Entity = { aiArticleWriters: any }
  export type Endpoint = {
    ideas: ApiDescriptionEndpoint
    intros: ApiDescriptionEndpoint
  }

  interface WriteSonicBase {
    'auth:X-API-KEY': string
  }

  interface AIQueryParams {
    'query:engine': 'economy' | 'average' | 'good' | 'premium'
    'query:language': string
    'query:num_copies': number
  }

  export interface AIArticleIdeas
    extends WriteSonicBase,
      AIQueryParams,
      RequestParams {
    kind: 'writesonic.aiArticleWriters.ideas'
    'body:topic': string
    'body:primary_keyword'?: string
  }

  export interface AIArticleIntros
    extends WriteSonicBase,
      AIQueryParams,
      RequestParams {
    kind: 'writesonic.aiArticleWriters.intros'
    'body:blog_title': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'writesonic',
      name: 'WriteSonic',
      url: 'https://writesonic.com/',
      docs: 'https://docs.writesonic.com',
      signup: 'https://app.writesonic.com/de/signup',
      pricing: 'https://writesonic.com/pricing',
      tags: ['web2'],
      category: 'ai',
      type: 'text',
      social: {
        twitter: 'WriteSonic',
      },
    },
    base: 'https://api.writesonic.com/v2',
    auth: {
      'X-API-KEY': {
        type: 'header',
      },
    },
    api: {
      aiArticleWriters: {
        ideas: {
          interface: 'AIArticleIdeas',
          meta: {
            title: 'AI Article Ideas',
            description: 'AI Article Ideas',
            docs: 'https://docs.writesonic.com/reference/blog-ideas_v2businesscontentblog-ideas_post',
          },
          method: 'POST',
          paths: [
            {
              name: 'business',
              type: 'static',
            },
            {
              name: 'content',
              type: 'static',
            },
            {
              name: 'blog-ideas',
              type: 'static',
            },
          ],
        },
        intros: {
          interface: 'AIArticleIntros',
          meta: {
            title: 'AI Article Intros',
            description: 'AI Article Intros',
            docs: 'https://docs.writesonic.com/reference/blog-intros_v2businesscontentblog-intros_post',
          },
          method: 'POST',
          paths: [
            {
              name: 'business',
              type: 'static',
            },
            {
              name: 'content',
              type: 'static',
            },
            {
              name: 'blog-intros',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default WriteSonic
