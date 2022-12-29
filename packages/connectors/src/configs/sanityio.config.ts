import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace SanityIo {
  export type Entity = { content: any }
  export type Endpoint = { query: ApiDescriptionEndpoint }

  interface SanityIoBase {
    'auth:Authorization': string
    'subdomain:projectid': string
  }

  export interface ContentQuery extends SanityIoBase, RequestParams {
    kind: 'sanityio.content.query'
    'param:dataset': string
    'query:query': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'sanityio',
      name: 'SanityIo',
      url: 'https://www.sanity.io/',
      docs: 'https://www.sanity.io/docs',
      signup: 'https://www.sanity.io/login/sign-up',
      pricing: 'https://www.sanity.io/pricing',
      tags: ['web2'],
      category: 'marketing',
      type: 'content',
      social: {
        twitter: 'sanity_io',
        github: 'sanity-io',
      },
    },
    base: 'https://subdomain:projectid.api.sanity.io/v2021-10-21',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      content: {
        query: {
          interface: 'ContentQuery',
          meta: {
            title: 'Query',
            description: 'Query',
            docs: 'https://www.sanity.io/docs/connect-your-content',
          },
          method: 'GET',
          paths: [
            {
              name: 'data',
              type: 'static',
            },
            {
              name: 'query',
              type: 'static',
            },
            {
              name: 'dataset',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default SanityIo
