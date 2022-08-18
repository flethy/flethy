import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Ably {
  export type Entity = { channels: any }
  export type Endpoint = { publishMessage: ApiDescriptionEndpoint }

  interface AblyBase {
    'auth:Authorization': string
  }

  export interface PublishMessage extends AblyBase, RequestParams {
    kind: 'ably.channels.publishMessage'
    'param:channelId': string
    'body:name': string
    'body:data': any
    'body:encoding'?: string
    'body:clientId'?: string
    'body:connectionKey'?: string
    'body:id'?: string
    'body:extras'?: any
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'ably',
      name: 'Ably',
      url: 'https://ably.com/',
      docs: 'https://ably.com/docs/api/rest-api',
      tags: ['web2'],
      category: 'communication',
      type: 'multichannel',
      social: {
        twitter: 'ablyrealtime',
        github: 'ably',
      },
    },
    base: 'https://rest.ably.io',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      channels: {
        publishMessage: {
          interface: 'PublishMessage',
          meta: {
            title: 'Publish one or more messages on a channel',
            description: `Publish one or more messages on a channel`,
            docs: 'https://ably.com/docs/api/rest-api',
          },
          method: 'POST',
          paths: [
            {
              name: 'channels',
              type: 'static',
            },
            {
              name: 'channelId',
              type: 'param',
            },
            {
              name: 'messages',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Ably
