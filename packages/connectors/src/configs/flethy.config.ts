import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Flethy {
  export type Entity = { workflows: any }
  export type Endpoint = {
    addOrUpdate: ApiDescriptionEndpoint
    list: ApiDescriptionEndpoint
    get: ApiDescriptionEndpoint
    delete: ApiDescriptionEndpoint
    start: ApiDescriptionEndpoint
  }

  interface FlethyBase {
    'auth:Authorization': string
  }

  export interface AddOrUpdateWorkflow extends FlethyBase, RequestParams {
    kind: 'flethy.workflows.addOrUpdate'
    'param:workspaceId': string
    'param:projectId': string
    'body:env'?: { [key: string]: string | number | boolean }
    'body:workflowId'?: string
    'body:workflow': any[]
    'body:name': string
  }

  export interface ListWorkflows extends FlethyBase, RequestParams {
    kind: 'flethy.workflows.list'
    'param:workspaceId': string
    'param:projectId': string
  }

  export interface GetWorkflow extends FlethyBase, RequestParams {
    kind: 'flethy.workflows.get'
    'param:workspaceId': string
    'param:projectId': string
    'param:workflowId': string
  }

  export interface DeleteWorkflow extends FlethyBase, RequestParams {
    kind: 'flethy.workflows.delete'
    'param:workspaceId': string
    'param:projectId': string
    'param:workflowId': string
  }

  export interface StartWorkflow extends FlethyBase, RequestParams {
    kind: 'flethy.workflows.start'
    'param:workspaceId': string
    'param:projectId': string
    'param:workflowId': string
    'body:payload': any
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'flethy',
      name: 'Flethy',
      url: 'https://flethy.com/',
      docs: 'https://docs.flethy.com/',
      signup: 'https://flethy.com/',
      pricing: 'https://flethy.com/',
      tags: ['web2'],
      category: 'automation',
      type: 'workflows',
      social: {
        twitter: 'flethycom',
      },
    },
    base: 'https://api.flethy.com/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      workflows: {
        addOrUpdate: {
          interface: 'AddOrUpdateWorkflow',
          meta: {
            title: 'Add or Update Workflow',
            description: 'Add or Update Workflow',
            docs: 'https://docs.flethy.com/docs/api/put',
          },
          method: 'PUT',
          paths: [
            {
              name: 'w',
              type: 'static',
            },
            {
              name: 'workspaceId',
              type: 'param',
            },
            {
              name: 'p',
              type: 'static',
            },
            {
              name: 'projectId',
              type: 'param',
            },
            {
              name: 'wf',
              type: 'static',
            },
          ],
        },
        list: {
          interface: 'ListWorkflows',
          meta: {
            title: 'List Workflows',
            description: 'List Workflows',
            docs: 'https://docs.flethy.com/docs/api/list',
          },
          method: 'GET',
          paths: [
            {
              name: 'w',
              type: 'static',
            },
            {
              name: 'workspaceId',
              type: 'param',
            },
            {
              name: 'p',
              type: 'static',
            },
            {
              name: 'projectId',
              type: 'param',
            },
            {
              name: 'wf',
              type: 'static',
            },
          ],
        },
        get: {
          interface: 'GetWorkflow',
          meta: {
            title: 'Get Workflow',
            description: 'Get Workflow',
            docs: 'https://docs.flethy.com/docs/api/get',
          },
          method: 'GET',
          paths: [
            {
              name: 'w',
              type: 'static',
            },
            {
              name: 'workspaceId',
              type: 'param',
            },
            {
              name: 'p',
              type: 'static',
            },
            {
              name: 'projectId',
              type: 'param',
            },
            {
              name: 'wf',
              type: 'static',
            },
            {
              name: 'workflowId',
              type: 'param',
            },
          ],
        },
        delete: {
          interface: 'DeleteWorkflow',
          meta: {
            title: 'Delete Workflow',
            description: 'Delete Workflow',
            docs: 'https://docs.flethy.com/docs/api/delete',
          },
          method: 'DELETE',
          paths: [
            {
              name: 'w',
              type: 'static',
            },
            {
              name: 'workspaceId',
              type: 'param',
            },
            {
              name: 'p',
              type: 'static',
            },
            {
              name: 'projectId',
              type: 'param',
            },
            {
              name: 'wf',
              type: 'static',
            },
            {
              name: 'workflowId',
              type: 'param',
            },
          ],
        },
        start: {
          interface: 'StartWorkflow',
          meta: {
            title: 'Start Workflow',
            description: 'Start Workflow',
            docs: 'https://docs.flethy.com/docs/api/start',
          },
          method: 'POST',
          paths: [
            {
              name: 'w',
              type: 'static',
            },
            {
              name: 'workspaceId',
              type: 'param',
            },
            {
              name: 'p',
              type: 'static',
            },
            {
              name: 'projectId',
              type: 'param',
            },
            {
              name: 'wf',
              type: 'static',
            },
            {
              name: 'workflowId',
              type: 'param',
            },
            {
              name: 'i',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Flethy
