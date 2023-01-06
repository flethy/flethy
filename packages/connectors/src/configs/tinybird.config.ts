import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Tinybird {
  export type Entity = { events: any; query: any }
  export type Endpoint =
    | { post: ApiDescriptionEndpoint }
    | { sql: ApiDescriptionEndpoint }

  interface TinybirdBase {
    'auth:Authorization': string
  }

  export interface PostEvent extends TinybirdBase, RequestParams {
    kind: 'tinybird.events.post'
    'query:name': string
    'query:wait'?: boolean
    'body:body': {
      [key: string]: string | number | boolean
    }
    // 'body:date': string
    // 'body:city': string
  }

  export interface QuerySQL extends TinybirdBase, RequestParams {
    kind: 'tinybird.query.sql'
    'query:q': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'tinybird',
      name: 'Tinybird',
      url: 'https://www.tinybird.co/',
      docs: 'https://www.tinybird.co/docs',
      signup: 'https://ui.tinybird.co/signup',
      pricing: 'https://www.tinybird.co/pricing',
      tags: ['web2'],
      category: 'infra',
      type: 'serverless',
      social: {
        twitter: 'tinybirdco',
      },
    },
    base: 'https://api.tinybird.co/v0',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      events: {
        post: {
          interface: 'PostEvent',
          meta: {
            title: 'POST /v0/events',
            description: 'POST /v0/events',
            docs: 'https://www.tinybird.co/docs/api-reference/events-api.html',
          },
          method: 'POST',
          paths: [
            {
              name: 'events',
              type: 'static',
            },
          ],
        },
      },
      query: {
        sql: {
          interface: 'QuerySQL',
          meta: {
            title: 'GET /v0/sql',
            description: 'GET /v0/sql',
            docs: 'https://www.tinybird.co/docs/api-reference/query-api.html',
          },
          method: 'GET',
          paths: [
            {
              name: 'sql',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Tinybird
