import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Checkly {
  export type Entity = { checks: any; dashboards: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  interface ChecklyBase {
    'auth:Authorization': string
    'header:X-Checkly-Account': string
  }

  export interface ListChecks extends ChecklyBase, RequestParams {
    kind: 'checkly.checks.list'
    'query:limit'?: number
    'query:page'?: number
    'query:apiCheckUrlFilterPattern'?: string
  }

  export interface ListDashboards extends ChecklyBase, RequestParams {
    kind: 'checkly.dashboards.list'
    'query:limit'?: number
    'query:page'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'checkly',
      name: 'Checkly',
      url: 'https://www.checklyhq.com/',
      docs: 'https://www.checklyhq.com/docs/',
      signup: 'https://app.checklyhq.com/signup',
      pricing: 'https://www.checklyhq.com/pricing',
      tags: ['web2'],
      category: 'infra',
      type: 'monitoring',
      social: {
        twitter: 'checklyHQ',
        github: 'checkly',
      },
    },
    base: 'https://api.checklyhq.com/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      checks: {
        list: {
          interface: 'ListChecks',
          meta: {
            title: 'List all checks',
            description: 'List all checks',
            docs: 'https://www.postman.com/api-evangelist/workspace/checkly',
          },
          method: 'GET',
          paths: [
            {
              name: 'checks',
              type: 'static',
            },
          ],
        },
      },
      dashboards: {
        list: {
          interface: 'ListDashboards',
          meta: {
            title: 'List all dashboards',
            description: 'List all dashboards',
            docs: 'https://www.postman.com/api-evangelist/workspace/checkly',
          },
          method: 'GET',
          paths: [
            {
              name: 'dashboards',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Checkly
