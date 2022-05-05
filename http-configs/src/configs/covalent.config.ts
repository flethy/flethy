import { RequestParams } from '../types/Request.types'
import { ApiDescription } from '../types/ApiDescription.type'

export namespace Covalent {
  export type Entity = { classA }
  export type Endpoint = { getTransactionsForAddress }

  export interface ClassAGetTransactionsForAddress extends RequestParams {
    kind: 'covalent.classA.getTransactionsForAddress'
    'param:address': string
    'param:chainid': number
    'auth:key': string
    'query:block-signed-at-asc'?: boolean
    'query:no-logs'?: boolean
    'query:page-number'?: number
    'query:page-size'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'covalent',
      name: 'Covalent',
      url: 'https://www.covalenthq.com',
      docs: 'https://www.covalenthq.com/docs',
    },
    base: 'https://api.covalenthq.com/v1',
    auth: {
      key: {
        type: 'query',
      },
    },
    api: {
      classA: {
        getTransactionsForAddress: {
          meta: {
            title: 'Get transactions for address',
            description:
              'Given chain_id and wallet address, return all transactions along with their decoded log events.',
            docs: 'https://www.covalenthq.com/docs/api/#/0/Get%20transactions%20for%20address/USD/1',
            tags: ['web3'],
            category: 'aggregation',
            type: 'indexer',
          },
          method: 'GET',
          paths: [
            {
              name: 'chainid',
              type: 'param',
            },
            {
              name: 'address',
              type: 'static',
            },
            {
              name: 'address',
              type: 'param',
            },
            {
              name: 'transactions_v2/',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Covalent
