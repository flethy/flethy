import { RequestParams } from '../controllers/HttpRequestConfig'
import { ApiDescription } from '../types/ApiDescription.type'

export type AlchemyEntity = { nft }
export type AlchemyEndpoint = { getNFTs }

export interface AlchemyNftGetNFTs extends RequestParams {
  kind: 'alchemy.nft.getNFTs'
  'query:owner': string
  'query:pageKey'?: string
  'query:contractAddresses[]': string
  'query:withMetadata'?: boolean
  'auth:apikey': string
}

export const ALCHEMY: ApiDescription<AlchemyEntity, AlchemyEndpoint> = {
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
