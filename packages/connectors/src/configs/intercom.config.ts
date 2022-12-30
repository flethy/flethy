import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Intercom {
  export type Entity = { contacts: any; dataevents: any; articles: any }
  export type Endpoint =
    | { create: ApiDescriptionEndpoint }
    | { submit: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint }

  interface IntercomBase {
    'auth:Authorization': string
  }

  export interface CreateContact extends IntercomBase, RequestParams {
    kind: 'intercom.contacts.create'
    'body:role': 'user' | 'lead'
    'body:external_id'?: string
    'body:email'?: string
    'body:phone'?: string
    'body:name'?: string
    'body:avatar'?: string
    'body:signed_up_at'?: number
    'body:last_seen_at'?: number
    'body:owner_id'?: number
    'body:unsubscribed_from_emails'?: boolean
    'body:custom_attributes'?: {
      [key: string]: string | number | boolean
    }
  }

  export interface SubmitDataEvent extends IntercomBase, RequestParams {
    kind: 'intercom.dataevent.submit'
    'body:event_name': string
    'body:created_at'?: number
    'body:user_id'?: string
    'body:metadata'?: any
  }

  export interface ListArticles extends IntercomBase, RequestParams {
    kind: 'intercom.articles.list'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'intercom',
      name: 'Intercom',
      url: 'https://www.intercom.com/',
      docs: 'https://developers.intercom.com/',
      signup: 'https://www.intercom.com/welcome-to-intercom',
      pricing: 'https://www.intercom.com/pricing',
      tags: ['web2'],
      category: 'marketing',
      type: 'inbound',
      social: {
        twitter: 'intercom',
      },
    },
    base: 'https://api.intercom.io',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      contacts: {
        create: {
          interface: 'CreateContact',
          meta: {
            title: 'Create a contact',
            description: 'Create a contact',
            docs: 'https://developers.intercom.com/intercom-api-reference/reference/create-a-contact',
          },
          method: 'POST',
          paths: [
            {
              name: 'contacts',
              type: 'static',
            },
          ],
        },
      },
      dataevents: {
        submit: {
          interface: 'SubmitDataEvent',
          meta: {
            title: 'Submit a data event',
            description: 'Submit a data event',
            docs: 'https://developers.intercom.com/intercom-api-reference/reference/submit-a-data-event',
          },
          method: 'POST',
          paths: [
            {
              name: 'events',
              type: 'static',
            },
          ],
        },
      },
      articles: {
        list: {
          interface: 'ListArticles',
          meta: {
            title: 'List all articles',
            description: 'List all articles',
            docs: 'https://developers.intercom.com/intercom-api-reference/reference/list-all-articles',
          },
          method: 'GET',
          paths: [
            {
              name: 'articles',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Intercom
