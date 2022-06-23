import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Disify {
  export type Entity = { email: any; domain: any }
  export type Endpoint = {
    single: ApiDescriptionEndpoint
    mass: ApiDescriptionEndpoint
  }

  export interface CheckSingleEmail extends RequestParams {
    kind: 'disify.email.single'
    'param:email': string
  }

  export interface CheckSingleDomain extends RequestParams {
    kind: 'disify.domain.single'
    'param:domain': string
  }

  export interface CheckMassEmail extends RequestParams {
    kind: 'disify.email.mass'
    'param:emails': string
  }

  export interface CheckMassDomain extends RequestParams {
    kind: 'disify.domain.mass'
    'param:domains': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'disify',
      name: 'Disify',
      url: 'https://www.disify.com/',
      docs: 'https://docs.disify.com/',
      tags: ['web2'],
      category: 'utils',
      type: 'emailverification',
    },
    base: 'https://disify.com/api',
    api: {
      domain: {
        single: {
          interface: 'CheckSingleDomain',
          meta: {
            title: 'Check Domain',
            description: 'Check a Domain',
            docs: 'https://docs.disify.com/?php#single-email-address',
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
        mass: {
          interface: 'CheckMassDomain',
          meta: {
            title: 'Check Domains',
            description: 'Check a Domains',
            docs: 'https://docs.disify.com/?php#get-request-2',
          },
          method: 'GET',
          paths: [
            {
              name: 'domain',
              type: 'static',
            },
            {
              name: 'domains',
              type: 'param',
            },
            {
              name: 'mass',
              type: 'static',
            },
          ],
        },
      },
      email: {
        single: {
          interface: 'CheckSingleEmail',
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
        mass: {
          interface: 'CheckMassEmail',
          meta: {
            title: 'Check Email',
            description: 'Check a Emails',
            docs: 'https://docs.disify.com/?php#get-request-2',
          },
          method: 'GET',
          paths: [
            {
              name: 'email',
              type: 'static',
            },
            {
              name: 'emails',
              type: 'param',
            },
            {
              name: 'mass',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Disify
