import { RequestParams } from '../types/Request.types'
import { ApiDescription, AuthAws } from '../types/ApiDescription.type'

export namespace Filebase {
  export type Entity = { bucket }
  export type Endpoint = { list }

  export interface ListBucketContent extends RequestParams {
    kind: 'filebase.bucket.list'
    'auth:Authorization': AuthAws
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'filebase',
      name: 'Filebase',
      url: 'https://filebase.com/',
      docs: 'https://docs.filebase.com/',
    },
    base: 'https://bucket.s3.filebase.com',
    api: {
      bucket: {
        list: {
          meta: {
            title: 'List Bucket',
            description: 'List contents of Bucket',
            docs: 'https://docs.filebase.com/',
            tags: ['web3'],
            category: 'storage',
            type: 'ipfs',
          },
          method: 'GET',
          auth: {
            Authorization: {
              type: 'header:aws',
            },
          },
          paths: [
            {
              name: 'apikey',
              type: 'auth',
            },
            {
              name: 'getNFTs',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Filebase
