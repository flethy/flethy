import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace UrlBae {
  export type Entity = { url: any }
  export type Endpoint = { add: ApiDescriptionEndpoint }

  interface UrlBaeBase {
    'auth:Authorization': string
  }

  export interface ShortenLink extends UrlBaeBase, RequestParams {
    kind: 'urlbae.url.add'
    'body:url': string
    'body:custom'?: string
    'body:type'?: 'direct' | 'frame' | 'splash'
    'body:password'?: string
    'body:domain'?: string
    'body:expiry'?: string
    'body:geotarget'?: Array<{
      location: string
      link: string
    }>
    'body:devicetarget'?: Array<{
      device: string
      link: string
    }>
    'body:languagetarget'?: Array<{
      language: string
      link: string
    }>
    'body:metatitle'?: string
    'body:metadescription'?: string
    'body:metaimage'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'urlbae',
      name: 'UrlBae',
      url: 'https://urlbae.com/',
      docs: 'https://urlbae.com/developers',
      signup: 'https://urlbae.com/user/register',
      tags: ['web2'],
      category: 'utils',
      type: 'url-shortener',
      social: {},
    },
    base: 'https://urlbae.com/api',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      url: {
        add: {
          interface: 'ShortenLink',
          meta: {
            title: 'Shorten a Link',
            description: `To shorten a link, you need to send a valid data in JSON via a POST request. The data must be sent as the raw body of your request as shown below. The example below shows all the parameters you can send but you are not required to send all (See table for more info).`,
            docs: 'https://urlbae.com/developers#shorten-a-link',
          },
          method: 'POST',
          paths: [
            {
              name: 'url',
              type: 'static',
            },
            {
              name: 'add',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default UrlBae
