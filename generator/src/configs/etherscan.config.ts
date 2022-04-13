import { RequestParams } from '../controllers/HttpRequestConfig'
import { ApiDescription } from '../types/ApiDescription.type'

export type EtherscanEntity = { accounts }
export type EtherscanEndpoint = { balanceSingleAddress }
export type EtherscanRequestOptionsAuth = {
  apikey
}
export type EtherscanRequestOptionsParams = {
  tag
  address
}

export interface EtherscanAccountsBalanceSingleAddress extends RequestParams {
  kind: 'etherscan.accounts.balanceSingleAddress'
  'query:tag': 'latest' | 'earliest' | 'pending'
  'query:address': string
  'auth:apikey': string
}

export const ETHERSCAN: ApiDescription<EtherscanEntity, EtherscanEndpoint> = {
  meta: {
    name: 'Etherscan',
    url: 'https://etherscan.io',
    docs: 'https://docs.etherscan.io/',
  },
  base: 'https://api.etherscan.io/api',
  auth: {
    apikey: { type: 'query' },
  },
  api: {
    accounts: {
      balanceSingleAddress: {
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
