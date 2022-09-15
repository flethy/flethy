import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Coinlayer {
  export type Entity = { all: any }
  export type Endpoint = {
    live: ApiDescriptionEndpoint
    list: ApiDescriptionEndpoint
    historical: ApiDescriptionEndpoint
  }

  interface CoinlayerBase {
    'auth:access_key': string
  }

  export interface GetLive extends RequestParams, CoinlayerBase {
    kind: 'coinlayer.all.live'
    'query:target'?: string
    'query:symbols'?: string
  }

  export interface GetHistorical extends RequestParams, CoinlayerBase {
    kind: 'coinlayer.all.historical'
    'param:yyyy-mm-dd': string
    'query:target'?: string
    'query:symbols'?: string
  }

  export interface GetList extends RequestParams, CoinlayerBase {
    kind: 'coinlayer.all.list'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'coinlayer',
      name: 'Coinlayer',
      url: 'https://coinlayer.com',
      docs: 'https://coinlayer.com/',
      signup: 'https://coinlayer.com/signup',
      pricing: 'https://coinlayer.com/product',
      social: {
        twitter: 'apilayer',
        github: 'coinlayer-api',
      },
      tags: ['web3'],
      category: 'aggregation',
      type: 'indexer',
    },
    base: 'http://api.coinlayer.com/api',
    auth: {
      access_key: {
        type: 'query',
      },
    },
    api: {
      all: {
        live: {
          interface: 'GetLive',
          meta: {
            title: 'live',
            description: 'request the most recent cryptocurrency rates',
            docs: 'https://coinlayer.com',
          },
          method: 'GET',
          paths: [
            {
              name: 'live',
              type: 'static',
            },
          ],
        },
        list: {
          interface: 'GetList',
          meta: {
            title: 'list',
            description:
              'request a JSON list containing all supported crypto and fiat currencies',
            docs: 'https://coinlayer.com',
          },
          method: 'GET',
          paths: [
            {
              name: 'list',
              type: 'static',
            },
          ],
        },
        historical: {
          interface: 'GetHistorical',
          meta: {
            title: 'historical',
            description: 'request historical rates for a specific day',
            docs: 'https://coinlayer.com',
          },
          method: 'GET',
          paths: [
            {
              name: 'yyyy-mm-dd',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Coinlayer
