import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Algolia {
  export type Entity = { insights: any; objects: any; search: any }
  export type Endpoint =
    | { events: ApiDescriptionEndpoint }
    | {
        addWithoutId: ApiDescriptionEndpoint
        addWithId: ApiDescriptionEndpoint
      }
    | { queryIndex: ApiDescriptionEndpoint }

  interface AlgoliaBase {
    'auth:x-algolia-api-key': string
    'auth:x-algolia-application-id': string
  }

  export interface PostEvents extends AlgoliaBase, RequestParams {
    kind: 'algolia.insights.events'
    'body:events': Array<{
      eventType: 'click' | 'view' | 'conversion'
      eventName: string
      index: string
      userToken: string
      timestamp?: number
      queryID?: string
      objectIDs?: string[]
      filters?: string[]
      positions?: number[]
    }>
  }

  export interface AddObjectWithoutId extends AlgoliaBase, RequestParams {
    kind: 'algolia.objects.addWithoutId'
    'subdomain:applicationId': string
    'param:indexName': string
    'body:body': any
  }

  export interface AddObjectWithId extends AlgoliaBase, RequestParams {
    kind: 'algolia.objects.addWithId'
    'subdomain:applicationId': string
    'param:indexName': string
    'param:objectId': string
    'body:body': any
  }

  export interface SearchQueryIndex extends AlgoliaBase, RequestParams {
    kind: 'algolia.search.queryIndex'
    'subdomain:applicationId': string
    'param:indexName': string
    'body:params': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'algolia',
      name: 'Algolia',
      url: 'https://www.algolia.com',
      docs: 'https://www.algolia.com/doc/',
      tags: ['web2'],
      category: 'utils',
      type: 'index',
      social: {
        twitter: 'algolia',
        instagram: 'algolialife',
      },
    },
    base: '',
    api: {
      insights: {
        events: {
          interface: 'PostEvents',
          meta: {
            title: 'Insights REST API',
            description: `Insights REST API`,
            docs: 'https://www.algolia.com/doc/rest-api/insights/',
          },
          base: 'https://insights.algolia.io/1',
          auth: {
            'x-algolia-api-key': {
              type: 'header',
            },
            'x-algolia-application-id': {
              type: 'header',
            },
          },
          method: 'POST',
          paths: [
            {
              name: 'events',
              type: 'static',
            },
          ],
        },
      },
      objects: {
        addWithoutId: {
          interface: 'AddObjectWithoutId',
          meta: {
            title: 'Add object (without ID)',
            description: `Add object (without ID)`,
            docs: 'https://www.algolia.com/doc/rest-api/search/#objects-endpoints',
          },
          base: 'https://subdomain:applicationId.algolia.net/1',
          auth: {
            'x-algolia-api-key': {
              type: 'header',
            },
            'x-algolia-application-id': {
              type: 'header',
            },
          },
          method: 'POST',
          paths: [
            {
              name: 'indexes',
              type: 'static',
            },
            {
              name: 'indexName',
              type: 'param',
            },
          ],
        },
        addWithId: {
          interface: 'AddObjectWithId',
          meta: {
            title: 'Add object (with ID)',
            description: `Add object (with ID)`,
            docs: 'https://www.algolia.com/doc/rest-api/search/#objects-endpoints',
          },
          base: 'https://subdomain:applicationId.algolia.net/1',
          auth: {
            'x-algolia-api-key': {
              type: 'header',
            },
            'x-algolia-application-id': {
              type: 'header',
            },
          },
          method: 'PUT',
          paths: [
            {
              name: 'indexes',
              type: 'static',
            },
            {
              name: 'indexName',
              type: 'param',
            },
            {
              name: 'objectId',
              type: 'param',
            },
          ],
        },
      },
      search: {
        queryIndex: {
          interface: 'SearchQueryIndex',
          meta: {
            title: 'Search index (POST)',
            description: `Search index (POST)`,
            docs: 'https://www.algolia.com/doc/rest-api/search/#search-endpoints',
          },
          base: 'https://subdomain:applicationId-dsn.algolia.net/1',
          auth: {
            'x-algolia-api-key': {
              type: 'header',
            },
            'x-algolia-application-id': {
              type: 'header',
            },
          },
          method: 'POST',
          paths: [
            {
              name: 'indexes',
              type: 'static',
            },
            {
              name: 'indexName',
              type: 'param',
            },
            {
              name: 'query',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Algolia
