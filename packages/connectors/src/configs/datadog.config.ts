import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace DataDog {
  export type Entity = { auth: any; events: any }
  export type Endpoint =
    | { validate: ApiDescriptionEndpoint }
    | { post: ApiDescriptionEndpoint; list: ApiDescriptionEndpoint }

  type BASE_ID = 'us' | 'us3' | 'us5' | 'us1-fe' | 'eu'

  interface DataDogBase {
    'auth:DD-API-KEY': string
  }

  interface DataDogReadBase extends DataDogBase {
    'auth:DD-APPLICATION-KEY': string
  }

  export interface ValidateApiKey extends DataDogBase, RequestParams {
    kind: 'datadog.auth.validate'
    baseId: BASE_ID
  }

  export interface PostEvent extends DataDogBase, RequestParams {
    kind: 'datadog.events.post'
    baseId: BASE_ID
    'body:text': string
    'body:title': string
    'body:aggregation_key'?: string
    'body:alert_type'?:
      | 'error'
      | 'warning'
      | 'info'
      | 'success'
      | 'user_update'
      | 'recommendation'
      | 'snapshot'
    'body:date_happened'?: number
    'body:device_name'?: string
    'body:host'?: string
    'body:priority'?: 'normal' | 'low'
    'body:related_event_id'?: number
    'body:source_type_name'?: string
    'body:tags'?: string[]
  }

  export interface ListEvents extends DataDogReadBase, RequestParams {
    kind: 'datadog.events.list'
    baseId: BASE_ID
    'query:start': number
    'query:end': number
    'query:priority'?: 'normal' | 'low'
    'query:tags'?: string[]
    'query:sources'?: string
    'query:unaggregated'?: boolean
    'query:exclude_aggregate'?: boolean
    'query:page'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'datadog',
      name: 'DataDog',
      url: 'https://www.datadoghq.com/',
      docs: 'https://docs.datadoghq.com/api/latest/',
      signup: 'https://www.datadoghq.com/',
      pricing: 'https://www.datadoghq.com/pricing/',
      tags: ['web2'],
      category: 'analytics',
      type: 'webinsights',
      social: {
        twitter: 'datadoghq',
        instagram: 'datadoghq',
      },
    },
    base: [
      {
        id: 'us',
        url: 'https://api.datadoghq.com/api/v1',
      },
      {
        id: 'us3',
        url: 'https://api.us3.datadoghq.com/api/v1',
      },
      {
        id: 'us5',
        url: 'https://api.us3.datadoghq.com/api/v1',
      },
      {
        id: 'us1-fed',
        url: 'https://api.ddog-gov.com/api/v1',
      },
      {
        id: 'eu',
        url: 'https://api.datadoghq.eu/api/v1',
      },
    ],
    auth: {
      'DD-API-KEY': {
        type: 'header',
      },
      'DD-APPLICATION-KEY': {
        type: 'header',
      },
    },
    api: {
      auth: {
        validate: {
          interface: 'ValidateApiKey',
          meta: {
            title: 'Validate API key',
            description: `Validate API key`,
            docs: 'https://docs.datadoghq.com/api/latest/authentication/?code-lang=curl',
          },
          method: 'GET',
          paths: [
            {
              name: 'validate',
              type: 'static',
            },
          ],
        },
      },
      events: {
        post: {
          interface: 'PostEvent',
          meta: {
            title: 'Post an event',
            description: `Post an event`,
            docs: 'https://docs.datadoghq.com/api/latest/events/#post-an-event',
          },
          method: 'POST',
          paths: [
            {
              name: 'events',
              type: 'static',
            },
          ],
        },
        list: {
          interface: 'ListEvents',
          meta: {
            title: 'Get a list of events',
            description: `Get a list of events`,
            docs: 'https://docs.datadoghq.com/api/latest/events/#get-a-list-of-events',
          },
          method: 'GET',
          paths: [
            {
              name: 'events',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default DataDog
