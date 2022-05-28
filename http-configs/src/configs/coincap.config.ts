import { RequestParams } from '../types/Request.types'
import { ApiDescription } from '../types/ApiDescription.type'

export namespace CoinCap {
  export type Entity = { assets }
  export type Endpoint = { get; getOne; history; markets }

  export interface getAssets extends RequestParams {
    kind: 'coincap.assets.get'
  }

  export interface getAsset extends RequestParams {
    kind: 'coincap.assets.getOne'
    'param:id': string
  }

  export interface getAssetHistory extends RequestParams {
    kind: 'coincap.assets.history'
    'param:id': string
    'query:interval':
      | 'm1'
      | 'm5'
      | 'm15'
      | 'm30'
      | 'h1'
      | 'h2'
      | 'h6'
      | 'h12'
      | 'd1'
    'query:start'?: number
    'query:end'?: number
  }

  export interface getAssetMarkets extends RequestParams {
    kind: 'coincap.assets.markets'
    'param:id': string
    'query:limit'?: number
    'query:offset'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'coincap',
      name: 'CoinCap',
      url: 'https://coincap.io/',
      docs: 'https://docs.coincap.io/',
      tags: ['web3'],
      category: 'defi',
      type: 'prices',
    },
    base: 'https://api.coincap.io/v2',
    api: {
      assets: {
        get: {
          meta: {
            title: 'Get',
            description:
              'The asset price is a volume-weighted average calculated by collecting ticker data from exchanges. Each exchange contributes to this price in relation to their volume, meaning higher volume exchanges have more affect on this global price. All values are translated into USD (United States Dollar) and can be translated into other units of measurement through the /rates endpoint.',
            docs: 'https://docs.coincap.io/#89deffa0-ab03-4e0a-8d92-637a857d2c91',
          },
          method: 'GET',
          paths: [
            {
              name: 'assets',
              type: 'static',
            },
          ],
        },
        getOne: {
          meta: {
            title: 'Get Asset Details',
            description: 'Asset Details',
            docs: 'https://docs.coincap.io/#f8869879-171f-4240-adfd-dd2947506adc',
          },
          method: 'GET',
          paths: [
            {
              name: 'assets',
              type: 'static',
            },
            {
              name: 'id',
              type: 'param',
            },
          ],
        },
        history: {
          meta: {
            title: 'Get Asset History',
            description: 'Asset History',
            docs: 'https://docs.coincap.io/#61e708a8-8876-4fb2-a418-86f12f308978',
          },
          method: 'GET',
          paths: [
            {
              name: 'assets',
              type: 'static',
            },
            {
              name: 'id',
              type: 'param',
            },
            {
              name: 'history',
              type: 'static',
            },
          ],
        },
        markets: {
          meta: {
            title: 'Get Asset Markets',
            description: 'Asset Markets',
            docs: 'https://docs.coincap.io/#7f727b78-5013-41ec-aa1c-351b836458d0',
          },
          method: 'GET',
          paths: [
            {
              name: 'assets',
              type: 'static',
            },
            {
              name: 'id',
              type: 'param',
            },
            {
              name: 'markets',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default CoinCap
