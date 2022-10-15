import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Vonage {
  export type Entity = { messages: any }
  export type Endpoint = { sendToChannel: ApiDescriptionEndpoint }

  type BaseId = 'default' | 'messages-sandbox'

  interface VontageBase {
    'auth:Authorization': {
      username: string
      password: string
    }
  }

  interface MessageMedia {
    url: string
    caption?: string
  }

  export interface SendMessageToChannel extends VontageBase, RequestParams {
    kind: 'vonage.messages.sendToChannel'
    baseId?: BaseId
    'body:message_type':
      | 'text'
      | 'image'
      | 'vcard'
      | 'audio'
      | 'video'
      | 'file'
      | 'template'
      | 'custom'
    'body:template'?: {
      name: string
      parameters?: string[]
    }
    'body:image'?: MessageMedia
    'body:vcard'?: {
      url: string
    }
    'body:audio'?: MessageMedia
    'body:video'?: MessageMedia
    'body:file'?: MessageMedia
    'body:text'?: string
    'body:to': string
    'body:from': string
    'body:channel': 'sms' | 'whatsapp' | 'mms' | 'messenger' | 'viber'
    'body:client_ref'?: string
    'body:messenger'?: {
      category?: 'response' | 'update' | 'message_tag'
      tag?: string
    }
    'body:custom'?: any
    'body:viber_service'?: {
      category?: 'transaction' | 'promotion'
      ttl?: number
      type?: string
    }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'vonage',
      name: 'Vonage',
      url: 'https://vonage.com/',
      docs: 'https://developer.vonage.com/',
      signup: 'https://ui.idp.vonage.com/ui/auth/registration',
      pricing: 'https://www.vonage.com/pricing/',
      tags: ['web2'],
      category: 'communication',
      type: 'multichannel',
      social: {
        twitter: 'Vonage',
        instagram: 'vonage',
      },
    },
    base: [
      {
        id: 'default',
        url: 'https://api.nexmo.com/v1',
      },
      {
        id: 'messages-sandbox',
        url: 'https://messages-sandbox.nexmo.com/v1',
      },
    ],
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      messages: {
        sendToChannel: {
          interface: 'SendMessageToChannel',
          meta: {
            title: 'Send a message to the given channel.',
            description: `Send a message to the given channel.`,
            docs: 'https://developer.vonage.com/api/messages-olympus',
          },
          method: 'POST',
          paths: [
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

export default Vonage
