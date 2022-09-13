import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Brandfetch {
  export type Entity = { brands: any }
  export type Endpoint = { byDomainOrId: ApiDescriptionEndpoint }

  export interface BrandfetchBase {
    'auth:Authorization': string
  }

  export interface BrandByDomainOrId extends BrandfetchBase, RequestParams {
    kind: 'brandfetch.brands.byDomainOrId'
    'param:domainOrId': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'brandfetch',
      name: 'Brandfetch',
      url: 'https://brandfetch.com',
      docs: 'https://docs.brandfetch.com',
      signup: 'https://brandfetch.com/register',
      pricing: 'https://brandfetch.com/developers/pricing',
      social: {
        twitter: 'brandfetch',
      },
      tags: ['web2'],
      category: 'data',
      type: 'brands',
    },
    base: 'https://api.brandfetch.io/v2',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      brands: {
        byDomainOrId: {
          interface: 'BrandByDomainOrId',
          meta: {
            title: 'Brand API',
            description: `Brand API gives you programmatic access to every organization's visual assets whether it’s their logos, colors, fonts, and more. It powers startups to Fortune 500 companies, and is built over AWS Lambda for stability and scalability.`,
            docs: 'https://docs.brandfetch.com/#e2e11a14-c3d6-413e-8dc1-5b6c05dea1a3',
          },
          method: 'GET',
          paths: [
            {
              name: 'brands',
              type: 'static',
            },
            {
              name: 'domainOrId',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Brandfetch
