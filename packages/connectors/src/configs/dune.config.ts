import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Dune {
  export type Entity = { query: any; execution: any }
  export type Endpoint =
    | { execute: ApiDescriptionEndpoint }
    | { status: ApiDescriptionEndpoint; results: ApiDescriptionEndpoint }

  interface DuneBase {
    'auth:x-dune-api-key': string
  }

  export interface ExecuteQuery extends DuneBase, RequestParams {
    kind: 'dune.query.execute'
    'param:queryId': string
  }

  export interface ExecutionStatus extends DuneBase, RequestParams {
    kind: 'dune.execution.status'
    'param:executionId': string
  }

  export interface ExecutionResults extends DuneBase, RequestParams {
    kind: 'dune.execution.results'
    'param:executionId': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'dune',
      name: 'Dune',
      url: 'https://dune.com',
      docs: 'https://dune.com/docs/api/',
      signup: 'https://dune.com/auth/register',
      pricing: 'https://dune.com/pricing',
      tags: ['web3'],
      category: 'analytics',
      type: 'other',
      social: {
        twitter: 'DuneAnalytics',
      },
    },
    base: 'https://api.dune.com/api/v1',
    auth: {
      'x-dune-api-key': {
        type: 'header',
      },
    },
    api: {
      query: {
        execute: {
          interface: 'ExecuteQuery',
          meta: {
            title: 'Execute Query ID',
            description: 'Execute Query ID',
            docs: 'https://dune.com/docs/api/api-reference/execute-query-id/',
          },
          method: 'POST',
          paths: [
            {
              name: 'query',
              type: 'static',
            },
            {
              name: 'queryId',
              type: 'param',
            },
            {
              name: 'execute',
              type: 'static',
            },
          ],
        },
      },
      execution: {
        status: {
          interface: 'ExecutionStatus',
          meta: {
            title: 'Execution Status',
            description: 'Execution Status',
            docs: 'https://dune.com/docs/api/api-reference/execution-status/',
          },
          method: 'GET',
          paths: [
            {
              name: 'execution',
              type: 'static',
            },
            {
              name: 'executionId',
              type: 'param',
            },
            {
              name: 'status',
              type: 'static',
            },
          ],
        },
        results: {
          interface: 'ExecutionResults',
          meta: {
            title: 'Execution Results',
            description: 'Execution Results',
            docs: 'https://dune.com/docs/api/api-reference/execution-results/',
          },
          method: 'GET',
          paths: [
            {
              name: 'execution',
              type: 'static',
            },
            {
              name: 'executionId',
              type: 'param',
            },
            {
              name: 'results',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Dune
