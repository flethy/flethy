import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Keen {
  export type Entity = { events: any }
  export type Endpoint = {
    recordSingleEvent: ApiDescriptionEndpoint
    recordMultipleEvents: ApiDescriptionEndpoint
  }

  interface KeenBase {
    'auth:Authorization': string
  }

  export interface RecordASingleEvent extends KeenBase, RequestParams {
    kind: 'keen.events.recordSingleEvent'
    'body:body': { [key: string]: any }
    'param:projectId': string
    'param:collectionName': string
  }

  export interface RecordMultipleEvents extends KeenBase, RequestParams {
    kind: 'keen.events.recordMultipleEvents'
    'body:body': { [collectionName: string]: any }
    'param:projectId': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'keen',
      name: 'Keen',
      url: 'https://keen.io/',
      docs: 'https://keen.io/docs/api/',
      signup: 'https://keen.io/users/signup',
      pricing: 'https://keen.io/pricing/',
      tags: ['web2'],
      category: 'infra',
      type: 'streaming',
      social: {
        github: 'keen',
        twitter: 'keen_io',
        instagram: 'keen_io',
      },
    },
    base: 'https://api.keen.io/3.0',
    auth: {
      Authorization: {
        type: 'header',
      },
    },
    api: {
      events: {
        recordSingleEvent: {
          interface: 'RecordASingleEvent',
          meta: {
            title: 'HTTP Record a single event',
            description: `HTTP Record a single event`,
            docs: 'https://keen.io/docs/api/?shell#http-record-a-single-event',
          },
          method: 'POST',
          paths: [
            {
              name: 'projects',
              type: 'static',
            },
            {
              name: 'projectId',
              type: 'param',
            },
            {
              name: 'events',
              type: 'static',
            },
            {
              name: 'collectionName',
              type: 'param',
            },
          ],
        },
        recordMultipleEvents: {
          interface: 'RecordMultipleEvents',
          meta: {
            title: 'HTTP Record multiple events',
            description: `HTTP Record multiple events`,
            docs: 'https://keen.io/docs/api/?shell#http-record-multiple-events',
          },
          method: 'POST',
          paths: [
            {
              name: 'projects',
              type: 'static',
            },
            {
              name: 'projectId',
              type: 'param',
            },
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

export default Keen
