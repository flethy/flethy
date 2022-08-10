import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace ChartMogul {
  export type Entity = { tracking: any }
  export type Endpoint = { user: ApiDescriptionEndpoint }

  interface ChartMogulBase {
    'auth:Authorization': {
      username: string
    }
  }

  export interface TrackLeadAndFreeTrial extends ChartMogulBase, RequestParams {
    kind: 'chartmogul.tracking.user'
    'body:data_source_uuid': string
    'body:external_id': string
    'body:name': string
    'body:email': string
    'body:country': string
    'body:lead_created_at': string
    'body:free_trial_started_at': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'chartmogul',
      name: 'ChartMogul',
      url: 'https://chartmogul.com',
      docs: 'https://dev.chartmogul.com/docs',
      social: {
        twitter: 'chartmogul',
      },
      tags: ['web2'],
      category: 'business',
      type: 'subscription-analytics',
    },
    base: 'https://api.chartmogul.com/v1',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      tracking: {
        user: {
          interface: 'TrackLeadAndFreeTrial',
          meta: {
            title: 'Tracking leads and free trials',
            description: `Tracking leads and free trials`,
            docs: 'https://dev.chartmogul.com/docs/tracking-leads-and-free-trials-using-the-api',
          },
          method: 'POST',
          paths: [
            {
              name: 'customers',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default ChartMogul
