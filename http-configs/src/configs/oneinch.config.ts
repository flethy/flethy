import { ApiDescription } from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace OneInch {
  export type Entity = { aggregation }
  export type Endpoint = { infoTokens; quote; swap }

  type SupportedChainIds = 1 | 56 | 137 | 10 | 42161 | 100 | 43114 | 250

  interface AggregationBase {
    'param:chainId': SupportedChainIds
  }

  export interface AggregationInfoTokens
    extends RequestParams,
      AggregationBase {
    kind: '1inch.aggregation.infoTokens'
  }

  export interface AggregationQuote extends RequestParams, AggregationBase {
    kind: '1inch.aggregation.quote'
    'query:fromTokenAddress': string
    'query:toTokenAddress': string
    'query:amount': number
    'query:protocols'?: string
    'query:fee'?: number
    'query:gasLimit'?: number
    'query:connectorTokens'?: number
    'query:complexityLevel'?: number
    'query:mainRouteParts'?: number
    'query:parts'?: number
    'query:gasPrice'?: number
  }

  export interface AggregationSwap extends RequestParams, AggregationBase {
    kind: '1inch.aggregation.swap'
    'query:fromTokenAddress': string
    'query:toTokenAddress': string
    'query:amount': number
    'query:fromAddress': string
    'query:slippage': number
    'query:protocols'?: string
    'query:destReceiver'?: string
    'query:referrerAddress'?: string
    'query:fee'?: number
    'query:gasLimit'?: number
    'query:disableEstimate'?: boolean
    'query:permit'?: string
    'query:burnChi'?: boolean
    'query:allowPartialFill'?: boolean
    'query:connectorTokens'?: number
    'query:complexityLevel'?: number
    'query:mainRouteParts'?: number
    'query:parts'?: number
    'query:gasPrice'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: '1inch',
      name: 'OneInch',
      url: 'https://1inch.io/',
      docs: 'https://docs.1inch.io/',
      tags: ['web3'],
      category: 'defi',
      type: 'liquidity',
    },
    base: 'https://api.1inch.io/v4.0',
    api: {
      aggregation: {
        infoTokens: {
          interface: 'AggregationInfoTokens',
          meta: {
            title: 'Info/Tokens',
            description:
              'List of Tokens that are available for swap in the 1inch Aggregation protocol.',
            docs: 'https://docs.1inch.io/docs/aggregation-protocol/api/swagger#',
          },
          method: 'GET',
          paths: [
            {
              name: 'chainId',
              type: 'param',
            },
            {
              name: 'tokens',
              type: 'static',
            },
          ],
        },
        quote: {
          interface: 'AggregationQuote',
          meta: {
            title: 'Quote',
            description: 'Find the best quote to exchange via 1inch router.',
            docs: 'https://docs.1inch.io/docs/aggregation-protocol/api/swagger#',
          },
          method: 'GET',
          paths: [
            {
              name: 'chainId',
              type: 'param',
            },
            {
              name: 'quote',
              type: 'static',
            },
          ],
        },
        swap: {
          interface: 'AggregationSwap',
          meta: {
            title: 'Swap',
            description:
              'Generate data for calling the 1inch router for exchange',
            docs: 'https://docs.1inch.io/docs/aggregation-protocol/api/swagger#',
          },
          method: 'GET',
          paths: [
            {
              name: 'chainId',
              type: 'param',
            },
            {
              name: 'swap',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default OneInch
