import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Nominatim {
  export type Entity = { core: any }
  export type Endpoint = { search: ApiDescriptionEndpoint }

  export interface Search extends RequestParams {
    kind: 'nominatim.core.search'
    'query:q'?: string
    'query:street'?: string
    'query:city'?: string
    'query:county'?: string
    'query:state'?: string
    'query:country'?: string
    'query:postalcode'?: string
    'query:format': 'json' | 'jsonv2' | 'geojson' | 'geocodejson' // | 'xml'
    'query:json_callback'?: string
    'query:addressdetails'?: '0' | '1'
    'query:extratags'?: '0' | '1'
    'query:namedetails'?: '0' | '1'
    'query:accept-language'?: string
    'query:exclude_place_ids'?: string
    'query:limit'?: number
    'query:viewbox'?: string
    'query:bounded'?: '0' | '1'
    'query:polygon_geojson'?: '1'
    'query:polygon_kml'?: '1'
    'query:polygon_svg'?: '1'
    'query:polygon_text'?: '1'
    'query:polygon_threshold'?: string
    'query:email'?: string
    'query:dedupe'?: '0' | '1'
    'query:debug'?: '0' | '1'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'nominatim',
      name: 'Nominatim',
      url: 'https://nominatim.org/',
      docs: 'https://nominatim.org/release-docs/develop/api/Overview/',
      signup: 'https://nominatim.org/',
      pricing: 'https://nominatim.org/',
      tags: ['web2', 'maps'],
      category: 'data',
      type: 'geo',
      social: {
        github: 'osm-search',
      },
    },
    base: 'https://nominatim.openstreetmap.org',
    api: {
      core: {
        search: {
          interface: 'Search',
          meta: {
            title: 'Search queries',
            description: 'Search queries',
            docs: 'https://nominatim.org/release-docs/develop/api/Search/',
          },
          method: 'GET',
          paths: [
            {
              name: 'search',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Nominatim
