import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Shortcut {
  export type Entity = { categories: any; search: any }
  export type Endpoint =
    | {
        list: ApiDescriptionEndpoint
        create: ApiDescriptionEndpoint
      }
    | {
        all: ApiDescriptionEndpoint
        epics: ApiDescriptionEndpoint
        stories: ApiDescriptionEndpoint
      }

  interface ShortcutBase {
    'auth:Shortcut-Token': string
  }

  export interface ListCategories extends ShortcutBase, RequestParams {
    kind: 'shortcut.categories.list'
  }

  export interface CreateCategory extends ShortcutBase, RequestParams {
    kind: 'shortcut.categories.create'
    'body:color'?: string
    'body:external_id'?: string
    'body:name': string
    'body:type': 'milestone'
  }

  export interface Search extends ShortcutBase, RequestParams {
    kind: 'shortcut.search.all'
    'query:page_size'?: number
    'query:query': string
  }

  export interface SearchEpics extends ShortcutBase, RequestParams {
    kind: 'shortcut.search.epics'
    'query:page_size'?: number
    'query:query': string
  }

  export interface SearchStories extends ShortcutBase, RequestParams {
    kind: 'shortcut.search.stories'
    'query:page_size'?: number
    'query:query': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'shortcut',
      name: 'Shortcut',
      url: 'https://shortcut.com',
      docs: 'https://shortcut.com/api/rest/v3',
      pricing: 'https://shortcut.com/pricing',
      signup: 'https://shortcut.com/signup',
      social: {
        twitter: 'useshortcut',
        github: 'useshortcut',
      },
      tags: ['web2'],
      category: 'utils',
      type: 'issueticketing',
    },
    base: 'https://api.app.shortcut.com/api/v3',
    auth: {
      'Shortcut-Token': {
        type: 'header',
      },
    },
    api: {
      categories: {
        list: {
          interface: 'ListCategories',
          meta: {
            title: 'List Categories',
            description: `List Categories returns a list of all Categories and their attributes.`,
            docs: 'https://shortcut.com/api/rest/v3#Categories',
          },
          method: 'GET',
          paths: [
            {
              name: 'categories',
              type: 'static',
            },
          ],
        },
        create: {
          interface: 'CreateCategory',
          meta: {
            title: 'Create Category',
            description: `Create Category allows you to create a new Category in Shortcut.`,
            docs: 'https://shortcut.com/api/rest/v3#Create-Category',
          },
          method: 'POST',
          paths: [
            {
              name: 'categories',
              type: 'static',
            },
          ],
        },
      },
      search: {
        all: {
          interface: 'Search',
          meta: {
            title: 'Search',
            description: `Search lets you search Epics and Stories based on desired parameters.`,
            docs: 'https://shortcut.com/api/rest/v3#Search-1275',
          },
          method: 'GET',
          paths: [
            {
              name: 'search',
              type: 'static',
            },
          ],
        },
        epics: {
          interface: 'SearchEpics',
          meta: {
            title: 'Search Epics',
            description: `Search lets you search Epics and Stories based on desired parameters.`,
            docs: 'https://shortcut.com/api/rest/v3#Search-1275',
          },
          method: 'GET',
          paths: [
            {
              name: 'search',
              type: 'static',
            },
            {
              name: 'epics',
              type: 'static',
            },
          ],
        },
        stories: {
          interface: 'SearchStories',
          meta: {
            title: 'Search Stories',
            description: `Search lets you search Epics and Stories based on desired parameters.`,
            docs: 'https://shortcut.com/api/rest/v3#Search-1275',
          },
          method: 'GET',
          paths: [
            {
              name: 'search',
              type: 'static',
            },
            {
              name: 'stories',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Shortcut
