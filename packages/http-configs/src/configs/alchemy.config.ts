import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Alchemy {
  export type Entity = { nft: any }
  export type Endpoint = { getNFTs: ApiDescriptionEndpoint }

  export interface NftGetNFTs extends RequestParams {
    kind: 'alchemy.nft.getNFTs'
    'query:owner': string
    'query:pageKey'?: string
    'query:contractAddresses[]': string
    'query:withMetadata'?: boolean
    'auth:apikey': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'alchemy',
      name: 'Alchemy',
      url: 'https://alchemy.com',
      docs: 'https://docs.alchemy.com/',
      signup: 'https://auth.alchemyapi.io/signup',
      pricing: 'https://www.alchemy.com/pricing',
      social: {
        twitter: 'AlchemyPlatform',
      },
      tags: ['web3', 'nft'],
      category: 'aggregation',
      type: 'indexer',
    },
    base: 'https://eth-mainnet.alchemyapi.io/v2',
    api: {
      nft: {
        getNFTs: {
          interface: 'NftGetNFTs',
          meta: {
            title: 'getNFTs',
            description: 'Gets all NFTs currently owned by a given address.',
            docs: 'https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/getnfts',
          },
          method: 'GET',
          paths: [
            {
              name: 'apikey',
              type: 'auth',
            },
            {
              name: 'getNFTs',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Alchemy
