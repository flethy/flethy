import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Unlayer {
  export type Entity = { templates: any; export: any }
  export type Endpoint =
    | { list: ApiDescriptionEndpoint }
    | { html: ApiDescriptionEndpoint }

  interface UnlayerBase {
    'auth:Authorization': {
      username: string
    }
  }

  export interface ListTemplates extends UnlayerBase, RequestParams {
    kind: 'unlayer.templates.list'
    'query:page'?: number
    'query:perPage'?: number
    'query:includeDesign'?: '0' | '1'
  }

  export interface ExportHtml extends UnlayerBase, RequestParams {
    kind: 'unlayer.export.html'
    'body:displayMode': 'web' | 'email'
    'body:design': any
    'body:mergeTags'?: any
    'body:customJS'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'unlayer',
      name: 'Unlayer',
      url: 'https://unlayer.com/',
      docs: 'https://docs.unlayer.com/reference/reference-getting-started',
      tags: ['web2'],
      category: 'marketing',
      type: 'email',
      social: {
        twitter: 'unlayerapp',
        github: 'unlayer',
      },
    },
    base: 'https://api.unlayer.com/v2',
    api: {
      templates: {
        list: {
          interface: 'ListTemplates',
          meta: {
            title: 'List Templates',
            description: `Get a list of templates`,
            docs: 'https://docs.unlayer.com/reference/testinput',
          },
          method: 'GET',
          paths: [
            {
              name: 'templates',
              type: 'static',
            },
          ],
        },
      },
      export: {
        html: {
          interface: 'ExportHtml',
          meta: {
            title: 'Export HTML',
            description: `Export HTML`,
            docs: 'https://docs.unlayer.com/reference/exporthtml',
          },
          method: 'POST',
          paths: [
            {
              name: 'export',
              type: 'static',
            },
            {
              name: 'html',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Unlayer
