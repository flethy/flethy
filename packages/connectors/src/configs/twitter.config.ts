import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Twitter {
  export type Entity = { auth: any; manage: any; v1status: any; v1media: any }
  export type Endpoint =
    | {
        bearer: ApiDescriptionEndpoint
        oAuth2AuthorizationCode: ApiDescriptionEndpoint
      }
    | { postTweets: ApiDescriptionEndpoint }
    | { update: ApiDescriptionEndpoint }
    | { upload: ApiDescriptionEndpoint }

  export interface TwitterBase {
    'auth:Authorization': {
      username: string
      password: string
    }
  }

  interface TwitterBaseOAuth1a {
    'auth:Authorization': {
      consumerKey: string
      consumerSecret: string
      accessKey: string
      accessSecret: string
    }
  }

  export interface AuthBearer extends RequestParams {
    kind: 'twitter.auth.bearer'
    'auth:Authorization': {
      username: string
      password: string
    }
    'auth:grant_type': 'client_credentials'
  }

  export interface AuthOAuth2AuthorizationCode extends RequestParams {
    kind: 'twitter.auth.oAuth2AuthorizationCode'
    'auth:grant_type': 'refresh_token'
    'auth:client_id': string
    'auth:client_secret': string
    'auth:refresh_token': string
    'header:Content-Type': 'application/x-www-form-urlencoded'
  }

  export interface PostTweets extends TwitterBaseOAuth1a, RequestParams {
    kind: 'twitter.manage.postTweets'
    'body:text'?: string
    'body:media'?: {
      media_ids: string[]
    }
  }

  export interface StatusUpdate extends TwitterBaseOAuth1a, RequestParams {
    kind: 'twitter.v1status.update'
    'query:status': string
  }

  export interface UploadMedia extends TwitterBaseOAuth1a, RequestParams {
    kind: 'twitter.v1media.upload'
    'query:media_data': string // base64 encoded
    'query:media_category'?:
      | 'tweet_image'
      | 'tweet_video'
      | 'tweet_gif'
      | 'amplify_video'
    'query:additional_owners'?: string // comma separated list of user ids
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'twitter',
      name: 'Twitter',
      url: 'https://twitter.com',
      docs: 'https://developer.twitter.com/en/docs/twitter-api',
      signup: 'https://twitter.com/i/flow/signup',
      pricing: 'https://developer.twitter.com/en/pricing/search-30day',
      tags: ['web2'],
      category: 'marketing',
      type: 'socialmedia',
    },
    base: 'https://api.twitter.com',
    api: {
      auth: {
        bearer: {
          interface: 'AuthBearer',
          meta: {
            title: 'Bearer Token',
            description: `Bearer Token`,
            docs: 'https://developer.twitter.com/en/docs/authentication/oauth-2-0/bearer-tokens',
          },
          method: 'POST',
          auth: {
            Authorization: {
              type: 'header:basic',
            },
            grant_type: {
              type: 'body:form',
            },
          },
          paths: [
            {
              name: 'oauth2',
              type: 'static',
            },
            {
              name: 'token',
              type: 'static',
            },
          ],
        },
        oAuth2AuthorizationCode: {
          interface: 'AuthOAuth2AuthorizationCode',
          meta: {
            title: 'OAuth2 Authorization Code',
            description: `OAuth2 Authorization Code`,
            docs: 'https://developer.twitter.com/en/docs/authentication/oauth-2-0/authorization-code',
          },
          method: 'POST',
          auth: {
            grant_type: {
              type: 'body:form',
            },
            refresh_token: {
              type: 'body:form',
            },
            client_id: {
              type: 'body:form',
            },
            client_secret: {
              type: 'body:form',
            },
          },
          paths: [
            {
              name: '2',
              type: 'static',
            },
            {
              name: 'oauth2',
              type: 'static',
            },
            {
              name: 'token',
              type: 'static',
            },
          ],
        },
      },
      manage: {
        postTweets: {
          interface: 'PostTweets',
          meta: {
            title: 'Post Tweets',
            description: `Creates a Tweet on behalf of an authenticated user.`,
            docs: 'https://developer.twitter.com/en/docs/twitter-api/tweets/manage-tweets/api-reference/post-tweets',
          },
          method: 'POST',
          auth: {
            Authorization: {
              type: 'header:oauth1a',
            },
          },
          paths: [
            {
              name: '2',
              type: 'static',
            },
            {
              name: 'tweets',
              type: 'static',
            },
          ],
        },
      },
      v1status: {
        update: {
          interface: 'StatusUpdate',
          meta: {
            title: 'Status Update',
            description: `Updates the authenticating user's current status, also known as Tweeting.`,
            docs: 'https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-update',
          },
          method: 'POST',
          auth: {
            Authorization: {
              type: 'header:oauth1a',
            },
          },
          paths: [
            {
              name: '1.1',
              type: 'static',
            },
            {
              name: 'statuses',
              type: 'static',
            },
            {
              name: 'update.json',
              type: 'static',
            },
          ],
        },
      },
      v1media: {
        upload: {
          interface: 'UploadMedia',
          meta: {
            title: 'Upload media',
            description: `Upload media`,
            docs: 'https://developer.twitter.com/en/docs/twitter-api/v1/media/upload-media/api-reference/post-media-upload',
          },
          method: 'POST',
          auth: {
            Authorization: {
              type: 'header:oauth1a',
              options: {
                oauth1data: {
                  'query:media_data': 'media_data',
                },
              },
            },
          },
          base: 'https://upload.twitter.com',
          paths: [
            {
              name: '1.1',
              type: 'static',
            },
            {
              name: 'media',
              type: 'static',
            },
            {
              name: 'upload.json',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Twitter
