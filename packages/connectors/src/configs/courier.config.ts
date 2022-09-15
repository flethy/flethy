import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Courier {
  export type Entity = { send: any }
  export type Endpoint = { post: ApiDescriptionEndpoint }

  export interface CourierBase {
    'auth:Authorization': string
  }

  export interface Send extends CourierBase, RequestParams {
    kind: 'courier.send.post'
    'body:message': {
      to: {
        data?: any
        email?: string
        user_id?: string
        list_id?: string
        list_pattern?: string
        phone_number?: string
        preferences?: any
      }
      template: string
      brand_id?: string
      routing?: {
        method: string
        channels: string[]
      }
      channels?: { [channel: string]: any }
      providers?: { [provider: string]: any }
      metadata?: {
        event?: string
        tags?: string[]
        trace_id?: string
        utm?: {
          campaign?: string
          content?: string
          medium?: string
          source?: string
          term?: string
        }
      }
      timeout?: {
        message?: number
        channel?: { [channel: string]: any }
        provider?: { [provider: string]: any }
        delay?: {
          duration?: number
        }
      }
    }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'courier',
      name: 'Courier',
      url: 'https://www.courier.com/',
      docs: 'https://www.courier.com/docs/',
      signup: 'https://app.courier.com/signup',
      pricing: 'https://www.courier.com/pricing/',
      social: {
        twitter: 'trycourier',
        github: 'trycourier',
      },
      tags: ['web2'],
      category: 'communication',
      type: 'multichannel',
    },
    base: 'https://api.courier.com',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      send: {
        post: {
          interface: 'Send',
          meta: {
            title: 'Send API',
            description: `The send API lets you send a notification to a specified recipient asynchronously with a single call.`,
            docs: 'https://www.courier.com/docs/reference/send/',
          },
          method: 'POST',
          paths: [
            {
              name: 'send',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Courier
