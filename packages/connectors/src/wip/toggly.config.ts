import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Toggly {
  export type Entity = { environments: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  export interface ListEnvironments extends RequestParams {
    kind: 'toggly.environments.list'
    'param:applicationId': string
    // 'auth:Authorization': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'toggly',
      name: 'Toggly',
      url: 'https://toggly.io/',
      docs: 'https://app.toggly.io/redoc',
      signup: 'https://app.toggly.io/register',
      pricing: 'https://toggly.io/#pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'featureflags',
      social: {
        twitter: 'toggly_app',
        github: 'ops-ai',
      },
    },
    base: 'https://app.toggly.io/api',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      environments: {
        list: {
          interface: 'ListEnvironments',
          meta: {
            title: 'Get all environments',
            description: `Get all environments`,
            docs: 'https://app.toggly.io/redoc/index.html?url=/swagger/v1/swagger.json#tag/Application-Environments/operation/ApplicationEnvironments_Environments',
          },
          method: 'GET',
          paths: [
            {
              name: 'applications',
              type: 'static',
            },
            {
              name: 'applicationId',
              type: 'param',
            },
            {
              name: 'environments',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Toggly
