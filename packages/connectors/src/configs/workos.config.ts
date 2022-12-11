import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace WorkOS {
  export type Entity = { directories: any; organizations: any }
  export type Endpoint =
    | {
        list: ApiDescriptionEndpoint
        delete: ApiDescriptionEndpoint
      }
    | {
        list: ApiDescriptionEndpoint
        create: ApiDescriptionEndpoint
        update: ApiDescriptionEndpoint
        delete: ApiDescriptionEndpoint
      }

  interface WorkOSBase {
    'auth:Authorization': string
  }

  export interface ListDirectories extends WorkOSBase, RequestParams {
    kind: 'workos.directories.list'
    'query:domain'?: string
    'query:search'?: string
    'query:organization_id'?: string
    'query:limit'?: number
    'query:before'?: string
    'query:after'?: string
    'query:order'?: 'asc' | 'desc'
  }

  export interface DeleteDirectory extends WorkOSBase, RequestParams {
    kind: 'workos.directories.delete'
    'param:directoryId': string
  }

  export interface ListOrganizations extends WorkOSBase, RequestParams {
    kind: 'workos.organizations.list'
    'query:domains'?: string
    'query:limit'?: number
    'query:before'?: string
    'query:after'?: string
    'query:order'?: 'asc' | 'desc'
  }

  export interface CreateOrganization extends WorkOSBase, RequestParams {
    kind: 'workos.organizations.create'
    'body:name': string
    'body:allow_profiles_outside_organization'?: boolean
    'body:domains'?: string[]
  }

  export interface UpdateOrganization extends WorkOSBase, RequestParams {
    kind: 'workos.organizations.update'
    'param:organizationId': string
    'body:name': string
    'body:allow_profiles_outside_organization'?: boolean
    'body:domains'?: string[]
  }

  export interface DeleteOrganization extends WorkOSBase, RequestParams {
    kind: 'workos.organizations.delete'
    'param:organizationId': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'workos',
      name: 'WorkOS',
      url: 'https://workos.com/',
      docs: 'https://workos.com/docs/reference',
      signup: 'https://dashboard.workos.com/signup',
      pricing: 'https://workos.com/pricing',
      tags: ['web2'],
      category: 'identity',
      type: 'identitymanagement',
      social: {
        twitter: 'workos',
        github: 'workos',
      },
    },
    base: 'https://api.workos.com',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      directories: {
        list: {
          interface: 'ListDirectories',
          meta: {
            title: 'List Directories',
            description: `List Directories`,
            docs: 'https://workos.com/docs/reference/directory-sync/directory/list',
          },
          method: 'GET',
          paths: [
            {
              name: 'directories',
              type: 'static',
            },
          ],
        },
        delete: {
          interface: 'DeleteDirectory',
          meta: {
            title: 'Delete a Directory',
            description: `Delete a Directory`,
            docs: 'https://workos.com/docs/reference/directory-sync/directory/delete',
          },
          method: 'DELETE',
          paths: [
            {
              name: 'directories',
              type: 'static',
            },
            {
              name: 'directoryId',
              type: 'param',
            },
          ],
        },
      },
      organizations: {
        list: {
          interface: 'ListOrganizations',
          meta: {
            title: 'List Organizations',
            description: `List Organizations`,
            docs: 'https://workos.com/docs/reference/organization/list',
          },
          method: 'GET',
          paths: [
            {
              name: 'organizations',
              type: 'static',
            },
          ],
        },
        delete: {
          interface: 'DeleteOrganization',
          meta: {
            title: 'Delete an Organization',
            description: `Delete an Organization`,
            docs: 'https://workos.com/docs/reference/organization/delete',
          },
          method: 'DELETE',
          paths: [
            {
              name: 'organizations',
              type: 'static',
            },
            {
              name: 'organizationId',
              type: 'param',
            },
          ],
        },
        create: {
          interface: 'CreateOrganization',
          meta: {
            title: 'Create an Organization',
            description: `Create an Organization`,
            docs: 'https://workos.com/docs/reference/organization/create',
          },
          method: 'POST',
          paths: [
            {
              name: 'organizations',
              type: 'static',
            },
          ],
        },
        update: {
          interface: 'UpdateOrganization',
          meta: {
            title: 'Update an Organization',
            description: `Update an Organization`,
            docs: 'https://workos.com/docs/reference/organization/update',
          },
          method: 'PATCH',
          paths: [
            {
              name: 'organizations',
              type: 'static',
            },
            {
              name: 'organizationId',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default WorkOS
