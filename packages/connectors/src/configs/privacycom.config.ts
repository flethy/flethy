import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace PrivacyCom {
  export type Entity = { cards: any; transactions: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  interface PrivacyComBase {
    'auth:Authorization': string
  }

  export interface ListCards extends PrivacyComBase, RequestParams {
    kind: 'privacycom.cards.list'
    'query:account_token'?: string
    'query:begin'?: string
    'query:end'?: string
    'query:page'?: number
    'query:page_size'?: number
  }

  export interface ListTransactions extends PrivacyComBase, RequestParams {
    kind: 'privacycom.transactions.list'
    'query:account_token'?: string
    'query:card_token'?: string
    'query:result'?: 'APPROVED' | 'DECLINED'
    'query:begin'?: string
    'query:end'?: string
    'query:page'?: number
    'query:page_size'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'privacycom',
      name: 'PrivacyCom',
      url: 'https://privacy.com/',
      docs: 'https://privacy-com.readme.io/',
      signup: 'https://privacy.com/signup',
      pricing: 'https://privacy.com/pricing',
      tags: ['web2'],
      category: 'finance',
      type: 'other',
      social: {
        twitter: 'PrivacyHQ',
        instagram: 'privacycard',
      },
    },
    base: 'https://api.privacy.com/v1',
    auth: {
      Authorization: {
        type: 'header:custom',
        custom: {
          prefix: 'api-key ',
        },
      },
    },
    api: {
      cards: {
        list: {
          interface: 'ListCards',
          meta: {
            title: 'List cards',
            description: 'List cards',
            docs: 'https://privacy-com.readme.io/reference/get_cards',
          },
          method: 'GET',
          paths: [
            {
              name: 'cards',
              type: 'static',
            },
          ],
        },
      },
      transactions: {
        list: {
          interface: 'ListTransactions',
          meta: {
            title: 'List transactions',
            description: 'List transactions',
            docs: 'https://privacy-com.readme.io/reference/get_transactions',
          },
          method: 'GET',
          paths: [
            {
              name: 'transactions',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default PrivacyCom
