import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace SpeechTextAI {
  export type Entity = { core: any }
  export type Endpoint = {
    recognize: ApiDescriptionEndpoint
    results: ApiDescriptionEndpoint
  }

  interface SpeechTextAIBase {
    'auth:key': string
  }

  export interface Recognize extends SpeechTextAIBase, RequestParams {
    kind: 'speechtextai.core.recognize'
    'query:url': string
    'query:language'?: string
    'query:format'?: string
    'query:punctuation'?: boolean
  }

  export interface Results extends SpeechTextAIBase, RequestParams {
    kind: 'speechtextai.core.results'
    'query:task': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'speechtextai',
      name: 'SpeechTextAI',
      url: 'https://speechtext.ai/',
      docs: 'https://speechtext.ai/speech-api-docs',
      signup: 'https://speechtext.ai/signup/',
      pricing: 'https://speechtext.ai/speech-recognition-api#pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'audio-transcription',
      social: {
        twitter: 'speechtextai',
        instagram: 'speechtext.ai',
      },
    },
    base: 'https://api.speechtext.ai',
    auth: {
      key: {
        type: 'query',
      },
    },
    api: {
      core: {
        recognize: {
          interface: 'Recognize',
          meta: {
            title: 'Recognize',
            description: `Recognize`,
            docs: 'https://speechtext.ai/speech-api-docs',
          },
          method: 'GET',
          paths: [
            {
              name: 'recognize',
              type: 'static',
            },
          ],
        },
        results: {
          interface: 'Results',
          meta: {
            title: 'Results',
            description: `Results`,
            docs: 'https://speechtext.ai/speech-api-docs',
          },
          method: 'GET',
          paths: [
            {
              name: 'results',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default SpeechTextAI
