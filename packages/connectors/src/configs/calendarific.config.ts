import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Calendarific {
  export type Entity = { core: any }
  export type Endpoint = {
    holidays: ApiDescriptionEndpoint
    languages: ApiDescriptionEndpoint
    countries: ApiDescriptionEndpoint
  }

  export interface CalendarificBase {
    'auth:api_key': string
  }

  export interface GetHolidays extends CalendarificBase, RequestParams {
    kind: 'calendarific.core.holidays'
    'query:country': string
    'query:year': number
    'query:day'?: number
    'query:month'?: number
    'query:location'?: string
    'query:type'?: 'national' | 'local' | 'religious' | 'observance'
    'query:language'?: string
    'query:uuid'?: boolean
  }

  export interface GetCountries extends CalendarificBase, RequestParams {
    kind: 'calendarific.core.countries'
  }

  export interface GetLanguages extends CalendarificBase, RequestParams {
    kind: 'calendarific.core.languages'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'calendarific',
      name: 'Calendarific',
      url: 'https://calendarific.com',
      docs: 'https://calendarific.com/api-documentation',
      signup: 'https://calendarific.com/signup',
      pricing: 'https://calendarific.com/pricing',
      tags: ['web2'],
      social: {
        twitter: 'calendarific',
        github: 'calendarific',
      },
      category: 'utils',
      type: 'calendar',
    },
    base: 'https://calendarific.com/api/v2',
    auth: {
      api_key: {
        type: 'query',
      },
    },
    api: {
      core: {
        holidays: {
          interface: 'GetHolidays',
          meta: {
            title: 'Holidays API',
            description: `This provides a list of holidays based on the parameters passed to it.`,
            docs: 'https://calendarific.com/api-documentation',
          },
          method: 'GET',
          paths: [
            {
              name: 'holidays',
              type: 'static',
            },
          ],
        },
        countries: {
          interface: 'GetCountries',
          meta: {
            title: 'Countries API',
            description: `This endpoint provides a list of countries and languages that we support. This is useful for getting an index of all countries and the ISO codes programmatically.`,
            docs: 'https://calendarific.com/api-documentation',
          },
          method: 'GET',
          paths: [
            {
              name: 'countries',
              type: 'static',
            },
          ],
        },
        languages: {
          interface: 'GetLanguages',
          meta: {
            title: 'Languages API',
            description: `This endpoint provides the list of languages we support. Please note that not all holidays are specified in the language listed. If a holiday is not available in the specified language, it defaults to the official language of the country or english in most cases. This is useful for getting an index of all languages and the ISO codes programmatically.`,
            docs: 'https://calendarific.com/api-documentation',
          },
          method: 'GET',
          paths: [
            {
              name: 'languages',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Calendarific
