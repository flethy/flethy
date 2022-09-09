import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Geekflare {
  export type Entity = { core: any }
  export type Endpoint = {
    brokenLink: ApiDescriptionEndpoint
    dnsRecords: ApiDescriptionEndpoint
    lighthouse: ApiDescriptionEndpoint
    screenshot: ApiDescriptionEndpoint
    urlToPdf: ApiDescriptionEndpoint
  }

  interface GeekflareBase {
    'auth:x-api-key': string
  }

  export interface BrokenLink extends GeekflareBase, RequestParams {
    kind: 'geekflare.core.brokenLink'
    'body:url': string
    'body:proxyCountry': string
    'body:followRedirect': boolean
  }

  type DNSRecordType =
    | 'A'
    | 'AAAA'
    | 'CNAME'
    | 'MX'
    | 'CAA'
    | 'NS'
    | 'SOA'
    | 'SRV'
    | 'TXT'

  export interface DNSRecords extends GeekflareBase, RequestParams {
    kind: 'geekflare.core.dnsRecords'
    'body:url': string
    'body:types'?: DNSRecordType[]
  }

  type LighthouseParameters =
    | '--screenEmulation'
    | '--screenEmulation.disabled'
    | '--emulatedUserAgent'
    | '--only-audits'
    | '--only-categories'
    | '--throttling-method'
    | '--extra-headers'
    | '--chrome-flags'
    | '--no-emulatedUserAgent'
    | '--blocked-url-patterns'
    | '--output=json'
    | '--output=csv'
    | '--output=html'
    | '--preset'

  type DeviceType = 'desktop' | 'mobile' | 'tablet'

  export interface Lighthouse extends GeekflareBase, RequestParams {
    kind: 'geekflare.core.lighthouse'
    'body:url': string
    'body:device'?: DeviceType
    'body:parameters'?: LighthouseParameters[]
    'body:proxyCountry': string
    'body:followRedirect': boolean
  }

  export interface Screenshot extends GeekflareBase, RequestParams {
    kind: 'geekflare.core.screenshot'
    'body:url': string
    'body:device'?: DeviceType
    'body:proxyCountry?': string
  }

  export interface UrlToPdf extends GeekflareBase, RequestParams {
    kind: 'geekflare.core.urlToPdf'
    'body:url': string
    'body:device'?: DeviceType
    'body:proxyCountry'?: string
    'body:format'?:
      | 'letter'
      | 'legal'
      | 'a0'
      | 'a1'
      | 'a2'
      | 'a3'
      | 'a4'
      | 'a5'
      | 'a6'
    'body:orientation'?: 'portrait' | 'landscape'
    'body:margin'?: 'top' | 'bottom' | 'left' | 'right'
    'body:scale'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'geekflare',
      name: 'Geekflare',
      url: 'https://geekflare.com',
      docs: 'https://geekflare.com/api/docs',
      social: {
        twitter: 'geekflarehq',
      },
      tags: ['web2'],
      category: 'utils',
      type: 'web-scraping',
    },
    base: 'https://api.geekflare.com',
    auth: {
      'x-api-key': {
        type: 'header',
      },
    },
    api: {
      core: {
        brokenLink: {
          interface: 'BrokenLink',
          meta: {
            title: 'Broken Link',
            description: `The Broken Link Checker API checks if webpage contains any broken links.`,
            docs: 'https://geekflare.com/api/docs#broken-link',
          },
          method: 'POST',
          paths: [
            {
              name: 'brokenlink',
              type: 'static',
            },
          ],
        },
        dnsRecords: {
          interface: 'DNSRecords',
          meta: {
            title: 'DNS Records',
            description: `The DNS Records API pulls out and displays the DNS records of a given domain name.`,
            docs: 'https://geekflare.com/api/docs#dns-records',
          },
          method: 'POST',
          paths: [
            {
              name: 'dnsrecord',
              type: 'static',
            },
          ],
        },
        lighthouse: {
          interface: 'Lighthouse',
          meta: {
            title: 'Lighthouse',
            description: `The Lighthouse API provides access to the Google Lighthouse project as an API. Lighthouse is an audit tool for websites to score them on performance, accessibility, SEO, etc., while providing concrete improvement suggestions.`,
            docs: 'https://geekflare.com/api/docs#lighthouse',
          },
          method: 'POST',
          paths: [
            {
              name: 'lighthouse',
              type: 'static',
            },
          ],
        },
        screenshot: {
          interface: 'Screenshot',
          meta: {
            title: 'Screenshot',
            description: `The Screenshot API grabs a full-page screenshot of a website from a given device and location. This helps in knowing rendering correctness and performance of a website from the perspective of geographically distributed users having different devices.`,
            docs: 'https://geekflare.com/api/docs#screenshot',
          },
          method: 'POST',
          paths: [
            {
              name: 'screenshot',
              type: 'static',
            },
          ],
        },
        urlToPdf: {
          interface: 'UrlToPdf',
          meta: {
            title: 'PDF Generator',
            description: `The PDF Generator API converts any URL to PDF. You can set the file orientation to landscape or portrait, set margins, scale down, and it supports Proxy.`,
            docs: 'https://geekflare.com/api/docs#screenshot',
          },
          method: 'POST',
          paths: [
            {
              name: 'url2pdf',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Geekflare
