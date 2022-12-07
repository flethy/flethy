import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace DotCMS {
  export type Entity = { test: any }
  export type Endpoint = { test: ApiDescriptionEndpoint }

  export interface Test extends RequestParams {
    kind: 'dotcms..'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'dotcms',
      name: 'DotCMS',
      url: 'https://www.dotcms.com/',
      docs: 'https://www.dotcms.com/docs',
      signup: 'https://www.dotcms.com/getting-started/',
      pricing: 'https://www.dotcms.com/pricing/',
      tags: ['web2'],
      category: 'marketing',
      type: 'content',
      social: {
        twitter: 'dotcms',
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

export default DotCMS
