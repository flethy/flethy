import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace QuoteGarden {
  export type Entity = { core: any }
  export type Endpoint = {
    quotes: ApiDescriptionEndpoint
    random: ApiDescriptionEndpoint
    authors: ApiDescriptionEndpoint
    genres: ApiDescriptionEndpoint
  }

  export interface GetQuotes extends RequestParams {
    kind: 'quotegarden.core.quotes'
    'query:author'?: string
    'query:genre'?: string
    'query:query'?: string
    'query:page'?: number
    'query:limit'?: number
  }

  export interface GetRandomQuote extends RequestParams {
    kind: 'quotegarden.core.random'
  }

  export interface GetGenres extends RequestParams {
    kind: 'quotegarden.core.genres'
  }

  export interface GetAuthors extends RequestParams {
    kind: 'quotegarden.core.authors'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'quotegarden',
      name: 'QuoteGarden',
      url: 'https://pprathameshmore.github.io/QuoteGarden/',
      docs: 'https://pprathameshmore.github.io/QuoteGarden/',
      tags: ['web2', 'quotes'],
      category: 'utils',
      type: 'other',
      social: {
        github: 'pprathameshmore',
      },
    },
    base: 'https://quote-garden.herokuapp.com/api/v3',
    api: {
      core: {
        quotes: {
          interface: 'GetQuotes',
          meta: {
            title: 'Get Quotes',
            description: `Get Quotes`,
            docs: 'https://pprathameshmore.github.io/QuoteGarden/#get-quotes',
          },
          method: 'GET',
          paths: [
            {
              name: 'quotes',
              type: 'static',
            },
          ],
        },
        random: {
          interface: 'GetRandomQuote',
          meta: {
            title: 'Get Random Quote',
            description: `Get Random Quote`,
            docs: 'https://pprathameshmore.github.io/QuoteGarden/#get-a-random-quote',
          },
          method: 'GET',
          paths: [
            {
              name: 'quotes',
              type: 'static',
            },
            {
              name: 'random',
              type: 'static',
            },
          ],
        },
        genres: {
          interface: 'GetGenres',
          meta: {
            title: 'Get Genres',
            description: `Get Genres`,
            docs: 'https://pprathameshmore.github.io/QuoteGarden/#get-all-genres',
          },
          method: 'GET',
          paths: [
            {
              name: 'genres',
              type: 'static',
            },
          ],
        },
        authors: {
          interface: 'GetAuthors',
          meta: {
            title: 'Get Authors',
            description: `Get Authors`,
            docs: 'https://pprathameshmore.github.io/QuoteGarden/#get-all-authors',
          },
          method: 'GET',
          paths: [
            {
              name: 'authors',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default QuoteGarden
