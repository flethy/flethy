import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Harvest {
  export type Entity = { projects: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  export interface HarvestBase {
    'auth:Authorization': string
    'auth:Harvest-Account-Id': string
  }

  export interface ListProjects extends HarvestBase, RequestParams {
    kind: 'harvest.projects.list'
    'query:is_active'?: boolean
    'query:client_id'?: number
    'query:updated_since'?: string
    'query:page'?: number
    'query:per_page'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'harvest',
      name: 'Harvest',
      url: 'https://getharvest.com',
      docs: 'https://help.getharvest.com/',
      tags: ['web2'],
      category: 'utils',
      type: 'time-tracking',
    },
    base: 'https://api.harvestapp.com/api/v2',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
      'Harvest-Account-Id': {
        type: 'header',
      },
    },
    api: {
      projects: {
        list: {
          interface: 'ListProjects',
          meta: {
            title: 'List all projects',
            description: `Returns a list of your projects. The projects are returned sorted by creation date, with the most recently created projects appearing first.`,
            docs: 'https://help.getharvest.com/api-v2/projects-api/projects/projects/#list-all-projects',
          },
          method: 'GET',
          paths: [
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

export default Harvest
