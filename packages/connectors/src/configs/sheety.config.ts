import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Sheety {
  export type Entity = { core: any }
  export type Endpoint = {
    get: ApiDescriptionEndpoint
    post: ApiDescriptionEndpoint
    put: ApiDescriptionEndpoint
    delete: ApiDescriptionEndpoint
  }

  interface SheetyBase {
    'auth:Authorization'?: string
    'param:username': string
    'param:project': string
    'param:sheet': string
  }

  export interface Get extends SheetyBase, RequestParams {
    kind: 'sheety.core.get'
  }

  export interface Post extends SheetyBase, RequestParams {
    kind: 'sheety.core.post'
    'body:body': any
  }

  export interface Put extends SheetyBase, RequestParams {
    kind: 'sheety.core.put'
    'param:row': number
    'body:body': any
  }

  export interface Delete extends SheetyBase, RequestParams {
    kind: 'sheety.core.delete'
    'param:row': number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'sheety',
      name: 'Sheety',
      url: 'https://sheety.co',
      docs: 'https://sheety.co/docs/requests',
      signup: 'https://sheety.co',
      pricing: 'https://sheety.co/pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'spreadsheet',
      social: {
        twitter: 'getsheety',
      },
    },
    base: 'https://api.sheety.co',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      core: {
        get: {
          interface: 'Get',
          meta: {
            title: 'Get',
            description: `Get`,
            docs: 'https://sheety.co/docs/requests',
          },
          method: 'GET',
          paths: [
            {
              name: 'username',
              type: 'param',
            },
            {
              name: 'project',
              type: 'param',
            },
            {
              name: 'sheet',
              type: 'param',
            },
          ],
        },
        post: {
          interface: 'Post',
          meta: {
            title: 'Post',
            description: `Post`,
            docs: 'https://sheety.co/docs/requests',
          },
          method: 'POST',
          paths: [
            {
              name: 'username',
              type: 'param',
            },
            {
              name: 'project',
              type: 'param',
            },
            {
              name: 'sheet',
              type: 'param',
            },
          ],
        },
        put: {
          interface: 'Put',
          meta: {
            title: 'Put',
            description: `Put`,
            docs: 'https://sheety.co/docs/requests',
          },
          method: 'PUT',
          paths: [
            {
              name: 'username',
              type: 'param',
            },
            {
              name: 'project',
              type: 'param',
            },
            {
              name: 'sheet',
              type: 'param',
            },
            {
              name: 'row',
              type: 'param',
            },
          ],
        },
        delete: {
          interface: 'Delete',
          meta: {
            title: 'Delete',
            description: `Delete`,
            docs: 'https://sheety.co/docs/requests',
          },
          method: 'DELETE',
          paths: [
            {
              name: 'username',
              type: 'param',
            },
            {
              name: 'project',
              type: 'param',
            },
            {
              name: 'sheet',
              type: 'param',
            },
            {
              name: 'row',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Sheety
