import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Clockify {
  export type Entity = { projects: any }
  export type Endpoint = { getAll: ApiDescriptionEndpoint }

  export interface ClockifyBase {
    'auth:X-Api-Key': string
  }

  export interface ProjectsGetAll extends ClockifyBase, RequestParams {
    kind: 'clockify.projects.getAll'
    baseId: 'base' | 'reports' | 'timeoff'
    'param:workspaceId': string
    'query:hydrated'?: boolean
    'query:archived'?: boolean
    'query:name'?: string
    'query:page'?: number
    'query:page-size'?: number
    'query:billable'?: boolean
    'query:clients'?: string
    'query:contains-client'?: boolean
    'query:client-status'?: 'ACTIVE' | 'ARCHIVED'
    'query:users'?: string
    'query:contains-users'?: boolean
    'query:user-status'?: 'ACTIVE' | 'INACTIVE'
    'query:is-template'?: boolean
    'query:sort-column'?: 'ASCENDING' | 'DESCENDING'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'clockify',
      name: 'Clockify',
      url: 'https://clockify.me',
      docs: 'https://clockify.me/developers-api',
      tags: ['web2'],
      category: 'utils',
      type: 'time-tracking',
    },
    base: [
      {
        id: 'base',
        url: 'https://api.clockify.me/api/v1',
      },
      {
        id: 'reports',
        url: 'https://reports.clockify.me/api/v1',
      },
      {
        id: 'timeoff',
        url: 'https://pto.clockify.me/api/v1',
      },
    ],
    auth: {
      'X-Api-Key': {
        type: 'header',
      },
    },
    api: {
      projects: {
        getAll: {
          interface: 'ProjectsGetAll',
          meta: {
            title: 'Get all projects on workspace',
            description: `Get all projects on workspace`,
            docs: 'https://clockify.me/developers-api',
          },
          method: 'GET',
          paths: [
            {
              name: 'workspaces',
              type: 'static',
            },
            {
              name: 'workspaceId',
              type: 'param',
            },
            {
              name: 'projects',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Clockify
