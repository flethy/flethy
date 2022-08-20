import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Tenderly {
  export type Entity = { simulator: any }
  export type Endpoint = { simulation: ApiDescriptionEndpoint }

  interface TenderlyBase {
    'auth:X-Access-Key': string
  }

  export interface ExecuteTransactionSimulation
    extends TenderlyBase,
      RequestParams {
    kind: 'tenderly.simulator.simulation'
    'param:projectSlug': string
    'body:details'?: {
      override: {
        chain_config: {
          chain_id: string
          type: string
        }
      }
      save: string
      type: string
    }
    'body:from': string
    'body:gas_limit': string
    'body:gas_price': string
    'body:input': string
    'body:target': {
      network: {
        block_number: string
        id: string
        transaction_index: string
      }
    }
    'body:to': string
    'body:value': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'tenderly',
      name: 'Tenderly',
      url: 'https://tenderly.co/',
      docs: 'https://docs-api.tenderly.co',
      tags: ['web3'],
      category: 'aggregation',
      type: 'indexer',
      social: {
        twitter: 'tenderlyapp',
        github: 'tenderly',
      },
    },
    base: 'https://api.tenderly.co/api/v2',
    auth: {
      'X-Access-Key': {
        type: 'header',
      },
    },
    api: {
      simulator: {
        simulation: {
          interface: 'ExecuteTransactionSimulation',
          meta: {
            title: 'Simulation',
            description: `Execute a Transaction Simulation (Simulate a transaction)`,
            docs: 'https://docs-api.tenderly.co/simulator/simulation',
          },
          method: 'POST',
          paths: [
            {
              name: 'project',
              type: 'static',
            },
            {
              name: 'projectSlug',
              type: 'param',
            },
            {
              name: 'simulations',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Tenderly
