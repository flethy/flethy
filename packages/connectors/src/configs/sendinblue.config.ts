import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Sendinblue {
  export type Entity = { contacts: any }
  export type Endpoint = {
    create: ApiDescriptionEndpoint
    list: ApiDescriptionEndpoint
  }

  interface SendinblueBase {
    'auth:api-key': string
  }

  export interface CreateContact extends SendinblueBase, RequestParams {
    kind: 'sendinblue.contacts.create'
    'body:email'?: string
    'body:attributes'?: { [key: string]: string | number | boolean }
    'body:emailBlacklisted'?: boolean
    'body:smsBlacklisted'?: boolean
    'body:listIds'?: number[]
    'body:updateEnabled'?: boolean
    'body:smtpBlacklistSender'?: string[]
  }

  export interface ListContacts extends SendinblueBase, RequestParams {
    kind: 'sendinblue.contacts.list'
    'query:limit'?: number
    'query:offset'?: number
    'query:modifiedSince'?: string
    'query:sort'?: 'asc' | 'desc'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'sendinblue',
      name: 'Sendinblue',
      url: 'https://www.sendinblue.com/',
      docs: 'https://developers.sendinblue.com/',
      signup: 'https://app.sendinblue.com/account/register',
      pricing: 'https://www.sendinblue.com/pricing/',
      tags: ['web2'],
      category: 'marketing',
      type: 'inbound',
      social: {
        twitter: 'sendinblue',
        instagram: 'sendinblue',
      },
    },
    base: 'https://api.sendinblue.com/v3',
    auth: {
      'api-key': {
        type: 'header',
      },
    },
    api: {
      contacts: {
        create: {
          interface: 'CreateContact',
          meta: {
            title: 'Create a contact',
            description: `Create a contact`,
            docs: 'https://developers.sendinblue.com/reference/createcontact',
          },
          method: 'POST',
          paths: [
            {
              name: 'contacts',
              type: 'static',
            },
          ],
        },
        list: {
          interface: 'ListContacts',
          meta: {
            title: 'Get all the contacts',
            description: `Get all the contacts`,
            docs: 'https://developers.sendinblue.com/reference/getcontacts-1',
          },
          method: 'GET',
          paths: [
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

export default Sendinblue
