import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Hybiscus {
  export type Entity = { core: any }
  export type Endpoint = {
    buildReport: ApiDescriptionEndpoint
    getReport: ApiDescriptionEndpoint
  }

  interface HybiscusBase {
    'auth:X-API-KEY': string
  }

  interface HybiscusComponent {
    type: string
    options?: any
    components?: HybiscusComponent[]
  }

  export interface BuildReport extends HybiscusBase, RequestParams {
    kind: 'hybiscus.core.buildReport'
    'query:referral'?: string
    'body:options'?: any
    'body:config'?: {
      n_pages?: number
      colour_theme?: string
      typography_theme?: string
      override_colour_theme?: any
      cloud_storage?: any
      web_hooks?: Array<{
        url: string
        auth_header?: string
      }>
    }
    'body:components': HybiscusComponent[]
  }

  export interface GetReport extends HybiscusBase, RequestParams {
    kind: 'hybiscus.core.getReport'
    'query:task_id': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'hybiscus',
      name: 'Hybiscus',
      url: 'https://hybiscus.dev/',
      docs: 'https://api.hybiscus.dev/',
      signup: 'https://hybiscus.dev/signup',
      pricing: 'https://hybiscus.dev/pricing',
      social: {
        twitter: 'hybiscusdev',
        github: 'hybiscus-dev',
      },
      tags: ['web2'],
      category: 'utils',
      type: 'pdf-generation',
    },
    base: 'https://api.hybiscus.dev/api/v1',
    auth: {
      'X-API-KEY': {
        type: 'header',
      },
    },
    api: {
      core: {
        buildReport: {
          interface: 'BuildReport',
          meta: {
            title: 'Build Report',
            description: `Build Report`,
            docs: 'https://api.hybiscus.dev/',
          },
          method: 'POST',
          paths: [
            {
              name: 'build-report',
              type: 'static',
            },
          ],
        },
        getReport: {
          interface: 'GetReport',
          meta: {
            title: 'Get Report',
            description: `Get Report`,
            docs: 'https://api.hybiscus.dev/',
          },
          method: 'GET',
          paths: [
            {
              name: 'get-report',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Hybiscus
