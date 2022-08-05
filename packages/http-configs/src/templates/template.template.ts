import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Template {
  export type Entity = { test: any }
  export type Endpoint = { test: ApiDescriptionEndpoint }

  export interface Test extends RequestParams {
    kind: 'test..'
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
      social: {},
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

export default Template
