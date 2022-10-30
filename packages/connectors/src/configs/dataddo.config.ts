import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Dataddo {
  export type Entity = { services: any; auth: any; sources: any }
  export type Endpoint =
    | { get: ApiDescriptionEndpoint; create: ApiDescriptionEndpoint }
    | { get: ApiDescriptionEndpoint }
    | { getToken: ApiDescriptionEndpoint }

  interface DataddoBase {
    'auth:Authorization': string
    'header:X-realm-id': string
    'header:X-provider': string
  }

  export interface GetToken extends RequestParams {
    kind: 'dataddo.auth.getToken'
    'auth:email': string
    'auth:password': string
  }

  export interface GetServices extends DataddoBase, RequestParams {
    kind: 'dataddo.services.get'
  }

  export interface CreateService extends DataddoBase, RequestParams {
    kind: 'dataddo.services.create'
    'body:service': string
    'body:data': any[]
  }

  export interface GetSources extends DataddoBase, RequestParams {
    kind: 'dataddo.sources.get'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'dataddo',
      name: 'Dataddo',
      url: 'https://www.dataddo.com/',
      docs: 'https://docs.dataddo.com/',
      signup: 'https://www.dataddo.com/signup',
      pricing: 'https://www.dataddo.com/pricing',
      tags: ['web2'],
      category: 'data',
      type: 'data-integration',
      social: {
        instagram: 'dataddo_com',
        twitter: 'dataddo',
      },
    },
    base: 'https://public-api.dataddo.com/api/v2',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
      email: {
        type: 'body',
      },
      password: {
        type: 'body',
      },
    },
    api: {
      services: {
        get: {
          interface: 'GetServices',
          meta: {
            title: 'Get Services',
            description: `Get Services`,
            docs: 'https://headless.dataddo.com/#/service/serviceControllerList',
          },
          method: 'GET',
          paths: [
            {
              name: 'services',
              type: 'static',
            },
          ],
        },
        create: {
          interface: 'CreateService',
          meta: {
            title: 'Create Services',
            description: `Create Services`,
            docs: 'https://headless.dataddo.com/#/service/serviceControllerCreate',
          },
          method: 'POST',
          paths: [
            {
              name: 'services',
              type: 'static',
            },
          ],
        },
      },
      sources: {
        get: {
          interface: 'GetSources',
          meta: {
            title: 'Get Sources',
            description: `Get Sources`,
            docs: 'https://headless.dataddo.com/#/source/sourceControllerList',
          },
          method: 'GET',
          paths: [
            {
              name: 'sources',
              type: 'static',
            },
          ],
        },
      },
      auth: {
        getToken: {
          interface: 'GetToken',
          meta: {
            title: 'Obtaining the tokensServices',
            description: `Obtaining the tokens`,
            docs: 'https://docs.dataddo.com/docs/dataddo-api-authorization',
          },
          method: 'POST',
          base: 'https://public-api.dataddo.com/api/v2',
          paths: [
            {
              name: 'auth',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Dataddo
