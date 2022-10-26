import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Userfront {
  export type Entity = { users: any; roles: any }
  export type Endpoint =
    | {
        create: ApiDescriptionEndpoint
        search: ApiDescriptionEndpoint
      }
    | {
        list: ApiDescriptionEndpoint
      }

  interface UserfrontBase {
    'auth:Authorization': string
  }

  export interface CreateUser extends UserfrontBase, RequestParams {
    kind: 'userfront.users.create'
    'body:email': string
    'body:username'?: string
    'body:name'?: string
    'body:image'?: string
    'body:data'?: any
  }

  export interface SearchUsers extends UserfrontBase, RequestParams {
    kind: 'userfront.users.search'
    'body:order'?:
      | 'lastActiveAt_ASC'
      | 'createdAt_ASC'
      | 'updatedAt_ASC'
      | 'name_ASC'
      | 'username_ASC'
      | 'lastActiveAt_DESC'
      | 'createdAt_DESC'
      | 'updatedAt_DESC'
      | 'name_DESC'
      | 'username_DESC'
    'body:page'?: number
    'body:filters'?: any
  }

  export interface ListRoles extends UserfrontBase, RequestParams {
    kind: 'userfront.roles.list'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'userfront',
      name: 'Userfront',
      url: 'https://userfront.com/',
      docs: 'https://userfront.com/docs/api',
      signup: 'https://userfront.com/signup',
      pricing: 'https://userfront.com/pricing',
      tags: ['web2'],
      category: 'identity',
      type: 'identitymanagement',
      social: {
        twitter: 'userfront_hq',
        github: 'userfront',
      },
    },
    base: 'https://api.userfront.com/v0',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      users: {
        create: {
          interface: 'CreateUser',
          meta: {
            title: 'Create user',
            description: `Create user`,
            docs: 'https://userfront.com/docs/api#create-user',
          },
          method: 'POST',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
          ],
        },
        search: {
          interface: 'SearchUsers',
          meta: {
            title: 'Search users',
            description: `Search users`,
            docs: 'https://userfront.com/docs/api#search-users',
          },
          method: 'POST',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
            {
              name: 'find',
              type: 'static',
            },
          ],
        },
      },
      roles: {
        list: {
          interface: 'ListRoles',
          meta: {
            title: 'List roles',
            description: `List roles`,
            docs: 'https://userfront.com/docs/api#list-roles',
          },
          method: 'GET',
          paths: [
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

export default Userfront
