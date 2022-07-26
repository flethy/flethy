import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace MailPace {
  export type Entity = { core: any }
  export type Endpoint = { send: ApiDescriptionEndpoint }

  export interface MailPaceBase {
    'auth:MailPace-Server-Token': string
    'header:Accept': 'application/json'
    'header:Content-Type': 'application/json'
  }

  export interface Send extends MailPaceBase, RequestParams {
    kind: 'mailpace.core.send'
    'body:from': string
    'body:to': string
    'body:htmlbody'?: string
    'body:textbody'?: string
    'body:cc'?: string
    'body:bcc'?: string
    'body:subject'?: string
    'body:replyto'?: string
    'body:list_unsubscribe'?: string
    'body:attachments'?: Array<{
      name: string
      content: string
      content_type: string
      cid?: string
    }>
    'body:tags'?: string | string[]
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'mailpace',
      name: 'MailPace',
      url: 'https://mailpace.com',
      docs: 'https://docs.mailpace.com/',
      tags: ['web2'],
      category: 'communication',
      type: 'email',
    },
    base: 'https://app.mailpace.com/api/v1',
    auth: {
      'MailPace-Server-Token': {
        type: 'header',
      },
    },
    api: {
      core: {
        send: {
          interface: 'Send',
          meta: {
            title: 'Send an email',
            description: `The /send endpoint is the main API endpoint for sending messages through MailPace`,
            docs: 'https://docs.mailpace.com/reference/send',
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

export default MailPace
