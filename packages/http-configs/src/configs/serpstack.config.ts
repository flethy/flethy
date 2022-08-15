import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace SerpStack {
  export type Entity = { core: any }
  export type Endpoint = { search: ApiDescriptionEndpoint }

  export interface Search extends RequestParams {
    kind: 'serpstack.core.search'
    baseId: string
    'auth:access_key': string
    'query:query': string
    'query:engine'?: 'google'
    'query:type'?: 'web' | 'images' | 'videos' | 'news' | 'shopping'
    'query:device'?: 'desktop' | 'mobile' | 'tablet'
    'query:location'?: string
    'query:auto_location'?: 1 | 0
    'query:google_domain'?: 'google.com' | 'google.de' | string
    'query:gl'?: string
    'query:hl'?: string
    'query:safe'?: 1 | 0
    'query:period'?:
      | 'last_hour'
      | 'last_day'
      | 'last_week'
      | 'last_month'
      | 'last_year'
      | 'custom'
    'query:period_start'?: string
    'query:period_end'?: string
    'query:news_type'?: 'all' | 'blogs'
    'query:exclude_autocorrected_results'?: 1 | 0
    'query:images_page'?: number
    'query:images_color'?:
      | 'any'
      | 'black_and_white'
      | 'transparent'
      | 'red'
      | 'orange'
      | 'yellow'
      | 'green'
      | 'teal'
      | 'blue'
      | 'purple'
      | 'pink'
      | 'white'
      | 'gray'
      | 'black or brown'
    'query:images_size'?: 'large' | 'medium' | 'icon'
    'query:images_type'?: 'clipart' | 'line_drawing' | 'gif'
    'query:sort'?: 'relevance' | 'date'
    'query:page'?: number
    'query:num'?: number
    'query:output'?: 'json' | 'csv'
    'query:csv_fields'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'serpstack',
      name: 'SerpStack',
      url: 'https://serpstack.com',
      docs: 'https://serpstack.com/documentation',
      social: {
        twitter: 'apilayer',
        github: 'serpstack',
      },
      tags: ['web2'],
      category: 'search',
      type: 'serp',
    },
    base: [
      {
        id: 'free',
        url: 'http://api.serpstack.com',
      },
      {
        id: 'pro',
        url: 'https://api.serpstack.com',
      },
    ],
    auth: {
      access_key: {
        type: 'query',
      },
    },
    api: {
      core: {
        search: {
          interface: 'Search',
          meta: {
            title: 'Search',
            description: `If not otherwise specified, the serpstack API will always default to delivering search results from Google. To query the API for Google search results, simply append the query parameter to the API's base URL and set it to a search query of your choice.`,
            docs: 'https://serpstack.com/documentation',
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

export default SerpStack
