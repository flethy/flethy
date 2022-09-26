import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace MJML {
  export type Entity = { core: any }
  export type Endpoint = { render: ApiDescriptionEndpoint }

  interface MJMLBase {
    'auth:Authorization': {
      username: string
      password: string
    }
  }

  export interface RenderMJMLToHMTL extends MJMLBase, RequestParams {
    kind: 'mjml.core.render'
    'body:mjml': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'mjml',
      name: 'MJML',
      url: 'https://mjml.io',
      docs: 'https://mjml.io/api/documentation/',
      signup: 'https://mjml.io/api',
      tags: ['web2'],
      category: 'utils',
      type: 'email',
      social: {
        twitter: 'mjmlio',
        github: 'mjmlio',
      },
    },
    base: 'https://api.mjml.io/v1',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      core: {
        render: {
          interface: 'RenderMJMLToHMTL',
          meta: {
            title: 'Render MJML to HTML',
            description: `Render MJML to HTML`,
            docs: 'https://mjml.io/api/documentation/',
          },
          method: 'POST',
          paths: [
            {
              name: 'render',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default MJML
