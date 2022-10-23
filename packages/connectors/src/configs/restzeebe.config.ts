import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace RestZeebe {
  export type Entity = { core: any }
  export type Endpoint = { start: ApiDescriptionEndpoint }

  interface RestZeebeBase {
    'auth:Authorization': string
    'param:workspaceId': string
    'param:clusterId': string
    'body:clientId': string
    'body:clientSecret': string
    'header:Content-Type': 'application/json'
  }

  export interface StartInstance extends RestZeebeBase, RequestParams {
    kind: 'restzeebe.core.start'
    'param:processId': string
    'body:variables'?: any
    'body:version'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'restzeebe',
      name: 'RestZeebe',
      url: 'https://restzeebe.app/',
      docs: 'https://restzeebe.app/',
      signup: 'https://restzeebe.app/',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
      social: {
        twitter: 'restzeebe',
      },
    },
    base: 'https://us-central1-rest-zeebe.cloudfunctions.net/api',
    auth: {
      Authorization: {
        type: 'header',
      },
    },
    api: {
      core: {
        start: {
          interface: 'StartInstance',
          meta: {
            title: 'Start new instance',
            description: `Start new instance`,
            docs: 'https://restzeebe.app/',
          },
          method: 'POST',
          paths: [
            {
              name: 'workspaces',
              type: 'static',
            },
            {
              name: 'workspaceId',
              type: 'param',
            },
            {
              name: 'clusters',
              type: 'static',
            },
            {
              name: 'clusterId',
              type: 'param',
            },
            {
              name: 'instance',
              type: 'static',
            },
            {
              name: 'processId',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default RestZeebe
