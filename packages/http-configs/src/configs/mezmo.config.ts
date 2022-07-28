import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Mezmo {
  export type Entity = { logs: any }
  export type Endpoint = { ingest: ApiDescriptionEndpoint }

  export interface MezmoBase {
    'auth:Authorization': {
      username: string
    }
  }

  export interface IngestLogs extends MezmoBase, RequestParams {
    kind: 'mezmo.logs.ingest'
    baseId: 'logs'
    'body:lines': Array<{
      timestamp?: number
      line: string
      app?: string
      level?: 'INFO' | 'WARNING' | 'ERROR'
      meta?: any
    }>
    'query:hostname': string
    'query:mac'?: string
    'query:ip'?: string
    'query:now'?: number
    'query:tags'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'mezmo',
      name: 'Mezmo',
      url: 'https://mezmo.com',
      docs: 'https://docs.mezmo.com/',
      tags: ['web2'],
      category: 'infra',
      type: 'logging',
    },
    base: [
      {
        id: 'logs',
        url: 'https://logs.logdna.com',
      },
      {
        id: 'api',
        url: 'https://api.logdna.com',
      },
    ],
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      logs: {
        ingest: {
          interface: 'IngestLogs',
          meta: {
            title: 'Send Log Lines',
            description: `Use this method to send logs to a logging instance.`,
            docs: 'https://docs.mezmo.com/reference/ingest#logsingest',
          },
          method: 'POST',
          paths: [
            {
              name: 'logs',
              type: 'static',
            },
            {
              name: 'ingest',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Mezmo
