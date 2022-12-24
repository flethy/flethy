import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Nordigen {
  export type Entity = { auth: any; institutions: any }
  export type Endpoint =
    | {
        new: ApiDescriptionEndpoint
        refresh: ApiDescriptionEndpoint
      }
    | {
        list: ApiDescriptionEndpoint
      }

  interface NordigenBase {
    'auth:Authorization': string
  }

  export interface AuthNewToken extends RequestParams {
    kind: 'nordigen.auth.new'
    'auth:secret_id': string
    'auth:secret_key': string
  }

  export interface AuthRefresh extends RequestParams {
    kind: 'nordigen.auth.refresh'
    'auth:refresh': string
  }

  export interface ListInstitutions extends NordigenBase, RequestParams {
    kind: 'nordigen.institutions.list'
    'query:country'?: string
    'query:payments_enabled'?: boolean
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'nordigen',
      name: 'Nordigen',
      url: 'https://nordigen.com',
      docs: 'https://nordigen.com/en/account_information_documenation/api-documention/overview/',
      signup: 'https://ob.nordigen.com/signup',
      pricing: 'https://nordigen.com/en/pricing/',
      tags: ['web2'],
      category: 'finance',
      type: 'openbanking',
      social: {
        twitter: 'nordigen',
      },
    },
    base: 'https://ob.nordigen.com/api/v2',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      auth: {
        new: {
          interface: 'AuthNewToken',
          meta: {
            title: 'New Access Token',
            description: `New Access Token`,
            docs: 'https://nordigen.com/en/account_information_documenation/integration/quickstart_guide/',
          },
          auth: {
            secret_id: {
              type: 'body',
            },
            secret_key: {
              type: 'body',
            },
          },
          method: 'POST',
          paths: [
            {
              name: 'token',
              type: 'static',
            },
            {
              name: 'new',
              type: 'static',
            },
          ],
          options: {
            pathTailingSlash: true,
          },
        },
        refresh: {
          interface: 'AuthRefresh',
          meta: {
            title: 'Refresh Access Token',
            description: `Refresh Access Token`,
            docs: 'https://nordigen.com/en/account_information_documenation/integration/quickstart_guide/',
          },
          method: 'POST',
          auth: {
            refresh: {
              type: 'body',
            },
          },
          paths: [
            {
              name: 'token',
              type: 'static',
            },
            {
              name: 'refresh',
              type: 'static',
            },
          ],
          options: {
            pathTailingSlash: true,
          },
        },
      },
      institutions: {
        list: {
          interface: 'ListInstitutions',
          meta: {
            title: 'List all available institutions',
            description: `List all available institutions`,
            docs: 'https://nordigen.com/en/docs/account-information/integration/parameters-and-responses/',
          },
          method: 'GET',
          paths: [
            {
              name: 'institutions',
              type: 'static',
            },
          ],
          options: {
            pathTailingSlash: true,
          },
        },
      },
    },
  }
}

export default Nordigen
