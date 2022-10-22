import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace MailCheckAi {
  export type Entity = { domain: any; email: any }
  export type Endpoint = { check: ApiDescriptionEndpoint }

  export interface CheckDomain extends RequestParams {
    kind: 'mailcheckai.domain.check'
    'param:domain': string
    'auth:Authorization'?: string
  }

  export interface CheckEmail extends RequestParams {
    kind: 'mailcheckai.email.check'
    'param:email': string
    'auth:Authorization'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'mailcheckai',
      name: 'MailCheckAi',
      url: 'https://www.mailcheck.ai/',
      docs: 'https://docs.mailcheck.ai/',
      pricing: 'https://www.mailcheck.ai/#pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'emailverification',
    },
    base: 'https://api.mailcheck.ai',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      domain: {
        check: {
          interface: 'CheckDomain',
          meta: {
            title: 'Check Domain',
            description: 'Check a Domain',
            docs: 'https://docs.mailcheck.ai/reference/domain-endpoint',
          },
          method: 'GET',
          paths: [
            {
              name: 'domain',
              type: 'static',
            },
            {
              name: 'domain',
              type: 'param',
            },
          ],
        },
      },
      email: {
        check: {
          interface: 'CheckEmail',
          meta: {
            title: 'Check E-Mail',
            description: 'Check an E-Mail',
            docs: 'https://docs.mailcheck.ai/reference/email-endpoint',
          },
          method: 'GET',
          paths: [
            {
              name: 'email',
              type: 'static',
            },
            {
              name: 'email',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default MailCheckAi
