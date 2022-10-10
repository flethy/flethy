import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Luabase {
  export type Entity = { run: any }
  export type Endpoint = { query: ApiDescriptionEndpoint }

  interface LuabaseBaseBody {
    'auth:api_key': string
  }

  export interface RunQuery extends LuabaseBaseBody, RequestParams {
    kind: 'luabase.run.query'
    'body:block'?: {
      id?: number
      data_uuid?: string
      details?: {
        name?: string
        description?: string
        type?: string
        ui?: 'SQL' | string
        tags?: string[]
        sql?: string
        renderedSql?: string
        running?: boolean
        currentRunTime?: string
        parameters?: {
          [name: string]: {
            aggValue?: any
            column?: string
            hitRows?: number
            integrationId?: string
            schemaName?: string
            aggregate?: string
            type: string
            value?: any
          }
        }
        cells?: Array<{
          id: string
          focus?: boolean
          hover?: boolean
        }>
        share?: {
          id?: 'private' | string
          name?: 'Private to you' | string
          description?: string
        }
        results?: {
          ok?: boolean
          rows?: number
          rows_before_limit_at_least?: number
          hitMaxRow?: number
          startTime?: string
          timeElapsed?: number
          statistics?: any
          data?: any[]
          meta?: any[]
          error?: string
        }
        schedule?: {
          period?: 'one-minute' | 'five-minutes' | 'hourly' | 'daily' | 'none'
          time?: string
          minutesPast?: number
          start_date?: string
        }
        destination?: any
        view?: any
        importer?: any
        limit?: number
      }
      is_archived?: boolean
      is_public?: boolean
    }
    'body:job_uuid'?: string
    'body:runBy'?: 'scheduler' | 'user'
    'body:database'?: 'ethereum' | string
    'body:format'?: 'csv' | 'json' | 'none'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'luabase',
      name: 'Luabase',
      url: 'https://luabase.com/',
      docs: 'https://luabase.notion.site/Luabase-Docs-e9c2c5338c47494cb35294b47ce4b744',
      signup: 'https://luabase.com/login?signup=1',
      tags: ['web3'],
      category: 'aggregation',
      type: 'indexer',
      social: {
        twitter: 'onluabase',
      },
    },
    base: 'https://q.luabase.com',
    auth: {
      api_key: {
        type: 'body',
      },
    },
    api: {
      run: {
        query: {
          interface: 'RunQuery',
          meta: {
            title: 'Run Query',
            description: `Run Query`,
            docs: 'https://q.luabase.com/redoc#tag/run/operation/run_query_run_post',
          },
          method: 'POST',
          paths: [
            {
              name: 'run',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Luabase
