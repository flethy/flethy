import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace RestCountries {
  export type Entity = { core: any }
  export type Endpoint = {
    all: ApiDescriptionEndpoint
    fullName: ApiDescriptionEndpoint
    code: ApiDescriptionEndpoint
    listCodes: ApiDescriptionEndpoint
  }

  export interface GetAll extends RequestParams {
    kind: 'restcountries.core.all'
  }

  export interface GetByFullName extends RequestParams {
    kind: 'restcountries.core.fullName'
    'param:name': string
    'query:fullText'?: boolean
  }

  export interface GetByCode extends RequestParams {
    kind: 'restcountries.core.fullName'
    'param:code': string
  }

  export interface ListOfCodes extends RequestParams {
    kind: 'restcountries.core.fullName'
    'query:codes': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'restcountries',
      name: 'RestCountries',
      url: 'https://restcountries.com',
      docs: 'https://restcountries.com',
      tags: ['web2'],
      category: 'data',
      type: 'geo',
      social: {},
    },
    base: 'https://restcountries.com/v3.1',
    api: {
      core: {
        all: {
          interface: 'GetAll',
          meta: {
            title: 'All',
            description: `All`,
            docs: 'https://restcountries.com/#api-endpoints-v3-all',
          },
          method: 'GET',
          paths: [
            {
              name: 'all',
              type: 'static',
            },
          ],
        },
        fullName: {
          interface: 'GetByFullName',
          meta: {
            title: 'Full Name',
            description: `Full Name`,
            docs: 'https://restcountries.com/#api-endpoints-v3-full-name',
          },
          method: 'GET',
          paths: [
            {
              name: 'name',
              type: 'static',
            },
            {
              name: 'name',
              type: 'param',
            },
          ],
        },
        code: {
          interface: 'GetByCode',
          meta: {
            title: 'Code',
            description: `Code`,
            docs: 'https://restcountries.com/#api-endpoints-v3-code',
          },
          method: 'GET',
          paths: [
            {
              name: 'alpha',
              type: 'static',
            },
            {
              name: 'code',
              type: 'param',
            },
          ],
        },
        listCodes: {
          interface: 'ListOfCodes',
          meta: {
            title: 'List of Codes',
            description: `List of Codes`,
            docs: 'https://restcountries.com/#api-endpoints-v3-list-of-codes',
          },
          method: 'GET',
          paths: [
            {
              name: 'alpha',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default RestCountries
