import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Pipedream {
  export type Entity = { workflows: any; sources: any }
  export type Endpoint =
    | { getEmits: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint }

  interface PipedreamBase {
    'auth:Authorization': string
  }

  export interface GetWorkflowEmits extends PipedreamBase, RequestParams {
    kind: 'pipedream.workflows.getEmits'
    'param:workflowId': string
    'query:expand'?: 'event'
    'query:limit'?: number
  }

  export interface ListCurrentUserSources extends PipedreamBase, RequestParams {
    kind: 'pipedream.sources.list'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'pipedream',
      name: 'Pipedream',
      url: 'https://pipedream.com/',
      docs: 'https://pipedream.com/docs/api/',
      signup: 'https://pipedream.com/auth/signup',
      pricing: 'https://pipedream.com/pricing',
      tags: ['web2'],
      category: 'automation',
      type: 'workflows',
      social: {
        twitter: 'pipedream',
      },
    },
    base: 'https://api.pipedream.com/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      workflows: {
        getEmits: {
          interface: 'GetWorkflowEmits',
          meta: {
            title: 'Get Workflow Emits',
            description: `Get Workflow Emits`,
            docs: 'https://pipedream.com/docs/api/rest/#workflows',
          },
          method: 'GET',
          paths: [
            {
              name: 'workflows',
              type: 'static',
            },
            {
              name: 'workflowId',
              type: 'param',
            },
            {
              name: 'event_summaries',
              type: 'static',
            },
          ],
        },
      },
      sources: {
        list: {
          interface: 'ListCurrentUserSources',
          meta: {
            title: 'List Current User Sources',
            description: `List Current User Sources`,
            docs: 'https://pipedream.com/docs/api/rest/#list-current-user-sources',
          },
          method: 'GET',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
            {
              name: 'me',
              type: 'static',
            },
            {
              name: 'sources',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Pipedream
