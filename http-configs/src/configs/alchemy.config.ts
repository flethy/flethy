import { RequestParams } from '../types/Request.types'
import { ApiDescription } from '../types/ApiDescription.type'

export namespace Alchemy {
  export type Entity = { nft }
  export type Endpoint = { getNFTs }

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
      name: 'Alchemy',
      url: 'https://alchemy.com',
      docs: 'https://docs.alchemy.com/',
    },
    base: 'https://eth-mainnet.alchemyapi.io/v2',
    api: {
      nft: {
        getNFTs: {
          meta: {
            title: 'getNFTs',
            description: 'Gets all NFTs currently owned by a given address.',
            docs: 'https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/getnfts',
            tags: ['web3', 'nft'],
            category: 'aggregation',
            type: 'indexer',
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
