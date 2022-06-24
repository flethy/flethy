import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace ApicAgent {
  export type Entity = { agent: any }
  export type Endpoint = {
    get: ApiDescriptionEndpoint
    post: ApiDescriptionEndpoint
  }

  export interface Get extends RequestParams {
    kind: 'apicagent.agent.get'
    'query:ua': string
  }

  export interface Post extends RequestParams {
    kind: 'apicagent.agent.post'
    'body:ua': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'apicagent',
      name: 'ApicAgent',
      url: 'https://www.apicagent.com/',
      docs: 'https://www.apicagent.com/docs',
      tags: ['web2'],
      category: 'data',
      type: 'resolution',
    },
    base: 'https://api.apicagent.com',
    api: {
      agent: {
        get: {
          interface: 'Get',
          meta: {
            title: 'Get API',
            description: `This API is the simplest way to get started with apicagent's user-agent parsing API. It accepts user agent string in ua parameter and returns the JSON object with parsed data.`,
            docs: 'https://www.apicagent.com/docs#get-api',
          },
          method: 'GET',
        },
        post: {
          interface: 'Post',
          meta: {
            title: 'Post API',
            description: `If you prefer working with POST APIs, you can use this API - it works very similar to GET API, and accepts user agent string in ua key in the input JSON and returns the JSON object with parsed data.`,
            docs: 'https://www.apicagent.com/docs#post-api',
          },
          method: 'POST',
        },
      },
    },
  }
}

export default ApicAgent
