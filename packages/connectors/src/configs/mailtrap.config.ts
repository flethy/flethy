import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Mailtrap {
  export type Entity = { emails: any }
  export type Endpoint = {
    send: ApiDescriptionEndpoint
    test: ApiDescriptionEndpoint
  }

  interface MailtrapBase {
    'auth:Authorization': string
  }

  interface Address {
    name: string
    email: string
  }

  interface EmailRequest {
    'body:from': Address
    'body:to': Address[]
    'body:cc'?: Address[]
    'body:bcc'?: Address[]
    'body:attachments'?: Array<{
      content: string
      type?: 'text/plain' | 'text/html' | 'application/pdf'
      filename: string
      disposition?: string
      content_id?: string
    }>
    'body:subject': string
    'body:html'?: string
    'body:text'?: string
    'body:headers'?: { [key: string]: string }
    'body:custom_variables'?: any
    'body:category'?: string
  }

  export interface SendEmail extends MailtrapBase, EmailRequest, RequestParams {
    kind: 'mailtrap.emails.send'
  }

  export interface SendTestEmail
    extends MailtrapBase,
      EmailRequest,
      RequestParams {
    kind: 'mailtrap.emails.test'
    'param:inboxId': number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'mailtrap',
      name: 'Mailtrap',
      url: 'https://mailtrap.io/',
      docs: 'https://api-docs.mailtrap.io/',
      signup: 'https://mailtrap.io/register/signup',
      pricing: 'https://mailtrap.io/pricing/',
      tags: ['web2'],
      category: 'communication',
      type: 'email',
      social: {
        twitter: 'Mailtrap',
      },
    },
    base: 'https://send.api.mailtrap.io/api',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      emails: {
        send: {
          interface: 'SendEmail',
          meta: {
            title: 'Send email',
            description: 'Send email',
            docs: 'https://api-docs.mailtrap.io/docs/mailtrap-api-docs/67f1d70aeb62c-send-email',
          },
          method: 'POST',
          paths: [
            {
              name: 'send',
              type: 'static',
            },
          ],
        },
        test: {
          interface: 'SendTestEmail',
          meta: {
            title: 'Send test email',
            description: 'Send email message to the specified inbox',
            docs: 'https://api-docs.mailtrap.io/docs/mailtrap-api-docs/bcf61cdc1547e-send-email-message',
          },
          method: 'POST',
          base: 'https://sandbox.api.mailtrap.io/api',
          paths: [
            {
              name: 'send',
              type: 'static',
            },
            {
              name: 'inboxId',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Mailtrap
