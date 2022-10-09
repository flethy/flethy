import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace ButtondownEmail {
  export type Entity = { subscribers: any }
  export type Endpoint = {
    list: ApiDescriptionEndpoint
    create: ApiDescriptionEndpoint
    update: ApiDescriptionEndpoint
    delete: ApiDescriptionEndpoint
  }

  interface ButtondownEmailBase {
    'auth:Authorization': string
  }

  export interface ListSubscribers extends ButtondownEmailBase, RequestParams {
    kind: 'buttondownemail.subscribers.list'
    'query:type'?:
      | 'regular'
      | 'removed'
      | 'unactivated'
      | 'unpaid'
      | 'churned'
      | 'premium'
      | 'gifted'
      | 'unsubscribed'
      | 'spammy'
      | 'trialed'
      | 'paused'
    'query:tag'?: string
    'query:email'?: string
    'query:page'?: number
    'query:ordering'?: string
  }

  export interface CreateSubscriber extends ButtondownEmailBase, RequestParams {
    kind: 'buttondownemail.subscribers.create'
    'body:email'?: string
    'body:metadata'?: any
    'body:notes'?: any
    'body:referrer_url'?: string
    'body:tags'?: string[]
  }

  export interface UpdateSubscriber extends ButtondownEmailBase, RequestParams {
    kind: 'buttondownemail.subscribers.update'
    'param:id': string
    'body:email'?: string
    'body:metadata'?: any
    'body:notes'?: any
    'body:referrer_url'?: string
    'body:tags'?: string[]
  }

  export interface DeleteSubscriber extends ButtondownEmailBase, RequestParams {
    kind: 'buttondownemail.subscribers.delete'
    'param:id': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'buttondownemail',
      name: 'ButtondownEmail',
      url: 'https://buttondown.email/',
      docs: 'https://docs.buttondown.email/',
      signup: 'https://buttondown.email/register',
      pricing: 'https://buttondown.email/pricing',
      tags: ['web2'],
      category: 'marketing',
      type: 'email',
      social: {
        twitter: 'buttondown',
        github: 'buttondown-email',
      },
    },
    base: 'https://api.buttondown.email/v1',
    auth: {
      Authorization: {
        type: 'header:token',
      },
    },
    api: {
      subscribers: {
        list: {
          interface: 'ListSubscribers',
          meta: {
            title: 'Listing subscribers',
            description: `Listing subscribers`,
            docs: 'https://docs.buttondown.email/api-reference/subscribers#listing-subscribers',
          },
          method: 'GET',
          paths: [
            {
              name: 'subscribers',
              type: 'static',
            },
          ],
        },
        create: {
          interface: 'CreateSubscriber',
          meta: {
            title: 'Creating a new subscriber',
            description: `Creating a new subscriber`,
            docs: 'https://docs.buttondown.email/api-reference/subscribers#creating-a-new-subscriber',
          },
          method: 'POST',
          paths: [
            {
              name: 'subscribers',
              type: 'static',
            },
          ],
        },
        update: {
          interface: 'UpdateSubscriber',
          meta: {
            title: 'Updating a subscriber',
            description: `Updating a subscriber`,
            docs: 'https://docs.buttondown.email/api-reference/subscribers#updating-a-subscriber',
          },
          method: 'PATCH',
          paths: [
            {
              name: 'subscribers',
              type: 'static',
            },
            {
              name: 'id',
              type: 'param',
            },
          ],
        },
        delete: {
          interface: 'DeleteSubscriber',
          meta: {
            title: 'Deleting a subscriber',
            description: `Deleting a subscriber`,
            docs: 'https://docs.buttondown.email/api-reference/subscribers#deleting-a-subscriber',
          },
          method: 'DELETE',
          paths: [
            {
              name: 'subscribers',
              type: 'static',
            },
            {
              name: 'id',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default ButtondownEmail
