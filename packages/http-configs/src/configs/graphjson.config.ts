import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { FetchParams } from '../types/FetchParams.type'
import { RequestParams } from '../types/Request.types'

export namespace GraphJSON {
  export type Entity = { core: any }
  export type Endpoint = {
    logging: ApiDescriptionEndpoint
    bulkLogging: ApiDescriptionEndpoint
    data: ApiDescriptionEndpoint
    visualization: ApiDescriptionEndpoint
  }

  interface GraphJSONBase {
    'auth:api_key': string
  }

  export interface Log extends GraphJSONBase, RequestParams {
    kind: 'graphjson.core.logging'
    'body:collection': string
    'body:timestamp': number
    'body:json': string
  }

  export interface BulkLog extends GraphJSONBase, RequestParams {
    kind: 'graphjson.core.bulkLogging'
    'body:collection': string
    'body:timestamp': number
    'body:jsons': string[]
  }

  export interface Data extends GraphJSONBase, RequestParams {
    kind: 'graphjson.core.data'
    'body:collection': string
    'body:IANA_time_zone': string
    'body:graph_type': string
    'body:start': string
    'body:end': string
    'body:filters': string[]
    'body:metric': string
    'body:aggregation': string
    'body:granularity': string
    'body:compare': string
  }

  export interface Visualization extends GraphJSONBase, RequestParams {
    kind: 'graphjson.core.visualization'
    'body:collection': string
    'body:IANA_time_zone': string
    'body:graph_type': string
    'body:start': string
    'body:end': string
    'body:filters': string[]
    'body:metric': string
    'body:aggregation': string
    'body:customizations': any
    'body:granularity': string
    'body:compare': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'graphjson',
      name: 'GraphJSON',
      url: 'https://www.graphjson.com/',
      docs: 'https://docs.graphjson.com/',
      signup: 'https://www.graphjson.com/register',
      pricing: 'https://www.graphjson.com/pricing',
      tags: ['web2'],
      category: 'analytics',
      type: 'webinsights',
      social: {
        twitter: 'GraphJSON',
      },
    },
    base: 'https://api.graphjson.com/api',
    auth: {
      api_key: {
        type: 'body',
        authHandler: (fetchParams: FetchParams, authValue: string) => {
          if (fetchParams.body) {
            fetchParams.body.api_key = authValue
          } else {
            fetchParams.body = {
              api_key: authValue,
            }
          }
        },
      },
    },
    api: {
      core: {
        logging: {
          interface: 'Log',
          meta: {
            title: 'Logging',
            description: `Logging`,
            docs: 'https://docs.graphjson.com/API/logging',
          },
          method: 'POST',
          paths: [
            {
              name: 'log',
              type: 'static',
            },
          ],
        },
        bulkLogging: {
          interface: 'BulkLog',
          meta: {
            title: 'Bulk Logging',
            description: `Bulk Logging`,
            docs: 'https://docs.graphjson.com/API/logging',
          },
          method: 'POST',
          paths: [
            {
              name: 'bulk-log',
              type: 'static',
            },
          ],
        },
        data: {
          interface: 'Data',
          meta: {
            title: 'Data',
            description: `Data`,
            docs: 'https://docs.graphjson.com/API/data',
          },
          method: 'POST',
          paths: [
            {
              name: 'visualize',
              type: 'static',
            },
            {
              name: 'data',
              type: 'static',
            },
          ],
        },
        visualization: {
          interface: 'Visualization',
          meta: {
            title: 'Visualization',
            description: `Visualization`,
            docs: 'https://docs.graphjson.com/API/visualization',
          },
          method: 'POST',
          paths: [
            {
              name: 'visualize',
              type: 'static',
            },
            {
              name: 'iframe',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default GraphJSON
