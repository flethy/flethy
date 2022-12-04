import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Cronhub {
  export type Entity = { schedulers: any }
  export type Endpoint = {
    list: ApiDescriptionEndpoint
    get: ApiDescriptionEndpoint
    create: ApiDescriptionEndpoint
    update: ApiDescriptionEndpoint
    delete: ApiDescriptionEndpoint
    changeStatus: ApiDescriptionEndpoint
  }

  interface CronhubBase {
    'auth:X-Api-Key': string
  }

  export interface ListSchedulers extends CronhubBase, RequestParams {
    kind: 'cronhub.schedulers.list'
  }

  export interface GetScheduler extends CronhubBase, RequestParams {
    kind: 'cronhub.schedulers.get'
    'param:schedulerId': string
  }

  interface SchedulerBody {
    'body:name': string
    'body:type': 'cron' | 'interval'
    'body:url': string
    'body:http_method':
      | 'get'
      | 'post'
      | 'put'
      | 'delete'
      | 'patch'
      | 'head'
      | 'options'
    'body:http_body'?: any
    'body:schedule'?: string
    'body:interval_value'?: number
    'body:interval_rate'?: 'minutes' | 'hours' | 'days'
    'body:timezone'?: 'UTC'
    'body:is_monitoring_enabled': boolean
    'body:failure_threshold': number
  }

  export interface CreateScheduler
    extends CronhubBase,
      SchedulerBody,
      RequestParams {
    kind: 'cronhub.schedulers.create'
  }

  export interface UpdateScheduler
    extends CronhubBase,
      SchedulerBody,
      RequestParams {
    kind: 'cronhub.schedulers.update'
    'param:schedulerId': string
  }

  export interface DeleteScheduler extends CronhubBase, RequestParams {
    kind: 'cronhub.schedulers.delete'
    'param:schedulerId': string
  }

  export interface ChangeStatusOfScheduler extends CronhubBase, RequestParams {
    kind: 'cronhub.schedulers.changeStatus'
    'param:schedulerId': string
    'param:status': 'pause' | 'resume'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'cronhub',
      name: 'Cronhub',
      url: 'https://cronhub.io/',
      docs: 'https://docs.cronhub.io/',
      signup: 'https://cronhub.io/register',
      pricing: 'https://cronhub.io/#pricing',
      tags: ['web2'],
      category: 'tools',
      type: 'cron',
      social: {
        twitter: 'cronhubio',
        github: 'cronhub',
      },
    },
    base: 'https://cronhub.io/api/v1',
    auth: {
      'X-Api-Key': {
        type: 'header',
      },
    },
    api: {
      schedulers: {
        list: {
          interface: 'ListSchedulers',
          meta: {
            title: 'List all schedulers',
            description: `List all schedulers`,
            docs: 'https://docs.cronhub.io/public-api.html#scheduler-api-endpoints',
          },
          method: 'GET',
          paths: [
            {
              name: 'schedulers',
              type: 'static',
            },
          ],
        },
        get: {
          interface: 'GetScheduler',
          meta: {
            title: 'Get an existing scheduler',
            description: `Get an existing scheduler`,
            docs: 'https://docs.cronhub.io/public-api.html#get-an-existing-scheduler',
          },
          method: 'GET',
          paths: [
            {
              name: 'schedulers',
              type: 'static',
            },
            {
              name: 'schedulerId',
              type: 'param',
            },
          ],
        },
        create: {
          interface: 'CreateScheduler',
          meta: {
            title: 'Create a new scheduler',
            description: `Create a new scheduler`,
            docs: 'https://docs.cronhub.io/public-api.html#create-a-new-scheduler',
          },
          method: 'POST',
          paths: [
            {
              name: 'schedulers',
              type: 'static',
            },
            {
              name: 'create',
              type: 'static',
            },
          ],
        },
        update: {
          interface: 'UpdateScheduler',
          meta: {
            title: 'Update an existing scheduler',
            description: `Update an existing scheduler`,
            docs: 'https://docs.cronhub.io/public-api.html#update-an-existing-scheduler',
          },
          method: 'PUT',
          paths: [
            {
              name: 'schedulers',
              type: 'static',
            },
            {
              name: 'schedulerId',
              type: 'param',
            },
          ],
        },
        delete: {
          interface: 'DeleteScheduler',
          meta: {
            title: 'Delete a scheduler',
            description: `Delete a scheduler`,
            docs: 'https://docs.cronhub.io/public-api.html#delete-a-scheduler',
          },
          method: 'PUT',
          paths: [
            {
              name: 'schedulers',
              type: 'static',
            },
            {
              name: 'schedulerId',
              type: 'param',
            },
          ],
        },
        changeStatus: {
          interface: 'ChangeStatusOfScheduler',
          meta: {
            title: 'Pause/Resume a scheduler',
            description: `Pause/Resume a scheduler`,
            docs: 'https://docs.cronhub.io/public-api.html#pause-a-scheduler',
          },
          method: 'PUT',
          paths: [
            {
              name: 'schedulers',
              type: 'static',
            },
            {
              name: 'schedulerId',
              type: 'param',
            },
            {
              name: 'status',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Cronhub
