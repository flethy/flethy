import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Lokalise {
  export type Entity = { tasks: any; users: any; teams: any }
  export type Endpoint =
    | {
        create: ApiDescriptionEndpoint
        list: ApiDescriptionEndpoint
      }
    | {
        list: ApiDescriptionEndpoint
      }

  interface LokaliseBase {
    'auth:X-Api-Token': string
  }

  export interface CreateTask extends LokaliseBase, RequestParams {
    kind: 'lokalise.tasks.create'
    'param:project_id': string
    'body:title': string
    'body:description'?: string
    'body:due_date'?: string
    'body:keys'?: string[]
    'body:languages'?: Array<{
      language_iso: string
      users?: string[]
      groups?: string[]
    }>
    'body:source_language_iso'?: string
    'body:auto_close_languages'?: boolean
    'body:auto_close_task'?: boolean
    'body:auto_close_items'?: boolean
    'body:task_type'?: 'translation' | 'review'
    'body:parent_task_id'?: number
    'body:closing_tags'?: string[]
    'body:do_lock_translations'?: boolean
    'body:custom_translation_status_ids'?: string[]
  }

  export interface ListTasks extends LokaliseBase, RequestParams {
    kind: 'lokalise.tasks.list'
    'param:project_id': string
    'query:filter_title'?: string
    'query:filter_statuses'?: string
    'query:limit'?: number
    'query:page'?: number
  }

  export interface ListUsers extends LokaliseBase, RequestParams {
    kind: 'lokalise.users.list'
    'param:team_id': string
    'query:limit'?: number
    'query:page'?: number
  }

  export interface ListTeams extends LokaliseBase, RequestParams {
    kind: 'lokalise.teams.list'
    'query:limit'?: number
    'query:page'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'lokalise',
      name: 'Lokalise',
      url: 'https://lokalise.com/',
      docs: 'https://developers.lokalise.com/',
      tags: ['web2'],
      category: 'collaboration',
      type: 'translations',
    },
    base: 'https://api.lokalise.com/api2',
    auth: {
      'X-Api-Token': {
        type: 'header',
      },
    },
    api: {
      tasks: {
        create: {
          interface: 'CreateTask',
          meta: {
            title: 'Create a task',
            description: `Creates a task in the project. Requires Manage tasks admin right.
            Keep in mind, that initial_tm_leverage attribute will be empty in server response. It's being calculated after the task is created and this process may take some time.`,
            docs: 'https://developers.lokalise.com/reference/create-a-task',
          },
          method: 'POST',
          paths: [
            {
              name: 'projects',
              type: 'static',
            },
            {
              name: 'project_id',
              type: 'param',
            },
            {
              name: 'tasks',
              type: 'static',
            },
          ],
        },
        list: {
          interface: 'ListTasks',
          meta: {
            title: 'List all tasks',
            description: `Lists all tasks in the project.`,
            docs: 'https://developers.lokalise.com/reference/list-all-tasks',
          },
          method: 'GET',
          paths: [
            {
              name: 'projects',
              type: 'static',
            },
            {
              name: 'project_id',
              type: 'param',
            },
            {
              name: 'tasks',
              type: 'static',
            },
          ],
        },
      },
      users: {
        list: {
          interface: 'ListUsers',
          meta: {
            title: 'List all team users',
            description: `Lists all team users. Requires Admin role in the team.`,
            docs: 'https://developers.lokalise.com/reference/list-all-team-users',
          },
          method: 'GET',
          paths: [
            {
              name: 'teams',
              type: 'static',
            },
            {
              name: 'team_id',
              type: 'param',
            },
            {
              name: 'users',
              type: 'static',
            },
          ],
        },
      },
      teams: {
        list: {
          interface: 'ListTeams',
          meta: {
            title: 'List all teams',
            description: `Lists all teams available to the user.`,
            docs: 'https://developers.lokalise.com/reference/list-all-teams',
          },
          method: 'GET',
          paths: [
            {
              name: 'teams',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Lokalise
