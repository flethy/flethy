import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Reddit {
  export type Entity = { posts: any }
  export type Endpoint = { listTop: ApiDescriptionEndpoint }

  export interface ListTopPosts extends RequestParams {
    kind: 'reddit.posts.listTop'
    'param:subreddit': string
    'query:limit'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'reddit',
      name: 'Reddit',
      url: 'https://www.reddit.com/',
      docs: 'https://www.reddit.com/dev/api/',
      signup: 'https://www.reddit.com/',
      pricing: 'https://www.reddit.com/',
      tags: ['web2'],
      category: 'collaboration',
      type: 'forum',
      social: {
        twitter: 'Reddit',
      },
    },
    base: '',
    api: {
      posts: {
        listTop: {
          interface: 'ListTopPosts',
          meta: {
            title: 'List Top Posts',
            description: 'List Top Posts',
            docs: 'https://www.reddit.com/dev/api/',
          },
          method: 'GET',
          base: 'https://www.reddit.com',
          paths: [
            {
              name: 'r',
              type: 'static',
            },
            {
              name: 'subreddit',
              type: 'param',
            },
            {
              name: 'top.json',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Reddit
