import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace WarrantDev {
  export type Entity = { objectTypes: any; users: any; tenants: any }
  export type Endpoint =
    | { list: ApiDescriptionEndpoint }
    | { create: ApiDescriptionEndpoint }
    | { getUsers: ApiDescriptionEndpoint }

  interface WarrantDevBase {
    'auth:Authorization': string
  }

  export interface ListObjectTypes extends WarrantDevBase, RequestParams {
    kind: 'warrantdev.objectTypes.list'
  }

  export interface CreateUser extends WarrantDevBase, RequestParams {
    kind: 'warrantdev.users.create'
    'body:userId'?: string
    'body:email'?: string
  }

  export interface GetUsersByTenant extends WarrantDevBase, RequestParams {
    kind: 'warrantdev.tenants.getUsers'
    'param:tenantId': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'warrantdev',
      name: 'WarrantDev',
      url: 'https://warrant.dev/',
      docs: 'https://docs.warrant.dev/objecttypes/get-all-object-types/',
      signup: 'https://app.warrant.dev/signup',
      pricing: 'https://warrant.dev/pricing',
      tags: ['web2'],
      category: 'identity',
      type: 'identitymanagement',
      social: {
        twitter: 'warrant_dev',
        github: 'warrant-dev',
      },
    },
    base: 'https://api.warrant.dev/v1',

    auth: {
      Authorization: {
        type: 'header:custom',
        custom: {
          prefix: 'ApiKey ',
        },
      },
    },
    api: {
      objectTypes: {
        list: {
          interface: 'ListObjectTypes',
          meta: {
            title: 'Get Object Types',
            description: `Get list of all object types.`,
            docs: 'https://docs.warrant.dev/objecttypes/get-all-object-types/',
          },
          method: 'GET',
          paths: [
            {
              name: 'object-types',
              type: 'static',
            },
          ],
        },
      },
      users: {
        create: {
          interface: 'CreateUser',
          meta: {
            title: 'Create a User',
            description: `Create a new user.`,
            docs: 'https://docs.warrant.dev/users/create-a-user/',
          },
          method: 'POST',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
          ],
        },
      },
      tenants: {
        getUsers: {
          interface: 'GetUsersByTenant',
          meta: {
            title: 'Get Users by Tenant',
            description: `Get the users associated with a specific tenant.`,
            docs: 'https://docs.warrant.dev/users/get-users-by-tenant/',
          },
          method: 'GET',
          paths: [
            {
              name: 'tenants',
              type: 'static',
            },
            {
              name: 'tenantId',
              type: 'param',
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

export default WarrantDev
