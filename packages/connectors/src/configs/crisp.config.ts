import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Crisp {
  export type Entity = { base: any; people: any }
  export type Endpoint =
    | {
        websiteCheck: ApiDescriptionEndpoint
        createWebsite: ApiDescriptionEndpoint
      }
    | {
        list: ApiDescriptionEndpoint
      }

  interface CrispBase {
    'auth:Authorization': {
      username: string
      password: string
    }
  }

  export interface CheckIfWebsiteExists extends CrispBase, RequestParams {
    kind: 'crisp.base.websiteCheck'
    'query:domain': string
  }

  export interface CreateWebsite extends CrispBase, RequestParams {
    kind: 'crisp.base.createWebsite'
    'body:name': string
    'body:domain': string
  }

  export interface ListPeopleProfiles extends CrispBase, RequestParams {
    kind: 'crisp.people.list'
    'param:website_id': string
    'param:page_number': string
    'query:sort_field'?: string
    'query:sort_order'?: 'ascending' | 'descending'
    'query:search_operator'?: 'or' | 'and'
    'query:search_filter'?: string
    'query:search_text'?: string
    'query:filter_date_start'?: string
    'query:filter_date_end'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'crisp',
      name: 'Crisp',
      url: 'https://crisp.chat/',
      docs: 'https://docs.crisp.chat/',
      signup: 'https://app.crisp.chat/initiate/signup/',
      pricing: 'https://crisp.chat/pricing/',
      tags: ['web2'],
      category: 'marketing',
      type: 'inbound',
      social: {
        twitter: 'crisp_im',
      },
    },
    base: 'https://api.crisp.chat/v1',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      base: {
        websiteCheck: {
          interface: 'CheckIfWebsiteExists',
          meta: {
            title: 'Check If Website Exists',
            description: 'Check If Website Exists',
            docs: 'https://docs.crisp.chat/references/rest-api/v1/#check-if-website-exists',
          },
          method: 'HEAD',
          paths: [
            {
              name: 'website',
              type: 'static',
            },
          ],
        },
        createWebsite: {
          interface: 'CreateWebsite',
          meta: {
            title: 'Create Website',
            description: 'Create Website',
            docs: 'https://docs.crisp.chat/references/rest-api/v1/#create-website',
          },
          method: 'POST',
          paths: [
            {
              name: 'website',
              type: 'static',
            },
          ],
        },
      },
      people: {
        list: {
          interface: 'ListPeopleProfiles',
          meta: {
            title: 'List People Profiles',
            description: 'List People Profiles',
            docs: 'https://docs.crisp.chat/references/rest-api/v1/#list-people-profiles',
          },
          method: 'GET',
          paths: [
            {
              name: 'website',
              type: 'static',
            },
            {
              name: 'website_id',
              type: 'param',
            },
            {
              name: 'people',
              type: 'static',
            },
            {
              name: 'profiles',
              type: 'static',
            },
            {
              name: 'page_number',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Crisp
