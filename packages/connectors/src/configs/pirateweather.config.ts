import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace PirateWeather {
  export type Entity = { core: any }
  export type Endpoint = {
    forecast: ApiDescriptionEndpoint
    timemachine: ApiDescriptionEndpoint
  }

  interface PirateWeatherBase {
    'auth:api-key': string
  }

  export interface Forecast extends PirateWeatherBase, RequestParams {
    kind: 'pirateweather.core.forecast'
    'param:location': string // [latitude],[longitude] optional ,[time]
    'query:units'?: 'si' | 'us' | 'ca' | 'uk'
    'query:extend'?: string
    'query:exclude'?: string
    'query:lang'?: string
  }

  export interface TimeMachine extends PirateWeatherBase, RequestParams {
    kind: 'pirateweather.core.timemachine'
    'param:location': string // [latitude],[longitude] optional ,[time]
    'query:units'?: 'si' | 'us' | 'ca' | 'uk'
    'query:extend'?: string
    'query:exclude'?: string
    'query:lang'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'pirateweather',
      name: 'PirateWeather',
      url: 'https://pirateweather.net/',
      docs: 'https://pirateweather.net/',
      signup: 'https://pirateweather.net/',
      pricing: 'https://pirateweather.net/',
      tags: ['web2'],
      category: 'utils',
      type: 'weather',
      social: {},
    },
    base: [
      {
        id: 'default',
        url: 'https://api.pirateweather.net',
      },
      {
        id: 'dev',
        url: 'https://dev.pirateweather.net',
      },
    ],
    auth: {
      'api-key': {
        type: 'path',
      },
    },
    api: {
      core: {
        forecast: {
          interface: 'Forecast',
          meta: {
            title: 'Forecast',
            description: 'Forecast',
            docs: 'http://docs.pirateweather.net/en/latest/API/',
          },
          method: 'GET',
          paths: [
            {
              name: 'forecast',
              type: 'static',
            },
            {
              name: 'api-key',
              type: 'auth',
            },
            {
              name: 'location',
              type: 'param',
            },
          ],
        },
        timemachine: {
          interface: 'TimeMachine',
          meta: {
            title: 'TimeMachine',
            description: 'TimeMachine',
            docs: 'http://docs.pirateweather.net/en/latest/API/',
          },
          method: 'GET',
          base: 'https://timemachine.pirateweather.net',
          paths: [
            {
              name: 'forecast',
              type: 'static',
            },
            {
              name: 'api-key',
              type: 'auth',
            },
            {
              name: 'location',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default PirateWeather
