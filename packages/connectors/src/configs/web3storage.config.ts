import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Web3Storage {
  export type Entity = { upload: any }
  export type Endpoint = { content: ApiDescriptionEndpoint }

  export interface UploadContent extends RequestParams {
    kind: 'web3storage.upload.content'
    'body:content': any
    'auth:Authorization': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'web3storage',
      name: 'Web3Storage',
      url: 'https://web3.storage',
      docs: 'https://web3.storage/docs',
      pricing: 'https://web3.storage/pricing/',
      signup: 'https://web3.storage/login/',
      social: {
        twitter: 'filecoin',
      },
      tags: ['web3'],
      category: 'storage',
      type: 'ipfs',
    },
    base: 'https://api.web3.storage',
    auth: {
      Authorization: { type: 'header:bearer' },
    },
    api: {
      upload: {
        content: {
          interface: 'UploadContent',
          meta: {
            title: 'Upload Content',
            description:
              'Store files using Web3.Storage. You can upload either a single file or multiple files.',
            docs: 'https://web3.storage/docs/reference/http-api/#operation/post-upload',
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
}

export default Web3Storage
