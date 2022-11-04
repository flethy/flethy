import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Neon {
  export type Entity = { operations: any; users: any; projects: any }
  export type Endpoint =
    | { get: ApiDescriptionEndpoint }
    | { me: ApiDescriptionEndpoint }

  interface NeonBase {
    'auth:Authorization': string
  }

  export interface GetOperations extends NeonBase, RequestParams {
    kind: 'neon.operations.get'
  }

  export interface GetUser extends NeonBase, RequestParams {
    kind: 'neon.users.me'
  }

  export interface GetProjects extends NeonBase, RequestParams {
    kind: 'neon.projects.get'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'neon',
      name: 'Neon',
      url: 'https://neon.tech/',
      docs: 'https://neon.tech/docs/',
      signup: 'https://neon.tech/early-access/',
      tags: ['web2'],
      category: 'infra',
      type: 'database',
      social: {
        twitter: 'neondatabase',
        github: 'neondatabase',
      },
    },
    base: 'https://console.neon.tech/api/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      operations: {
        get: {
          interface: 'GetOperations',
          meta: {
            title: 'Get Operations',
            description: `Returns operations list of the current user`,
            docs: 'https://neon.tech/api-reference/#/Operation/getOperations',
          },
          method: 'GET',
          paths: [
            {
              name: 'operations',
              type: 'static',
            },
          ],
        },
      },
      users: {
        me: {
          interface: 'GetUser',
          meta: {
            title: 'Get User',
            description: `Get info for logged-in user.`,
            docs: 'https://neon.tech/api-reference/#/Users/getCurrentUserInfo',
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
      projects: {
        get: {
          interface: 'GetProjects',
          meta: {
            title: 'Get Projects',
            description: `Returns projects list.`,
            docs: 'https://neon.tech/api-reference/#/Project/getProjectList',
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

export default Neon
