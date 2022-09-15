import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace OpenLibrary {
  export type Entity = { core: any }
  export type Endpoint = { books: ApiDescriptionEndpoint }

  export interface Books extends RequestParams {
    kind: 'openlibrary.core.books'
    'query:bibkeys': string
    'query:format'?: 'json' | 'javascript'
    'query:callback'?: string
    'query:jscmd'?: 'viewapi' | 'data' | 'details'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'openlibrary',
      name: 'OpenLibrary',
      url: 'https://openlibrary.org/',
      docs: 'https://openlibrary.org/dev/docs',
      social: {
        twitter: 'openlibrary',
        github: 'internetarchive',
      },
      tags: ['web2'],
      category: 'books',
      type: 'index',
    },
    base: 'https://openlibrary.org/api',
    api: {
      core: {
        books: {
          interface: 'Books',
          meta: {
            title: 'Book API',
            description:
              'The Book API is a generic, flexible, configurable endpoint which allows requesting information on one or more books using ISBNs, OCLC Numbers, LCCNs and OLIDs (Open Library IDs).',
            docs: 'https://openlibrary.org/dev/docs/api/books',
          },
          method: 'GET',
          paths: [
            {
              name: 'books',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default OpenLibrary
