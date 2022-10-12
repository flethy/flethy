import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Pirsch {
  export type Entity = { auth: any; send: any }
  export type Endpoint =
    | { accessToken: ApiDescriptionEndpoint }
    | { pageHit: ApiDescriptionEndpoint; event: ApiDescriptionEndpoint }

  interface PirschBase {
    'auth:Authorization': string
  }

  export interface GetAccessToken extends RequestParams {
    kind: 'pirsch.auth.accessToken'
    'auth:client_id': string
    'auth:client_secret': string
  }

  interface PirschSendBase {
    'body:url': string
    'body:ip': string
    'body:dnt'?: string
    'body:user_agent'?: string
    'body:accept_language'?: string
    'body:title'?: string
    'body:referrer'?: string
    'body:screen_width': number
    'body:screen_height': number
  }

  export interface SendPageHit
    extends PirschBase,
      PirschSendBase,
      RequestParams {
    kind: 'pirsch.send.pageHit'
  }

  export interface SendEvent extends PirschBase, PirschSendBase, RequestParams {
    kind: 'pirsch.send.event'
    'body:event_name': string
    'body:event_duration'?: number
    'body:event_meta'?: { [key: string]: string | number | boolean }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'pirsch',
      name: 'Pirsch',
      url: 'https://pirsch.io/',
      docs: 'https://docs.pirsch.io/api-sdks/api/',
      signup: 'https://pirsch.io/signup',
      pricing: 'https://pirsch.io/pricing',
      tags: ['web2'],
      category: 'analytics',
      type: 'webinsights',
      social: {
        twitter: 'PirschAnalytics',
        github: 'pirsch-analytics',
      },
    },
    base: 'https://api.pirsch.io/api/v1',
    auth: {
      client_id: {
        type: 'body',
      },
      client_secret: {
        type: 'body',
      },
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      auth: {
        accessToken: {
          interface: 'GetAccessToken',
          meta: {
            title: 'Getting an Access Token',
            description: `Getting an Access Token`,
            docs: 'https://docs.pirsch.io/api-sdks/api/#getting-an-access-token',
          },
          method: 'POST',
          paths: [
            {
              name: 'token',
              type: 'static',
            },
          ],
        },
      },
      send: {
        pageHit: {
          interface: 'SendPageHit',
          meta: {
            title: 'Sending a Page Hit',
            description: `This endpoint is used to send page hits to Pirsch. It requires you to send information about the request made by the client. How you get these depends on the programming language and framework you’re using. The example shows which fields are required and which are optional. We recommend sending all of them to make the results as accurate as possible.`,
            docs: 'https://docs.pirsch.io/api-sdks/api/#sending-a-page-hit',
          },
          method: 'POST',
          paths: [
            {
              name: 'hit',
              type: 'static',
            },
          ],
        },
        event: {
          interface: 'SendEvent',
          meta: {
            title: 'Sending an Event',
            description: `This endpoint is used to send events to Pirsch. It requires you to send information about the request made by the client. How you get these depends on the programming language and framework you’re using. The example shows which fields are required and which are optional. We recommend sending all of them to make the results as accurate as possible.`,
            docs: 'https://docs.pirsch.io/api-sdks/api/#sending-an-event',
          },
          method: 'POST',
          paths: [
            {
              name: 'event',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Pirsch
