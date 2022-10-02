import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace AssemblyAI {
  export type Entity = { core: any }
  export type Endpoint = {
    transcription: ApiDescriptionEndpoint
    export: ApiDescriptionEndpoint
  }

  interface AssembyAIBase {
    'auth:Authorization': string
  }

  export interface Transcribe extends AssembyAIBase, RequestParams {
    kind: 'assemblyai.core.transcription'
    'body:audio_url': string
    'body:speaker_labels'?: boolean
    'body:word_boost'?: string[]
    'body:custom_spelling'?: Array<{
      from: string[]
      to: string
    }>
    'body:dual_channel'?: boolean
    'body:disfluencies'?: boolean
    'body:language_detection'?: boolean
    'body:punctuate'?: boolean
    'body:format_text'?: boolean
  }

  export interface Export extends AssembyAIBase, RequestParams {
    kind: 'assemblyai.core.export'
    'param:transcriptId': string
    'param:format': 'srt' | 'vtt' | 'sentences' | 'paragraphs'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'assemblyai',
      name: 'AssemblyAI',
      url: 'https://www.assemblyai.com/',
      docs: 'https://www.assemblyai.com/docs/',
      signup: 'https://app.assemblyai.com/signup',
      pricing: 'https://www.assemblyai.com/pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'audio-transcription',
      social: {
        twitter: 'assemblyai',
      },
    },
    base: 'https://api.assemblyai.com/v2',
    auth: {
      Authorization: {
        type: 'header',
      },
    },
    api: {
      core: {
        transcription: {
          interface: 'Transcribe',
          meta: {
            title: 'Core Transcription',
            description: `Core Transcription`,
            docs: 'https://www.assemblyai.com/docs/core-transcription',
          },
          method: 'POST',
          paths: [
            {
              name: 'transcript',
              type: 'static',
            },
          ],
        },
        export: {
          interface: 'Export',
          meta: {
            title: 'Export',
            description: `Export`,
            docs: 'https://www.assemblyai.com/docs/core-transcription',
          },
          method: 'GET',
          paths: [
            {
              name: 'transcript',
              type: 'static',
            },
            {
              name: 'transcriptId',
              type: 'param',
            },
            {
              name: 'format',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default AssemblyAI
