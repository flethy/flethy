import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace ClickSend {
  export type Entity = { email: any }
  export type Endpoint = { send: ApiDescriptionEndpoint }

  interface ClickSendBase {
    'auth:Authorization': {
      username: string
      password: string
    }
  }

  interface Recipient {
    email: string
    name?: string
  }

  interface Sender {
    email_address_id: number
    name: string
  }

  interface Attachement {
    content: string
    type: string
    filename: string
    disposition: string
    content_id: string
  }

  export interface SendEmail extends ClickSendBase, RequestParams {
    kind: 'clicksend.email.send'
    'body:body': {
      to: Recipient[]
      cc?: Recipient[]
      bcc?: Recipient[]
      from: Sender
      subject: string
      body: string
      attachments?: Attachement[]
      schedule?: number
    }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'clicksend',
      name: 'ClickSend',
      url: 'https://clicksend.com',
      docs: 'https://developers.clicksend.com/docs/',
      tags: ['web2'],
      category: 'communication',
      type: 'email',
      social: {
        twitter: 'clicksendsms',
      },
    },
    base: 'https://rest.clicksend.com/v3',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      email: {
        send: {
          interface: 'SendEmail',
          meta: {
            title: 'Send Email',
            description: `Send Email`,
            docs: 'https://developers.clicksend.com/docs/rest/v3/#send-email',
          },
          method: 'POST',
          paths: [
            {
              name: 'email',
              type: 'static',
            },
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

export default ClickSend
