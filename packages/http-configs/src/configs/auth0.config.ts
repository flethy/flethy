import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Auth0 {
  export type Entity = { auth: any }
  export type Endpoint = { accesstoken: ApiDescriptionEndpoint }

  export interface GetAuthAccessToken extends RequestParams {
    kind: 'auth0.auth.accesstoken'
    'body:client_id': string
    'body:client_secret': string
    'body:audience': string
    'body:grant_type': 'client_credentials'
    'subdomain:tenant': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'auth0',
      name: 'Auth0',
      url: 'https://auth0.com',
      docs: 'https://auth0.com/docs',
      tags: ['web2'],
      category: 'identity',
      type: 'identitymanagement',
    },
    base: 'https://subdomain:tenant.auth0.com',
    api: {
      auth: {
        accesstoken: {
          interface: 'GetAuthAccessToken',
          meta: {
            title: 'GetAuthAccessToken',
            description:
              'You can execute a client credentials exchange to get an access token for Auth0 Management API.',
            docs: 'https://auth0.com/docs/api/authentication',
          },
          method: 'POST',
          paths: [
            {
              name: 'oauth',
              type: 'static',
            },
            {
              name: 'token',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Auth0
