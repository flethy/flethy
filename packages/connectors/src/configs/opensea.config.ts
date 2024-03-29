import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace OpenSea {
  export type Entity = { assets: any; collections: any }
  export type Endpoint = { get: ApiDescriptionEndpoint }

  export interface OpenseaParams extends RequestParams {
    'query:offset': number
    'query:limit': number
  }

  export interface GetAssets extends OpenseaParams {
    kind: 'opensea.assets.get'
    'query:owner': string
    'query:asset_contract_address': string
    'query:order_direction': 'asc' | 'desc'
    'auth:X-API-KEY'?: string
  }

  export interface GetCollections extends OpenseaParams {
    kind: 'opensea.collections.get'
    'query:asset_owner': string
    'auth:X-API-KEY'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'opensea',
      name: 'OpenSea',
      url: 'https://opensea.io',
      docs: 'https://docs.opensea.io/',
      signup: 'https://opensea.io/account',
      social: {
        twitter: 'opensea',
        instagram: 'opensea',
      },
      tags: ['web3', 'nft'],
      category: 'aggregation',
      type: 'indexer',
    },
    base: 'https://api.opensea.io/api/v1',
    api: {
      assets: {
        get: {
          interface: 'GetAssets',
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
      collections: {
        get: {
          interface: 'GetCollections',
          meta: {
            title: 'Retrieving collections',
            description: 'Use this endpoint to fetch collections on OpenSea.',
            docs: 'https://docs.opensea.io/reference/retrieving-collections',
          },
          method: 'GET',
          auth: {
            'X-API-KEY': { type: 'header' },
          },
          paths: [
            {
              name: 'collections',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default OpenSea
