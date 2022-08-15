import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace RedisCloud {
  export type Entity = { account: any }
  export type Endpoint = { get: ApiDescriptionEndpoint }

  export interface RedisBase {
    'auth:x-api-key': string
    'auth:x-api-secret-key': string
  }

  export interface GetCurrentAccount extends RequestParams, RedisBase {
    kind: 'rediscloud.account.get'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'rediscloud',
      name: 'RedisCloud',
      url: 'https://redis.com/',
      docs: 'https://docs.redis.com/',
      social: {
        twitter: 'redisinc',
      },
      tags: ['web2'],
      category: 'aggregation',
      type: 'indexer',
    },
    base: 'https://api.redislabs.com/v1',
    auth: {
      'x-api-key': {
        type: 'header',
      },
      'x-api-secret-key': {
        type: 'header',
      },
    },
    api: {
      account: {
        get: {
          interface: 'GetCurrentAccount',
          meta: {
            title: 'Get Account',
            description: `Current account and related information`,
            docs: 'https://api.redislabs.com/v1/swagger-ui.html#/Account/getCurrentAccountUsingGET',
          },
          method: 'GET',
          paths: [],
        },
      },
    },
  }
}

export default RedisCloud
