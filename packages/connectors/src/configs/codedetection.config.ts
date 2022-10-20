import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace CodeDetection {
  export type Entity = { core: any }
  export type Endpoint = { tlp: ApiDescriptionEndpoint }

  export interface CodeDetectionBase {
    'auth:apikey': string
  }

  export interface TLP extends CodeDetectionBase, RequestParams {
    kind: 'codedetection.core.tlp'
    'body:iterable': Array<{
      value: string
      prior?: {
        naturalLanguage?: number
        languages?: {
          iterable: Array<{
            likelihood: number
            current: string
            lookup: any
          }>
        }
      }
      id?: string
      models: {
        iterable: Array<{
          name:
            | 'CODE_CLASSIFICATION'
            | 'TEXT_VS_CODE'
            | 'TAGIFY'
            | 'SENSITIVES'
            | 'DESCRIPTION'
          behaviour: 'BALANCED' | 'SPEED' | 'ACCURACY'
          version?: string
        }>
      }
    }>
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'codedetection',
      name: 'CodeDetection',
      url: 'https://codedetectionapi.runtime.dev/',
      docs: 'https://platform.runtime.dev/docs/tlp-code-detection-api/c26c8fb639c21-code-detection-api-technical-language-processing',
      signup: 'https://codedetectionapi.runtime.dev/#pricing',
      pricing: 'https://codedetectionapi.runtime.dev/#pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'indexer',
      social: {},
    },
    base: 'https://api.runtime.dev',
    auth: {
      apikey: {
        type: 'query',
      },
    },
    api: {
      core: {
        tlp: {
          interface: 'CodeDetectionBase',
          meta: {
            title: 'TLP',
            description: `This is the main Runtime Technical Language Processing (TLP) endpoint that accepts arbitrary text as its input and runs the text through a series of technical language processing pipelines to generate information and metadata about the input.`,
            docs: 'https://platform.runtime.dev/docs/tlp-code-detection-api/667bba058695e-tlp-post',
          },
          method: 'POST',
          paths: [
            {
              name: 'tlp',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default CodeDetection
