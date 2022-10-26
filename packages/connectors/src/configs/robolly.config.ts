import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Robolly {
  export type Entity = { core: any }
  export type Endpoint = { render: ApiDescriptionEndpoint }

  interface GenericQueryParams {
    [key: string]: string | undefined
  }

  interface RobollyBase {
    'auth:Authorization': string
  }

  export interface Render
    extends RobollyBase,
      GenericQueryParams,
      RequestParams {
    kind: 'robolly.core.render'
    'param:templateId': string
    'param:format': 'jpg' | 'png' | 'pdf'
    'query:logo'?: string
    'query:title'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'robolly',
      name: 'Robolly',
      url: 'https://robolly.com/',
      docs: 'https://robolly.com/articles/how-image-generation-api-works/',
      signup: 'https://robolly.com/dashboard/register/',
      pricing: 'https://robolly.com/pricing/',
      tags: ['web2'],
      category: 'utils',
      type: 'image-processing',
      social: {},
    },
    base: 'https://api.robolly.com',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      core: {
        render: {
          interface: 'Render',
          meta: {
            title: 'Render',
            description: `Render`,
            docs: 'https://robolly.com/articles/how-image-generation-api-works/',
          },
          method: 'GET',
          paths: [
            {
              name: 'templates',
              type: 'static',
            },
            {
              name: 'templateId',
              type: 'param',
            },
            {
              name: 'render',
              type: 'static',
            },
            {
              name: 'format',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Robolly
