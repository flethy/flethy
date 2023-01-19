import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace UiPath {
  export type Entity = { test: any }
  export type Endpoint = { test: ApiDescriptionEndpoint }

  export interface Test extends RequestParams {
    kind: 'uipath..'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'uipath',
      name: 'UiPath',
      url: 'https://www.uipath.com/',
      docs: 'https://docs.uipath.com/',
      signup: 'https://cloud.uipath.com/portal_/register',
      pricing: 'https://www.uipath.com/pricing',
      tags: ['web2'],
      category: 'automation',
      type: 'other',
      social: {
        twitter: 'UiPath',
        instagram: 'uipathglobal',
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

export default UiPath
