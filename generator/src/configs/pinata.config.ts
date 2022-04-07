import { ApiDescription } from '../types/ApiDescription.type'

export type PinataEntity = { pinning }
export type PinataEndpoint = { pinJSONToIPFS }
export type PinataRequestOptionsAuth = { pinata_api_key; pinata_secret_api_key }
export type PinataRequestOptionsParams = { pinataContent; pinataMetadata }

export const PINATA: ApiDescription<PinataEntity, PinataEndpoint> = {
  meta: {
    name: 'Pinata',
    url: 'https://pinata.cloud',
    docs: 'https://docs.pinata.cloud/',
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
        params: {
          pinataContent: {
            type: 'any',
            paramType: 'body',
            required: true,
          },
          pinataMetadata: {
            type: 'any',
            paramType: 'body',
            required: true,
          },
        },
      },
    },
  },
}
