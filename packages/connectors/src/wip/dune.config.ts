import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Dune {
  export type Entity = { test: any }
  export type Endpoint = { test: ApiDescriptionEndpoint }

  export interface Test extends RequestParams {
    kind: 'dune..'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'dune',
      name: 'Dune',
      url: 'https://dune.com',
      docs: 'https://dune.com/docs/api/',
      signup: 'https://dune.com/auth/register',
      pricing: 'https://dune.com/pricing',
      tags: ['web3'],
      category: 'analytics',
      type: 'other',
      social: {
        twitter: 'DuneAnalytics',
      },
    },
    base: '',
    api: {
      test: {
        test: {
          interface: '',
          meta: {
            title: '',
            description: '',
            docs: '',
          },
          method: 'GET',
          paths: [
            {
              name: '',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Dune
