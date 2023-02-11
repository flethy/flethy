import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace IPApi {
  export type Entity = { core: any }
  export type Endpoint = {
    completeLocation: ApiDescriptionEndpoint
    completeLocationSpecificField: ApiDescriptionEndpoint
  }

  export interface CompleteLocation extends RequestParams {
    kind: 'ipapi.core.completeLocation'
    'param:ip': string
    'param:format': 'json' | 'jsonp' | 'xml' | 'csv' | 'yaml'
  }

  export interface CompleteLocationSpecificField extends RequestParams {
    kind: 'ipapi.core.completeLocationSpecificField'
    'param:ip': string
    'param:field':
      | 'city'
      | 'region'
      | 'region_code'
      | 'country'
      | 'country_name'
      | 'continent_code'
      | 'in_eu'
      | 'postal'
      | 'latitude'
      | 'longitude'
      | 'latlong'
      | 'timezone'
      | 'utc_offset'
      | 'languages'
      | 'country_calling_code'
      | 'currency'
      | 'asn'
      | 'org'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'ipapi',
      name: 'IPApi',
      url: 'https://ipapi.co/',
      docs: 'https://ipapi.co/api/',
      signup: 'https://ipapi.co/free/',
      pricing: 'https://ipapi.co/#pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'ip-lookup',
      social: {
        twitter: 'ipapi_co',
        github: 'ipapi-co',
      },
    },
    base: 'https://ipapi.co',
    api: {
      core: {
        completeLocation: {
          interface: 'CompleteLocation',
          meta: {
            title: 'Location of a specific IP',
            description: 'Location of a specific IP',
            docs: 'https://ipapi.co/api',
          },
          method: 'GET',
          paths: [
            {
              name: 'ip',
              type: 'param',
            },
            {
              name: 'format',
              type: 'param',
            },
          ],
        },
        completeLocationSpecificField: {
          interface: 'CompleteLocationSpecificField',
          meta: {
            title: 'Specific Location Field of a specific IP',
            description: 'Specific Location Field of a specific IP',
            docs: 'https://ipapi.co/api',
          },
          method: 'GET',
          paths: [
            {
              name: 'ip',
              type: 'param',
            },
            {
              name: 'field',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default IPApi
