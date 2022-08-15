import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace PayPal {
  export type Entity = { auth: any }
  export type Endpoint = { request: ApiDescriptionEndpoint }

  export interface AuthRequest extends RequestParams {
    kind: 'paypal.auth.request'
    'auth:Authorization': {
      username: string
      password: string
    }
    'auth:grant_type': 'client_credentials'
    baseId: 'sandbox'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'paypal',
      name: 'PayPal',
      url: 'https://paypal.com',
      docs: 'https://developer.paypal.com',
      social: {
        twitter: 'paypal',
        instagram: 'paypal',
      },
      tags: ['web2'],
      category: 'finance',
      type: 'payment',
    },
    base: [
      {
        id: 'sandbox',
        url: 'https://api-m.sandbox.paypal.com/v1',
      },
    ],
    api: {
      auth: {
        request: {
          interface: 'AuthRequest',
          meta: {
            title: 'Authentication',
            description: `PayPal REST APIs use OAuth 2.0 access tokens to authenticate requests. Your access token authorizes you to use the PayPal REST API server.`,
            docs: 'https://developer.paypal.com/api/rest/authentication/',
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
              name: 'oauth2',
              type: 'static',
            },
            {
              name: 'token',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default PayPal
