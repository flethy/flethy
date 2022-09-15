import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Bitly {
  export type Entity = { links: any }
  export type Endpoint = { shorten: ApiDescriptionEndpoint }

  export interface BitlyBase {
    'auth:Authoriztion': string
  }

  export interface CreateShortLink extends BitlyBase, RequestParams {
    kind: 'bitly.links.shorten'
    'body:group_guid'?: string
    'body:long_url': string
    'body:domain'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'bitly',
      name: 'Bitly',
      url: 'https://bitly.com',
      docs: 'https://dev.bitly.com/',
      signup: 'https://bitly.com/a/sign_up',
      pricing: 'https://bitly.com/pages/pricing',
      social: {
        twitter: 'bitly',
        instagram: 'bitly',
      },
      tags: ['web2'],
      category: 'utils',
      type: 'url-shortener',
    },
    base: 'https://api-ssl.bitly.com/v4',
    auth: {
      Authoriztion: {
        type: 'header:bearer',
      },
    },
    api: {
      links: {
        shorten: {
          interface: 'CreateShortLink',
          meta: {
            title: 'Creating Bitly short links',
            description: `The most basic call to shorten a link is using the POST method to the /v4/shorten endpoint. There is only one customization available through this call, and that's using your custom domain. If a custom domain is not specified, the resulting short link will default to bit.ly.`,
            docs: 'https://dev.bitly.com/api-reference/#createBitlink',
          },
          method: 'POST',
          paths: [
            {
              name: 'shorten',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Bitly
