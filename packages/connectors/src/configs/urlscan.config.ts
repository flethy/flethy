import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace UrlScan {
  export type Entity = { core: any }
  export type Endpoint = {
    submission: ApiDescriptionEndpoint
    result: ApiDescriptionEndpoint
    search: ApiDescriptionEndpoint
  }

  interface UrlScanBase {
    'auth:API-Key': string
  }

  export interface Submission extends UrlScanBase, RequestParams {
    kind: 'urlscan.core.submission'
    'body:url': string
    'body:visibility'?: 'public' | 'unlisted' | 'private'
    'body:customagent'?: string
    'body:referer'?: string
    'body:tags'?: string[]
    'body:overrideSafety'?: string
    'body:country'?: string
  }

  export interface Result extends UrlScanBase, RequestParams {
    kind: 'urlscan.core.result'
    'param:uuid': string
  }

  export interface Search extends UrlScanBase, RequestParams {
    kind: 'urlscan.core.search'
    'query:q': string
    'query:size'?: number
    'query:search_after'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'urlscan',
      name: 'UrlScan',
      url: 'https://urlscan.io',
      docs: 'https://urlscan.io/docs',
      pricing: 'https://urlscan.io/pricing/',
      signup: 'https://urlscan.io/user/signup',
      social: {
        twitter: 'urlscanio',
      },
      tags: ['web2'],
      category: 'utils',
      type: 'web-analyzer',
    },
    base: 'https://urlscan.io/api/v1',
    auth: {
      'API-Key': {
        type: 'header',
      },
    },
    api: {
      core: {
        submission: {
          interface: 'Submission',
          meta: {
            title: 'Submission API',
            description: `The submission API allows you to submit a URL to be scanned and set some options for the scan.`,
            docs: 'https://urlscan.io/docs/api/',
          },
          method: 'POST',
          paths: [
            {
              name: 'scan',
              type: 'static',
            },
          ],
        },
        result: {
          interface: 'Result',
          meta: {
            title: 'Result API',
            description: `Using the Scan ID received from the Submission API, you can use the Result API to poll for the scan. The most efficient approach would be to wait at least 10 seconds before starting to poll, and then only polling 2-second intervals with an eventual upper timeout in case the scan does not return.`,
            docs: 'https://urlscan.io/docs/api/',
          },
          method: 'GET',
          paths: [
            {
              name: 'result',
              type: 'static',
            },
            {
              name: 'uuid',
              type: 'param',
            },
          ],
        },
        search: {
          interface: 'Search',
          meta: {
            title: 'Search API',
            description: `You can use the same ElasticSearch syntax to search for scans as on the Search page. Each result has high-level metadata about the scan result and a link to the API for the full scan result.`,
            docs: 'https://urlscan.io/docs/api/',
          },
          method: 'GET',
          paths: [
            {
              name: 'search',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default UrlScan
