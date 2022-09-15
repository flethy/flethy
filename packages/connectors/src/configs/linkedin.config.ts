import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace LinkedIn {
  export type Entity = { sharing: any }
  export type Endpoint = { post: ApiDescriptionEndpoint }

  interface LinkedInBase {
    Authorization: string
    'cache-control': 'no-cache'
    'X-Restli-Protocol-Version': '2.0.0'
  }

  export interface SharePost extends RequestParams {
    kind: 'linkedin.sharing.post'
    'header:x-li-format': 'json'
    'body:author': string // `urn:li:person:${this.config.linkedinId}`,
    'body:lifecycleState': 'PUBLISHED'
    'body:visibility': {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
    }
    'body:specificContent': {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: string
        }
        shareMediaCategory: 'ARTICLE' | 'NONE' | 'IMAGE'
        media?: Array<{
          status: 'READY'
          description: {
            text: string
          }
          originalUrl?: string
          media?: string
          title: {
            text: string
          }
        }>
      }
    }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'linkedin',
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      docs: 'https://developer.linkedin.com/',
      signup: 'https://www.linkedin.com/developers/login',
      pricing: 'https://business.linkedin.com/sales-solutions/compare-plans',
      tags: ['web2'],
      category: 'collaboration',
      type: 'socialmedia',
      social: {},
    },
    base: 'https://api.linkedin.com/v2',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      sharing: {
        post: {
          interface: 'SharePost',
          meta: {
            title: 'Share Post',
            description: `Share Post`,
            docs: 'https://developer.linkedin.com/',
          },
          method: 'POST',
          transform: {
            'body:author': {
              type: 'prefix',
              value: 'urn:li:person:',
            },
          },
          paths: [
            {
              name: 'ugcPosts',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default LinkedIn
