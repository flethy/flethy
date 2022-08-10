import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Clearbit {
  export type Entity = { logo: any }
  export type Endpoint = { get: ApiDescriptionEndpoint }

  export interface LogoGet extends RequestParams {
    kind: 'clearbit.logo.get'
    'param:domain': string
    'query:size'?: number
    'query:format'?: 'png' | 'jpg'
    'query:greyscale'?: boolean
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'clearbit',
      name: 'Clearbit',
      url: 'https://clearbit.com',
      docs: 'https://dashboard.clearbit.com/docs',
      social: {
        twitter: 'clearbit',
      },
      tags: ['web2'],
      category: 'aggregation',
      type: 'businessdata',
    },
    base: 'https://clearbit.com',
    api: {
      logo: {
        get: {
          interface: 'LogoGet',
          meta: {
            title: 'Logo API',
            description: `If you're only interested in a Company's logo, and don't need any other data about the company, you can use our Logo API.`,
            docs: 'https://dashboard.clearbit.com/docs?shell#logo-api',
          },
          method: 'GET',
          base: 'https://logo.clearbit.com',
          paths: [
            {
              name: 'domain',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Clearbit
