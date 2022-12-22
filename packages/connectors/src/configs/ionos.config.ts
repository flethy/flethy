import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Ionos {
  export type Entity = { dns: any; domains: any; ssl: any }
  export type Endpoint =
    | { listZones: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint }

  interface IonosBase {
    'auth:X-API-Key'?: {
      prefix: string
      secret: string
    }
  }

  export interface ListDnsZones extends IonosBase, RequestParams {
    kind: 'ionos.dns.listZones'
  }

  export interface ListDomains extends IonosBase, RequestParams {
    kind: 'ionos.domains.list'
    'query:offset'?: number
    'query:limit'?: number
    'query:tld'?: string
    'query:pendingProvisioning'?: boolean
    'query:label'?: string
    'query:labelPrefix'?: string
    'query:name'?: string
    'query:includeDomainStatus'?: boolean
    'query:sortBy'?: 'DOMAIN_NAME' | 'PROVISIONING_START_DATE'
    'query:direction'?: 'ASC' | 'DESC'
  }

  export interface ListSslCertificates extends IonosBase, RequestParams {
    kind: 'ionos.ssl.list'
    'query:page'?: number
    'query:size'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'ionos',
      name: 'Ionos',
      url: 'https://www.ionos.com/',
      docs: 'https://developer.hosting.ionos.de/docs',
      tags: ['web2'],
      category: 'infra',
      type: 'hosting',
      social: {
        twitter: 'ionos_com',
      },
    },
    base: 'https://api.hosting.ionos.com',
    auth: {
      'X-API-Key': {
        type: 'header:custom',
        custom: {
          concat: {
            keys: ['prefix', 'secret'],
            separator: '.',
          },
        },
      },
    },
    api: {
      dns: {
        listZones: {
          interface: 'ListDnsZones',
          meta: {
            title: 'List Zones',
            description: `Returns list of customer zones.`,
            docs: 'https://developer.hosting.ionos.com/docs/dns',
          },
          method: 'GET',
          paths: [
            {
              name: 'dns',
              type: 'static',
            },
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'zones',
              type: 'static',
            },
          ],
        },
      },
      domains: {
        list: {
          interface: 'ListDomains',
          meta: {
            title: 'List Domains',
            description: `List Domains`,
            docs: 'https://developer.hosting.ionos.com/docs/domains',
          },
          method: 'GET',
          paths: [
            {
              name: 'domains',
              type: 'static',
            },
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'domainitems',
              type: 'static',
            },
          ],
        },
      },
      ssl: {
        list: {
          interface: 'ListSslCertificates',
          meta: {
            title: 'List SSL Certificates',
            description: `List SSL Certificates`,
            docs: 'https://developer.hosting.ionos.com/docs/ssl',
          },
          method: 'GET',
          paths: [
            {
              name: 'ssl',
              type: 'static',
            },
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'certificates',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Ionos
