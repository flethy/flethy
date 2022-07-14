import {
  ApiDescription,
  ApiDescriptionAuth,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Auth0 {
  export type Entity = { auth: any; users: any; usersByEmail: any }
  export type Endpoint =
    | { accesstoken: ApiDescriptionEndpoint }
    | { listOrSearch: ApiDescriptionEndpoint; get: ApiDescriptionEndpoint }
    | { get: ApiDescriptionEndpoint }

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

  export interface GetUser extends ManagementApiBase, RequestParams {
    kind: 'auth0.users.get'
    'param:id': string
    'query:fields'?: string
    'query:include_fields'?: boolean
  }

  export interface GetUsersByEmail extends ManagementApiBase, RequestParams {
    kind: 'auth0.usersByEmail.get'
    'query:email': string
    'query:fields'?: string
    'query:include_fields'?: boolean
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
      usersByEmail: {
        get: {
          interface: 'GetUsersByEmail',
          meta: {
            title: 'Search Users by Email',
            description: 'Retrieve users by E-Mail address.',
            docs: 'https://auth0.com/docs/api/management/v2#!/Users_By_Email/get_users_by_email',
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
              name: 'users-by-email',
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
        get: {
          interface: 'GetUser',
          meta: {
            title: 'Get a User',
            description:
              'Retrieve user details. A list of fields to include or exclude may also be specified.',
            docs: 'https://auth0.com/docs/api/management/v2/#!/Users/get_users_by_id',
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
            {
              name: 'id',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Auth0
