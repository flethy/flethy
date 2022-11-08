import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Omnisend {
  export type Entity = { contacts: any; events: any }
  export type Endpoint =
    | {
        list: ApiDescriptionEndpoint
        create: ApiDescriptionEndpoint
      }
    | {
        list: ApiDescriptionEndpoint
      }

  interface OmnisendBase {
    'auth:X-API-KEY': string
  }

  type OmnisendContactStatus = 'subscribed' | 'unsubscribed' | 'nonSubscribed'

  export interface ListContacts extends OmnisendBase, RequestParams {
    kind: 'omnisend.contacts.list'
    'query:email'?: string
    'query:status'?: OmnisendContactStatus
    'query:segmentID'?: string
    'query:tag'?: string
    'query:limit'?: number
    'query:phone'?: string
  }

  export interface CreateContact extends OmnisendBase, RequestParams {
    kind: 'omnisend.contacts.create'
    'body:identifiers': Array<{
      id: string
      type: 'email' | 'phone'
      sendWelcomeMessage?: boolean
      channels: {
        sms?: {
          status: OmnisendContactStatus
          statusDate?: string
        }
        email?: {
          status: OmnisendContactStatus
          statusDate?: string
        }
      }
    }>
    'body:firstName'?: string
    'body:lastName'?: string
    'body:tags'?: string[]
    'body:country'?: string
    'body:countryCode'?: string
    'body:state'?: string
    'body:city'?: string
    'body:address'?: string
    'body:postalCode'?: string
    'body:gender'?: 'm' | 'f'
    'body:birthdate'?: string
    'body:sendWelcomeEmail'?: boolean
    'body:customProperties'?: {
      [key: string]: string | number | boolean | string[]
    }
  }

  export interface ListCustomEvents extends OmnisendBase, RequestParams {
    kind: 'omnisend.events.list'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'omnisend',
      name: 'Omnisend',
      url: 'https://www.omnisend.com',
      docs: 'https://api-docs.omnisend.com',
      signup: 'https://app.omnisend.com/registrationv2',
      pricing: 'https://www.omnisend.com/pricing/',
      tags: ['web2', 'sms', 'email'],
      category: 'communication',
      type: 'multichannel',
      social: {
        twitter: 'omnisend',
        instagram: 'omnisend',
      },
    },
    base: 'https://api.omnisend.com/v3',
    auth: {
      'X-API-KEY': {
        type: 'header',
      },
    },
    api: {
      contacts: {
        list: {
          interface: 'ListContacts',
          meta: {
            title: 'List contacts',
            description: `List contacts`,
            docs: 'https://api-docs.omnisend.com/reference/list-contacts',
          },
          method: 'GET',
          paths: [
            {
              name: 'contacts',
              type: 'static',
            },
          ],
        },
        create: {
          interface: 'CreateContact',
          meta: {
            title: 'Create contact',
            description: `Create contact`,
            docs: 'https://api-docs.omnisend.com/reference/post-contacts',
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
      events: {
        list: {
          interface: 'ListCustomEvents',
          meta: {
            title: 'List custom events',
            description: `List custom events`,
            docs: 'https://api-docs.omnisend.com/reference/get_events',
          },
          method: 'GET',
          paths: [
            {
              name: 'events',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Omnisend
