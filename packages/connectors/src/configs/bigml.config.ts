import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace BigML {
  export type Entity = { resources: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  interface BigMLBase {
    'auth:username': string
    'auth:api_key': string
  }

  export interface ListResources extends BigMLBase, RequestParams {
    kind: 'bigml.resources.list'
    'param:resource': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'bigml',
      name: 'BigML',
      url: 'https://bigml.com/',
      docs: 'https://bigml.com/api/',
      signup: 'https://bigml.com/accounts/register/',
      pricing: 'https://bigml.com/pricing#subscriptions',
      tags: ['web2'],
      category: 'machinelearning',
      type: 'other',
      social: {
        twitter: 'bigmlcom',
      },
    },
    base: 'https://bigml.io/andromeda',
    auth: {
      username: {
        type: 'query',
      },
      api_key: {
        type: 'query',
      },
    },
    api: {
      resources: {
        list: {
          interface: 'ListResources',
          meta: {
            title: 'Listing Resources',
            description: 'Listing Resources',
            docs: 'https://bigml.com/api/requests?id=listing-resources',
          },
          method: 'GET',
          paths: [
            {
              name: 'resource',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default BigML
