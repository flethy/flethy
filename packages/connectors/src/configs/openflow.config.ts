import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Openflow {
  export type Entity = { triggers: any }
  export type Endpoint = { httpListener: ApiDescriptionEndpoint }

  export interface TriggerHttpListener extends RequestParams {
    kind: 'openflow.triggers.httpListener'
    'auth:id': string
    'body:body'?: any
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'openflow',
      name: 'Openflow',
      url: 'https://getopenflow.com/',
      docs: 'https://getopenflow.com/',
      signup: 'https://app.getopenflow.com/register',
      pricing: 'https://getopenflow.com/pricing',
      tags: ['web2'],
      category: 'automation',
      type: 'workflows',
      social: {
        twitter: '@Frenciss_',
      },
    },
    base: 'https://api.getopenflow.com',
    api: {
      triggers: {
        httpListener: {
          interface: 'TriggerHttpListener',
          meta: {
            title: 'Trigger HTTP Listener',
            description: 'Trigger HTTP Listener',
            docs: 'https://getopenflow.com/',
          },
          method: 'POST',
          paths: [
            {
              name: 'http-listener',
              type: 'static',
            },
            {
              name: 'id',
              type: 'auth',
            },
          ],
        },
      },
    },
  }
}

export default Openflow
