import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Revue {
  export type Entity = { lists: any; subscribers: any }
  export type Endpoint =
    | {
        list: ApiDescriptionEndpoint
        get: ApiDescriptionEndpoint
      }
    | {
        add: ApiDescriptionEndpoint
        get: ApiDescriptionEndpoint
      }

  interface RevueBase {
    'auth:Authorization': string
  }

  export interface ListAllLists extends RevueBase, RequestParams {
    kind: 'revue.lists.list'
  }

  export interface GetList extends RevueBase, RequestParams {
    kind: 'revue.lists.get'
    'param:listId': string
  }

  export interface GetSubscribers extends RevueBase, RequestParams {
    kind: 'revue.subscribers.get'
  }

  export interface AddSubscriber extends RevueBase, RequestParams {
    kind: 'revue.subscribers.add'
    'bodyform:email': string
    'bodyform:first_name'?: string
    'bodyform:last_name'?: string
    'bodyform:double_opt_in'?: boolean
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'revue',
      name: 'Revue',
      url: 'https://www.getrevue.co/',
      docs: 'https://www.getrevue.co/api#overview',
      signup: 'https://www.getrevue.co/users/sign_up',
      tags: ['web2'],
      category: 'marketing',
      type: 'email',
      social: {
        twitter: 'revue',
      },
    },
    base: 'https://www.getrevue.co/api/v2',
    auth: {
      Authorization: {
        type: 'header',
      },
    },
    api: {
      lists: {
        list: {
          interface: 'ListAllLists',
          meta: {
            title: 'List all lists associated with account',
            description: `List all lists associated with account`,
            docs: 'https://www.getrevue.co/api#get-/v2/lists',
          },
          method: 'GET',
          paths: [
            {
              name: 'lists',
              type: 'static',
            },
          ],
        },
        get: {
          interface: 'GetList',
          meta: {
            title: 'Get specific list',
            description: `Get specific list`,
            docs: 'https://www.getrevue.co/api#get-/v2/lists/-id-',
          },
          method: 'GET',
          paths: [
            {
              name: 'lists',
              type: 'static',
            },
            {
              name: 'listId',
              type: 'param',
            },
          ],
        },
      },
      subscribers: {
        get: {
          interface: 'GetSubscribers',
          meta: {
            title:
              'Returns a list of your subscribers that are actively subscribed.',
            description: `Returns a list of your subscribers that are actively subscribed.`,
            docs: 'https://www.getrevue.co/api#get-/v2/subscribers',
          },
          method: 'GET',
          paths: [
            {
              name: 'subscribers',
              type: 'static',
            },
          ],
        },
        add: {
          interface: 'AddSubscriber',
          meta: {
            title: 'Adds a subscriber to your list.',
            description: `Adds a subscriber to your list.`,
            docs: 'https://www.getrevue.co/api#get-/v2/subscribers',
          },
          method: 'POST',
          paths: [
            {
              name: 'subscribers',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Revue
