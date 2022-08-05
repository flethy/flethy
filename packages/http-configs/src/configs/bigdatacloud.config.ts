import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace BigDataCloud {
  export type Entity = { free: any }
  export type Endpoint = { reverseGeoCodeClient: ApiDescriptionEndpoint }

  export interface ReverseGeoCodeClient extends RequestParams {
    kind: 'bigdatacloud.free.reverseGeoCodeClient'
    'query:latitude'?: string
    'query:longitude'?: string
    'query:localityLanguage'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'bigdatacloud',
      name: 'BigDataCloud',
      url: 'https://www.bigdatacloud.com',
      docs: 'https://www.bigdatacloud.com/docs',
      social: {
        twitter: 'BigDataCloud',
        github: 'bigdatacloudapi',
      },
      tags: ['web2'],
      category: 'utils',
      type: 'other',
    },
    base: 'https://api.bigdatacloud.net',
    api: {
      free: {
        reverseGeoCodeClient: {
          interface: 'ReverseGeoCodeClient',
          meta: {
            title: 'Client Side Reverse Geocoding to City API',
            description: `Client Side Reverse Geocoding to City API`,
            docs: 'https://www.bigdatacloud.com/docs/api/free-reverse-geocode-to-city-api',
          },
          method: 'GET',
          paths: [
            {
              name: 'data',
              type: 'static',
            },
            {
              name: 'reverse-geocode-client',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default BigDataCloud
