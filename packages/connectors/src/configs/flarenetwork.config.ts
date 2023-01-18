import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace FlareNetwork {
  export type Entity = { ethereum: any }
  export type Endpoint = {
    prysmValidatorBalances: ApiDescriptionEndpoint
    prysmBlockHeaders: ApiDescriptionEndpoint
    geth: ApiDescriptionEndpoint
  }

  interface FlareNetworkEthereumBase {
    'auth:x-apikey': string
  }

  export interface EthereumPrysmGetValidatorBalances
    extends FlareNetworkEthereumBase,
      RequestParams {
    kind: 'flarenetwork.ethereum.prysmValidatorBalances'
  }

  export interface EthereumPrysmGetBlockHeaders
    extends FlareNetworkEthereumBase,
      RequestParams {
    kind: 'flarenetwork.ethereum.prysmBlockHeaders'
  }

  export interface EthereumPrysmGeth
    extends FlareNetworkEthereumBase,
      RequestParams {
    kind: 'flarenetwork.ethereum.geth'
    'body:jsonrpc': string
    'body:method': string
    'body:params': string[]
    'body:id': number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'flarenetwork',
      name: 'FlareNetwork',
      url: 'https://flare.network/',
      docs: 'https://api-portal.flare.network/apis',
      signup: 'https://api-portal.flare.network/user/register',
      pricing: 'https://flare.network/',
      tags: ['web3'],
      category: 'aggregation',
      type: 'other',
      social: {
        twitter: 'FlareNetworks',
        github: 'flare-foundation',
        instagram: 'flare_networks',
      },
    },
    base: '',
    api: {
      ethereum: {
        prysmValidatorBalances: {
          interface: 'EthereumPrysmGetValidatorBalances',
          meta: {
            title: 'Get validator balances',
            description: 'Get validator balances',
            docs: 'https://api-portal.flare.network/api/23/1/overview',
          },
          method: 'POST',
          base: 'https://api.flare.network/ethereum/eth',
          auth: {
            'x-apikey': {
              type: 'header',
            },
          },
          paths: [
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'beacon',
              type: 'static',
            },
            {
              name: 'states',
              type: 'static',
            },
            {
              name: 'head',
              type: 'static',
            },
            {
              name: 'validator_balances',
              type: 'static',
            },
          ],
          options: {
            pathTailingSlash: false,
            emptyBody: true,
          },
        },
        prysmBlockHeaders: {
          interface: 'EthereumPrysmGetBlockHeaders',
          meta: {
            title: 'Get block headers',
            description: 'Get block headers',
            docs: 'https://api-portal.flare.network/api/23/1/overview',
          },
          method: 'POST',
          base: 'https://api.flare.network/ethereum/eth',
          auth: {
            'x-apikey': {
              type: 'header',
            },
          },
          paths: [
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'beacon',
              type: 'static',
            },
            {
              name: 'headers',
              type: 'static',
            },
          ],
          options: {
            pathTailingSlash: false,
            emptyBody: true,
          },
        },
        geth: {
          interface: 'EthereumPrysmGeth',
          meta: {
            title: 'Geth',
            description: 'Geth',
            docs: 'https://api-portal.flare.network/api/23/1/overview',
          },
          method: 'POST',
          base: 'https://api.flare.network/ethereum',
          auth: {
            'x-apikey': {
              type: 'header',
            },
          },
          paths: [],
          options: {
            pathTailingSlash: false,
          },
        },
      },
    },
  }
}

export default FlareNetwork
