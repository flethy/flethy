import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Permitio {
  export type Entity = { organizations: any; resources: any; users: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  interface PermitioBase {
    'auth:Authorization': string
  }

  interface PermitioGetBase {
    'query:page'?: number
    'query:per_page'?: number
  }

  export interface ListOrganizations
    extends PermitioBase,
      PermitioGetBase,
      RequestParams {
    kind: 'permitio.organizations.list'
  }

  export interface ListResources
    extends PermitioBase,
      PermitioGetBase,
      RequestParams {
    kind: 'permitio.resources.list'
    'param:proj_id': string
    'param:env_id': string
    'query:include_built_in'?: boolean
  }

  export interface ListUsers
    extends PermitioBase,
      PermitioGetBase,
      RequestParams {
    kind: 'permitio.users.list'
    'param:proj_id': string
    'param:env_id': string
    'query:search'?: boolean
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'permitio',
      name: 'Permitio',
      url: 'https://www.permit.io/',
      docs: 'https://docs.permit.io/',
      signup: 'https://app.permit.io/',
      pricing: 'https://www.permit.io/pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'featureflags',
      social: {
        twitter: 'permit_io',
        github: 'permitio',
      },
    },
    base: 'https://api.permit.io/v2',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      organizations: {
        list: {
          interface: 'ListOrganizations',
          meta: {
            title: 'List Organizations',
            description: `List Organizations`,
            docs: 'https://api.permit.io/v2/redoc#tag/Organizations/operation/list_organizations',
          },
          method: 'GET',
          paths: [
            {
              name: 'orgs',
              type: 'static',
            },
          ],
        },
      },
      resources: {
        list: {
          interface: 'ListResources',
          meta: {
            title: 'List Resources',
            description: `List Resources`,
            docs: 'https://api.permit.io/v2/redoc#tag/Resources/operation/list_resources',
          },
          method: 'GET',
          paths: [
            {
              name: 'schema',
              type: 'static',
            },
            {
              name: 'proj_id',
              type: 'param',
            },
            {
              name: 'env_id',
              type: 'param',
            },
            {
              name: 'resources',
              type: 'static',
            },
          ],
        },
      },
      users: {
        list: {
          interface: 'ListUsers',
          meta: {
            title: 'List Users',
            description: `List Users`,
            docs: 'https://api.permit.io/v2/redoc#tag/Users/operation/list_users',
          },
          method: 'GET',
          paths: [
            {
              name: 'facts',
              type: 'static',
            },
            {
              name: 'proj_id',
              type: 'param',
            },
            {
              name: 'env_id',
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

export default Permitio
