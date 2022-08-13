import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace MailerSend {
  export type Entity = { email: any }
  export type Endpoint = { send: ApiDescriptionEndpoint }

  export interface EmailSend extends RequestParams {
    kind: 'mailersend.email.send'
    'body:from': {
      email: string
      name?: string
    }
    'body:to': Array<{
      email: string
      name?: string
    }>
    'body:subject': string
    'body:text': string
    'body:html': string
    'body:variables'?: Array<{
      email: string
      substitutions: Array<{
        var: string
        value: string
      }>
    }>
    'auth:Authorization': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'mailersend',
      name: 'MailerSend',
      url: 'https://mailersend.com',
      docs: 'https://developers.mailersend.com/',
      config: 'https://app.mailersend.com/',
      social: {
        twitter: 'mailersend',
      },
      tags: ['web2'],
      category: 'communication',
      type: 'email',
    },
    base: 'https://api.mailersend.com/v1',
    api: {
      email: {
        send: {
          interface: 'EmailSend',
          meta: {
            title: 'Send an email',
            description:
              'This endpoint allows you to send an asynchronous email. It returns the status of the email sent with an X-Message-Id that can be used to continuously query for the status using the Email API.',
            docs: 'https://developers.mailersend.com/api/v1/email.html#send-an-email',
          },
          base: 'https://api.mailersend.com/v1',
          method: 'POST',
          auth: {
            Authorization: { type: 'header:bearer' },
          },
          paths: [
            {
              name: 'email',
              type: 'static',
            },
          ],
          params: {},
        },
      },
    },
  }
}

export default MailerSend
