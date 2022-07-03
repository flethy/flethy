import {
  ApiDescription,
  ApiDescriptionAuth,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Auth0 {
  export type Entity = { auth: any; users: any }
  export type Endpoint =
    | { accesstoken: ApiDescriptionEndpoint }
    | { listOrSearch: ApiDescriptionEndpoint }

  export interface GetAuthAccessToken extends RequestParams {
    kind: 'auth0.auth.accesstoken'
    'body:client_id': string
    'body:client_secret': string
    'body:audience': string
    'body:grant_type': 'client_credentials'
    'subdomain:tenant': string
  }

  export interface ManagementApiBase {
    'auth:Authorization': string
    'subdomain:tenant': string
  }

  export interface ListOrSearchUsers extends ManagementApiBase, RequestParams {
    kind: 'auth0.users.listOrSearch'
    'query:q': string
    'query:search_engine': 'v1' | 'v2' | 'v3'
    'query:page'?: number
    'query:per_page'?: number
    'query:include_totals'?: boolean
    'query:sort'?: string
    'query:connection'?: string
    'query:fields'?: string
    'query:include_fields'?: string
  }

  const ManagementApiAuth: { [key: string]: ApiDescriptionAuth } = {
    Authorization: {
      type: 'header:bearer',
    },
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
      users: {
        listOrSearch: {
          interface: 'ListOrSearchUsers',
          meta: {
            title: 'ListOrSearchUsers',
            description: 'Retrieve details of users.',
            docs: 'https://auth0.com/docs/api/management/v2#!/Users/get_users',
          },
          auth: ManagementApiAuth,
          method: 'GET',
          paths: [
            {
              name: 'api',
              type: 'static',
            },
            {
              name: 'v2',
              type: 'static',
            },
            {
              name: 'users',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Auth0
