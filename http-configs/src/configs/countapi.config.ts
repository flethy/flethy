import { RequestParams } from '../types/Request.types'
import { ApiDescription } from '../types/ApiDescription.type'

export namespace CountApi {
  export type Entity = { core }
  export type Endpoint = { get; set; update; hit; create; info }

  export interface CountApiBase {
    'param:namespace': string
    'param:key': string
  }

  export interface Get extends CountApiBase, RequestParams {
    kind: 'countapi.core.get'
  }

  export interface Set extends CountApiBase, RequestParams {
    kind: 'countapi.core.set'
    'query:value': number
  }

  export interface Update extends CountApiBase, RequestParams {
    kind: 'countapi.core.update'
    'query:amount': number
  }

  export interface Hit extends CountApiBase, RequestParams {
    kind: 'countapi.core.hit'
  }

  export interface Create extends RequestParams {
    kind: 'countapi.core.create'
    'query:namespace'?: string
    'query:key'?: string
    'query:value'?: number
    'query:enable_reset'?: 0 | 1
    'query:update_lowerbound'?: number
    'query:update_upperbound'?: number
  }

  export interface Info extends CountApiBase, RequestParams {
    kind: 'countapi.core.info'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'countapi',
      name: 'CountApi',
      url: 'https://countapi.xyz/',
      docs: 'https://countapi.xyz/',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
    },
    base: 'https://api.countapi.xyz',
    api: {
      core: {
        get: {
          interface: 'Get',
          meta: {
            title: 'Get',
            description:
              'Get the value of a key. Optionally specify the namespace.',
            docs: 'https://countapi.xyz/',
          },
          method: 'GET',
          paths: [
            {
              name: 'get',
              type: 'static',
            },
            {
              name: 'namespace',
              type: 'param',
            },
            {
              name: 'key',
              type: 'param',
            },
          ],
        },
        set: {
          interface: 'Set',
          meta: {
            title: 'Set',
            description: `Set the value of a key. Optionally specify the namespace. The key must be created with enable_reset set to 1 (true).`,
            docs: 'https://countapi.xyz/',
          },
          method: 'GET',
          paths: [
            {
              name: 'set',
              type: 'static',
            },
            {
              name: 'namespace',
              type: 'param',
            },
            {
              name: 'key',
              type: 'param',
            },
          ],
        },
        update: {
          interface: 'Update',
          meta: {
            title: 'Update',
            description: `Updates a key with +/- amount. Optionally specify the namespace. The amount must be within update_lowerbound and update_upperbound specified during the creation of the key.`,
            docs: 'https://countapi.xyz/',
          },
          method: 'GET',
          paths: [
            {
              name: 'update',
              type: 'static',
            },
            {
              name: 'namespace',
              type: 'param',
            },
            {
              name: 'key',
              type: 'param',
            },
          ],
        },
        hit: {
          interface: 'Hit',
          meta: {
            title: 'Hit',
            description: `An easier way to track incrementing by one keys. This endpoint will create a key if it doesn't exists and increment it by one on each subsequent request.`,
            docs: 'https://countapi.xyz/',
          },
          method: 'GET',
          paths: [
            {
              name: 'hit',
              type: 'static',
            },
            {
              name: 'namespace',
              type: 'param',
            },
            {
              name: 'key',
              type: 'param',
            },
          ],
        },
        create: {
          interface: 'Create',
          meta: {
            title: 'Create',
            description: `Creates a key.`,
            docs: 'https://countapi.xyz/',
          },
          method: 'GET',
          paths: [
            {
              name: 'create',
              type: 'static',
            },
          ],
        },
        info: {
          interface: 'Info',
          meta: {
            title: 'Info',
            description: `Get information about a key. Optionally specify the namespace.`,
            docs: 'https://countapi.xyz/',
          },
          method: 'GET',
          paths: [
            {
              name: 'info',
              type: 'static',
            },
            {
              name: 'namespace',
              type: 'param',
            },
            {
              name: 'key',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default CountApi
