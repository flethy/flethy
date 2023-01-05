import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace SevDesk {
  export type Entity = { contacts: any; invoices: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  interface SevDeskBase {
    'auth:Authorization': string
  }

  export interface ListContacts extends SevDeskBase, RequestParams {
    kind: 'sevdesk.contacts.list'
    'query:depth'?: 0 | 1
    'query:customerNumber'?: string
  }

  export interface ListInvoices extends SevDeskBase, RequestParams {
    kind: 'sevdesk.invoices.list'
    'query:status'?: 100 | 200 | 1000
    'query:invoiceNumber'?: string
    'query:startDate'?: number
    'query:endDate'?: number
    'query:contact[id]'?: string
    'query:contact[objectName]'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'sevdesk',
      name: 'SevDesk',
      url: 'https://sevdesk.com/',
      docs: 'https://api.sevdesk.de/',
      signup: 'https://sevdesk.com/',
      pricing: 'https://sevdesk.com/pricing/',
      tags: ['web2'],
      category: 'finance',
      type: 'accounting',
      social: {
        twitter: 'sevDeskOffice',
      },
    },
    base: 'https://my.sevdesk.de/api/v1',
    auth: {
      Authorization: {
        type: 'header',
      },
    },
    api: {
      contacts: {
        list: {
          interface: 'ListContacts',
          meta: {
            title: 'Retrieve contacts',
            description: 'Retrieve contacts',
            docs: 'https://api.sevdesk.de/#tag/Contact/operation/getContacts',
          },
          method: 'GET',
          paths: [
            {
              name: 'Contact',
              type: 'static',
            },
          ],
        },
      },
      invoices: {
        list: {
          interface: 'ListInvoices',
          meta: {
            title: 'Retrieve invoices',
            description: 'Retrieve invoices',
            docs: 'https://api.sevdesk.de/#tag/Invoice/operation/getInvoices',
          },
          method: 'GET',
          paths: [
            {
              name: 'Invoice',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default SevDesk
