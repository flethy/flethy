import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { FetchParams } from '../types/FetchParams.type'
import { RequestParams } from '../types/Request.types'

export namespace Canny {
  export type Entity = { boards: any; posts: any }
  export type Endpoint =
    | {
        list: ApiDescriptionEndpoint
        retrieve: ApiDescriptionEndpoint
      }
    | {
        list: ApiDescriptionEndpoint
      }

  interface CannyBase {
    'auth:apiKey': string
  }

  export interface ListBoards extends CannyBase, RequestParams {
    kind: 'canny.boards.list'
  }

  export interface RetrieveBoard extends CannyBase, RequestParams {
    kind: 'canny.boards.retrieve'
    'body:id': string
  }

  export interface ListPosts extends CannyBase, RequestParams {
    kind: 'canny.posts.list'
    'body:boardID'?: string
    'body:authorID'?: string
    'body:companyID'?: string
    'body:tagIDs'?: string[]
    'body:limit'?: number
    'body:search'?: string
    'body:skip'?: number
    'body:sort'?:
      | 'newest'
      | 'oldest'
      | 'relevance'
      | 'score'
      | 'statusChanged'
      | 'trending'
    'body:status'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'canny',
      name: 'Canny',
      url: 'https://canny.io',
      docs: 'https://developers.canny.io',
      social: {
        twitter: 'cannyhq',
      },
      tags: ['web2'],
      category: 'community',
      type: 'user-feedback',
    },
    base: 'https://canny.io/api/v1',
    auth: {
      apiKey: {
        type: 'body',
        authHandler: (fetchParams: FetchParams, authValue: string) => {
          if (fetchParams.body) {
            fetchParams.body.apiKey = authValue
          } else {
            fetchParams.body = {
              apiKey: authValue,
            }
          }
        },
      },
    },
    api: {
      boards: {
        list: {
          interface: 'ListBoards',
          meta: {
            title: 'List all boards',
            description: `Returns a list of all boards associated with your company, in no particular order.`,
            docs: 'https://developers.canny.io/api-reference#list_all_boards',
          },
          method: 'POST',
          paths: [
            {
              name: 'boards',
              type: 'static',
            },
            {
              name: 'list',
              type: 'static',
            },
          ],
        },
        retrieve: {
          interface: 'RetrieveBoard',
          meta: {
            title: 'Retrieve board',
            description: `Retrieves the details of an existing board, specified by its id.`,
            docs: 'https://developers.canny.io/api-reference#retrieve_board',
          },
          method: 'POST',
          paths: [
            {
              name: 'boards',
              type: 'static',
            },
            {
              name: 'retrieve',
              type: 'static',
            },
          ],
        },
      },
      posts: {
        list: {
          interface: 'ListPosts',
          meta: {
            title: 'List posts',
            description: `Returns a list of posts. Include parameters to specify board, pagination, filtering, and sorting.`,
            docs: 'https://developers.canny.io/api-reference#list_posts',
          },
          method: 'POST',
          paths: [
            {
              name: 'posts',
              type: 'static',
            },
            {
              name: 'list',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Canny
