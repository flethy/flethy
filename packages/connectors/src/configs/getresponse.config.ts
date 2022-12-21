import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace GetResponse {
  export type Entity = { contacts: any }
  export type Endpoint = {
    list: ApiDescriptionEndpoint
    create: ApiDescriptionEndpoint
  }

  interface GetResponseBase {
    'auth:X-Auth-Token': string
  }

  export interface ListContacts extends GetResponseBase, RequestParams {
    kind: 'getresponse.contacts.list'
    'query:query[email]'?: string
    'query:query[name]'?: string
    'query:query[campaignId]'?: string
    'query:query[origin]'?:
      | 'import'
      | 'email'
      | 'www'
      | 'panel'
      | 'leads'
      | 'sale'
      | 'api'
      | 'forward'
      | 'survey'
      | 'iphone'
      | 'copy'
      | 'landing_page'
      | 'webinar'
      | 'website_builder_elegant'
    'query:query[createdOn][from]'?: string
    'query:query[createdOn][to]'?: string
    'query:query[changedOn][from]'?: string
    'query:query[changedOn][to]'?: string
    'query:sort[email]'?: 'ASC' | 'DESC'
    'query:sort[name]'?: 'ASC' | 'DESC'
    'query:sort[createdOn]'?: 'ASC' | 'DESC'
    'query:sort[changedOn]'?: 'ASC' | 'DESC'
    'query:sort[campaignId]'?: 'ASC' | 'DESC'
    'query:additionalFlags'?: string
    'query:fields'?: string
    'query:perPage'?: number
    'query:page'?: number
  }

  export interface CreateContact extends GetResponseBase, RequestParams {
    kind: 'getresponse.contacts.create'
    'body:name'?: string
    'body:campaign': {
      campaignId: string
    }
    'body:email': string
    'body:dayOfCycle'?: string
    'body:scoring'?: number
    'body:ipAddress'?: string
    'body:tags'?: Array<{
      tagId: string
    }>
    'body:customFieldValues'?: Array<{
      customFieldId: string
      value: string[]
    }>
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'getresponse',
      name: 'GetResponse',
      url: 'https://www.getresponse.com/',
      docs: 'https://apidocs.getresponse.com/',
      signup: 'https://www.getresponse.com/start-free',
      pricing: 'https://www.getresponse.com/pricing',
      tags: ['web2'],
      category: 'marketing',
      type: 'inbound',
      social: {
        twitter: 'getresponse',
        instagram: 'getresponse',
      },
    },
    base: 'https://api.getresponse.com/v3',
    auth: {
      'X-Auth-Token': {
        type: 'header:custom',
        custom: {
          prefix: 'api-key ',
        },
      },
    },
    api: {
      contacts: {
        list: {
          interface: 'ListContacts',
          meta: {
            title: 'Get contact list',
            description: `Get contact list`,
            docs: 'https://apidocs.getresponse.com/',
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
            title: 'Create a new contact',
            description: `Create a new contact`,
            docs: 'https://apidocs.getresponse.com/',
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
    },
  }
}

export default GetResponse
