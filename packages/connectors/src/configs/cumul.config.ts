import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Cumul {
  export type Entity = { actions: any }
  export type Endpoint = { create: ApiDescriptionEndpoint }

  interface CumulBase {
    'auth:key': string
    'auth:token': string
  }

  export interface Create extends CumulBase, RequestParams {
    kind: 'cumul.actions.create'
    'param:resource': string
    'body:properties': any
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'cumul',
      name: 'Cumul',
      url: 'https://cumul.io/',
      docs: 'https://developer.cumul.io/#core_api_schema',
      signup: 'https://cumul.io/signup',
      pricing: 'https://cumul.io/pricing',
      tags: ['web2'],
      category: 'analytics',
      type: 'webinsights',
      social: {
        twitter: 'cumul_io',
      },
    },
    base: 'https://api.cumul.io/0.1.0',
    auth: {
      key: {
        type: 'body',
      },
      token: {
        type: 'body',
      },
    },
    api: {
      actions: {
        create: {
          interface: 'Create',
          meta: {
            title: 'Create',
            description: `Create a new instance of the requested resource type, for example: create a new User within an Organization, create a new access group, create new data rows, …`,
            docs: 'https://developer.cumul.io/#create',
          },
          method: 'POST',
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

export default Cumul
