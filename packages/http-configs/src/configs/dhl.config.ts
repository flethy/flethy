import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Dhl {
  export type Entity = { tracking: any }
  export type Endpoint = { unified: ApiDescriptionEndpoint }

  export interface DhlBase {
    'auth:DHL-API-Key': string
  }

  export interface TrackingUnified extends DhlBase, RequestParams {
    kind: 'dhl.tracking.unified'
    'query:trackingNumber': string
    'query:service'?: string
    'query:originCountryCode'?: string
    'query:requesterCountryCode'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'dhl',
      name: 'Dhl',
      url: 'https://dhl.com/',
      docs: 'https://developer.dhl.com/',
      signup: 'https://developer.dhl.com/user/register',
      social: {
        github: 'dhl_global',
      },
      tags: ['web2'],
      category: 'utils',
      type: 'delivery-tracking',
    },
    base: 'https://api-eu.dhl.com',
    auth: {
      'DHL-API-Key': {
        type: 'header',
      },
    },
    api: {
      tracking: {
        unified: {
          interface: 'TrackingUnified',
          meta: {
            title: 'Shipment Tracking - Unified',
            description: `The Shipment Tracking API provides up-to-the-minute shipment status reports.`,
            docs: 'https://developer.dhl.com/api-reference/shipment-tracking#get-started-section/',
          },
          method: 'GET',
          paths: [
            {
              name: 'track',
              type: 'static',
            },
            {
              name: 'shipments',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Dhl
