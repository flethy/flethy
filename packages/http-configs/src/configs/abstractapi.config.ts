import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace AbstractApi {
  export type Entity = { publicHolidays: any }
  export type Endpoint = { get: ApiDescriptionEndpoint }

  export interface GetPublicHolidays extends RequestParams {
    kind: 'abstractapi.publicHolidays.get'
    'auth:api_key': string
    'query:country': string
    'query:year'?: number
    'query:month'?: number
    'query:day'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'abstractapi',
      name: 'AbstractApi',
      url: 'https://www.abstractapi.com/',
      docs: 'https://www.abstractapi.com/api',
      social: {
        twitter: 'abstractapi',
      },
      tags: ['web2'],
      category: 'utils',
      type: 'calendar',
    },
    base: '',
    api: {
      publicHolidays: {
        get: {
          interface: 'GetPublicHolidays',
          meta: {
            title: 'Holidays API',
            description: `The Public Holiday API allows you to gett the public, local, religious, and other holidays of a particular country.`,
            docs: 'https://app.abstractapi.com/api/holidays/documentation',
          },
          method: 'GET',
          base: 'https://holidays.abstractapi.com',
          auth: {
            api_key: {
              type: 'query',
            },
          },
          paths: [
            {
              name: 'v1',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default AbstractApi
