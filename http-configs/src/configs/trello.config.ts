import { ApiDescription } from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Trello {
  export type Entity = { boards }
  export type Endpoint = { getLists }

  export interface TrelloAuth {
    'auth:key': string
    'auth:token': string
  }

  export interface BoardGetLists extends RequestParams, TrelloAuth {
    kind: 'trello.boards.getLists'
    'param:boardId': string
    'query:cards'?: 'all' | 'closed' | 'none' | 'open'
    'query:card_fields'?: 'all' | string
    'query:filter'?: 'all' | 'closed' | 'none' | 'open'
    'query:fields'?: 'all' | string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'trello',
      name: 'Trello',
      url: 'https://trello.com',
      docs: 'https://developer.atlassian.com/cloud/trello/rest/api-group-actions/',
      tags: ['web2'],
      category: 'collaboration',
      type: 'issueticketing',
    },
    base: 'https://api.trello.com/1',
    auth: {
      key: {
        type: 'query',
      },
      token: {
        type: 'query',
      },
    },
    headers: {
      Accept: 'application/json',
    },
    api: {
      boards: {
        getLists: {
          interface: 'BoardGetLists',
          meta: {
            title: 'Get Lists on a Board',
            description: 'Get the Lists on a Board',
            docs: 'https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-lists-get',
          },
          method: 'GET',

          paths: [
            {
              name: 'boards',
              type: 'static',
            },
            {
              name: 'boardId',
              type: 'param',
            },
            {
              name: 'lists',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Trello
