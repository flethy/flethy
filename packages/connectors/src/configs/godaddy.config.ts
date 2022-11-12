import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace GoDaddy {
  export type Entity = { domains: any }
  export type Endpoint = { available: ApiDescriptionEndpoint }

  type BaseId = 'default' | 'ote'

  interface GoDaddyBase {
    'auth:Authorization': {
      key: string
      secret: string
    }
  }

  export interface GetAvailableDomains extends GoDaddyBase, RequestParams {
    kind: 'godaddy.domains.available'
    baseId?: BaseId
    'query:domain': string
    'query:checkType'?: 'FAST' | 'FULL'
    'query:forTransfer'?: boolean
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'godaddy',
      name: 'GoDaddy',
      url: 'https://www.godaddy.com',
      docs: 'https://developer.godaddy.com/',
      signup: 'https://sso.godaddy.com/account/create',
      tags: ['web2'],
      category: 'infra',
      type: 'domains',
      social: {
        twitter: 'godaddy',
        instagram: 'godaddy',
      },
    },
    base: [
      {
        id: 'dafault',
        url: 'https://api.godaddy.com/v1',
      },
      {
        id: 'ote',
        url: 'https://api.ote-godaddy.com/v1',
      },
    ],
    auth: {
      Authorization: {
        type: 'header:custom',
        custom: {
          concat: {
            keys: ['key', 'secret'],
            separator: ':',
          },
          prefix: 'sso-key ',
        },
      },
    },
    api: {
      domains: {
        available: {
          interface: 'GetAvailableDomains',
          meta: {
            title: 'Available Domains',
            description: `Available Domains`,
            docs: 'https://developer.godaddy.com/doc/endpoint/domains#/v1/available',
          },
          method: 'GET',
          paths: [
            {
              name: 'domains',
              type: 'static',
            },
            {
              name: 'available',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default GoDaddy
