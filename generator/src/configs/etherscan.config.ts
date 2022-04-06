import { ApiDescription } from '../types/ApiDescription.type'

export type EtherscanEntity = { accounts }
export type EtherscanEndpoint = { balanceSingleAddress }

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
        params: {
          tag: {
            type: 'enum',
            paramType: 'query',
            required: true,
            values: ['latest', 'earliest', 'pending'],
          },
          address: {
            type: 'string',
            paramType: 'query',
            required: true,
            description: 'The address to check the balance of',
          },
        },
      },
    },
  },
}
