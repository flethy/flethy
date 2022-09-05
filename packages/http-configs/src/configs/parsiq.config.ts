import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Parsiq {
  export type Entity = { fundamentalData: any; blocks: any }
  export type Endpoint =
    | { events: ApiDescriptionEndpoint }
    | { single: ApiDescriptionEndpoint }

  type Chain =
    | 'eip155-1'
    | 'eip155-5'
    | 'eip155-137'
    | 'eip155-56'
    | 'eip155-43114'
    | 'eip155-80001'

  interface ParsiqBase {
    'auth:Authorization': string
  }

  export interface GetEvents extends ParsiqBase, RequestParams {
    kind: 'parsiq.fundamentalData.events'
    'param:chainId': Chain
    'query:block_number_start'?: number
    'query:block_number_end'?: number | 'latest'
    'query:timestamp_start'?: number
    'query:timestamp_end'?: number
    'query:origin'?: string
    'query:offset'?: string
    'query:limit'?: number
    'query:op_code'?: string
    'query:conract'?: string
    'query:topic_0'?: string
    'query:topic_1'?: string
    'query:topic_2'?: string
    'query:topic_3'?: string
  }

  export interface GetSingleBlock extends ParsiqBase, RequestParams {
    kind: 'parsiq.blocks.single'
    'param:chainId': Chain
    'param:blockHash': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'parsiq',
      name: 'Parsiq',
      url: 'https://parsiq.net/',
      docs: 'https://network-docs.parsiq.net/',
      tags: ['web3'],
      category: 'aggregation',
      type: 'indexer',
      social: {
        twitter: 'parsiq_net',
      },
    },
    base: 'https://api.parsiq.net/tsunami',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      fundamentalData: {
        events: {
          interface: 'GetEvents',
          meta: {
            title: 'Events',
            description: `Events`,
            docs: 'https://network-docs.parsiq.net/reference/events-method',
          },
          method: 'GET',
          paths: [
            {
              name: 'chainId',
              type: 'param',
            },
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'events',
              type: 'static',
            },
          ],
        },
      },
      blocks: {
        single: {
          interface: 'GetSingleBlock',
          meta: {
            title: 'Single Block',
            description: `Single Block`,
            docs: 'https://network-docs.parsiq.net/reference/single-block-method',
          },
          method: 'GET',
          paths: [
            {
              name: 'chainId',
              type: 'param',
            },
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'blocks',
              type: 'static',
            },
            {
              name: 'blockHash',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Parsiq
