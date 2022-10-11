import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Deepgram {
  export type Entity = { transcription: any }
  export type Endpoint = { preRecordedAudio: ApiDescriptionEndpoint }

  interface DeepgramBase {
    'auth:Authorization': string
  }

  export interface TranscribePrerecordedAudio
    extends DeepgramBase,
      RequestParams {
    kind: 'deepgram.transcription.preRecordedAudio'
    'body:url': string
    'query:tier'?: 'enhanced' | 'base'
    'query:model'?:
      | 'general'
      | 'meeting'
      | 'phonecall'
      | 'voicemail'
      | 'finance'
      | 'conversationalai'
      | 'video'
      | string
    'query:version'?: 'latest' | string
    'query:language'?: string
    'query:detect-language'?: boolean
    'query:punctuation'?: boolean
    'query:profanity_filter'?: boolean
    'query:redact'?: any
    'query:diarize'?: boolean
    'query:diarize_version'?: string
    'query:ner'?: boolean
    'query:multichannel'?: boolean
    'query:alternatives'?: number
    'query:numerals'?: boolean
    'query:search'?: any
    'query:replace'?: string
    'query:callback'?: string
    'query:keywords'?: string
    'query:paragraphs'?: boolean
    'query:summarize'?: boolean
    'query:utterances'?: boolean
    'query:utt_split'?: number
    'query:tag'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'deepgram',
      name: 'Deepgram',
      url: 'https://deepgram.com/',
      docs: 'https://developers.deepgram.com/api-reference/',
      signup: 'https://console.deepgram.com/signup',
      pricing: 'https://deepgram.com/pricing/',
      tags: ['web2'],
      category: 'machinelearning',
      type: 'audio-transcription',
      social: {
        twitter: 'deepgramai',
        github: 'deepgram',
      },
    },
    base: 'https://api.deepgram.com/v1',
    auth: {
      Authorization: {
        type: 'header:token',
      },
    },
    api: {
      transcription: {
        preRecordedAudio: {
          interface: 'TranscribePrerecordedAudio',
          meta: {
            title: 'Transcribe Pre-recorded Audio',
            description: `Transcribes the specified audio file.`,
            docs: 'https://developers.deepgram.com/api-reference/#transcription',
          },
          method: 'POST',
          paths: [
            {
              name: 'listen',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Deepgram
