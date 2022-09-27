import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace PeopleDataLabs {
  export type Entity = { company: any }
  export type Endpoint = { enrich: ApiDescriptionEndpoint }

  interface PeopleDataLabsBase {
    'auth:X-Api-Key': string
  }

  export interface CompanyEnrichment extends PeopleDataLabsBase, RequestParams {
    kind: 'peopledatalabs.company.enrich'
    'query:name'?: string
    'query:profile'?: string
    'query:ticker'?: string
    'query:website'?: string
    'query:location'?: string
    'query:locality'?: string
    'query:region'?: string
    'query:country'?: string
    'query:street_address'?: string
    'query:postal_code'?: string
    'query:data_include'?: string
    'query:titlecase'?: boolean
    'query:include_if_matched'?: boolean
    'query:min_likelihood'?: number
    'query:required'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'peopledatalabs',
      name: 'PeopleDataLabs',
      url: 'https://www.peopledatalabs.com/',
      docs: 'https://docs.peopledatalabs.com/docs',
      signup: 'https://dashboard.peopledatalabs.com/signup',
      pricing: 'https://www.peopledatalabs.com/pricing',
      tags: ['web2'],
      category: 'data',
      type: 'brands',
      social: {
        twitter: 'PeopleDataLabs',
      },
    },
    base: 'https://api.peopledatalabs.com/v5',
    auth: {
      'X-Api-Key': {
        type: 'header',
      },
    },
    api: {
      company: {
        enrich: {
          interface: 'CompanyEnrichment',
          meta: {
            title: 'Company Enrichment API',
            description: `Company Enrichment API`,
            docs: 'https://docs.peopledatalabs.com/docs/reference-company-enrichment-api',
          },
          method: 'GET',
          paths: [
            {
              name: 'company',
              type: 'static',
            },
            {
              name: 'enrich',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default PeopleDataLabs
