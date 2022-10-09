import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Umami {
  export type Entity = { auth: any; websites: any }
  export type Endpoint =
    | { login: ApiDescriptionEndpoint }
    | { create: ApiDescriptionEndpoint; list: ApiDescriptionEndpoint }

  interface UmamiSubdomain {
    'subdomain:domain': string
  }

  interface UmamiBase extends UmamiSubdomain {
    'auth:Authorization': string
  }

  export interface AuthLogin extends RequestParams {
    kind: 'umami.auth.login'
    'auth:username': string
    'auth:password': string
  }

  export interface CreateWebsite extends UmamiBase, RequestParams {
    kind: 'umami.websites.create'
    'body:domain': string
    'body:name': string
    'body:enable_share_url': boolean
    'body:public'?: boolean
  }

  export interface ListWebsites extends UmamiBase, RequestParams {
    kind: 'umami.websites.list'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'umami',
      name: 'Umami',
      url: 'https://umami.is/',
      docs: 'https://umami.is/docs/',
      signup: 'https://umami.is/',
      pricing: 'https://umami.is/pricing',
      tags: ['web2'],
      category: 'analytics',
      type: 'webinsights',
      social: {
        twitter: 'umami_software',
        github: 'umami-software',
      },
    },
    base: 'https://subdomain:domain/api',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
      username: {
        type: 'body',
      },
      password: {
        type: 'body',
      },
    },
    api: {
      auth: {
        login: {
          interface: 'AuthLogin',
          meta: {
            title: 'Authentication',
            description: `Authentication`,
            docs: 'https://umami.is/docs/api',
          },
          method: 'POST',
          paths: [
            {
              name: 'auth',
              type: 'static',
            },
            {
              name: 'login',
              type: 'static',
            },
          ],
        },
      },
      websites: {
        create: {
          interface: 'CreateWebsite',
          meta: {
            title: 'Creates a website.',
            description: `Creates a website.`,
            docs: 'https://umami.is/docs/api',
          },
          method: 'POST',
          paths: [
            {
              name: 'website',
              type: 'static',
            },
          ],
        },
        list: {
          interface: 'ListWebsites',
          meta: {
            title: 'Returns all tracked websites.',
            description: `Returns all tracked websites.`,
            docs: 'https://umami.is/docs/api',
          },
          method: 'GET',
          paths: [
            {
              name: 'websites',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Umami
