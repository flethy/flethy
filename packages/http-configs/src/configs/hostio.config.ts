import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace HostIo {
  export type Entity = { core: any }
  export type Endpoint = {
    web: ApiDescriptionEndpoint
    dns: ApiDescriptionEndpoint
    related: ApiDescriptionEndpoint
    full: ApiDescriptionEndpoint
    byFieldValue: ApiDescriptionEndpoint
  }

  export interface HostIoBase {
    'auth:Authorization': string
  }

  export interface GetDomain extends HostIoBase, RequestParams {
    kind: 'hostio.core.web'
    'param:domain': string
  }

  export interface GetDns extends HostIoBase, RequestParams {
    kind: 'hostio.core.dns'
    'param:domain': string
  }

  export interface GetRelated extends HostIoBase, RequestParams {
    kind: 'hostio.core.related'
    'param:domain': string
  }

  export interface GetFull extends HostIoBase, RequestParams {
    kind: 'hostio.core.full'
    'param:domain': string
  }

  export interface GetByFieldValue extends HostIoBase, RequestParams {
    kind: 'hostio.core.byFieldValue'
    'param:field':
      | 'ip'
      | 'ns'
      | 'mx'
      | 'asn'
      | 'backlinks'
      | 'redirects'
      | 'adsense'
      | 'facebook'
      | 'twitter'
      | 'instagram'
      | 'gtm'
      | 'googleanalytics'
      | 'email'
    'param:value': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'hostio',
      name: 'HostIo',
      url: 'https://host.io',
      docs: 'https://host.io/docs',
      social: {
        twitter: 'host',
      },
      tags: ['web2'],
      category: 'utils',
      type: 'indexer',
    },
    base: 'https://host.io/api',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      core: {
        web: {
          interface: 'GetDomain',
          meta: {
            title: 'GetDomain',
            description: `Metadata scraped from a domain homepage.`,
            docs: 'https://host.io/docs',
          },
          method: 'GET',
          paths: [
            {
              name: 'web',
              type: 'static',
            },
            {
              name: 'domain',
              type: 'param',
            },
          ],
        },
        dns: {
          interface: 'GetDns',
          meta: {
            title: 'GetDns',
            description: `Get all the DNS records stored for a domain.`,
            docs: 'https://host.io/docs',
          },
          method: 'GET',
          paths: [
            {
              name: 'dns',
              type: 'static',
            },
            {
              name: 'domain',
              type: 'param',
            },
          ],
        },
        related: {
          interface: 'GetRelated',
          meta: {
            title: 'GetRelated',
            description: `Get a count of the number of related domains for all supported lookups we offer.`,
            docs: 'https://host.io/docs',
          },
          method: 'GET',
          paths: [
            {
              name: 'related',
              type: 'static',
            },
            {
              name: 'domain',
              type: 'param',
            },
          ],
        },
        full: {
          interface: 'GetFull',
          meta: {
            title: 'GetFull',
            description: `A single endpoint that includes the data from /api/web, /api/dns, /api/related and IPinfo.`,
            docs: 'https://host.io/docs',
          },
          method: 'GET',
          paths: [
            {
              name: 'full',
              type: 'static',
            },
            {
              name: 'domain',
              type: 'param',
            },
          ],
        },
        byFieldValue: {
          interface: 'GetByFieldValue',
          meta: {
            title: 'GetByFieldValue',
            description: `Get all domains associated with :field, and a count of the total. The :value should be according to the :field and not necessarily a domain.`,
            docs: 'https://host.io/docs',
          },
          method: 'GET',
          paths: [
            {
              name: 'domains',
              type: 'static',
            },
            {
              name: 'field',
              type: 'param',
            },
            {
              name: 'value',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default HostIo
