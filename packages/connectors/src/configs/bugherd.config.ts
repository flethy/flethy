import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace BugHerd {
  export type Entity = { projects: any; tasks: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  interface BugHerdBase {
    'auth:Authorization': {
      username: string
      password: 'x'
    }
  }

  export interface ListProjects extends BugHerdBase, RequestParams {
    kind: 'bugherd.projects.list'
  }

  export interface ListTasks extends BugHerdBase, RequestParams {
    kind: 'bugherd.tasks.list'
    'param:projectId': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'bugherd',
      name: 'BugHerd',
      url: 'https://bugherd.com/',
      docs: 'https://www.bugherd.com/api_v2',
      signup: 'https://www.bugherd.com/users/registrations/new',
      pricing: 'https://bugherd.com/plans',
      tags: ['web2'],
      category: 'utils',
      type: 'bug-tracking',
      social: {
        twitter: 'bugherd',
      },
    },
    base: 'https://www.bugherd.com/api_v2',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      projects: {
        list: {
          interface: 'ListProjects',
          meta: {
            title: 'List Projects',
            description: `List Projects`,
            docs: 'https://www.bugherd.com/api_v2#api_proj_list',
          },
          method: 'GET',
          paths: [
            {
              name: 'projects.json',
              type: 'static',
            },
          ],
        },
      },
      tasks: {
        list: {
          interface: 'ListTasks',
          meta: {
            title: 'List Tasks',
            description: `List Tasks`,
            docs: 'https://www.bugherd.com/api_v2#api_task_list',
          },
          method: 'GET',
          paths: [
            {
              name: 'projects',
              type: 'static',
            },
            {
              name: 'projectId',
              type: 'param',
            },
            {
              name: 'tasks.json',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default BugHerd
