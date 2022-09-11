import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Directus {
  export type Entity = { auth: any; collections: any }
  export type Endpoint =
    | { login: ApiDescriptionEndpoint }
    | { create: ApiDescriptionEndpoint; list: ApiDescriptionEndpoint }

  interface DirectusBase {
    'subdomain:id': string
  }

  interface DirectusAuthBase extends DirectusBase {
    'auth:Authorization': string
  }

  export interface Login extends DirectusBase, RequestParams {
    kind: 'directus.auth.login'
    'body:email': string
    'body:password': string
  }

  export interface CreateCollection extends DirectusAuthBase, RequestParams {
    kind: 'directus.collections.create'
    'body:collection': string
    'body:meta'?: any
    'body:schema'?: any
  }

  export interface ListCollections extends DirectusAuthBase, RequestParams {
    kind: 'directus.collections.list'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'directus',
      name: 'Directus',
      url: 'https://directus.io/',
      docs: 'https://docs.directus.io',
      tags: ['web2'],
      category: 'marketing',
      type: 'content',
      social: {
        twitter: 'directus',
        github: 'directus',
      },
    },
    base: 'https://subdomain:id.directus.app',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      auth: {
        login: {
          interface: 'Login',
          meta: {
            title: 'Login',
            description: `Login`,
            docs: 'https://docs.directus.io/reference/authentication.html#login',
          },
          method: 'POST',
          paths: [
            {
              name: 'auth',
              type: 'static',
            },
            {
              name: 'login',
              type: 'static',
            },
          ],
        },
      },
      collections: {
        create: {
          interface: 'CreateCollection',
          meta: {
            title: 'Create a Collection',
            description: `Create a new Collection. This will create a new table in the database as well.`,
            docs: 'https://docs.directus.io/reference/system/collections.html#create-a-collection',
          },
          method: 'POST',
          paths: [
            {
              name: 'collections',
              type: 'static',
            },
          ],
        },
        list: {
          interface: 'ListCollections',
          meta: {
            title: 'List Collections',
            description: `List the available collections.`,
            docs: 'https://docs.directus.io/reference/system/collections.html#list-collections',
          },
          method: 'GET',
          paths: [
            {
              name: 'collections',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Directus
