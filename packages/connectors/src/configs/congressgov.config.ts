import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace CongressGov {
  export type Entity = { bill: any; amendment: any }
  export type Endpoint =
    | { get: ApiDescriptionEndpoint }
    | { get: ApiDescriptionEndpoint }

  interface CongressGovBase {
    'auth:api_key': string
    'query:format'?: 'xml' | 'json'
    'query:offset'?: number
    'query:limit'?: number
  }

  export interface ListBills extends CongressGovBase, RequestParams {
    kind: 'congressgov.bill.get'
  }

  export interface ListAmendments extends CongressGovBase, RequestParams {
    kind: 'congressgov.amendment.get'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'congressgov',
      name: 'CongressGov',
      url: 'https://api.congress.gov/',
      docs: 'https://api.congress.gov/',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
      social: {
        github: 'LibraryOfCongress',
      },
    },
    base: 'https://api.congress.gov/v3',
    auth: {
      api_key: {
        type: 'query',
      },
    },
    api: {
      bill: {
        get: {
          interface: 'ListBills',
          meta: {
            title: 'List Bills',
            description: `Returns a list of bills sorted by date of latest action.`,
            docs: 'https://api.congress.gov/#/bill',
          },
          method: 'GET',
          paths: [
            {
              name: 'bill',
              type: 'static',
            },
          ],
        },
      },
      amendment: {
        get: {
          interface: 'ListAmendments',
          meta: {
            title: 'List Amendments',
            description: `
            Returns a list of amendments sorted by date of latest action.`,
            docs: 'https://api.congress.gov/#/amendments',
          },
          method: 'GET',
          paths: [
            {
              name: 'amendment',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default CongressGov
