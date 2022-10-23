import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Up42 {
  export type Entity = { auth: any; credits: any; catalog: any }
  export type Endpoint =
    | { request: ApiDescriptionEndpoint }
    | { balance: ApiDescriptionEndpoint }
    | { search: ApiDescriptionEndpoint }

  export interface AuthRequest extends RequestParams {
    kind: 'up42.auth.request'
    'auth:Authorization': {
      username: string
      password: string
    }
    'auth:grant_type': 'client_credentials'
  }

  export interface Up42Base {
    'auth:Authorization': string
  }

  export interface CreditsBalance extends Up42Base, RequestParams {
    kind: 'up42.credits.balance'
  }

  export interface CatalogSearch extends Up42Base, RequestParams {
    kind: 'up42.catalog.search'
    'body:datetime': string
    'body:intersects': {
      type: string
      coordinates: number[][][]
    }
    'body:limit': number
    'body:collections': string[]
    'body:query': {
      cloudCoverage: {
        lte: number
      }
      resolution: {
        lte: number
      }
      'up42:usageType': {
        in: string[]
      }
      deliveryTime: {
        in: string[]
      }
      producer: {
        in: string[]
      }
      processingLevel: {
        in: string[]
      }
    }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'up42',
      name: 'Up42',
      url: 'https://up42.com',
      docs: 'https://docs.up42.com/',
      pricing: 'https://up42.com/pricing',
      signup: 'https://console.up42.com/sign-up',
      social: {
        twitter: 'up42_',
        instagram: 'up42official',
      },
      tags: ['web2'],
      category: 'data',
      type: 'image-provider',
    },
    base: 'https://api.up42.com',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      auth: {
        request: {
          interface: 'AuthRequest',
          meta: {
            title: 'Generate the bearer token',
            description: `Generate the bearer token necessary for all API requests.`,
            docs: 'https://docs.up42.com/developers/api#section/Authentication',
          },
          method: 'POST',
          auth: {
            Authorization: {
              type: 'header:basic',
            },
            grant_type: {
              type: 'body:form',
            },
          },
          paths: [
            {
              name: 'oauth',
              type: 'static',
            },
            {
              name: 'token',
              type: 'static',
            },
          ],
        },
      },
      credits: {
        balance: {
          interface: 'CreditsBalance',
          meta: {
            title: 'Get credit balance',
            description: `Display the overall credits available in your account.`,
            docs: 'https://docs.up42.com/developers/api#operation/getCreditBalance',
          },
          method: 'GET',
          paths: [
            {
              name: 'accounts',
              type: 'static',
            },
            {
              name: 'me',
              type: 'static',
            },
            {
              name: 'credits',
              type: 'static',
            },
            {
              name: 'balance',
              type: 'static',
            },
          ],
        },
      },
      catalog: {
        search: {
          interface: 'CatalogSearch',
          meta: {
            title: 'Search in the catalog',
            description: `Perform a search in the catalog given the query parameters defined in the request body.`,
            docs: 'https://docs.up42.com/developers/api#operation/CatalogSearch',
          },
          method: 'POST',
          paths: [
            {
              name: 'catalog',
              type: 'static',
            },
            {
              name: 'stac',
              type: 'static',
            },
            {
              name: 'search',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Up42
