import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Hygraph {
  export type Entity = { content: any }
  export type Endpoint = { graphql: ApiDescriptionEndpoint }

  interface HygraphBase {
    'auth:Authorization': string
  }

  export interface ContentApiGraphQl extends HygraphBase, RequestParams {
    kind: 'hygraph.content.graphql'
    'subdomain:datacenter': string
    'param:projectslug': string
    'param:environment': string
    'body:query': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'hygraph',
      name: 'Hygraph',
      url: 'https://hygraph.com',
      docs: 'https://hygraph.com/docs',
      signup: 'https://app.hygraph.com/signup',
      pricing: 'https://hygraph.com/pricing',
      tags: ['web2'],
      category: 'marketing',
      type: 'content',
      social: {
        twitter: 'hygraphcom',
        github: 'hygraph',
      },
    },
    base: '',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      content: {
        graphql: {
          interface: 'ContentApiGraphQl',
          meta: {
            title: 'Content API',
            description: `Content API`,
            docs: 'https://hygraph.com/docs',
          },
          base: 'https://subdomain:datacenter.hygraph.com/v2',
          method: 'POST',
          paths: [
            {
              name: 'projectslug',
              type: 'param',
            },
            {
              name: 'environment',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Hygraph
