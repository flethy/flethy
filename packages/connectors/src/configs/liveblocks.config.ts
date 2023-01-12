import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Liveblocks {
  export type Entity = { rooms: any }
  export type Endpoint = {
    list: ApiDescriptionEndpoint
    create: ApiDescriptionEndpoint
  }

  interface LiveblocksBase {
    'auth:Authorization': string
  }

  export interface ListRooms extends LiveblocksBase, RequestParams {
    kind: 'liveblocks.rooms.list'
    'query:limit'?: number
    'query:startingAfter'?: string
    'query:userId'?: string
    'query:groupIds'?: string
  }

  export interface CreateRoom extends LiveblocksBase, RequestParams {
    kind: 'liveblocks.rooms.create'
    'body:id': string
    'body:defaultAccesses': string[]
    'body:metadata'?: {
      [key: string]: string
    }
    'body:usersAccesses'?: {
      [record: string]: string[]
    }
    'body:groupsAccesses'?: {
      [record: string]: string[]
    }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'liveblocks',
      name: 'Liveblocks',
      url: 'https://liveblocks.io/',
      docs: 'https://liveblocks.io/docs/api-reference/rest-api-endpoints',
      signup: 'https://liveblocks.io/api/auth/signup',
      pricing: 'https://liveblocks.io/pricing',
      tags: ['web2'],
      category: 'infra',
      type: 'other',
      social: {
        twitter: 'liveblocks',
        github: 'liveblocks',
      },
    },
    base: 'https://api.liveblocks.io/v2',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      rooms: {
        list: {
          interface: 'ListRooms',
          meta: {
            title: 'Get rooms',
            description: 'Get rooms',
            docs: 'https://liveblocks.io/docs/api-reference/rest-api-endpoints#get-rooms',
          },
          method: 'GET',
          paths: [
            {
              name: 'rooms',
              type: 'static',
            },
          ],
        },
        create: {
          interface: 'CreateRoom',
          meta: {
            title: 'Create room',
            description: 'Create room',
            docs: 'https://liveblocks.io/docs/api-reference/rest-api-endpoints#post-rooms',
          },
          method: 'POST',
          paths: [
            {
              name: 'rooms',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Liveblocks
