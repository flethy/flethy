import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Twitter {
  export type Entity = { auth: any }
  export type Endpoint = { bearer: ApiDescriptionEndpoint }

  export interface AuthBearer extends RequestParams {
    kind: 'twitter.auth.bearer'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: '',
      name: '',
      url: '',
      docs: '',
      tags: ['web3'],
      category: 'aggregation',
      type: 'indexer',
    },
    base: '',
    api: {
      test: {
        test: {
          interface: '',
          meta: {
            title: '',
            description: ``,
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

export default Twitter
