import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace WhoIsXMLApi {
  export type Entity = { core: any }
  export type Endpoint = { domainavailability: ApiDescriptionEndpoint }

  export interface WhoIsXMLApiBase {
    'auth:apiKey': string
  }

  export interface DomainAvailability extends WhoIsXMLApiBase, RequestParams {
    kind: 'whoisxmlapi.core.domainavailability'
    'query:domainName': string
    'query:mode'?: 'DNS_AND_WHOIS' | 'DNS_ONLY'
    'query:credits'?: 'DA' | 'WHOIS'
    'query:outputFormat'?: 'JSON' | 'XML'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'whoisxmlapi',
      name: 'WhoIsXMLApi',
      url: 'https://whoisxmlapi.com',
      docs: 'https://whoisxmlapi.com',
      social: {
        twitter: 'whoisxmlapi',
        github: 'whois-api-llc',
      },
      tags: ['web2'],
      category: 'utils',
      type: 'domains',
    },
    base: '',
    auth: {
      apiKey: {
        type: 'query',
      },
    },
    api: {
      core: {
        domainavailability: {
          interface: 'DomainAvailability',
          base: 'https://domain-availability.whoisxmlapi.com/api/v1',
          meta: {
            title: 'Domain Availability API',
            description: `Domain Availability API helps you check whether a domain name is available for registration quickly and accurately.`,
            docs: 'https://domain-availability.whoisxmlapi.com/api/documentation/making-requests',
          },
          method: 'GET',
        },
      },
    },
  }
}

export default WhoIsXMLApi
