import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace UsePlunk {
  export type Entity = { core: any }
  export type Endpoint = { event: ApiDescriptionEndpoint }

  export interface UsePlunkBase {
    'auth:Authorization': string
  }

  export interface PostEvent extends UsePlunkBase, RequestParams {
    kind: 'useplunk.core.event'
    'body:event': string
    'body:email': string
    'body:data'?: any
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'useplunk',
      name: 'UsePlunk',
      url: 'https://useplunk.com',
      docs: 'https://docs.useplunk.com/',
      tags: ['web2'],
      category: 'automation',
      type: 'email',
    },
    base: 'https://api.useplunk.com/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      core: {
        event: {
          interface: 'PostEvent',
          meta: {
            title: 'Post Event',
            description: `Post Event`,
            docs: 'https://docs.useplunk.com/api-docs',
          },
          method: 'POST',
        },
      },
    },
  }
}

export default UsePlunk
