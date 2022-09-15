import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Render {
  export type Entity = { services: any }
  export type Endpoint = {
    list: ApiDescriptionEndpoint
    updateEnvVars: ApiDescriptionEndpoint
  }

  interface RenderBase {
    'auth:Authorization': string
  }

  export interface ListServices extends RenderBase, RequestParams {
    kind: 'render.services.list'
    'query:name'?: string
    'query:type'?: string
    'query:env'?: string
    'query:region'?: string
    'query:suspended'?: string
    'query:createdBefore'?: string
    'query:createdAfter'?: string
    'query:updatedBefore'?: string
    'query:updatedAfter'?: string
    'query:ownerId'?: string
    'query:cursor'?: string
    'query:limit'?: number
  }

  export interface UpdateEnvironmentVariables
    extends RenderBase,
      RequestParams {
    kind: 'render.services.updateEnvVars'
    'param:serviceId': string
    'body:body': Array<{
      envVarKeyValue?: {
        key: string
        value: string
      }
      envVarKeyGenerateValue?: {
        key: string
        value: string
      }
    }>
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'render',
      name: 'Render',
      url: 'https://render.com/',
      docs: 'https://render.com/docs/api',
      tags: ['web2'],
      category: 'infra',
      type: 'serverless',
      social: {
        twitter: 'render',
        github: 'renderinc',
      },
    },
    base: 'https://api.render.com/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      services: {
        list: {
          interface: 'ListServices',
          meta: {
            title: 'List services',
            description: `This endpoint lists all services that are owned by your Render user and any teams you're a part of.`,
            docs: 'https://api-docs.render.com/reference/get-services',
          },
          method: 'GET',
          paths: [
            {
              name: 'services',
              type: 'static',
            },
          ],
        },
        updateEnvVars: {
          interface: 'UpdateEnvironmentVariables',
          meta: {
            title: 'Update environment variables',
            description: `This endpoint updates the list of environment variables for a service to match the request body sent in. Any environment variables that are not included will be removed from the service.`,
            docs: 'https://api-docs.render.com/reference/update-env-vars-for-service',
          },
          method: 'PUT',
          paths: [
            {
              name: 'services',
              type: 'static',
            },
            {
              name: 'serviceId',
              type: 'param',
            },
            {
              name: 'env-vars',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Render
