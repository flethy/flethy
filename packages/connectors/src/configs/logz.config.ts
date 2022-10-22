import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Logz {
  export type Entity = { monitoring: any; account: any }
  export type Endpoint =
    | { search: ApiDescriptionEndpoint }
    | { retrieveUsersInAssociatedAccounts: ApiDescriptionEndpoint }

  type BaseId =
    | 'default'
    | 'asiapacific'
    | 'canada'
    | 'europe_fra'
    | 'west_europe'
    | 'europe_lon'
    | 'west_us2'

  interface LogzBase {
    'auth:X-API-TOKEN': string
  }

  export interface SearchLogs extends LogzBase, RequestParams {
    kind: 'logz.monitoring.search'
    baseId?: BaseId
    'query:dayOffset'?: number
    'query:accountIds'?: number
    'body:query': any
    'body:from'?: number
    'body:size'?: number
    'body:sort'?: string
    'body:_source'?: {
      includes: any
    }
    'body:post_filter'?: any
    'body:docvalue_fields'?: string
    'body:version'?: boolean
    'body:stored_fields'?: string
    'body:hightlight'?: any
    'body:aggregations'?: any
  }

  export interface RetrieveUsersInAssociatedAccounts
    extends LogzBase,
      RequestParams {
    kind: 'logz.account.retrieveUsersInAssociatedAccounts'
    baseId?: BaseId
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'logz',
      name: 'Logz',
      url: 'https://logz.io/',
      docs: 'https://docs.logz.io/api/',
      signup: 'https://logz.io/freetrial/',
      pricing: 'https://logz.io/pricing/',
      tags: ['web2'],
      category: 'infra',
      type: 'logging',
      social: {
        twitter: 'logzio',
        instagram: 'lifeatlogz.io',
      },
    },
    base: [
      { id: 'default', url: 'https://api.logz.io/v1' },
      { id: 'asiapacific', url: 'https://api-au.logz.io/v1' },
      { id: 'canada', url: 'https://api-ca.logz.io/v1' },
      { id: 'europe_fra', url: 'https://api-eu.logz.io/v1' },
      { id: 'west_europe', url: 'https://api-nl.logz.io/v1' },
      { id: 'europe_lon', url: 'https://api-uk.logz.io/v1' },
      { id: 'west_us2', url: 'https://api-wa.logz.io/v1' },
    ],
    auth: {
      'X-API-TOKEN': {
        type: 'header',
      },
    },
    api: {
      monitoring: {
        search: {
          interface: 'SearchLogs',
          meta: {
            title: 'Search logs',
            description: `Searches your account data using the Elasticsearch Search API DSL query language.`,
            docs: 'https://docs.logz.io/api/#operation/search',
          },
          method: 'POST',
          paths: [
            {
              name: 'search',
              type: 'static',
            },
          ],
        },
      },
      account: {
        retrieveUsersInAssociatedAccounts: {
          interface: 'RetrieveUsersInAssociatedAccounts',
          meta: {
            title: 'Retrieve users in all associated accounts',
            description: `Returns a list of users in the main account and all associated sub accounts as an array of JSON objects per account.`,
            docs: 'https://docs.logz.io/api/#operation/listAllAccountUsers',
          },
          method: 'GET',
          paths: [
            {
              name: 'user-management',
              type: 'static',
            },
            {
              name: 'recursive',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Logz
