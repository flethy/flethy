import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Uber {
  export type Entity = { auth: any; rideEstimates: any }
  export type Endpoint =
    | { serverToken: ApiDescriptionEndpoint }
    | { price: ApiDescriptionEndpoint }

  export interface ServerToken extends RequestParams {
    kind: 'uber.auth.serverToken'
    'auth:client_id': string
    'auth:client_secret': string
    'auth:grant_type': 'client_credentials'
    'auth:scope': string
  }

  interface UberBase {
    'auth:Authorization': string
  }

  export interface RidePriceEstimates extends UberBase, RequestParams {
    kind: 'uber.rideEstimates.price'
    'query:start_latitude': number
    'query:start_longitude': number
    'query:end_latitude': number
    'query:end_longitude': number
    'query:seat_count'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'uber',
      name: 'Uber',
      url: 'https://uber.com',
      docs: 'https://developer.uber.com/docs/',
      signup: 'https://developer.uber.com/dashboard/',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
      social: {
        twitter: 'UberDevelopers',
        github: 'uber',
      },
    },
    base: 'https://api.uber.com',
    api: {
      auth: {
        serverToken: {
          interface: 'ServerToken',
          meta: {
            title: 'Authentication',
            description: `Authentication`,
            docs: 'https://developer.uber.com/docs/riders/references/api/v2/token-post',
          },
          method: 'POST',
          base: 'https://login.uber.com',
          auth: {
            grant_type: {
              type: 'body:form',
            },
            client_id: {
              type: 'body:form',
            },
            client_secret: {
              type: 'body:form',
            },
            scope: {
              type: 'body:form',
            },
          },
          paths: [
            {
              name: 'oauth',
              type: 'static',
            },
            {
              name: 'v2',
              type: 'static',
            },
            {
              name: 'token',
              type: 'static',
            },
          ],
        },
      },
      rideEstimates: {
        price: {
          interface: 'RidePriceEstimates',
          meta: {
            title: 'Price Estimates',
            description: `Price Estimates`,
            docs: 'https://developer.uber.com/docs/riders/references/api/v1.2/estimates-price-get',
          },
          method: 'GET',
          paths: [
            {
              name: 'v1.2',
              type: 'static',
            },
            {
              name: 'estimates',
              type: 'static',
            },
            {
              name: 'price',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Uber
