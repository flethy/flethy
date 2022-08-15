import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Sentry {
  export type Entity = { discover: any; projects: any }
  export type Endpoint =
    | { query: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint }

  export interface SentryBase {
    'auth:Authorization': string
  }

  export interface QueryDiscoverEvents extends SentryBase, RequestParams {
    kind: 'sentry.discover.query'
    'param:organizationSlug': string
    'query:end'?: string
    'query:environment'?: string
    'query:project'?: string
    'query:start'?: string
    'query:statsPeriod'?: string
    'query:field': string
    'query:per_page'?: number
    'query:query'?: string
    'query:sort'?: string
  }

  export interface ListProjects extends SentryBase, RequestParams {
    kind: 'sentry.projects.list'
    'query:cursor'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'sentry',
      name: 'Sentry',
      url: 'https://sentry.io/',
      docs: 'https://docs.sentry.io/',
      social: {
        twitter: 'getsentry',
        github: 'getsentry',
      },
      tags: ['web2'],
      category: 'infra',
      type: 'monitoring',
    },
    base: 'https://sentry.io/api/0',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      discover: {
        query: {
          interface: 'QueryDiscoverEvents',
          meta: {
            title: 'Query Discover Events in Table Format',
            description: `Retrieves discover (also known as events) data for a given organization.`,
            docs: 'https://docs.sentry.io/api/discover/query-discover-events-in-table-format/',
          },
          method: 'GET',
          options: {
            pathTailingSlash: true,
          },
          paths: [
            {
              name: 'organizations',
              type: 'static',
            },
            {
              name: 'organizationSlug',
              type: 'param',
            },
            {
              name: 'events',
              type: 'static',
            },
          ],
        },
      },
      projects: {
        list: {
          interface: 'ListProjects',
          meta: {
            title: 'List Your Projects',
            description: `Return a list of projects available to the authenticated session.`,
            docs: 'https://docs.sentry.io/api/projects/list-your-projects/',
          },
          method: 'GET',
          options: {
            pathTailingSlash: true,
          },
          paths: [
            {
              name: 'projects',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Sentry
