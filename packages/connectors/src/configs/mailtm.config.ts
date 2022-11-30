import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace MailTM {
  export type Entity = { auth: any; core: any }
  export type Endpoint =
    | { token: ApiDescriptionEndpoint }
    | { domains: ApiDescriptionEndpoint; domainById: ApiDescriptionEndpoint }

  interface MailTMBase {
    'auth:Authorization': string
  }

  export interface GetToken extends RequestParams {
    kind: 'mailtm.auth.token'
    'body:address': string
    'body:password': string
  }

  export interface GetDomains extends MailTMBase, RequestParams {
    kind: 'mailtm.core.domains'
    'query:page'?: number
  }

  export interface GetDomainbyId extends MailTMBase, RequestParams {
    kind: 'mailtm.core.domainById'
    'param:id': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'mailtm',
      name: 'MailTM',
      url: 'https://mail.tm/',
      docs: 'https://docs.mail.tm/',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
      social: {
        twitter: 'MailtmOfficial',
      },
    },
    base: 'https://api.mail.tm',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      auth: {
        token: {
          interface: 'GetToken',
          meta: {
            title: 'Authentication',
            description: `Authentication`,
            docs: 'https://docs.mail.tm/#authentication',
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
      core: {
        domains: {
          interface: 'GetDomains',
          meta: {
            title: 'Domains',
            description: `Domains`,
            docs: 'https://docs.mail.tm/#get-domains',
          },
          method: 'GET',
          paths: [
            {
              name: 'domains',
              type: 'static',
            },
          ],
        },
        domainById: {
          interface: 'GetDomainbyId',
          meta: {
            title: 'Domain by Id',
            description: `Domain by Id`,
            docs: 'https://docs.mail.tm/#get-domainsid',
          },
          method: 'GET',
          paths: [
            {
              name: 'domains',
              type: 'static',
            },
            {
              name: 'id',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default MailTM
