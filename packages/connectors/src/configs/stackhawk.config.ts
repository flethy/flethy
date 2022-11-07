import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Stackhawk {
  export type Entity = { auth: any; user: any }
  export type Endpoint =
    | {
        accessToken: ApiDescriptionEndpoint
        refresh: ApiDescriptionEndpoint
      }
    | {
        get: ApiDescriptionEndpoint
      }

  interface StackhawkBase {
    'auth:Authorization': string
  }

  export interface AccessToken extends RequestParams {
    kind: 'stackhawk.auth.accessToken'
    'auth:X-ApiKey': string
  }

  export interface RefreshAccessToken extends StackhawkBase, RequestParams {
    kind: 'stackhawk.auth.refresh'
  }

  export interface GetUser extends StackhawkBase, RequestParams {
    kind: 'stackhawk.user.get'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'stackhawk',
      name: 'Stackhawk',
      url: 'https://www.stackhawk.com/',
      docs: 'https://apidocs.stackhawk.com',
      signup: 'https://auth.stackhawk.com/signup',
      pricing: 'https://www.stackhawk.com/pricing/',
      tags: ['web2'],
      category: 'utils',
      type: 'app-security',
      social: {
        twitter: 'stackhawk',
        github: 'kaakaww',
      },
    },
    base: 'https://api.stackhawk.com/api/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      auth: {
        accessToken: {
          interface: 'AccessToken',
          meta: {
            title: 'Login with API Key',
            description: `Login with API Key`,
            docs: 'https://apidocs.stackhawk.com/reference/login',
          },
          method: 'GET',
          auth: {
            'X-ApiKey': {
              type: 'header',
            },
          },
          paths: [
            {
              name: 'auth',
              type: 'static',
            },
            {
              name: 'login',
              type: 'static',
            },
          ],
        },
        refresh: {
          interface: 'RefreshAccessToken',
          meta: {
            title: 'Refresh existing authentication',
            description: `Refresh existing authentication`,
            docs: 'https://apidocs.stackhawk.com/reference/refreshtoken',
          },
          method: 'GET',
          paths: [
            {
              name: 'auth',
              type: 'static',
            },
            {
              name: 'refresh-token',
              type: 'static',
            },
          ],
        },
      },
      user: {
        get: {
          interface: 'GetUser',
          meta: {
            title: 'Get the current user',
            description: `Get the current user`,
            docs: 'https://apidocs.stackhawk.com/reference/getuser',
          },
          method: 'GET',
          paths: [
            {
              name: 'user',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Stackhawk
