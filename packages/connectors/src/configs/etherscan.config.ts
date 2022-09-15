import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Etherscan {
  export type Entity = { accounts: any }
  export type Endpoint = { balanceSingleAddress: ApiDescriptionEndpoint }

  export interface AccountsBalanceSingleAddress extends RequestParams {
    kind: 'etherscan.accounts.balanceSingleAddress'
    'query:tag': 'latest' | 'earliest' | 'pending'
    'query:address': string
    'auth:apikey': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'etherscan',
      name: 'Etherscan',
      url: 'https://etherscan.io',
      docs: 'https://docs.etherscan.io/',
      signup: 'https://etherscan.io/register',
      pricing: 'https://etherscan.io/apis',
      social: {
        twitter: 'etherscan',
      },
      tags: ['web3'],
      category: 'aggregation',
      type: 'indexer',
    },
    base: 'https://api.etherscan.io/api',
    auth: {
      apikey: { type: 'query' },
    },
    api: {
      accounts: {
        balanceSingleAddress: {
          interface: 'AccountsBalanceSingleAddress',
          meta: {
            title: 'Get Ether Balance for a Single Address',
            description: 'Returns the Ether balance of a given address.',
            docs: 'https://docs.etherscan.io/api-endpoints/accounts#get-ether-balance-for-a-single-address',
          },
          method: 'GET',
          query: {
            module: 'account',
            action: 'balance',
          },
        },
      },
    },
  }
}

export default Etherscan
