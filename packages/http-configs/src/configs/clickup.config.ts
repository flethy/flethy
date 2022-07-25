import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace ClickUp {
  export type Entity = { spaces: any; lists: any; tasks: any }
  export type Endpoint =
    | { getAll: ApiDescriptionEndpoint }
    | { getAllFolderless: ApiDescriptionEndpoint }

  export interface ClickUpBase {
    'auth:Authorization': string
  }

  export interface SpacesGetAll extends ClickUpBase, RequestParams {
    kind: 'clickup.spaces.getAll'
    'query:archived'?: boolean
    'param:teamId': number
  }

  export interface ListsGetAllFolderless extends ClickUpBase, RequestParams {
    kind: 'clickup.lists.getAllFolderless'
    'query:archived'?: boolean
    'param:spaceId': number
  }

  export interface TasksGetAll extends ClickUpBase, RequestParams {
    kind: 'clickup.tasks.getAll'
    'param:listId': number
    'query:archived'?: boolean
    'query:page'?: number
    'query:order_by'?: 'id' | 'created' | 'updated' | 'due_date'
    'query:reverse'?: boolean
    'query:subtasks'?: boolean
    'query:statuses[]'?: string
    'query:include_closed'?: boolean
    'query:assignees[]'?: string
    'query:due_date_gt'?: number
    'query:due_date_lt'?: number
    'query:date_created_gt'?: number
    'query:date_created_lt'?: number
    'query:date_updated_gt'?: number
    'query:date_updated_lt'?: number
    'query:custom_fields[]'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'clickup',
      name: 'ClickUp',
      url: 'https://clickup.com',
      docs: 'https://clickup.com/api',
      tags: ['web2'],
      category: 'collaboration',
      type: 'issueticketing',
    },
    base: 'https://api.clickup.com/api/v2',
    auth: {
      Authorization: {
        type: 'header',
      },
    },
    api: {
      spaces: {
        getAll: {
          interface: 'SpacesGetAll',
          meta: {
            title: 'Get Spaces',
            description: `Get Spaces`,
            docs: 'https://clickup.com/api',
          },
          method: 'GET',
          paths: [
            {
              name: 'team',
              type: 'static',
            },
            {
              name: 'teamId',
              type: 'param',
            },
            {
              name: 'space',
              type: 'static',
            },
          ],
        },
      },
      lists: {
        getAllFolderless: {
          interface: 'ListsGetAllFolderless',
          meta: {
            title: 'Get Folderless Lists',
            description: `Get Folderless Lists`,
            docs: 'https://clickup.com/api',
          },
          method: 'GET',
          paths: [
            {
              name: 'space',
              type: 'static',
            },
            {
              name: 'spaceId',
              type: 'param',
            },
            {
              name: 'list',
              type: 'static',
            },
          ],
        },
      },
      tasks: {
        getAll: {
          interface: 'TasksGetAll',
          meta: {
            title: 'Get Tasks',
            description: `Get Tasks`,
            docs: 'https://clickup.com/api',
          },
          method: 'GET',
          paths: [
            {
              name: 'list',
              type: 'static',
            },
            {
              name: 'listId',
              type: 'param',
            },
            {
              name: 'task',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default ClickUp
