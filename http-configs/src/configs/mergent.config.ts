import { RequestParams } from '../types/Request.types'
import { ApiDescription } from '../types/ApiDescription.type'

export namespace Mergent {
  export type Entity = { tasks }
  export type Endpoint = { create }

  export interface CreateTask extends RequestParams {
    kind: 'mergent.tasks.create'
    'auth:Authorization': string
    'body:queue': 'default' | string
    'body:name'?: string
    'body:scheduled_for'?: string // ISO 8601 ts
    'body:delay'?: string // ISO 8601 duration
    'body:request': {
      url: string
      headers?: { [key: string]: string }
      body?: string
    }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'mergent',
      name: 'Mergent',
      url: 'https://mergent.co',
      docs: 'https://docs.mergent.co/',
      tags: ['web2'],
      category: 'tools',
      type: 'cron',
    },
    base: 'https://api.mergent.co/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      tasks: {
        create: {
          meta: {
            title: 'Create Task',
            description: 'Create a new Mergent Task.',
            docs: 'https://docs.mergent.co/tasks/quick-start',
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

export default Mergent
