import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Vimeo {
  export type Entity = { users: any; videos: any }
  export type Endpoint =
    | { me: ApiDescriptionEndpoint }
    | {
        appearances: ApiDescriptionEndpoint
        appearancesMe: ApiDescriptionEndpoint
      }

  interface VimeoBase {
    'auth:Authorization': string
  }

  export interface GetUser extends VimeoBase, RequestParams {
    kind: 'vimeo.users.me'
  }

  export interface GetMyAppearances extends VimeoBase, RequestParams {
    kind: 'vimeo.videos.appearancesMe'
  }

  export interface GetAppearances extends VimeoBase, RequestParams {
    kind: 'vimeo.videos.appearances'
    'param:userId': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'vimeo',
      name: 'Vimeo',
      url: 'https://vimeo.com/',
      docs: 'https://developer.vimeo.com/',
      signup: 'https://vimeo.com/',
      pricing: 'https://vimeo.com/upgrade',
      tags: ['web2'],
      category: 'data',
      type: 'video-provider',
      social: {
        twitter: 'Vimeo',
      },
    },
    base: 'https://api.vimeo.com',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      users: {
        me: {
          interface: 'GetUser',
          meta: {
            title: 'Get the user',
            description: `Get the user`,
            docs: 'https://developer.vimeo.com/api/reference/users#get_user',
          },
          method: 'GET',
          paths: [
            {
              name: 'me',
              type: 'static',
            },
          ],
        },
      },
      videos: {
        appearancesMe: {
          interface: 'GetMyAppearances',
          meta: {
            title: 'Get all the videos in which the user appears',
            description: `Get all the videos in which the user appears`,
            docs: 'https://developer.vimeo.com/api/reference/videos#get_appearances',
          },
          method: 'GET',
          paths: [
            {
              name: 'me',
              type: 'static',
            },
            {
              name: 'appearances',
              type: 'static',
            },
          ],
        },
        appearances: {
          interface: 'GetAppearances',
          meta: {
            title: 'Get all the videos in which the user appears',
            description: `Get all the videos in which the user appears`,
            docs: 'https://developer.vimeo.com/api/reference/videos#get_appearances',
          },
          method: 'GET',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
            {
              name: 'userId',
              type: 'param',
            },
            {
              name: 'appearances',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Vimeo
