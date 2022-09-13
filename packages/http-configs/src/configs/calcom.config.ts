import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace CalCom {
  export type Entity = { availability: any; eventTypes: any }
  export type Endpoint =
    | {
        findAllAvailabilities: ApiDescriptionEndpoint
        findAnAvailability: ApiDescriptionEndpoint
        create: ApiDescriptionEndpoint
      }
    | { findAllEventTypes: ApiDescriptionEndpoint }

  export interface CalComBase {
    'auth:apiKey': string
  }

  export interface FindAllAvailabilities extends CalComBase, RequestParams {
    kind: 'calcom.availability.findAllAvailabilities'
  }

  export interface FindAnAvailability extends CalComBase, RequestParams {
    kind: 'calcom.availability.findAnAvailability'
    'param:availabilityId': number
  }

  export interface CreateAvailability extends CalComBase, RequestParams {
    kind: 'calcom.availability.create'
    'body:days'?: number[]
    'body:startTime': string
    'body:endTime': string
  }

  export interface FindAllEventTypes extends CalComBase, RequestParams {
    kind: 'calcom.eventTypes.findAllEventTypes'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'calcom',
      name: 'CalCom',
      url: 'https://cal.com',
      docs: 'https://developer.cal.com/',
      signup: 'https://app.cal.com/',
      pricing: 'https://cal.com/pricing',
      social: {
        twitter: 'calcom',
        github: 'calcom',
      },
      tags: ['web2'],
      category: 'collaboration',
      type: 'calendar',
    },
    base: 'https://api.cal.com/v1',
    auth: {
      apiKey: {
        type: 'query',
      },
    },
    api: {
      availability: {
        findAllAvailabilities: {
          interface: 'FindAllAvailabilities',
          meta: {
            title: 'Find all availabilities',
            description: `Find all availabilities`,
            docs: 'https://developer.cal.com/api/api-reference/availabilities#find-all-availabilities',
          },
          method: 'GET',
          paths: [
            {
              name: 'availabilities',
              type: 'static',
            },
          ],
        },
        findAnAvailability: {
          interface: 'FindAnAvailability',
          meta: {
            title: 'Find an availability',
            description: `Find an availability`,
            docs: 'https://developer.cal.com/api/api-reference/availabilities#find-an-availability',
          },
          method: 'GET',
          paths: [
            {
              name: 'availabilities',
              type: 'static',
            },
            {
              name: 'availabilityId',
              type: 'param',
            },
          ],
        },
        create: {
          interface: 'CreateAvailability',
          meta: {
            title: 'Create a new availability',
            description: `Create a new availability`,
            docs: 'https://developer.cal.com/api/api-reference/availabilities#create-a-new-availability',
          },
          method: 'POST',
          paths: [
            {
              name: 'availabilities',
              type: 'static',
            },
          ],
        },
      },
      eventTypes: {
        findAllEventTypes: {
          interface: 'FindAllEventTypes',
          meta: {
            title: 'Find all event types',
            description: `Find all event types`,
            docs: 'https://developer.cal.com/api/api-reference/event-types#find-all-event-types',
          },
          method: 'GET',
          paths: [
            {
              name: 'event-types',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default CalCom
