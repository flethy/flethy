import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Semrush {
  export type Entity = { backlinks: any }
  export type Endpoint = { overview: ApiDescriptionEndpoint }

  interface SemrushBase {
    'auth:key': string
  }

  export interface GetBacklinksOverview extends SemrushBase, RequestParams {
    kind: 'semrush.backlinks.overview'
    'query:type': 'backlinks_overview'
    'query:target': string
    'query:target_type': 'root_domain' | 'domain' | 'url'
    'query:export_columns': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'semrush',
      name: 'Semrush',
      url: 'https://www.semrush.com/',
      docs: 'https://developer.semrush.com/api/',
      signup: 'https://www.semrush.com/signup/',
      pricing: 'https://www.semrush.com/prices/',
      tags: ['web2'],
      category: 'marketing',
      type: 'seo',
      social: {
        twitter: 'semrush',
        instagram: 'semrush',
      },
    },
    base: 'https://api.semrush.com',
    auth: {
      key: {
        type: 'query',
      },
    },
    api: {
      backlinks: {
        overview: {
          interface: 'GetBacklinksOverview',
          meta: {
            title: 'Backlinks overview',
            description: `Backlinks overview`,
            docs: 'https://developer.semrush.com/api/v3/analytics/backlinks/#backlinks-overview',
          },
          method: 'GET',
          paths: [
            {
              name: 'analytics',
              type: 'static',
            },
            {
              name: 'v1',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Semrush
