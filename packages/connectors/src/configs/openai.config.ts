import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace OpenAI {
  export type Entity = { images: any; models: any }
  export type Endpoint =
    | { create: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint }

  interface OpenAIBase {
    'auth:Authorization': string
  }

  export interface CreateImage extends OpenAIBase, RequestParams {
    kind: 'openai.images.create'
    'body:prompt': string
    'body:n'?: number
    'body:size'?: '256x256' | '512x512' | '1024x1024'
    'body:response_format'?: 'url' | 'b64_json'
    'body:user'?: string
  }

  export interface ListModels extends OpenAIBase, RequestParams {
    kind: 'openai.models.list'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'openai',
      name: 'OpenAI',
      url: 'https://openai.com/',
      docs: 'https://beta.openai.com/docs/introduction',
      signup: 'https://beta.openai.com/signup',
      pricing: 'https://openai.com/api/pricing/',
      tags: ['web3'],
      category: 'aggregation',
      type: 'indexer',
      social: {
        twitter: 'openai',
        github: 'openai',
      },
    },
    base: 'https://api.openai.com/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      images: {
        create: {
          interface: 'CreateImage',
          meta: {
            title: 'Create image',
            description: `Creates an image given a prompt.`,
            docs: 'https://beta.openai.com/docs/api-reference/images/create',
          },
          method: 'POST',
          paths: [
            {
              name: 'images',
              type: 'static',
            },
            {
              name: 'generations',
              type: 'static',
            },
          ],
        },
      },
      models: {
        list: {
          interface: 'ListModels',
          meta: {
            title: 'List models',
            description: `Lists the currently available models, and provides basic information about each one such as the owner and availability.`,
            docs: 'https://beta.openai.com/docs/api-reference/models/list',
          },
          method: 'GET',
          paths: [
            {
              name: 'models',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default OpenAI
