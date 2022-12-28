import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace ConfigJS {
  export type Entity = { auth: any }
  export type Endpoint = { token: ApiDescriptionEndpoint }

  interface ConfigJSBase {
    'auth:Authorization': string
  }

  export interface Authenticate extends RequestParams {
    kind: 'configjs.auth.token'
    'auth:email': string
    'auth:password': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'configjs',
      name: 'ConfigJS',
      url: 'https://www.cosmicjs.com/',
      docs: 'https://docs.cosmicjs.com/',
      signup: 'https://app.cosmicjs.com/signup',
      pricing: 'https://www.cosmicjs.com/pricing',
      tags: ['web2'],
      category: 'marketing',
      type: 'content',
      social: {
        twitter: 'CosmicJS',
        github: 'cosmicjs',
      },
    },
    base: 'https://api.cosmicjs.com/v2',
    api: {
      auth: {
        token: {
          interface: 'Authenticate',
          meta: {
            title: 'Authenticate',
            description: 'Authenticate',
            docs: 'https://docs.cosmicjs.com/api-reference/authentication',
          },
          method: 'POST',
          auth: {
            email: {
              type: 'body',
            },
            password: {
              type: 'body',
            },
          },
          paths: [
            {
              name: 'authenticate',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default ConfigJS
