import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Asana {
  export type Entity = { users: any; workspaces: any; tasks: any }
  export type Endpoint =
    | { me: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint }
    | { create: ApiDescriptionEndpoint }

  interface AsanaBase {
    'auth:Authorization': string
  }

  export interface GetMe extends AsanaBase, RequestParams {
    kind: 'asana.users.me'
  }

  export interface ListWorkspaces extends AsanaBase, RequestParams {
    kind: 'asana.workspaces.list'
    'query:opt_pretty'?: boolean
    'query:opt_fields'?: string
    'query:limit'?: number
    'query:offset'?: number
  }

  export interface CreateTask extends AsanaBase, RequestParams {
    kind: 'asana.tasks.create'
    'body:data': any
    'query:opt_pretty'?: boolean
    'query:opt_fields'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'asana',
      name: 'Asana',
      url: 'https://asana.com',
      docs: 'https://developers.asana.com/docs',
      signup: 'https://asana.com/create-account',
      pricing: 'https://asana.com/pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'issueticketing',
      social: {
        twitter: 'asana',
        instagram: 'asana',
      },
    },
    base: 'https://app.asana.com/api/1.0',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      users: {
        me: {
          interface: 'GetMe',
          meta: {
            title: 'Get Me',
            description: `Get Me`,
            docs: 'https://developers.asana.com/docs/users',
          },
          method: 'GET',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
            {
              name: 'me',
              type: 'static',
            },
          ],
        },
      },
      workspaces: {
        list: {
          interface: 'ListWorkspaces',
          meta: {
            title: 'List Workspaces',
            description: `List Workspaces`,
            docs: 'https://developers.asana.com/docs/workspaces',
          },
          method: 'GET',
          paths: [
            {
              name: 'workspaces',
              type: 'static',
            },
          ],
        },
      },
      tasks: {
        create: {
          interface: 'CreateTask',
          meta: {
            title: 'Create a task',
            description: `Create a task`,
            docs: 'https://developers.asana.com/docs/create-a-task',
          },
          method: 'POST',
          paths: [
            {
              name: 'tasks',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Asana
