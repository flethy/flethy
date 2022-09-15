import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Nasa {
  export type Entity = { planetary: any }
  export type Endpoint = { apod: ApiDescriptionEndpoint }

  interface NasaBase {
    'auth:api_key': string
  }

  export interface AstronomyPictureOfTheDay extends NasaBase, RequestParams {
    kind: 'nasa.planetary.apod'
    'query:date'?: string
    'query:start_date'?: string
    'query:end_date'?: string
    'query:count'?: number
    'query:thumbs'?: boolean
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'nasa',
      name: 'Nasa',
      url: 'https://api.nasa.gov/',
      docs: 'https://api.nasa.gov/',
      tags: ['web2'],
      category: 'science',
      type: 'astronomy',
      social: {
        twitter: 'opennasa',
        github: 'nasa',
      },
    },
    base: 'https://api.nasa.gov',
    auth: {
      api_key: {
        type: 'query',
      },
    },
    api: {
      planetary: {
        apod: {
          interface: 'AstronomyPictureOfTheDay',
          meta: {
            title: 'APOD',
            description: `Astronomy Picture Of The Day`,
            docs: 'https://api.nasa.gov/',
          },
          method: 'GET',
          paths: [
            {
              name: 'planetary',
              type: 'static',
            },
            {
              name: 'apod',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Nasa
