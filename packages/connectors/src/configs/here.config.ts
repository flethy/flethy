import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Here {
  export type Entity = { routing: any; geoCodingSearch: any }
  export type Endpoint =
    | { calculateViaGet: ApiDescriptionEndpoint }
    | { autosuggest: ApiDescriptionEndpoint; discover: ApiDescriptionEndpoint }

  interface HereBase {
    'auth:apiKey': string
  }

  export interface CalculateRouteViaGet extends HereBase, RequestParams {
    kind: 'here.routing.calculateViaGet'
    'query:transportMode':
      | 'car'
      | 'truck'
      | 'pedestrian'
      | 'bicycle'
      | 'scooter'
      | 'taxi'
      | 'bus'
      | 'privateBus'
    'query:origin': string
    'query:destination': string
    'query:via'?: string
    'query:departureTime'?: string
    'query:arrivalTime'?: string
    'query:routingMode'?: 'fast' | 'short'
    'query:alternatives'?: number
    'query:units'?: 'metric' | 'imperial'
    'query:lang'?: string
    'query:avoid'?: string
    'query:exclude'?: string
    'query:return'?: string
    'query:spans'?: string
    'query:vehicle'?: string
    'query:ev'?: string
    'query:pedestrian[0.5]'?: ''
    'query:pedestrian[1]'?: ''
    'query:pedestrian[1.5]'?: ''
    'query:pedestrian[2]'?: ''
    'query:scooter'?: string
    'query:currency'?: string
    'query:customizations'?: string
    'query:taxi'?: string
    'query:tolls'?: string
    'query:maxSpeedOnSegment'?: string
    'query:traffic'?: string
  }

  interface GeoCodingSearchBase {
    'query:q': string
    'query:at'?: string
    'query:in'?: string
    'query:limit'?: number
    'query:route'?: string
    'query:termsLimit'?: number
    'query:lang'?: string
    'query:politicalView'?: string
    'query:show'?: 'phonemes' | 'streetInfo' | 'tz'
  }

  export interface Autosuggest
    extends HereBase,
      GeoCodingSearchBase,
      RequestParams {
    kind: 'here.geoCodingSearch.autosuggest'
  }

  export interface Discover
    extends HereBase,
      GeoCodingSearchBase,
      RequestParams {
    kind: 'here.geoCodingSearch.discover'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'here',
      name: 'Here',
      url: 'https://www.here.com/',
      docs: 'https://developer.here.com/develop/rest-apis',
      signup: 'https://platform.here.com/sign-up',
      pricing: 'https://www.here.com/pricing',
      tags: ['web2', 'maps'],
      category: 'data',
      type: 'geo',
      social: {
        twitter: 'here',
        instagram: 'here',
      },
    },
    base: '',
    auth: {
      apiKey: {
        type: 'query',
      },
    },
    api: {
      routing: {
        calculateViaGet: {
          interface: 'CalculateRouteViaGet',
          meta: {
            title: 'Calculate routes via GET',
            description: `Calculate routes via GET`,
            docs: 'https://developer.here.com/documentation/routing-api/api-reference-swagger.html',
          },
          base: 'https://router.hereapi.com/v8',
          method: 'GET',
          paths: [
            {
              name: 'routes',
              type: 'static',
            },
          ],
        },
      },
      geoCodingSearch: {
        autosuggest: {
          interface: 'Autosuggest',
          meta: {
            title: 'Autosuggest',
            description: `This endpoint suggests address or place candidates based on an incomplete or misspelled query, from which the user selects the best query to submit.`,
            docs: 'https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html',
          },
          base: 'https://autosuggest.search.hereapi.com/v1',
          method: 'GET',
          paths: [
            {
              name: 'autosuggest',
              type: 'static',
            },
          ],
        },
        discover: {
          interface: 'Discover',
          meta: {
            title: 'Discover',
            description: `This endpoint processes a free-form text query for an address or place, and returns results in order of relevance.`,
            docs: 'https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html',
          },
          base: 'https://discover.search.hereapi.com/v1',
          method: 'GET',
          paths: [
            {
              name: 'discover',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Here
