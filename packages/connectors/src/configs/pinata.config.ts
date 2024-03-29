import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Pinata {
  export type Entity = { pinning: any }
  export type Endpoint = { pinJSONToIPFS: ApiDescriptionEndpoint }

  export interface PinningPinJsonToIPFS extends RequestParams {
    kind: 'pinata.pinning.pinJSONToIPFS'
    'body:pinataContent': any
    'body:pinataMetadata': {
      name: string
      keyvalues: { [key: string]: string }
    }
    'auth:pinata_api_key': string
    'auth:pinata_secret_api_key': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'pinata',
      name: 'Pinata',
      url: 'https://pinata.cloud',
      docs: 'https://docs.pinata.cloud/',
      pricing: 'https://www.pinata.cloud/pricing',
      signup: 'https://app.pinata.cloud/register',
      social: {
        twitter: 'pinatacloud',
        instagram: 'pinata.cloud',
      },
      tags: ['web3'],
      category: 'storage',
      type: 'ipfs',
    },
    base: 'https://api.pinata.cloud',
    auth: {
      pinata_api_key: { type: 'header' },
      pinata_secret_api_key: { type: 'header' },
    },
    headers: {
      'content-type': 'application/json',
    },
    api: {
      pinning: {
        pinJSONToIPFS: {
          interface: 'PinningPinJsonToIPFS',
          meta: {
            title: 'pinJSONToIPFS',
            description:
              "This endpoint allows the sender to add and pin any JSON object they wish to Pinata's IPFS nodes. This endpoint is specifically optimized to only handle JSON content.",
            docs: 'https://docs.pinata.cloud/api-pinning/pin-json',
          },
          method: 'POST',
          paths: [
            {
              name: 'pinning',
              type: 'static',
            },
            {
              name: 'pinJSONToIPFS',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Pinata
