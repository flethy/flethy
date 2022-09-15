import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace DevCycle {
  export type Entity = { auth: any; features: any }
  export type Endpoint =
    | { token: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint }

  export interface Token extends RequestParams {
    kind: 'devcycle.auth.token'
    'body:grant_type': 'client_credentials'
    'body:audience': 'https://api.devcycle.com/'
    'body:client_id': string
    'body:client_secret': string
  }

  interface DevCycleBase {
    'auth:Authorization': string
  }

  export interface ListFeatures extends DevCycleBase, RequestParams {
    kind: 'devcycle.features.list'
    'param:projectId': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'devcycle',
      name: 'DevCycle',
      url: 'https://devcycle.com',
      docs: 'https://docs.devcycle.com/management-api/',
      signup: 'https://auth.devcycle.com/u/signup/',
      pricing: 'https://devcycle.com/pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'featureflags',
      social: {
        twitter: 'DevCycleHQ',
        github: 'DevCycleHQ',
      },
    },
    base: 'https://api.devcycle.com/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      auth: {
        token: {
          interface: 'Token',
          meta: {
            title: 'Token',
            description: `Token`,
            docs: 'https://docs.devcycle.com/management-api/',
          },
          base: 'https://auth.devcycle.com/oauth/token',
          method: 'POST',
        },
      },
      features: {
        list: {
          interface: 'ListFeatures',
          meta: {
            title: 'List Features',
            description: `List Features`,
            docs: 'https://docs.devcycle.com/management-api/#operation/FeaturesController_findAll',
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
              name: 'features',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default DevCycle
