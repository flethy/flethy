import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Npoint {
  export type Entity = { core: any }
  export type Endpoint = { get: ApiDescriptionEndpoint }

  export interface GetBin extends RequestParams {
    kind: 'npoint.core.get'
    'param:id': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'npoint',
      name: 'Npoint',
      url: 'https://www.npoint.io/',
      docs: 'https://www.npoint.io/',
      signup: 'https://www.npoint.io/',
      tags: ['web2'],
      category: 'utils',
      type: 'json',
      social: {
        twitter: 'alexzirbel',
      },
    },
    base: 'https://api.npoint.io',
    api: {
      core: {
        get: {
          interface: 'GetBin',
          meta: {
            title: 'Get JSON Bin',
            description: `Get JSON Bin`,
            docs: 'https://www.npoint.io',
          },
          method: 'GET',
          paths: [
            {
              name: 'id',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Npoint
