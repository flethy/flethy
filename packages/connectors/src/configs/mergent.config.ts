import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Mergent {
  export type Entity = { tasks: any }
  export type Endpoint = { create: ApiDescriptionEndpoint }

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
      pricing: 'https://mergent.co/#pricing',
      signup: 'https://app.mergent.co/',
      social: {
        twitter: 'mergentlabs',
      },
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
          interface: 'CreateTask',
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
