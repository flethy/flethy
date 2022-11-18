import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace PurpleAir {
  export type Entity = { sensors: any }
  export type Endpoint = {
    get: ApiDescriptionEndpoint
    getAll: ApiDescriptionEndpoint
  }

  interface PurpleAirBase {
    'auth:X-API-Key': string
  }

  export interface GetSensorsData extends PurpleAirBase, RequestParams {
    kind: 'purpleair.sensors.getAll'
    'query:fields': string
    'query:location_type'?: number
    'query:show_only'?: string
    'query:modified_since'?: number
    'query:max_age'?: number
    'query:nwlng'?: number
    'query:nwlat'?: number
    'query:selng'?: number
    'query:selat'?: number
  }

  export interface GetSensorData extends PurpleAirBase, RequestParams {
    kind: 'purpleair.sensors.getAll'
    'param:sensorIndex': string
    'query:fields': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'purpleair',
      name: 'PurpleAir',
      url: 'https://www2.purpleair.com/',
      docs: 'https://api.purpleair.com/',
      tags: ['web2'],
      category: 'data',
      type: 'air-quality',
      social: {
        twitter: 'ThePurpleAir',
        instagram: 'thepurpleair',
      },
    },
    base: 'https://api.purpleair.com/v1',
    auth: {
      'X-API-Key': {
        type: 'header',
      },
    },
    api: {
      sensors: {
        getAll: {
          interface: 'GetSensorsData',
          meta: {
            title: 'Sensors - Get Sensors Data',
            description: `Retrieves a list with the latest data of multiple sensors matching the provided parameters.`,
            docs: 'https://api.purpleair.com/#api-sensors-get-sensors-data',
          },
          method: 'GET',
          paths: [
            {
              name: 'sensors',
              type: 'static',
            },
          ],
        },
        get: {
          interface: 'GetSensorData',
          meta: {
            title: 'Sensors - Get Sensor Data',
            description: `Retrieves the latest data of a single sensor matching the provided sensor_index.`,
            docs: 'https://api.purpleair.com/#api-sensors-get-sensor-data',
          },
          method: 'GET',
          paths: [
            {
              name: 'sensors',
              type: 'static',
            },
            {
              name: 'sensorIndex',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default PurpleAir
