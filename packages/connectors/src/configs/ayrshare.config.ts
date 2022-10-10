import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Ayrshare {
  export type Entity = { analytics: any; post: any }
  export type Endpoint =
    | { onShortenedLink: ApiDescriptionEndpoint }
    | { post: ApiDescriptionEndpoint }

  interface AyrshareBase {
    'auth:Authorization': string
  }

  export interface AnalyticsOnAShortenedLink
    extends AyrshareBase,
      RequestParams {
    kind: 'ayrshare.analytics.onShortenedLink'
    'query:lastDays'?: number
  }

  type AyrsharePlatform =
    | 'facebook'
    | 'fbg'
    | 'twitter'
    | 'linkedin'
    | 'instagram'
    | 'youtube'
    | 'reddit'
    | 'telegram'
    | 'gmb'
    | 'pinterest'
    | 'tiktok'

  export interface Post extends AyrshareBase, RequestParams {
    kind: 'ayrshare.post.post'
    'body:post': string
    'body:platforms': AyrsharePlatform[]
    'body:mediaUrls'?: string[]
    'body:schaduleDate'?: string
    'body:shortenLinks'?: boolean
    'body:autoSchedule'?: any
    'body:autoRepost'?: any
    'body:requireApproval'?: boolean
    'body:autoHashtag'?: any
    'body:unsplash'?: string
    'body:faceBookOptions'?: any
    'body:gmbOptions'?: any
    'body:instagramOptions'?: any
    'body:linkedInOptions'?: any
    'body:twitterOptions'?: any
    'body:youTubeOptions'?: any
    'body:redditOptions'?: any
    'body:telegramOptions'?: any
    'body:pinterestOptions'?: any
    'body:tikTokOptions'?: any
    'body:ads'?: any
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'ayrshare',
      name: 'Ayrshare',
      url: 'https://www.ayrshare.com/',
      docs: 'https://docs.ayrshare.com/rest-api/overview',
      signup: 'https://app.ayrshare.com/signup',
      pricing: 'https://www.ayrshare.com/pricing/',
      tags: ['web2'],
      category: 'marketing',
      type: 'socialmedia',
      social: {
        twitter: 'ayrshare',
        github: 'ayrshare',
      },
    },
    base: 'https://app.ayrshare.com/api',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      analytics: {
        onShortenedLink: {
          interface: 'AnalyticsOnAShortenedLink',
          meta: {
            title: 'Analytics on a Shortened Link',
            description: `Analytics on a Shortened Link`,
            docs: 'https://docs.ayrshare.com/rest-api/endpoints/analytics',
          },
          method: 'GET',
          paths: [
            {
              name: 'analytics',
              type: 'static',
            },
            {
              name: 'links',
              type: 'static',
            },
          ],
        },
      },
      post: {
        post: {
          interface: 'Post',
          meta: {
            title: 'Send a Post',
            description: `Send a Post`,
            docs: 'https://docs.ayrshare.com/rest-api/endpoints/post',
          },
          method: 'POST',
          paths: [
            {
              name: 'post',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Ayrshare
