import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Dealroom {
  export type Entity = { test: any }
  export type Endpoint = { test: ApiDescriptionEndpoint }

  export interface Test extends RequestParams {
    kind: 'dealroom..'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'dealroom',
      name: 'Dealroom',
      url: 'https://dealroom.co',
      docs: '',
      signup: 'https://app.dealroom.co/dashboard',
      pricing: 'https://dealroom.co/pricing',
      tags: ['web2'],
      category: 'data',
      type: 'brands',
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

export default Dealroom
