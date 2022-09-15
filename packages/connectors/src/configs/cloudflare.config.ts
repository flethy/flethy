import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace CloudFlare {
  export type Entity = { zones: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  interface CloudFlareBase {
    'auth:Authorization': string
  }

  export interface ListZones extends CloudFlareBase, RequestParams {
    kind: 'cloudflare.zones.list'
    'query:match'?: 'any' | 'all'
    'query:name'?: string
    'query:account.name'?: string
    'query:order'?: 'status' | 'name' | 'account.id' | 'account.name'
    'query:page'?: number
    'query:per_page'?: number
    'query:status'?:
      | 'active'
      | 'pending'
      | 'initializing'
      | 'moved'
      | 'deleted'
      | 'deactivated'
      | 'readonly'
    'query:account.id'?: string
    'query:direction'?: 'asc' | 'desc'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'cloudflare',
      name: 'CloudFlare',
      url: 'https://cloudflare.com/',
      docs: 'https://api.cloudflare.com/',
      signup: 'https://dash.cloudflare.com/sign-up',
      pricing: 'https://www.cloudflare.com/plans',
      tags: ['web2'],
      category: 'infra',
      type: 'cdn',
      social: {
        twitter: 'cloudflare',
      },
    },
    base: 'https://api.cloudflare.com/client/v4',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      zones: {
        list: {
          interface: 'ListZones',
          meta: {
            title: 'List Zones',
            description: `List Zones`,
            docs: 'https://api.cloudflare.com/#zone-list-zones',
          },
          method: 'GET',
          paths: [
            {
              name: 'zones',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default CloudFlare
