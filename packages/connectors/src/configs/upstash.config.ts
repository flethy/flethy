import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Upstash {
  export type Entity = { redis: any }
  export type Endpoint = {
    create: ApiDescriptionEndpoint
    list: ApiDescriptionEndpoint
    postCommand: ApiDescriptionEndpoint
  }

  interface UpstashBase {
    'auth:Authorization': {
      username: string
      password: string
    }
  }

  interface UpstashRedisBase {
    'auth:Authorization': string
  }

  export interface CreateRedisDatabase extends UpstashBase, RequestParams {
    kind: 'upstash.redis.create'
    'body:name': string
    'body:region':
      | 'global'
      | 'eu-west-1'
      | 'us-east-1'
      | 'us-west-1'
      | 'ap-northeast-1'
      | 'us-central1'
    'body:tls': boolean
  }

  export interface ListRedisDatabases extends UpstashBase, RequestParams {
    kind: 'upstash.redis.list'
  }

  export interface PostCommandToRedisDatabases
    extends UpstashRedisBase,
      RequestParams {
    kind: 'upstash.redis.postCommand'
    'subdomain:redisId': string
    'body:body': any[]
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'upstash',
      name: 'Upstash',
      url: 'https://upstash.com/',
      docs: 'https://developer.upstash.com/#introduction',
      signup: 'https://console.upstash.com/',
      pricing: 'https://upstash.com/#section-pricing',
      tags: ['web2'],
      category: 'infra',
      type: 'database',
      social: {
        twitter: 'upstash',
      },
    },
    base: 'https://api.upstash.com/v2',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      redis: {
        create: {
          interface: 'CreateRedisDatabase',
          meta: {
            title: 'Create Redis Database',
            description: 'Create Redis Database',
            docs: 'https://developer.upstash.com/#create-database',
          },
          method: 'POST',
          paths: [
            {
              name: 'redis',
              type: 'static',
            },
            {
              name: 'database',
              type: 'static',
            },
          ],
        },
        list: {
          interface: 'ListRedisDatabases',
          meta: {
            title: 'List Redis Database',
            description: 'List Redis Database',
            docs: 'https://developer.upstash.com/#list-databases',
          },
          method: 'GET',
          paths: [
            {
              name: 'redis',
              type: 'static',
            },
            {
              name: 'database',
              type: 'static',
            },
          ],
        },
        postCommand: {
          interface: 'PostCommandToRedisDatabases',
          meta: {
            title: 'POST Command in Body',
            description: 'POST Command in Body',
            docs: 'https://docs.upstash.com/redis/features/restapi#post-command-in-body',
          },
          method: 'POST',
          auth: {
            Authorization: {
              type: 'header:bearer',
            },
          },
          base: 'https://subdomain:redisId.upstash.io',
          paths: [],
        },
      },
    },
  }
}

export default Upstash
