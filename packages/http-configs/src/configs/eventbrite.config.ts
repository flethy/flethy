import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Eventbrite {
  export type Entity = { attendee: any; user: any }
  export type Endpoint =
    | { listByEventId: ApiDescriptionEndpoint }
    | { me: ApiDescriptionEndpoint }

  export interface EventbriteBase {
    'auth:Authorization': string
  }

  export interface ListAttendeeByEventId extends EventbriteBase, RequestParams {
    kind: 'eventbrite.attendee.listByEventId'
    'param:eventId': string
    'query:status'?: 'attending' | 'not_attending' | 'unpaid'
    'query:changed_since'?: string
    'query:last_item_seen'?: number
    'query:attendee_ids'?: string
  }

  export interface GetUserMe extends EventbriteBase, RequestParams {
    kind: 'eventbrite.user.me'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'eventbrite',
      name: 'Eventbrite',
      url: 'https://www.eventbrite.com/',
      docs: 'https://www.eventbrite.com/platform/api#/introduction/',
      social: {
        twitter: 'eventbrite',
        instagram: 'eventbrite',
      },
      tags: ['web2'],
      category: 'collaboration',
      type: 'events',
    },
    base: 'https://www.eventbriteapi.com/v3',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      attendee: {
        listByEventId: {
          interface: 'ListAttendeeByEventId',
          meta: {
            title: 'List Attendees',
            description: `List Attendees by Event ID. Returns a paginated response.`,
            docs: 'https://www.eventbrite.com/platform/api#/reference/attendee/list-attendees-by-event',
          },
          method: 'GET',
          paths: [
            {
              name: 'events',
              type: 'static',
            },
            {
              name: 'eventId',
              type: 'param',
            },
            {
              name: 'attendees',
              type: 'static',
            },
          ],
        },
      },
      user: {
        me: {
          interface: 'GetUserMe',
          meta: {
            title: 'Retrieve Information About Your User Account',
            description: `Retrieve Information About Your User Account`,
            docs: 'https://www.eventbrite.com/platform/api#/reference/user/retrieve-information-about-your-user-account/retrieve-information-about-your-user-account',
          },
          method: 'GET',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
            {
              name: 'me',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Eventbrite
