import { ApiDescription } from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace CoinGecko {
  export type Entity = { coins; simple }
  export type Endpoint =
    | { list; markets; id; idTickers }
    | { supportedVsCurrencies; price; tokenPrice }

  export interface ListCoins extends RequestParams {
    kind: 'coingecko.coins.list'
    'query:include_platform'?: boolean
  }

  export interface CoinById extends RequestParams {
    kind: 'coingecko.coins.id'
    'param:id': string
    'query:localization'?: boolean
    'query:tickers'?: boolean
    'query:market_data'?: boolean
    'query:community_data'?: boolean
    'query:developer_data'?: boolean
    'query:sparkline'?: boolean
  }

  export interface CoinTickersById extends RequestParams {
    kind: 'coingecko.coins.idTickers'
    'param:id': string
    'query:exchange_ids'?: string
    'query:include_exchange_logo'?: boolean
    'query:page'?: number
    'query:order'?: 'trust_score_desc' | 'trust_score_asc' | 'volume_desc'
    'query:depth'?: boolean
  }

  export interface CoinsMarkets extends RequestParams {
    kind: 'coingecko.coins.markets'
    'query:vs_currency': string
    'query:ids'?: string
    'query:category'?: string
    'query:order'?:
      | 'market_cap_desc'
      | 'gecko_desc'
      | 'gecko_asc'
      | 'market_cap_asc'
      | 'market_cap_desc'
      | 'volume_asc'
      | 'volume_desc'
      | 'id_asc'
      | 'id_desc'
    'query:per_page'?: number
    'query:page'?: number
    'query:sparkline'?: boolean
    'query:price_change_percentage'?: string
  }

  export interface GetSimpleSupportedVsCurrencies extends RequestParams {
    kind: 'coingecko.simple.supportedVsCurrencies'
  }

  export interface GetSimplePrice extends RequestParams {
    kind: 'coingecko.simple.price'
    'query:ids': string
    'query:vs_currencies': string
    'query:include_market_cap'?: boolean
    'query:include_24hr_vol'?: boolean
    'query:include_24hr_change'?: boolean
    'query:include_last_updated_at'?: boolean
  }

  export interface GetSimpleTokenPrice extends RequestParams {
    kind: 'coingecko.simple.tokenPrice'
    'param:id': string
    'query:contract_addresses': string
    'query:vs_currencies': string
    'query:include_market_cap'?: boolean
    'query:include_24hr_vol'?: boolean
    'query:include_24hr_change'?: boolean
    'query:include_last_updated_at'?: boolean
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'coingecko',
      name: 'CoinGecko',
      url: 'https://coingecko.com',
      docs: 'https://www.coingecko.com/en/api/documentation',
      tags: ['web3'],
      category: 'defi',
      type: 'prices',
    },
    base: 'https://api.coingecko.com/api/v3',
    api: {
      coins: {
        list: {
          meta: {
            title: 'List Coins',
            description: `Use this to obtain all the coins' id in order to make API calls`,
            docs: 'https://www.coingecko.com/en/api/documentation',
          },
          method: 'GET',
          paths: [
            {
              name: 'coins',
              type: 'static',
            },
            {
              name: 'list',
              type: 'static',
            },
          ],
        },
        markets: {
          meta: {
            title: 'Coins Markets',
            description: `Coins Markets`,
            docs: 'https://www.coingecko.com/en/api/documentation',
          },
          method: 'GET',
          paths: [
            {
              name: 'coins',
              type: 'static',
            },
            {
              name: 'markets',
              type: 'static',
            },
          ],
        },
        id: {
          meta: {
            title: 'Coin By Id',
            description: `Coin By Id`,
            docs: 'https://www.coingecko.com/en/api/documentation',
          },
          method: 'GET',
          paths: [
            {
              name: 'coins',
              type: 'static',
            },
            {
              name: 'id',
              type: 'param',
            },
          ],
        },
        idTickers: {
          meta: {
            title: 'Coin Tickers By Id',
            description: `Coin Tickers By Id`,
            docs: 'https://www.coingecko.com/en/api/documentation',
          },
          method: 'GET',
          paths: [
            {
              name: 'coins',
              type: 'static',
            },
            {
              name: 'id',
              type: 'param',
            },
            {
              name: 'tickers',
              type: 'static',
            },
          ],
        },
      },
      simple: {
        supportedVsCurrencies: {
          meta: {
            title: 'Get supported vs currencies',
            description: `Get supported vs currencies`,
            docs: 'https://www.coingecko.com/en/api/documentation',
          },
          method: 'GET',
          paths: [
            {
              name: 'simple',
              type: 'static',
            },
            {
              name: 'supported_vs_currencies',
              type: 'static',
            },
          ],
        },
        price: {
          meta: {
            title: 'Get Simple Price',
            description: `Get simple price`,
            docs: 'https://www.coingecko.com/en/api/documentation',
          },
          method: 'GET',
          paths: [
            {
              name: 'simple',
              type: 'static',
            },
            {
              name: 'price',
              type: 'static',
            },
          ],
        },
        tokenPrice: {
          meta: {
            title: 'Get Simple Token Price',
            description: `Get simple token price`,
            docs: 'https://www.coingecko.com/en/api/documentation',
          },
          method: 'GET',
          paths: [
            {
              name: 'simple',
              type: 'static',
            },
            {
              name: 'token_price',
              type: 'static',
            },
            {
              name: 'id',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default CoinGecko
