import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace CurrencyScoop {
  export type Entity = { core: any }
  export type Endpoint = {
    latest: ApiDescriptionEndpoint
    historical: ApiDescriptionEndpoint
    timeseries: ApiDescriptionEndpoint
    currencies: ApiDescriptionEndpoint
    convert: ApiDescriptionEndpoint
  }

  interface CurrencyScoopbase {
    'auth:api_key': string
  }

  export interface Latest extends CurrencyScoopbase, RequestParams {
    kind: 'currencyscoop.core.latest'
    'query:base': string
    'query:symbols'?: string
  }

  export interface Historical extends CurrencyScoopbase, RequestParams {
    kind: 'currencyscoop.core.historical'
    'query:base': string
    'query:date': string
    'query:symbols'?: string
  }

  export interface Timeseries extends CurrencyScoopbase, RequestParams {
    kind: 'currencyscoop.core.timeseries'
    'query:base': string
    'query:start_date': string
    'query:end_date': string
    'query:symbols'?: string
  }

  export interface Currencies extends CurrencyScoopbase, RequestParams {
    kind: 'currencyscoop.core.currencies'
    'query:type': 'fiat' | 'crypto'
  }

  export interface Convert extends CurrencyScoopbase, RequestParams {
    kind: 'currencyscoop.core.convert'
    'query:from': string
    'query:amount': string
    'query:to'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'currencyscoop',
      name: 'CurrencyScoop',
      url: 'https://currencyscoop.com',
      docs: 'https://currencyscoop.com/api-documentation',
      social: {
        twitter: 'currencyscoop',
        github: 'currencyscoop',
      },
      tags: ['web2'],
      category: 'finance',
      type: 'currency',
    },
    base: 'https://api.currencyscoop.com/v1',
    auth: {
      api_key: {
        type: 'query',
      },
    },
    api: {
      core: {
        latest: {
          interface: 'Latest',
          meta: {
            title: 'Latest',
            description: `This endpoint provides real-time rates of all currencies we support.`,
            docs: 'https://currencyscoop.com/api-documentation',
          },
          method: 'GET',
          paths: [
            {
              name: 'latest',
              type: 'static',
            },
          ],
        },
        historical: {
          interface: 'Historical',
          meta: {
            title: 'Historical',
            description: `This service provides historical exchange rate data for every past day all the way back to the year of 1996.`,
            docs: 'https://currencyscoop.com/api-documentation',
          },
          method: 'GET',
          paths: [
            {
              name: 'historical',
              type: 'static',
            },
          ],
        },
        timeseries: {
          interface: 'Timeseries',
          meta: {
            title: 'Timeseries',
            description: `If you have the startup or the professional plan, then you have access to the timeframe API service, you may request historical exchange rates for a time-period of your choice.`,
            docs: 'https://currencyscoop.com/api-documentation',
          },
          method: 'GET',
          paths: [
            {
              name: 'timeseries',
              type: 'static',
            },
          ],
        },
        currencies: {
          interface: 'Currencies',
          meta: {
            title: 'Currencies',
            description: `This endpoint gives you access to all the currencies we support together with the name of the currencies and the list of countries that use that currency.`,
            docs: 'https://currencyscoop.com/api-documentation',
          },
          method: 'GET',
          paths: [
            {
              name: 'currencies',
              type: 'static',
            },
          ],
        },
        convert: {
          interface: 'Convert',
          meta: {
            title: 'Convert',
            description: `Using the convertcodee> endpoint, you may request our API to perform a Single currency conversion on your behalf.`,
            docs: 'https://currencyscoop.com/api-documentation',
          },
          method: 'GET',
          paths: [
            {
              name: 'convert',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default CurrencyScoop
