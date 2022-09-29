import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace TheCompaniesApi {
  export type Entity = {
    companies: any
    employees: any
    emails: any
    locations: any
  }
  export type Endpoint =
    | {
        search: ApiDescriptionEndpoint
        searchByName: ApiDescriptionEndpoint
        searchByDomain: ApiDescriptionEndpoint
        similar: ApiDescriptionEndpoint
      }
    | {
        detect: ApiDescriptionEndpoint
      }
    | {
        enrich: ApiDescriptionEndpoint
      }
    | {
        searchCities: ApiDescriptionEndpoint
      }

  interface TheCompaniesApiBase {
    'auth:Authorization': string
  }

  export interface SearchCompanies extends TheCompaniesApiBase, RequestParams {
    kind: 'thecompaniesapi.companies.search'
    'query:c1'?: string
    'query:c2'?: string
    'query:c3'?: string
    'query:c4'?: string
    'query:c5'?: string
    'query:c6'?: string
    'query:c7'?: string
    'query:c8'?: string
    'query:c9'?: string
    'query:c10'?: string
    'query:domainsToExclude[]'?: string
    'query:page'?: number
    'query:search'?: string
    'query:searchFields[]'?: string
    'query:size'?: number
  }

  export interface SearchCompaniesByName
    extends TheCompaniesApiBase,
      RequestParams {
    kind: 'thecompaniesapi.companies.searchByName'
    'param:name': string
    'query:size'?: number
  }

  export interface SearchCompaniesByDomain
    extends TheCompaniesApiBase,
      RequestParams {
    kind: 'thecompaniesapi.companies.searchByDomain'
    'param:domain': string
  }

  export interface FindSimilarCompanies
    extends TheCompaniesApiBase,
      RequestParams {
    kind: 'thecompaniesapi.companies.similar'
    'query:domains[]': string
    'query:page'?: number
    'query:size'?: number
  }

  export interface DetectEmployees extends TheCompaniesApiBase, RequestParams {
    kind: 'thecompaniesapi.employees.detect'
    'query:domains[]': string
    'query:e1'?: number
    'query:e2'?: number
    'query:e3'?: number
    'query:e4'?: number
    'query:e5'?: number
    'query:e6'?: number
    'query:e7'?: number
    'query:e8'?: number
    'query:e9'?: number
    'query:e10'?: number
  }

  export interface EnrichBusinessEmail
    extends TheCompaniesApiBase,
      RequestParams {
    kind: 'thecompaniesapi.emails.enrich'
    'param:email': string
  }

  export interface SearchCities extends TheCompaniesApiBase, RequestParams {
    kind: 'thecompaniesapi.locations.searchCities'
    'query:search'?: string
    'query:page'?: number
    'query:size'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'thecompaniesapi',
      name: 'TheCompaniesApi',
      url: 'https://www.thecompaniesapi.com/',
      docs: 'https://www.thecompaniesapi.com/api/',
      signup: 'https://www.thecompaniesapi.com/auth/login/',
      pricing: 'https://www.thecompaniesapi.com/pricing/',
      tags: ['web2'],
      category: 'data',
      type: 'brands',
      social: {
        twitter: 'thecompaniesapi',
        github: 'thecompaniesapi',
      },
    },
    base: 'https://api.thecompaniesapi.com/v1',
    auth: {
      Authorization: {
        type: 'header:basic:encoded',
      },
    },
    api: {
      companies: {
        search: {
          interface: 'SearchCompanies',
          meta: {
            title: 'Search Companies',
            description: `Search Companies`,
            docs: 'https://www.thecompaniesapi.com/api/#companies-search',
          },
          method: 'GET',
          paths: [
            {
              name: 'companies',
              type: 'static',
            },
          ],
        },
        searchByName: {
          interface: 'SearchCompaniesByName',
          meta: {
            title: 'Search Companies By Name',
            description: `Search Companies By Name`,
            docs: 'https://www.thecompaniesapi.com/api/#companies-search-by-name',
          },
          method: 'GET',
          paths: [
            {
              name: 'companies',
              type: 'static',
            },
            {
              name: 'by-name',
              type: 'static',
            },
            {
              name: 'name',
              type: 'param',
            },
          ],
        },
        searchByDomain: {
          interface: 'SearchCompaniesByDomain',
          meta: {
            title: 'Find a company by domain name',
            description: `Find a company by domain name`,
            docs: 'https://www.thecompaniesapi.com/api/#companies-fetch-by-domain',
          },
          method: 'GET',
          paths: [
            {
              name: 'companies',
              type: 'static',
            },
            {
              name: 'domain',
              type: 'param',
            },
          ],
        },
        similar: {
          interface: 'FindSimilarCompanies',
          meta: {
            title: 'Fetch similar companies',
            description: `Fetch similar companies`,
            docs: 'https://www.thecompaniesapi.com/api/#companies-fetch-similar',
          },
          method: 'GET',
          paths: [
            {
              name: 'companies',
              type: 'static',
            },
            {
              name: 'similar',
              type: 'static',
            },
          ],
        },
      },
      employees: {
        detect: {
          interface: 'DetectEmployees',
          meta: {
            title: 'Detect Employees',
            description: `Detect Employees`,
            docs: 'https://www.thecompaniesapi.com/api/#employees-detect',
          },
          method: 'GET',
          paths: [
            {
              name: 'employees',
              type: 'static',
            },
          ],
        },
      },
      emails: {
        enrich: {
          interface: 'EnrichBusinessEmail',
          meta: {
            title: 'Enrich a Business Email',
            description: `Enrich a Business Email`,
            docs: 'https://www.thecompaniesapi.com/api/#emails-enrich-business',
          },
          method: 'GET',
          paths: [
            {
              name: 'emails',
              type: 'static',
            },
            {
              name: 'email',
              type: 'param',
            },
          ],
        },
      },
      locations: {
        searchCities: {
          interface: 'SearchCities',
          meta: {
            title: 'Search Cities',
            description: `Search Cities`,
            docs: 'https://www.thecompaniesapi.com/api/#emails-enrich-business',
          },
          method: 'GET',
          paths: [
            {
              name: 'locations',
              type: 'static',
            },
            {
              name: 'cities',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default TheCompaniesApi
