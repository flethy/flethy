import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Supabase {
  export type Entity = { core: any }
  export type Endpoint = {
    insert: ApiDescriptionEndpoint
    read: ApiDescriptionEndpoint
  }

  export interface SupabaseBase {
    'auth:apikey': string
    'auth:Authorization': string
    'subdomain:postgres-ref': string
    'param:table': string
  }

  export interface InsertRows extends SupabaseBase, RequestParams {
    kind: 'supabase.core.insert'
    'body:body': any
    'header:Prefer'?: 'resolution=merge-duplicates'
  }

  export interface ReadRows extends SupabaseBase, RequestParams {
    kind: 'supabase.core.read'
    'query:select': string
    'customQuery:filter'?: {
      [key: string]: string
    }
    'header:Range'?: '0-9' | string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'supabase',
      name: 'Supabase',
      url: 'https://supabase.com/',
      docs: 'https://supabase.com/docs/',
      social: {
        twitter: 'supabase',
        github: 'supabase',
      },
      tags: ['web2'],
      category: 'storage',
      type: 'database',
    },
    base: 'https://subdomain:postgres-ref.supabase.co/rest/v1',
    auth: {
      apikey: {
        type: 'header',
      },
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      core: {
        insert: {
          interface: 'InsertRows',
          meta: {
            title: 'Insert Rows',
            description: `Insert lets you insert into your tables`,
            docs: 'https://supabase.com/docs/guides/api',
          },
          method: 'POST',
          paths: [
            {
              name: 'table',
              type: 'param',
            },
          ],
        },
        read: {
          interface: 'ReadRows',
          meta: {
            title: 'Read Rows',
            description: `To read rows, use the select method`,
            docs: 'https://supabase.com/docs/guides/api',
          },
          method: 'GET',
          paths: [
            {
              name: 'table',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Supabase
