import { RequestParams } from '../controllers/HttpRequestConfig'
import { ApiDescription } from '../types/ApiDescription.type'

export type Web3StorageEntity = { upload }
export type Web3StorageEndpoint = { content }

export interface Web3StorageUploadContent extends RequestParams {
  kind: 'web3storage.upload.content'
  'body:content': any
  'auth:Authorization': string
}

export const WEB3_STORAGE: ApiDescription<
  Web3StorageEntity,
  Web3StorageEndpoint
> = {
  meta: {
    name: 'Pinata',
    url: 'https://web3.storage',
    docs: 'https://web3.storage/docs',
  },
  base: 'https://api.web3.storage',
  auth: {
    Authorization: { type: 'header' },
  },
  api: {
    upload: {
      content: {
        meta: {
          title: 'Upload Content',
          description:
            'Store files using Web3.Storage. You can upload either a single file or multiple files.',
          docs: 'https://web3.storage/docs/reference/http-api/#operation/post-upload',
          tags: ['web3'],
          category: 'storage',
          type: 'ipfs',
        },
        method: 'POST',
        paths: [
          {
            name: 'upload',
            type: 'static',
          },
        ],
      },
    },
  },
}
