import { ApiDescription } from '../types/ApiDescription.type'

export type MailerSendEntity = { email }
export type MailerSendEndpoint = { send }
export interface MailerSendRequestOptionsAuth {
  Authorization: string
}
export interface MailerSendRequestOptionsParams {
  from: {
    email: string
    name?: string
  }
  to: Array<{
    email: string
    name?: string
  }>
  subject: string
  text: string
  html: string
  variables?: Array<{
    email: string
    substitutions: Array<{
      var: string
      value: string
    }>
  }>
}

export const MAILERSEND: ApiDescription<MailerSendEntity, MailerSendEndpoint> =
  {
    meta: {
      name: 'MailerSend',
      url: 'https://mailersend.com',
      docs: 'https://developers.mailersend.com/',
      config: 'https://app.mailersend.com/',
    },
    base: 'https://api.mailersend.com/v1',
    api: {
      email: {
        send: {
          meta: {
            title: 'Send an email',
            description:
              'This endpoint allows you to send an asynchronous email. It returns the status of the email sent with an X-Message-Id that can be used to continuously query for the status using the Email API.',
            docs: 'https://developers.mailersend.com/api/v1/email.html#send-an-email',
          },
          base: 'https://api.mailersend.com/v1',
          method: 'POST',
          auth: {
            Authorization: { type: 'header' },
          },
          paths: [
            {
              name: 'email',
              type: 'static',
            },
          ],
          params: {
            from: {
              type: 'any',
              paramType: 'body',
              required: true,
            },
            // eslint-disable-next-line id-length
            to: {
              type: 'any',
              paramType: 'body',
              required: true,
            },
            subject: {
              type: 'string',
              paramType: 'body',
              required: true,
            },
            text: {
              type: 'string',
              paramType: 'body',
              required: true,
            },
            html: {
              type: 'string',
              paramType: 'body',
              required: false,
            },
            variables: {
              type: 'any',
              paramType: 'body',
              required: false,
            },
          },
        },
      },
    },
  }
