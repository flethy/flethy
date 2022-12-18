import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace KnockApp {
  export type Entity = { users: any }
  export type Endpoint = {
    identify: ApiDescriptionEndpoint
  }

  interface KnockAppBase {
    'auth:Authorization': string
  }

  export interface IdentifyUser extends KnockAppBase, RequestParams {
    kind: 'knockapp.users.identify'
    'param:userId': string
    'body:body'?: {
      name?: string
      email?: string
      avatar?: string
      phone_number?: string
      [key: string]: any
    }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'knockapp',
      name: 'KnockApp',
      url: 'https://knock.app/',
      docs: 'https://docs.knock.app/',
      signup: 'https://dashboard.knock.app/signup',
      pricing: 'https://knock.app/pricing',
      tags: ['web2'],
      category: 'communication',
      type: 'multichannel',
      social: {
        twitter: 'knocklabs',
        github: 'knocklabs',
      },
    },
    base: 'https://api.knock.app/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      users: {
        identify: {
          interface: 'IdentifyUser',
          meta: {
            title: 'Identify a user',
            description: `Identify a user`,
            docs: 'https://docs.knock.app/reference#identify-user',
          },
          method: 'PUT',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
            {
              name: 'userId',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default KnockApp
