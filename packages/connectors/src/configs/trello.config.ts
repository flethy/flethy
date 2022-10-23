import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Trello {
  export type Entity = { boards: any; cards: any }
  export type Endpoint =
    | { getLists: ApiDescriptionEndpoint }
    | { create: ApiDescriptionEndpoint }

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

  export interface CardsCreate extends RequestParams, TrelloAuth {
    kind: 'trello.cards.create'
    'query:idList': string
    'query:name'?: string
    'query:desc'?: string
    'query:pos'?: 'bottom' | 'top' | number
    'query:due'?: string
    'query:start'?: string
    'query:dueComplete'?: boolean
    'query:idMembers'?: string
    'query:idLabels'?: string
    'query:urlSource'?: string
    'query:fileSource'?: string
    'query:mimeType'?: string
    'query:idCardSource'?: string
    'query:keepFromSource'?: 'all' | string
    'query:address'?: string
    'query:locationName'?: string
    'query:coordinates'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'trello',
      name: 'Trello',
      url: 'https://trello.com',
      docs: 'https://developer.atlassian.com/cloud/trello/rest/api-group-actions/',
      pricing: 'https://trello.com/pricing',
      signup: 'https://trello.com/signup',
      social: {
        twitter: 'trello',
        instagram: 'trelloapp',
      },
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
      cards: {
        create: {
          interface: 'CardsCreate',
          meta: {
            title: 'Create a new Card',
            description: 'Create a new Card',
            docs: 'https://developer.atlassian.com/cloud/trello/rest/api-group-cards/#api-cards-post',
          },
          method: 'POST',

          paths: [
            {
              name: 'cards',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Trello
