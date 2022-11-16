import {
  ApiDescription,
  ApiDescriptionAuth,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Auth0 {
  export type Entity = {
    auth: any
    users: any
    usersByEmail: any
    connections: any
    roles: any
  }
  export type Endpoint =
    | { accesstoken: ApiDescriptionEndpoint }
    | {
        listOrSearch: ApiDescriptionEndpoint
        get: ApiDescriptionEndpoint
        create: ApiDescriptionEndpoint
        update: ApiDescriptionEndpoint
        delete: ApiDescriptionEndpoint
      }
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

  export interface GetConnections extends ManagementApiBase, RequestParams {
    kind: 'auth0.connections.get'
    'param:per_page'?: number
    'param:page'?: number
    'param:include_totals'?: boolean
    'param:strategy'?: string
    'param:name'?: string
    'param:fields'?: string
    'param:include_fields'?: boolean
  }

  export interface CreateUser extends ManagementApiBase, RequestParams {
    kind: 'auth0.users.create'
    'body:email'?: string
    'body:phone_number'?: string
    'body:user_metadata'?: any
    'body:blocked'?: boolean
    'body:email_verified'?: boolean
    'body:phone_verified'?: boolean
    'body:app_metadata'?: any
    'body:given_name'?: string
    'body:family_name'?: string
    'body:name'?: string
    'body:nickname'?: string
    'body:picture'?: string
    'body:user_id'?: string
    'body:connection'?: string
    'body:password'?: string
    'body:verify_email'?: boolean
    'body:username'?: string
  }

  export interface UpdateUser extends ManagementApiBase, RequestParams {
    kind: 'auth0.users.update'
    'param:id': string
    'body:email'?: string
    'body:phone_number'?: string
    'body:user_metadata'?: any
    'body:blocked'?: boolean
    'body:email_verified'?: boolean
    'body:phone_verified'?: boolean
    'body:app_metadata'?: any
    'body:given_name'?: string
    'body:family_name'?: string
    'body:name'?: string
    'body:nickname'?: string
    'body:picture'?: string
    'body:user_id'?: string
    'body:connection'?: string
    'body:password'?: string
    'body:verify_email'?: boolean
    'body:username'?: string
  }

  export interface DeleteUser extends ManagementApiBase, RequestParams {
    kind: 'auth0.users.delete'
    'param:userId': string
  }

  export interface GetRoles extends ManagementApiBase, RequestParams {
    kind: 'auth0.roles.get'
    'param:per_page'?: number
    'param:page'?: number
    'param:include_totals'?: boolean
    'param:name_filter'?: string
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
      signup: 'https://auth0.com/signup',
      pricing: 'https://auth0.com/pricing/',
      social: {
        twitter: 'auth0',
        github: 'auth0',
        instagram: 'weareauth0',
      },
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
        create: {
          interface: 'CreateUser',
          meta: {
            title: 'Create a User',
            description:
              'Create a new user for a given database or passwordless connection.',
            docs: 'https://auth0.com/docs/api/management/v2#!/Users/post_users',
          },
          auth: ManagementApiAuth,
          method: 'POST',
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
        update: {
          interface: 'UpdateUser',
          meta: {
            title: 'Update a User',
            description: 'Update a user.',
            docs: 'https://auth0.com/docs/api/management/v2#!/Users/patch_users_by_id',
          },
          auth: ManagementApiAuth,
          method: 'PATCH',
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
        delete: {
          interface: 'DeleteUser',
          meta: {
            title: 'Delete a User',
            description: 'Delete a User.',
            docs: 'https://auth0.com/docs/api/management/v2#!/Users/delete_users_by_id',
          },
          auth: ManagementApiAuth,
          method: 'DELETE',
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
              name: 'userId',
              type: 'param',
            },
          ],
        },
      },
      connections: {
        get: {
          interface: 'GetConnections',
          meta: {
            title: 'Get all connections',
            description:
              'Retrieves every connection matching the specified strategy. All connections are retrieved if no strategy is being specified. Accepts a list of fields to include or exclude in the resulting list of connection objects.',
            docs: 'https://auth0.com/docs/api/management/v2#!/Connections/get_connections',
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
              name: 'connections',
              type: 'static',
            },
          ],
        },
      },
      roles: {
        get: {
          interface: 'GetRoles',
          meta: {
            title: 'Get roles',
            description:
              'Retrieve filtered list of roles that can be assigned to users.',
            docs: 'https://auth0.com/docs/api/management/v2#!/Roles/get_roles',
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
              name: 'roles',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Auth0
