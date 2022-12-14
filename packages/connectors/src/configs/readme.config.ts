import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace ReadMe {
  export type Entity = { apispec: any }
  export type Endpoint = { getMetadata: ApiDescriptionEndpoint }

  interface ReadMeBase {
    'auth:Authorization': string
  }

  export interface APISpecGetMetadata extends ReadMeBase, RequestParams {
    kind: 'readme.apispec.getMetadata'
    'query:perPage'?: number
    'query:page'?: number
    'header:x-readme-version'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'readme',
      name: 'ReadMe',
      url: 'https://readme.com/',
      docs: 'https://readme.com/documentation',
      signup: 'https://dash.readme.com/signup',
      pricing: 'https://readme.com/pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'documentation',
      social: {
        twitter: 'readme',
      },
    },
    base: 'https://dash.readme.com/api/v1',
    auth: {
      Authorization: {
        type: 'header:basic:encoded',
      },
    },
    api: {
      apispec: {
        getMetadata: {
          interface: 'APISpecGetMetadata',
          meta: {
            title: 'Get metadata',
            description: `Get API specification metadata.`,
            docs: 'https://docs.readme.com/main/reference/getapispecification',
          },
          method: 'GET',
          paths: [
            {
              name: 'api-specification',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default ReadMe
