import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace TinyURL {
  export type Entity = { links: any; analytics: any }
  export type Endpoint =
    | { create: ApiDescriptionEndpoint }
    | { timeline: ApiDescriptionEndpoint }

  interface TinyURLBase {
    'auth:Authorization': string
  }

  export interface CreateLink extends TinyURLBase, RequestParams {
    kind: 'tinyurl.links.create'
    'body:url': string
    'body:domain'?: 'tinyurl.com' | 'rotf.lol' | 'tiny.one' | string
    'body:alias'?: string
    'body:tags'?: string
    'body:expires_at'?: string
  }

  export interface TimelineAnalytics extends TinyURLBase, RequestParams {
    kind: 'tinyurl.analytics.timeline'
    'query:from': string
    'query:to'?: string
    'query:interval'?: 'minute' | 'hour' | 'day' | 'week' | 'month'
    'query:alias'?: string
    'query:tag'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'tinyurl',
      name: 'TinyURL',
      url: 'https://tinyurl.com/',
      docs: 'https://tinyurl.com/app/dev',
      signup: 'https://tinyurl.com/app/register',
      pricing: 'https://tinyurl.com/app/pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'url-shortener',
      social: {
        twitter: 'TinyURL',
      },
    },
    base: 'https://api.tinyurl.com',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      links: {
        create: {
          interface: 'CreateLink',
          meta: {
            title: 'Create a new TinyURL',
            description: `Take a long URL and shorten it into a new TinyURL.`,
            docs: 'https://tinyurl.com/app/dev',
          },
          method: 'POST',
          paths: [
            {
              name: 'create',
              type: 'static',
            },
          ],
        },
      },
      analytics: {
        timeline: {
          interface: 'TimelineAnalytics',
          meta: {
            title: 'Timeline Analytics',
            description: `Return timeline analytics.`,
            docs: 'https://tinyurl.com/app/dev',
          },
          method: 'GET',
          paths: [
            {
              name: 'analytics',
              type: 'static',
            },
            {
              name: 'timeline',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default TinyURL
