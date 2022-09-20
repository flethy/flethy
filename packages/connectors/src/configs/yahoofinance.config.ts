import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace YahooFinance {
  export type Entity = { finance: any; insights: any }
  export type Endpoint =
    | {
        getQuote: ApiDescriptionEndpoint
        getRecommentations: ApiDescriptionEndpoint
      }
    | { get: ApiDescriptionEndpoint }

  interface YahooFinanceBase {
    'auth:x-api-key': string
  }

  export interface GetQuote extends YahooFinanceBase, RequestParams {
    kind: 'yahoofinance.finance.getQuote'
    'query:symbols': string
    'query:region'?:
      | 'US'
      | 'AU'
      | 'CA'
      | 'FR'
      | 'DE'
      | 'HK'
      | 'IT'
      | 'ES'
      | 'GB'
      | 'IN'
    'query:lang'?: 'en' | 'fr' | 'de' | 'it' | 'es' | 'zh'
  }

  export interface GetRecommendations extends YahooFinanceBase, RequestParams {
    kind: 'yahoofinance.finance.getRecommentations'
    'param:symbol': string
  }

  export interface GetInsights extends YahooFinanceBase, RequestParams {
    kind: 'yahoofinance.insights.get'
    'query:symbol': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'yahoofinance',
      name: 'YahooFinance',
      url: 'https://financeapi.net',
      docs: 'https://financeapi.net',
      signup: 'https://financeapi.net/dashboard',
      pricing: 'https://financeapi.net/pricing',
      tags: ['web2'],
      category: 'finance',
      type: 'stocks',
      social: {
        twitter: 'YahooFinance',
      },
    },
    base: 'https://yfapi.net',
    auth: {
      'x-api-key': {
        type: 'header',
      },
    },
    api: {
      finance: {
        getQuote: {
          interface: 'GetQuote',
          meta: {
            title: 'Get Quote',
            description: `Real time quote data for stocks, ETFs, mutuals funds, etc...`,
            docs: 'https://financeapi.net',
          },
          method: 'GET',
          paths: [
            {
              name: 'v6',
              type: 'static',
            },
            {
              name: 'finance',
              type: 'static',
            },
            {
              name: 'quote',
              type: 'static',
            },
          ],
        },
        getRecommentations: {
          interface: 'GetRecommendations',
          meta: {
            title: 'Get Similar Stocks',
            description: `Get Similar Stocks`,
            docs: 'https://financeapi.net',
          },
          method: 'GET',
          paths: [
            {
              name: 'v6',
              type: 'static',
            },
            {
              name: 'finance',
              type: 'static',
            },
            {
              name: 'recommendationsbysymbol',
              type: 'static',
            },
            {
              name: 'symbol',
              type: 'param',
            },
          ],
        },
      },
      insights: {
        get: {
          interface: 'GetInsights',
          meta: {
            title: 'Research insights',
            description: `Research insights`,
            docs: 'https://financeapi.net',
          },
          method: 'GET',
          paths: [
            {
              name: 'ws',
              type: 'static',
            },
            {
              name: 'insights',
              type: 'static',
            },
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'finance',
              type: 'static',
            },
            {
              name: 'insights',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default YahooFinance
