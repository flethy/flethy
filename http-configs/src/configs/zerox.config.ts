import { RequestParams } from '../types/Request.types'
import { ApiDescription } from '../types/ApiDescription.type'

export namespace ZeroX {
  export type Entity = { swap }
  export type Endpoint = { quote; price; sources }

  type ZeroXBaseId =
    | 'mainnet'
    | 'ropsten'
    | 'polygon'
    | 'bsc'
    | 'optimism'
    | 'fantom'
    | 'celo'
    | 'avalanche'

  interface SwapQuotePricebase {
    'query:sellToken': string
    'query:buyToken': string
    'query:sellAmount'?: number
    'query:buyAmount'?: number
    'query:slippagePercentage'?: number
    'query:gasPrice'?: number
    'query:takerAddress'?: string
    'query:excludedSources'?: string
    'query:includedSources'?: string
    'query:skipValidation'?: boolean
    'query:intentOnFilling'?: boolean
    'query:feeRecipient'?: string
    'query:buyTokenPercentageFee'?: number
    'query:affiliateAddress'?: string
  }

  export interface SwapQuote extends RequestParams, SwapQuotePricebase {
    kind: '0x.swap.quote'
    baseId: ZeroXBaseId
  }

  export interface SwapPrice extends RequestParams, SwapQuotePricebase {
    kind: '0x.swap.price'
    baseId: ZeroXBaseId
  }

  export interface SwapSources extends RequestParams {
    kind: '0x.swap.sources'
    baseId: ZeroXBaseId
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: '0x',
      name: 'ZeroX',
      url: 'https://www.0x.org/',
      docs: 'https://docs.0x.org/',
      tags: ['web3'],
      category: 'defi',
      type: 'liquidity',
    },
    base: [
      {
        id: 'mainnet',
        url: 'https://api.0x.org',
      },
      {
        id: 'ropsten',
        url: 'https://ropsten.api.0x.org',
      },
      {
        id: 'polygon',
        url: 'https://polygon.api.0x.org',
      },
      {
        id: 'bsc',
        url: 'https://bsc.api.0x.org',
      },
      {
        id: 'optimism',
        url: 'https://optimism.api.0x.org',
      },
      {
        id: 'fantom',
        url: 'https://fantom.api.0x.org',
      },
      {
        id: 'celo',
        url: 'https://celo.api.0x.org',
      },
      {
        id: 'avalanche',
        url: 'https://avalanche.api.0x.org',
      },
    ],
    api: {
      swap: {
        quote: {
          interface: 'SwapQuote',
          meta: {
            title: 'Quote',
            description:
              'Get an easy-to-consume quote for buying or selling any ERC20 token. The return format is a valid unsigned Ethereum transaction and can be submitted directly to an Ethereum node (or the nodes of other chains if applicable) to complete the swap.',
            docs: 'https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-quote',
          },
          method: 'GET',
          paths: [
            {
              name: 'swap',
              type: 'static',
            },
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'quote',
              type: 'static',
            },
          ],
        },
        price: {
          interface: 'SwapPrice',
          meta: {
            title: 'Price',
            description:
              'Nearly identical to /swap/v1/quote, but with a few key differences: Rather than returning a transaction that can be submitted to an Ethereum node, this resource simply indicates the pricing that would be available for an analogous call to /swap/v1/quote.',
            docs: 'https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-price',
          },
          method: 'GET',
          paths: [
            {
              name: 'swap',
              type: 'static',
            },
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'price',
              type: 'static',
            },
          ],
        },
        sources: {
          interface: 'SwapSources',
          meta: {
            title: 'Sources',
            description: 'Returns the liquidity sources enabled for the chain.',
            docs: 'https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-sources',
          },
          method: 'GET',
          paths: [
            {
              name: 'swap',
              type: 'static',
            },
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'sources',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default ZeroX
