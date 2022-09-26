import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace HeapAnalytics {
  export type Entity = { serverside: any }
  export type Endpoint = { track: ApiDescriptionEndpoint }

  export interface ServerSideTrack extends RequestParams {
    kind: 'heapanalytics.serverside.track'
    'body:app_id': string
    'body:identity': string
    'body:event': string
    'body:properties'?: {
      [key: string]: string | number | boolean
    }
    'body:timestamp'?: string
    'body:idempotency_key'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'heapanalytics',
      name: 'HeapAnalytics',
      url: 'https://heap.io',
      docs: 'https://developers.heap.io/reference/server-side-apis-overview',
      signup: 'https://heap.io/free-trial',
      pricing: 'https://heap.io/pricing',
      tags: ['web2'],
      category: 'analytics',
      type: 'webinsights',
      social: {
        twitter: 'heap',
      },
    },
    base: 'https://heapanalytics.com/api',
    api: {
      serverside: {
        track: {
          interface: 'ServerSideTrack',
          meta: {
            title: 'Track',
            description: `Use this API to send custom events to Heap server-side. We recommend using this for events that need to exactly match your backend, such as completed order transaction info, or events that are not available for Heap to capture on the client-side.`,
            docs: 'https://developers.heap.io/reference/track-1',
          },
          method: 'POST',
          paths: [
            {
              name: 'track',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default HeapAnalytics
