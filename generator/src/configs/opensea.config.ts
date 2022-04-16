import { RequestParams } from '../controllers/HttpRequestConfig'
import { ApiDescription } from '../types/ApiDescription.type'

export type OpenseaEntity = { assets }
export type OpenseaEndpoint = { get }

export interface OpenseaGetAssets extends RequestParams {
  kind: 'opensea.assets.get'
  'query:owner': string
  'query:asset_contract_address': string
  'query:order_direction': 'asc' | 'desc'
  'query:offset': number
  'query:limit': number
  'auth:X-API-KEY'?: string
}

export const OPENSEA: ApiDescription<OpenseaEntity, OpenseaEndpoint> = {
  meta: {
    name: 'Opensea',
    url: 'https://opensea.io',
    docs: 'https://docs.opensea.io/',
  },
  base: 'https://api.opensea.io/api/v1',
  api: {
    assets: {
      get: {
        meta: {
          title: 'Retrieving assets',
          description:
            'To retrieve assets from our API, call the /assets endpoint with the desired filter parameters.',
          docs: 'https://docs.opensea.io/reference/getting-assets',
        },
        method: 'GET',
        auth: {
          'X-API-KEY': { type: 'header' },
        },
        paths: [
          {
            name: 'assets',
            type: 'static',
          },
        ],
      },
    },
  },
}
