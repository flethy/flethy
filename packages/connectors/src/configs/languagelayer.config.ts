import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace LanguageLayer {
  export type Entity = { core: any }
  export type Endpoint = { detect: ApiDescriptionEndpoint }

  type BaseId = 'default' | 'non-ssl'

  interface LanguageLayerBase {
    'auth:access_key': string
  }

  export interface Detect extends LanguageLayerBase, RequestParams {
    kind: 'languagelayer.core.detect'
    baseId?: BaseId
    'query:query': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'languagelayer',
      name: 'LanguageLayer',
      url: 'https://languagelayer.com',
      docs: 'https://languagelayer.com/documentation',
      signup: 'https://languagelayer.com/signup?plan=27',
      pricing: 'https://languagelayer.com/product',
      tags: ['web2'],
      category: 'utils',
      type: 'language-detection',
      social: {
        twitter: 'apilayer',
      },
    },
    base: [
      {
        id: 'default',
        url: 'https://api.languagelayer.com',
      },
      {
        id: 'non-ssl',
        url: 'http://api.languagelayer.com',
      },
    ],
    auth: {
      access_key: {
        type: 'query',
      },
    },
    api: {
      core: {
        detect: {
          interface: 'Detect',
          meta: {
            title: 'Standard Detection',
            description: `Standard Detection`,
            docs: '',
          },
          method: 'GET',
          paths: [
            {
              name: 'detect',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default LanguageLayer
