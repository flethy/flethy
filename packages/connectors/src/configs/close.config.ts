import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Close {
  export type Entity = { account: any; leads: any }
  export type Endpoint =
    | { me: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint; create: ApiDescriptionEndpoint }

  interface CloseBase {
    'auth:Authorization': {
      username: string
    }
  }

  export interface GetMe extends CloseBase, RequestParams {
    kind: 'close.account.me'
  }

  export interface ListLeads extends CloseBase, RequestParams {
    kind: 'close.leads.list'
  }

  export interface CreateLead extends CloseBase, RequestParams {
    kind: 'close.leads.create'
    'body:body': {
      name: string
      url?: string
      description?: string
      contacts?: Array<{
        name: string
        title?: string
        emails?: Array<{ type: string; email: string }>
        phones?: Array<{ type: string; phone: number }>
      }>
      addresses?: Array<{
        label: string
        address_1: string
        address_2?: string
        city: string
        state: string
        zipcode: string
        country: string
      }>
      [customKey: string]: any
    }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'close',
      name: 'Close',
      url: 'https://www.close.com/',
      docs: 'https://developer.close.com/',
      signup: 'https://app.close.com/signup/',
      pricing: 'https://www.close.com/pricing',
      tags: ['web2'],
      category: 'marketing',
      type: 'crm',
      social: {
        twitter: 'close',
      },
    },
    base: 'https://api.close.com/api/v1',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      account: {
        me: {
          interface: 'GetMe',
          meta: {
            title: 'Account: Me',
            description: 'Account: Me',
            docs: 'https://developer.close.com/topics/authentication/',
          },
          method: 'GET',
          paths: [
            {
              name: 'me',
              type: 'static',
            },
          ],
        },
      },
      leads: {
        list: {
          interface: 'ListLeads',
          meta: {
            title: 'List Leads',
            description: 'List Leads',
            docs: 'https://developer.close.com/resources/leads/',
          },
          method: 'GET',
          paths: [
            {
              name: 'lead',
              type: 'static',
            },
          ],
        },
        create: {
          interface: 'CreateLead',
          meta: {
            title: 'Create Lead',
            description: 'Create Lead',
            docs: 'https://developer.close.com/resources/leads/',
          },
          method: 'POST',
          paths: [
            {
              name: 'lead',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Close
