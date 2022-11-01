import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Festdays {
  export type Entity = { core: any }
  export type Endpoint = { holidays: ApiDescriptionEndpoint }

  interface FestdaysBase {
    'auth:Authorization': string
  }

  export interface Holidays extends FestdaysBase, RequestParams {
    kind: 'festdays.core.holidays'
    'query:search'?: string
    'query:country'?: string
    'query:year'?: number
    'query:month'?: number
    'query:weekday'?: number
    'query:longweekend'?: boolean
    'query:lang'?: string
    'query:type'?:
      | 'local-holiday'
      | 'local-bank-holiday'
      | 'bank-holiday'
      | 'local-observance'
      | 'observance'
      | 'government-public-holiday'
      | 'public-sector-holiday'
      | 'state-holiday'
      | 'clock-change'
      | 'christian-festivity'
      | 'Jewish-festivity'
      | 'jewish-festivity'
      | 'muslim-festivity'
      | 'hindu-festivity'
      | 'season-change'
      | 'national-day'
      | 'regional-day'
      | 'part-day-holiday'
      | 'restricted-trading-day'
      | 'half-day-restricted-trading-day'
      | 'other-holiday'
      | 'religious'
    'query:region'?: string
    'query:city'?: string
    'query:ip'?: number
    'query:currency'?: number
    'query:phoneprefix'?: string
    'query:lat'?: number
    'query:lon'?: number
    'query:after'?: string
    'query:before'?: string
    'query:pretty'?: boolean
    'query:format'?: 'json' | 'xml' | 'csv'
    'query:page'?: number
    'query:size'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'festdays',
      name: 'Festdays',
      url: 'https://festdays.dev',
      docs: 'https://festdays.dev/docs',
      signup: 'https://festdays.dev',
      pricing: 'https://festdays.dev/#pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'calendar',
      social: {},
    },
    base: 'https://api.festdays.dev/v1',
    auth: {
      Authorization: {
        type: 'header',
      },
    },
    api: {
      core: {
        holidays: {
          interface: 'Holidays',
          meta: {
            title: 'Holidays',
            description: `Get holiday data, optionally filtered by country, year, category, region or premium filters such as city, user IP address, geo coordinates or currency (Enterprise plan required).`,
            docs: 'https://festdays.dev/docs#tag/Holidays/operation/getHolidays',
          },
          method: 'GET',
          paths: [
            {
              name: 'holidays',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Festdays
