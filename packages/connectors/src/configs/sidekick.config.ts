import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace SideKick {
  export type Entity = { applications: any; logpoint: any }
  export type Endpoint =
    | { list: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint }

  interface SideKickBase {
    'auth:ApiKey': string
    'auth:Authorization': string
  }

  export interface ListApplications extends SideKickBase, RequestParams {
    kind: 'sidekick.applications.list'
    'body:listApplicationsRequest': {
      applicationNames: string[]
      applicationStages: string[]
      applicationVersions: string[]
      client: string
      id: string
      name: string
      type: string
    }
  }

  export interface ListLogpoints extends SideKickBase, RequestParams {
    kind: 'sidekick.logpoint.list'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'sidekick',
      name: 'SideKick',
      url: 'https://www.runsidekick.com/',
      docs: 'https://docs.runsidekick.com/',
      pricing: 'https://www.runsidekick.com/pricing',
      signup: 'https://app.runsidekick.com/signup',
      tags: ['web2'],
      category: 'utils',
      type: 'logging',
      social: {
        twitter: 'runsidekick',
      },
    },
    base: 'https://api.service.runsidekick.com/api/v1',
    auth: {
      ApiKey: {
        type: 'header',
      },
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      applications: {
        list: {
          interface: 'ListApplications',
          meta: {
            title: 'List Applications',
            description: `List Applications`,
            docs: 'https://api.service.runsidekick.com/swagger-ui.html#/applications/listApplicationsUsingPOST',
          },
          method: 'POST',
          paths: [
            {
              name: 'applications',
              type: 'static',
            },
          ],
        },
      },
      logpoint: {
        list: {
          interface: 'ListLogpoints',
          meta: {
            title: 'List Logpoints',
            description: `List Logpoints`,
            docs: 'https://api.service.runsidekick.com/swagger-ui.html#/logpoint/listLogPointsUsingGET',
          },
          method: 'GET',
          paths: [
            {
              name: 'logpoint',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default SideKick
