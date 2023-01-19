import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace WordPressCom {
  export type Entity = { posts: any; auth: any }
  export type Endpoint =
    | { create: ApiDescriptionEndpoint; list: ApiDescriptionEndpoint }
    | { passwordGrant: ApiDescriptionEndpoint }

  interface WordPressBase {
    'auth:Authorization': string
  }

  export interface TokenWithPasswordGrantType extends RequestParams {
    kind: 'wordpresscom.auth.passwordGrant'
    'header:Content-Type': 'application/x-www-form-urlencoded'
    'bodyform:client_id': string
    'bodyform:client_secret': string
    'bodyform:grant_type': 'password'
    'bodyform:username': string
    'bodyform:password': string
  }

  export interface ListPosts extends RequestParams {
    kind: 'wordpresscom.posts.list'
    'param:siteId': string
  }

  export interface CreatePost extends WordPressBase, RequestParams {
    kind: 'wordpresscom.posts.create'
    'param:siteId': string
    'query:context'?: 'edit' | 'display'
    'query:http_envelope'?: boolean
    'query:pretty'?: boolean
    'query:meta'?: string
    'query:fields'?: string
    'query:callback'?: string
    'body:date'?: string
    'body:title': string
    'body:content': string
    'body:excerpt'?: string
    'body:slug'?: string
    'body:author'?: string
    'body:publicize'?: boolean | string[]
    'body:publicize_message'?: string
    'body:status'?:
      | 'publish'
      | 'draft'
      | 'pending'
      | 'future'
      | 'private'
      | 'auto-draft'
    'body:sticky'?: boolean
    'body:password'?: string
    'body:parent'?: number
    'body:type'?: string
    'body:terms'?: any
    'body:categories'?: string | string[]
    'body:tags'?: string | string[]
    'body:format'?:
      | 'default'
      | 'aside'
      | 'chat'
      | 'gallery'
      | 'link'
      | 'image'
      | 'quote'
      | 'status'
      | 'video'
      | 'audio'
      | 'standard'
    'body:featured_image'?: string
    'body:media'?: any
    'body:media_urls'?: string[]
    'body:media_attrs'?: string[]
    'body:metadata'?: string[]
    'body:discussion'?: any
    'body:likes_enabled'?: boolean
    'body:sharing_enabled'?: boolean
    'body:menu_order'?: number
    'body:page_template'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'wordpresscom',
      name: 'WordPressCom',
      url: 'https://wordpress.com/',
      docs: 'https://developer.wordpress.com/',
      signup: 'https://wordpress.com/start',
      pricing: 'https://wordpress.com/pricing/',
      tags: ['web2'],
      category: 'marketing',
      type: 'blogging',
      social: {
        twitter: 'wordpressdotcom',
        instagram: 'wordpressdotcom',
      },
    },
    base: 'https://public-api.wordpress.com/rest/v1.1/sites',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      auth: {
        passwordGrant: {
          interface: 'TokenWithPasswordGrantType',
          meta: {
            title: 'Access Token',
            description: 'Access Token',
            docs: 'https://developer.wordpress.com/docs/oauth2/',
          },
          method: 'POST',
          base: 'https://public-api.wordpress.com',
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
          options: {
            pathTailingSlash: false,
          },
        },
      },
      posts: {
        list: {
          interface: 'ListPosts',
          meta: {
            title: 'List Posts',
            description: 'List Posts',
            docs: 'https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/posts/',
          },
          method: 'GET',
          paths: [
            {
              name: 'siteId',
              type: 'param',
            },
            {
              name: 'posts',
              type: 'static',
            },
          ],
        },
        create: {
          interface: 'CreatePost',
          meta: {
            title: 'Create Post',
            description: 'Create Post',
            docs: 'https://developer.wordpress.com/docs/api/1.1/post/sites/%24site/posts/new/',
          },
          method: 'POST',
          paths: [
            {
              name: 'siteId',
              type: 'param',
            },
            {
              name: 'posts',
              type: 'static',
            },
            {
              name: 'new',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default WordPressCom
