import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Contentchef {
  export type Entity = { live: any }
  export type Endpoint = { content: ApiDescriptionEndpoint }

  interface ContentchefBase {
    'auth:X-Chef-Key': string
  }

  export interface GetPublishedContent extends ContentchefBase, RequestParams {
    kind: 'contentchef.live.content'
    'param:spaceId': string
    'param:publishingChannel': string
    'query:publicId': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'contentchef',
      name: 'Contentchef',
      url: 'https://www.contentchef.io/',
      docs: 'https://contentchef.github.io/contentchef-resources/',
      signup: 'https://app.contentchef.io/registration',
      pricing: 'https://www.contentchef.io/pricing',
      tags: ['web2'],
      category: 'marketing',
      type: 'content',
      social: {},
    },
    base: 'https://api.contentchef.io',
    auth: {
      'X-Chef-Key': {
        type: 'header',
      },
    },
    api: {
      live: {
        content: {
          interface: 'GetPublishedContent',
          meta: {
            title:
              'Get the currently available published content in a live enviroment',
            description: `Get the currently available published content in a live enviroment`,
            docs: 'https://contentchef.github.io/contentchef-resources/#/',
          },
          method: 'GET',
          paths: [
            {
              name: 'space',
              type: 'static',
            },
            {
              name: 'spaceId',
              type: 'param',
            },
            {
              name: 'online',
              type: 'static',
            },
            {
              name: 'content',
              type: 'static',
            },
            {
              name: 'publishingChannel',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Contentchef
