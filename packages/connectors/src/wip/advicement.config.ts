import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Advicement {
  export type Entity = { test: any }
  export type Endpoint = { test: ApiDescriptionEndpoint }

  export interface Test extends RequestParams {
    kind: 'advicement..'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'advicement',
      name: 'Advicement',
      url: 'https://advicement.io/',
      docs: 'https://advicement.io/dynamic-documents-api/documentation/getting-started',
      signup: 'https://advicement.io/sign-up',
      pricing: 'https://advicement.io/dynamic-documents-api/pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'pdf-generation',
      social: {
        twitter: 'Advicement_SA',
      },
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

export default Advicement
