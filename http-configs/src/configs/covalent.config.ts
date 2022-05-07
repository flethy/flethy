import { RequestParams } from '../types/Request.types'
import { ApiDescription } from '../types/ApiDescription.type'

export namespace Covalent {
  export type Entity = { classA; classB; pricing }
  export type Endpoint =
    | { getTransactionsForAddress }
    | { getUniswapV3Pools }
    | { getHistoricalTokenPrices }

  interface CovalentBaseConfig {
    'query:page-number'?: number
    'query:page-size'?: number
  }

  export interface ClassAGetTransactionsForAddress
    extends RequestParams,
      CovalentBaseConfig {
    kind: 'covalent.classA.getTransactionsForAddress'
    'param:address': string
    'param:chainid': number
    'auth:key': string
    'query:block-signed-at-asc'?: boolean
    'query:no-logs'?: boolean
  }

  export interface ClassBGetUniswapV3Pools
    extends RequestParams,
      CovalentBaseConfig {
    kind: 'covalent.classB.getUniswapV3Pools'
    'param:chainid': number
    'auth:key': string
  }

  export interface PricingGetHistoricalTokenPrices
    extends RequestParams,
      CovalentBaseConfig {
    kind: 'covalent.pricing.getHistoricalTokenPrices'
    'auth:key': string
    'param:chainid': number
    'param:quote_currency': 'USD' | 'EUR' | string
    'query:contract_addresses': string
    'query:from'?: string // YYYY-MM-DD
    'query:to'?: string // YYYY-MM-DD
    'query:prices-at-asc'?: boolean
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'covalent',
      name: 'Covalent',
      url: 'https://www.covalenthq.com',
      docs: 'https://www.covalenthq.com/docs',
      tags: ['web3'],
      category: 'aggregation',
      type: 'indexer',
    },
    base: 'https://api.covalenthq.com/v1',
    auth: {
      key: {
        type: 'query',
      },
    },
    api: {
      classA: {
        getTransactionsForAddress: {
          meta: {
            title: 'Get transactions for address',
            description:
              'Given chain_id and wallet address, return all transactions along with their decoded log events.',
            docs: 'https://www.covalenthq.com/docs/api/#/0/Get%20transactions%20for%20address/USD/1',
          },
          method: 'GET',
          options: {
            pathTailingSlash: true,
          },
          paths: [
            {
              name: 'chainid',
              type: 'param',
            },
            {
              name: 'address',
              type: 'static',
            },
            {
              name: 'address',
              type: 'param',
            },
            {
              name: 'transactions_v2',
              type: 'static',
            },
          ],
        },
      },
      classB: {
        getUniswapV3Pools: {
          meta: {
            title: 'Get Uniswap v3 pools',
            description:
              'Given a chain_id , return a paginated list of Uniswap pools sorted by transaction timestamp in desc order.',
            docs: 'https://www.covalenthq.com/docs/api/#/0/Get%20Uniswap%20v3%20pools/USD/1',
          },
          method: 'GET',
          options: {
            pathTailingSlash: true,
          },
          paths: [
            {
              name: 'chainid',
              type: 'param',
            },
            {
              name: 'uniswap_v3',
              type: 'static',
            },
            {
              name: 'pools',
              type: 'static',
            },
          ],
        },
      },
      pricing: {
        getHistoricalTokenPrices: {
          meta: {
            title: 'Get historical token prices',
            description:
              'Given chain_id and contract_addresses, return their historical prices. Can filter by date ranges and convert to quote_currency. Only daily granularity is supported.',
            docs: 'https://www.covalenthq.com/docs/api/#/0/Get%20historical%20token%20prices/USD/1',
          },
          method: 'GET',
          options: {
            pathTailingSlash: true,
          },
          paths: [
            {
              name: 'pricing',
              type: 'static',
            },
            {
              name: 'historical_by_addresses_v2',
              type: 'static',
            },
            {
              name: 'chainid',
              type: 'param',
            },
            {
              name: 'quote_currency',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Covalent
