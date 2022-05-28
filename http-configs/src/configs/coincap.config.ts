import { RequestParams } from '../types/Request.types'
import { ApiDescription } from '../types/ApiDescription.type'

export namespace CoinCap {
  export type Entity = { assets }
  export type Endpoint = { get; getOne }

  export interface getAssets extends RequestParams {
    kind: 'coincap.assets.get'
  }

  export interface getAsset extends RequestParams {
    kind: 'coincap.assets.getOne'
    'param:id': string
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
      },
    },
  }
}

export default CoinCap
