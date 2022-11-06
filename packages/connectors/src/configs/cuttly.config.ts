import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Cuttly {
  export type Entity = { links: any }
  export type Endpoint = { shorten: ApiDescriptionEndpoint }

  interface CuttlyBase {
    'auth:key': string
  }

  export interface ShortenLink extends CuttlyBase, RequestParams {
    kind: 'cuttly.links.shorten'
    'query:short': string
    'query:name': string
    'query:noTitle'?: 1
    'query:public'?: 1
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'cuttly',
      name: 'Cuttly',
      url: 'https://cutt.ly/',
      docs: 'https://cutt.ly/cuttly-api',
      signup: 'https://cutt.ly/register',
      pricing: 'https://cutt.ly/pro-pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'url-shortener',
      social: {
        twitter: 'cutt_ly',
        instagram: 'cutt.ly',
      },
    },
    base: 'https://cutt.ly/api/api.php',
    auth: {
      key: {
        type: 'query',
      },
    },
    api: {
      links: {
        shorten: {
          interface: 'ShortenLink',
          meta: {
            title: 'Link shortening',
            description: `Link shortening`,
            docs: 'https://cutt.ly/api-documentation/cuttly-links-api',
          },
          method: 'GET',
        },
      },
    },
  }
}

export default Cuttly
