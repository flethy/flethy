import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace BooAPI {
  export type Entity = { user: any; task: any }
  export type Endpoint =
    | { balance: ApiDescriptionEndpoint }
    | {
        create: ApiDescriptionEndpoint
        status: ApiDescriptionEndpoint
        results: ApiDescriptionEndpoint
      }

  interface BooApiBase {
    'auth:key': string
  }

  export interface UserBalance extends BooApiBase, RequestParams {
    kind: 'booapi.user.balance'
  }

  export interface CreateTask extends BooApiBase, RequestParams {
    kind: 'booapi.task.create'
    'body:keywords': string[]
    'body:googleId'?: number
    'body:device'?: 'desktop' | 'mobile'
    'body:hl'?: string
    'body:noreask'?: 0 | 1
    'body:numdoc'?: number
  }

  export interface TaskStatus extends BooApiBase, RequestParams {
    kind: 'booapi.task.status'
    'param:taskId': string
  }

  export interface TaskResults extends BooApiBase, RequestParams {
    kind: 'booapi.task.results'
    'param:taskId': string
    'query:limit': number
    'query:offset'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'booapi',
      name: 'BooAPI',
      url: 'https://booapi.com/',
      docs: 'https://app.booapi.com/docs',
      signup: 'https://app.booapi.com/register',
      pricing: '',
      tags: ['web2'],
      category: 'search',
      type: 'serp',
      social: {},
    },
    base: 'https://app.booapi.com/api/v1.1.0',
    auth: {
      key: {
        type: 'query',
      },
    },
    api: {
      user: {
        balance: {
          interface: 'UserBalance',
          meta: {
            title: 'User Balance',
            description: `User Balance`,
            docs: 'https://app.booapi.com/docs',
          },
          method: 'GET',
          paths: [
            {
              name: 'user',
              type: 'static',
            },
            {
              name: 'balance',
              type: 'static',
            },
          ],
        },
      },
      task: {
        create: {
          interface: 'CreateTask',
          meta: {
            title: 'Create Task',
            description: `Create Task`,
            docs: 'https://app.booapi.com/docs',
          },
          method: 'POST',
          paths: [
            {
              name: 'task',
              type: 'static',
            },
          ],
        },
        status: {
          interface: 'TaskStatus',
          meta: {
            title: 'Task Status',
            description: `Task Status`,
            docs: 'https://app.booapi.com/docs',
          },
          method: 'GET',
          paths: [
            {
              name: 'task',
              type: 'static',
            },
            {
              name: 'status',
              type: 'static',
            },
            {
              name: 'taskId',
              type: 'param',
            },
          ],
        },
        results: {
          interface: 'TaskResults',
          meta: {
            title: 'Task Results',
            description: `Task Results`,
            docs: 'https://app.booapi.com/docs',
          },
          method: 'GET',
          paths: [
            {
              name: 'task',
              type: 'static',
            },
            {
              name: 'results',
              type: 'static',
            },
            {
              name: 'taskId',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default BooAPI
