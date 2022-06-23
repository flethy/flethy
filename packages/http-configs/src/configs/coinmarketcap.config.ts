import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace CoinMarketCap {
  export type Entity = { cryptocurrency: any }
  export type Endpoint = {
    listingsHistorical: ApiDescriptionEndpoint
    listingsLatest: ApiDescriptionEndpoint
  }

  interface CryptocurrencyBase {
    'auth:X-CMC_PRO_API_KEY': string
    'query:start'?: number
    'query:limit'?: number
    'query:convert'?: string
    'query:convert_id'?: string
    'query:sort'?:
      | 'cmc_rank'
      | 'name'
      | 'symbol'
      | 'market_cap'
      | 'price'
      | 'circulating_supply'
      | 'total_supply'
      | 'max_supply'
      | 'num_market_pairs'
      | 'volume_24h'
      | 'percent_change_1h'
      | 'percent_change_24h'
      | 'percent_change_7d'
      | string
    'query:sort_dir'?: 'asc' | 'desc'
    'query:cryptocurrency_type'?: 'coins' | 'tokens' | 'all'
    'query:aux'?: string
  }

  export interface CryptocurrencyListingsHistorical
    extends RequestParams,
      CryptocurrencyBase {
    kind: 'coinmarketcap.cryptocurrency.listingsHistorical'
    'query:date': string
  }

  export interface CryptocurrencyListingsLatest
    extends RequestParams,
      CryptocurrencyBase {
    kind: 'coinmarketcap.cryptocurrency.listingsLatest'
    'query:price_min'?: number
    'query:price_max'?: number
    'query:market_cap_min'?: number
    'query:market_cap_max'?: number
    'query:volume_24h_min'?: number
    'query:volume_24h_max'?: number
    'query:circulating_supply_min'?: number
    'query:circulating_supply_max'?: number
    'query:percent_change_24h_min'?: number
    'query:percent_change_24h_max'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'coinmarketcap',
      name: 'CoinMarketCap',
      url: 'https://coinmarketcap.com',
      docs: 'https://coinmarketcap.com/api/documentation/v1/',
      tags: ['web3'],
      category: 'aggregation',
      type: 'prices',
    },
    base: 'https://pro-api.coinmarketcap.com/v1',
    auth: {
      'X-CMC_PRO_API_KEY': {
        type: 'header',
      },
    },
    api: {
      cryptocurrency: {
        listingsHistorical: {
          interface: 'CryptocurrencyListingsHistorical',
          meta: {
            title: 'Listings Historical',
            description:
              'Returns a ranked and sorted list of all cryptocurrencies for a historical UTC date.',
            docs: 'https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsHistorical',
          },
          method: 'GET',
          paths: [
            {
              name: 'cryptocurrency',
              type: 'static',
            },
            {
              name: 'listings',
              type: 'static',
            },
            {
              name: 'historical',
              type: 'static',
            },
          ],
        },
        listingsLatest: {
          interface: 'CryptocurrencyListingsLatest',
          meta: {
            title: 'Listings Latest',
            description: `Returns a paginated list of all active cryptocurrencies with latest market data. The default "market_cap" sort returns cryptocurrency in order of CoinMarketCap's market cap rank (as outlined in our methodology) but you may configure this call to order by another market ranking field. Use the "convert" option to return market values in multiple fiat and cryptocurrency conversions in the same call.`,
            docs: 'https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest',
          },
          method: 'GET',
          paths: [
            {
              name: 'cryptocurrency',
              type: 'static',
            },
            {
              name: 'listings',
              type: 'static',
            },
            {
              name: 'latest',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default CoinMarketCap
