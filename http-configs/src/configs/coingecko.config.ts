import { RequestParams } from '../types/Request.types'
import { ApiDescription } from '../types/ApiDescription.type'

export namespace CoinGecko {
  export type Entity = { coins }
  export type Endpoint = { list }

  export interface ListCoins extends RequestParams {
    kind: 'coingecko.coins.list'
    'query:include_platform'?: boolean
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
      },
    },
  }
}

export default CoinGecko
