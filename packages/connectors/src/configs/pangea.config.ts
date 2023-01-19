import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Pangea {
  export type Entity = { embargo: any; url: any }
  export type Endpoint =
    | {
        checkIp: ApiDescriptionEndpoint
        isoCheck: ApiDescriptionEndpoint
      }
    | {
        lookup: ApiDescriptionEndpoint
      }

  interface PangeaBase {
    'auth:Authorization': string
    'subdomain:csp': 'aws' | 'gcp'
    'subdomain:region': 'eu' | 'us'
  }

  export interface CheckIP extends PangeaBase, RequestParams {
    kind: 'pangea.embargo.checkIp'
    'body:ip': string
  }

  export interface IsoCheck extends PangeaBase, RequestParams {
    kind: 'pangea.embargo.isoCheck'
    'body:iso_code': string
  }

  export interface LookupUrl extends PangeaBase, RequestParams {
    kind: 'pangea.url.lookup'
    'body:url': string
    'body:verbose'?: boolean
    'body:raw'?: boolean
    'body:provider': 'crowdstrike' | string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'pangea',
      name: 'Pangea',
      url: 'https://pangea.cloud/',
      docs: 'https://pangea.cloud/docs/api/',
      signup: 'https://login.aws.us.pangea.cloud/signup',
      pricing: 'https://pangea.cloud/pricing/',
      tags: ['web2'],
      category: 'infra',
      type: 'other',
      social: {
        twitter: 'pangeacyber',
        github: 'pangeacyber',
      },
    },
    base: [
      {
        id: 'default',
        url: 'https://embargo.subdomain:csp.subdomain:region.pangea.cloud/v1',
      },
    ],
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      embargo: {
        checkIp: {
          interface: 'CheckIP',
          meta: {
            title: 'Check IP',
            description: 'Check IP',
            docs: 'https://pangea.cloud/docs/api/embargo#check-ip',
          },
          method: 'POST',
          paths: [
            {
              name: 'ip',
              type: 'static',
            },
            {
              name: 'check',
              type: 'static',
            },
          ],
        },
        isoCheck: {
          interface: 'IsoCheck',
          meta: {
            title: 'ISO Code Check',
            description: 'ISO Code Check',
            docs: 'https://pangea.cloud/docs/api/embargo#iso-code-check',
          },
          method: 'POST',
          paths: [
            {
              name: 'iso',
              type: 'static',
            },
            {
              name: 'check',
              type: 'static',
            },
          ],
        },
      },
      url: {
        lookup: {
          interface: 'LookupUrl',
          meta: {
            title: 'Look up a URL',
            description: 'Look up a URL',
            docs: 'https://pangea.cloud/docs/api/url-intel#look-up-a-url',
          },
          method: 'POST',
          base: [
            {
              id: 'default',
              url: 'https://url-intel.subdomain:csp.subdomain:region.pangea.cloud/v1',
            },
          ],
          paths: [
            {
              name: 'lookup',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Pangea
