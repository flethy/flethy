import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace MetalpriceAPI {
  export type Entity = { core: any }
  export type Endpoint = {
    symbols: ApiDescriptionEndpoint
    liverates: ApiDescriptionEndpoint
    historicalrates: ApiDescriptionEndpoint
  }

  interface MetalpriceAPIBase {
    'auth:api_key': string
  }

  export interface SupportedSymbols extends MetalpriceAPIBase, RequestParams {
    kind: 'metalpriceapi.core.symbols'
  }

  export interface LiveRates extends MetalpriceAPIBase, RequestParams {
    kind: 'metalpriceapi.core.liverates'
    'query:base'?: string
    'query:currencies'?: string
    'query:unit'?: 'troy_oz' | 'gram' | 'kilogram'
  }

  export interface HistoricalRates extends MetalpriceAPIBase, RequestParams {
    kind: 'metalpriceapi.core.historicalrates'
    'param:date': string
    'query:base'?: string
    'query:currencies'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'metalpriceapi',
      name: 'MetalpriceAPI',
      url: 'https://metalpriceapi.com/',
      docs: 'https://metalpriceapi.com/documentation',
      signup: 'https://metalpriceapi.com/register',
      pricing: 'https://metalpriceapi.com/pricing',
      tags: ['web2'],
      category: 'finance',
      type: 'metal-prices',
      social: {},
    },
    base: 'https://api.metalpriceapi.com/v1',
    auth: {
      api_key: {
        type: 'query',
      },
    },
    api: {
      core: {
        symbols: {
          interface: 'SupportedSymbols',
          meta: {
            title: 'Supported Symbols',
            description: `This endpoint is used to get the list of the most up-to-date supported symbols.`,
            docs: 'https://metalpriceapi.com/documentation#api_symbol',
          },
          method: 'GET',
          paths: [
            {
              name: 'symbols',
              type: 'static',
            },
          ],
        },
        liverates: {
          interface: 'LiveRates',
          meta: {
            title: 'Live Rates',
            description: `This endpoint will return real-time exchange rate data (delayed) depending on your subscription plan.`,
            docs: 'https://metalpriceapi.com/documentation#api_realtime',
          },
          method: 'GET',
          paths: [
            {
              name: 'latest',
              type: 'static',
            },
          ],
        },
        historicalrates: {
          interface: 'HistoricalRates',
          meta: {
            title: 'Historical Rates',
            description: `This endpoint will return historical exchange rate data. Use format YYYY-MM-DD for the base url.`,
            docs: 'https://metalpriceapi.com/documentation#api_historical',
          },
          method: 'GET',
          paths: [
            {
              name: 'date',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default MetalpriceAPI
