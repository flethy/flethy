import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace DeepL {
  export type Entity = { translating: any; glossaries: any }
  export type Endpoint =
    | { request: ApiDescriptionEndpoint }
    | { listLanguagePairs: ApiDescriptionEndpoint }

  export interface DeepLBase {
    'auth:Authorization': string
  }

  export type DeepLBaseId = 'free' | 'pro'

  export interface TranslatingRequest extends DeepLBase, RequestParams {
    kind: 'deepl.translating.request'
    baseId: DeepLBaseId
    'query:text': string
    'query:source_lang'?: string
    'query:target_lang': string
    'query:split_sentences'?: '0' | '1' | 'nonewlines'
    'query:preserve_formatting'?: '0' | '1'
    'query:formality'?: 'default' | 'more' | 'less'
    'query:glossary_id'?: string
    'query:tag_handling'?: 'xml' | 'html'
    'query:non_splitting_tags'?: string
    'query:outline_detection'?: string
    'query:splitting_tags'?: string
    'query:ignore_tags'?: string
  }

  export interface GlossaryListLanguagePairs extends DeepLBase, RequestParams {
    kind: 'deepl.glossaries.listLanguagePairs'
    baseId: DeepLBaseId
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'deepl',
      name: 'DeepL',
      url: 'https://deepl.com',
      docs: 'https://www.deepl.com/docs-api',
      tags: ['web2'],
      category: 'utils',
      type: 'translation',
    },
    base: [
      {
        id: 'free',
        url: 'https://api-free.deepl.com/v2',
      },
      {
        id: 'pro',
        url: 'https://api.deepl.com/v2',
      },
    ],
    auth: {
      Authorization: {
        type: 'header:custom',
        custom: {
          prefix: `DeepL-Auth-Key `,
        },
      },
    },
    api: {
      translating: {
        request: {
          interface: 'TranslatingRequest',
          meta: {
            title: 'Translating text',
            description: `The translate function allows to translate texts and is available at https://api-free.deepl.com/v2/translate.`,
            docs: 'https://www.deepl.com/docs-api/translating-text/request/',
          },
          method: 'POST',
          paths: [
            {
              name: 'translate',
              type: 'static',
            },
          ],
        },
      },
      glossaries: {
        listLanguagePairs: {
          interface: 'GlossaryListLanguagePairs',
          meta: {
            title: 'List language pairs supported by glossaries',
            description: `The function for listing all language pairs supported by the glossary function returns a JSON object containing an array of source_lang and target_lang pair objects.`,
            docs: 'https://www.deepl.com/docs-api/managing-glossaries/list-language-pairs-supported-by-glossaries/',
          },
          method: 'GET',
          paths: [
            {
              name: 'glossary-language-pairs',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default DeepL
