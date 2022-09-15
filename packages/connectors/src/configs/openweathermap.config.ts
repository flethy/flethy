import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace OpenWeatherMap {
  export type Entity = { core: any }
  export type Endpoint = {
    current: ApiDescriptionEndpoint
    currentAndForecast: ApiDescriptionEndpoint
  }

  interface OpenWeatherMapBase {
    'auth:appid': string
  }

  export interface CurrentAndForecast
    extends OpenWeatherMapBase,
      RequestParams {
    kind: 'openweathermap.core.currentAndForecast'
    'query:lat': number
    'query:lon': number
    'query:exclude'?: string
    'query:units'?: 'standard' | 'metric' | 'imperial'
    'query:lang'?: string
  }

  export interface Current extends OpenWeatherMapBase, RequestParams {
    kind: 'openweathermap.core.current'
    'query:lat': number
    'query:lon': number
    'query:mode'?: 'xml' | 'html'
    'query:units'?: 'standard' | 'metric' | 'imperial'
    'query:lang'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'openweathermap',
      name: 'OpenWeatherMap',
      url: 'https://openweathermap.org',
      docs: 'https://openweathermap.org/api/one-call-3',
      tags: ['web2'],
      category: 'utils',
      type: 'weather',
      social: {
        twitter: 'OpenWeatherMap',
      },
    },
    base: 'https://api.openweathermap.org/data',
    auth: {
      appid: {
        type: 'query',
      },
    },
    api: {
      core: {
        currentAndForecast: {
          interface: 'CurrentAndForecast',
          meta: {
            title: 'Current and forecast weather data',
            description: `Current and forecast weather data`,
            docs: 'https://openweathermap.org/api/one-call-3',
          },
          method: 'GET',
          paths: [
            {
              name: '3.0',
              type: 'static',
            },
            {
              name: 'onecall',
              type: 'static',
            },
          ],
        },
        current: {
          interface: 'Current',
          meta: {
            title: 'Call current weather data',
            description: `Call current weather data`,
            docs: 'https://openweathermap.org/current',
          },
          method: 'GET',
          paths: [
            {
              name: '2.5',
              type: 'static',
            },
            {
              name: 'weather',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default OpenWeatherMap
