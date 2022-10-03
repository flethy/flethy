import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace APIPoint {
  export type Entity = { core: any }
  export type Endpoint = {
    avatar: ApiDescriptionEndpoint
    weather: ApiDescriptionEndpoint
    gif: ApiDescriptionEndpoint
    qr: ApiDescriptionEndpoint
    ip: ApiDescriptionEndpoint
    urlshot: ApiDescriptionEndpoint
  }

  export interface UserAvatar extends RequestParams {
    kind: 'apipoint.core.avatar'
    'subdomain:type': 'user-avatar'
    'query:name': string
    'query:length'?: number
    'query:background'?: string
    'query:color'?: string
    'query:bold'?: boolean
    'query:rounded'?: number
  }

  export interface Weather extends RequestParams {
    kind: 'apipoint.core.weather'
    'subdomain:type': 'weather-data'
    'query:ip': string
  }

  export interface FreeGifs extends RequestParams {
    kind: 'apipoint.core.gif'
    'subdomain:type': 'free-gifs'
    'query:q': string
    'query:format'?: string
    'query:provider'?: string
    'query:location'?: string
  }

  export interface QRCode extends RequestParams {
    kind: 'apipoint.core.qr'
    'subdomain:type': 'qr-code'
    'query:data': string
    'query:size'?: number
    'query:design'?: string
    'query:color'?: string
    'query:eyeball'?: string
  }

  export interface IPDetails extends RequestParams {
    kind: 'apipoint.core.ip'
    'subdomain:type': 'ip-details'
    'query:ip': string
  }

  export interface URLShot extends RequestParams {
    kind: 'apipoint.core.urlshot'
    'subdomain:type': 'url-shot'
    'query:url': string
    'query:width'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'apipoint',
      name: 'APIPoint',
      url: 'https://www.api-point.cf/',
      docs: 'https://www.api-point.cf/',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
      social: {},
    },
    base: 'https://subdomain:type.api-point.cf',
    api: {
      core: {
        avatar: {
          interface: 'UserAvatar',
          meta: {
            title: 'User Avatar',
            description: `User Avatar`,
            docs: 'https://www.api-point.cf/',
          },
          method: 'GET',
          paths: [],
        },
        weather: {
          interface: 'Weather',
          meta: {
            title: 'Weather',
            description: `Weather`,
            docs: 'https://www.api-point.cf/',
          },
          method: 'GET',
          paths: [],
        },
        gif: {
          interface: 'FreeGifs',
          meta: {
            title: 'Free Gifs',
            description: `Free Gifs`,
            docs: 'https://www.api-point.cf/',
          },
          method: 'GET',
          paths: [],
        },
        qr: {
          interface: 'QRCode',
          meta: {
            title: 'QR Code',
            description: `QR Code`,
            docs: 'https://www.api-point.cf/',
          },
          method: 'GET',
          paths: [],
        },
        ip: {
          interface: 'IPDetails',
          meta: {
            title: 'IP Details',
            description: `IP Details`,
            docs: 'https://www.api-point.cf/',
          },
          method: 'GET',
          paths: [],
        },
        urlshot: {
          interface: 'URLShot',
          meta: {
            title: 'URl Shot',
            description: `URL SHot`,
            docs: 'https://www.api-point.cf/',
          },
          method: 'GET',
          paths: [],
        },
      },
    },
  }
}

export default APIPoint
