import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Sidemail {
  export type Entity = { email: any }
  export type Endpoint = { send: ApiDescriptionEndpoint }

  interface SidemailBase {
    'auth:Authorization': string
  }

  export interface SendEmail extends SidemailBase, RequestParams {
    kind: 'sidemail.email.send'
    'body:toAddress': string
    'body:fromAddress': string
    'body:subject': string
    'body:fromName'?: string
    'body:replyToAddress'?: string
    'body:replyToName'?: string
    'body:templateId'?: string
    'body:templateName'?: string
    'body:templateProps'?: any
    'body:html'?: any
    'body:text'?: any
    'body:isOpenTracked'?: boolean
    'body:scheduledAt'?: Date
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'sidemail',
      name: 'Sidemail',
      url: 'https://sidemail.io/',
      docs: 'https://sidemail.io/docs',
      signup: 'https://client.sidemail.io/register',
      pricing: 'https://sidemail.io/pricing/',
      tags: ['web2'],
      category: 'marketing',
      type: 'email',
      social: {
        twitter: 'sidemailio',
      },
    },
    base: 'https://api.sidemail.io/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      email: {
        send: {
          interface: 'SendEmail',
          meta: {
            title: 'Send email',
            description: `Send email`,
            docs: 'https://sidemail.io/docs/api/email',
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

export default Sidemail
