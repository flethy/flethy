import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace EmailOctopus {
  export type Entity = { lists: any }
  export type Endpoint = {
    get: ApiDescriptionEndpoint
    createContact: ApiDescriptionEndpoint
  }

  interface EmailOctopusBase {
    'auth:api_key': string
  }

  export interface GetList extends EmailOctopusBase, RequestParams {
    kind: 'emailoctopus.lists.get'
    'param:listId': string
  }

  export interface CreateContact extends EmailOctopusBase, RequestParams {
    kind: 'emailoctopus.lists.createContact'
    'param:listId': string
    'body:email_address': string
    'body:fields'?: any
    'body:tags'?: string[]
    'body:status'?: 'SUBSCRIBED' | 'UNSUBSCRIBED' | 'PENDING'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'emailoctopus',
      name: 'EmailOctopus',
      url: 'https://emailoctopus.com/',
      docs: 'https://emailoctopus.com/api-documentation',
      signup: 'https://emailoctopus.com/account/sign-up',
      pricing: 'https://emailoctopus.com/pricing',
      tags: ['web2'],
      category: 'marketing',
      type: 'email',
      social: {
        twitter: 'emailoctopus',
      },
    },
    base: 'https://emailoctopus.com/api/1.6',
    auth: {
      api_key: {
        type: 'query',
      },
    },
    api: {
      lists: {
        get: {
          interface: 'GetList',
          meta: {
            title: 'Get List',
            description: `Get details of a list.`,
            docs: 'https://emailoctopus.com/api-documentation/lists/get',
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
        createContact: {
          interface: 'CreateContact',
          meta: {
            title: 'Create Contact of a list',
            description: `Create a contact of a list.`,
            docs: 'https://emailoctopus.com/api-documentation/lists/create-contact',
          },
          method: 'POST',
          paths: [
            {
              name: 'lists',
              type: 'static',
            },
            {
              name: 'listId',
              type: 'param',
            },
            {
              name: 'contacts',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default EmailOctopus
