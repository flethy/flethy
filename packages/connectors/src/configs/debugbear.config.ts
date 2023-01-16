import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace DebugBear {
  export type Entity = { tests: any }
  export type Endpoint = { trigger: ApiDescriptionEndpoint }

  interface DebugBearBase {
    'auth:x-api-key': string
  }

  export interface TriggerTests extends DebugBearBase, RequestParams {
    kind: 'debugbear.tests.trigger'
    'param:pageId': string
    'body:url': string
    'body:buildTitle': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'debugbear',
      name: 'DebugBear',
      url: 'https://www.debugbear.com/',
      docs: 'https://www.debugbear.com/docs/api',
      signup: 'https://www.debugbear.com/signup',
      pricing: 'https://www.debugbear.com/pricing',
      tags: ['web2'],
      category: 'infra',
      type: 'other',
      social: {
        twitter: 'DebugBear',
      },
    },
    base: 'https://www.debugbear.com/api/v1',
    auth: {
      'x-api-key': {
        type: 'header',
      },
    },
    api: {
      tests: {
        trigger: {
          interface: 'TriggerTests',
          meta: {
            title: 'Trigger Tests',
            description: 'Trigger Tests',
            docs: 'https://www.debugbear.com/docs/api#using-the-http-api-directly',
          },
          method: 'POST',
          paths: [
            {
              name: 'page',
              type: 'static',
            },
            {
              name: 'pageId',
              type: 'param',
            },
            {
              name: 'analyze',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default DebugBear
