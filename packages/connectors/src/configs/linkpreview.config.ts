import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace LinkPreview {
  export type Entity = { core: any }
  export type Endpoint = { linkpreview: ApiDescriptionEndpoint }

  interface LinkPreviewBase {
    'auth:key': string
  }

  export interface LinkPreview extends LinkPreviewBase, RequestParams {
    kind: 'linkpreview.core.linkpreview'
    'body:q': string
    'body:fields'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'linkpreview',
      name: 'LinkPreview',
      url: 'https://www.linkpreview.net/',
      docs: 'https://docs.linkpreview.net/',
      signup: 'https://my.linkpreview.net/auth/new',
      pricing: 'https://www.linkpreview.net/#pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
      social: {
        github: 'interactive32',
      },
    },
    base: 'http://api.linkpreview.net',
    auth: {
      key: {
        type: 'body',
      },
    },
    api: {
      core: {
        linkpreview: {
          interface: 'LinkPreview',
          meta: {
            title: 'LinkPreview',
            description: `LinkPreview`,
            docs: 'https://docs.linkpreview.net/',
          },
          method: 'POST',
        },
      },
    },
  }
}

export default LinkPreview
