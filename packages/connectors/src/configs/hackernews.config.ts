import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace HackerNews {
  export type Entity = { core: any }
  export type Endpoint = {
    item: ApiDescriptionEndpoint
    user: ApiDescriptionEndpoint
    live: ApiDescriptionEndpoint
  }

  export interface GetItem extends RequestParams {
    kind: 'hackernews.core.item'
    'param:id': string
    'query:print'?: 'pretty'
  }

  export interface GetUser extends RequestParams {
    kind: 'hackernews.core.user'
    'param:id': string
    'query:print'?: 'pretty'
  }

  export interface GetLive extends RequestParams {
    kind: 'hackernews.core.live'
    'param:topic':
      | 'maxitem.json'
      | 'topstories.json'
      | 'newstories.json'
      | 'beststories.json'
      | 'askstories.json'
      | 'showstories.json'
      | 'jobstories.json'
      | 'updates.json'
    'query:print'?: 'pretty'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'hackernews',
      name: 'HackerNews',
      url: 'https://news.ycombinator.com/',
      docs: 'https://github.com/HackerNews/API',
      signup: 'https://news.ycombinator.com/login',
      tags: ['web2'],
      category: 'news',
      type: 'everything',
    },
    base: 'https://hacker-news.firebaseio.com/v0',
    api: {
      core: {
        item: {
          interface: 'GetItem',
          meta: {
            title: 'Items',
            description: `Stories, comments, jobs, Ask HNs and even polls are just items. They're identified by their ids, which are unique integers, and live under /v0/item/:id.`,
            docs: 'https://github.com/HackerNews/API#items',
          },
          method: 'GET',
          paths: [
            {
              name: 'item',
              type: 'static',
            },
            {
              name: 'id',
              type: 'param',
            },
          ],
        },
        user: {
          interface: 'GetUser',
          meta: {
            title: 'Users',
            description: `Users are identified by case-sensitive ids, and live under /v0/user/. Only users that have public activity (comments or story submissions) on the site are available through the API.`,
            docs: 'https://github.com/HackerNews/API#users',
          },
          method: 'GET',
          paths: [
            {
              name: 'user',
              type: 'static',
            },
            {
              name: 'id',
              type: 'param',
            },
          ],
        },
        live: {
          interface: 'GetLive',
          meta: {
            title: 'Live Data',
            description: `The coolest part of Firebase is its support for change notifications. While you can subscribe to individual items and profiles, you'll need to use the following to observe front page ranking, new items, and new profiles.`,
            docs: 'https://github.com/HackerNews/API#live-data',
          },
          method: 'GET',
          paths: [
            {
              name: 'topic',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default HackerNews
