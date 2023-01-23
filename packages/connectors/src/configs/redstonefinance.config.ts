import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace RedStoneFinance {
  export type Entity = { prices: any }
  export type Endpoint = {
    getForSingleToken: ApiDescriptionEndpoint
    getForSeveralTokens: ApiDescriptionEndpoint
  }

  export interface GetPriceForSingleToken extends RequestParams {
    kind: 'redstonefinance.prices.getForSingleToken'
    'query:symbol': string
    'query:provider': 'redstone'
    'query:limit'?: number
    'query:fromTimestamp'?: string
    'query:toTimestamp'?: string
    'query:interval'?: number
  }

  export interface GetPriceForSeveralToken extends RequestParams {
    kind: 'redstonefinance.prices.getForSeveralTokens'
    'query:symbols': string
    'query:provider': 'redstone'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'redstonefinance',
      name: 'RedStoneFinance',
      url: 'https://redstone.finance/',
      docs: 'https://docs.redstone.finance/',
      signup: 'https://redstone.finance/',
      pricing: 'https://redstone.finance/',
      tags: ['web3'],
      category: 'defi',
      type: 'prices',
      social: {
        twitter: 'redstone_defi',
        github: 'redstone-finance',
      },
    },
    base: 'https://api.redstone.finance',
    api: {
      prices: {
        getForSingleToken: {
          interface: 'GetPriceForSingleToken',
          meta: {
            title: 'Get the latest price(s) for a single token',
            description: 'Get the latest price(s) for a single token',
            docs: 'https://api.docs.redstone.finance/http-api/prices/get-price-for-a-single-token',
          },
          method: 'GET',
          paths: [
            {
              name: 'prices',
              type: 'static',
            },
          ],
        },
        getForSeveralTokens: {
          interface: 'GetPriceForSeveralToken',
          meta: {
            title: 'Get the latest price for several tokens',
            description: 'Get the latest price for several tokens',
            docs: 'https://api.docs.redstone.finance/http-api/prices/get-price-for-several-tokens',
          },
          method: 'GET',
          paths: [
            {
              name: 'prices',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default RedStoneFinance
