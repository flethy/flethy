import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { FetchParams } from '../types/FetchParams.type'
import { RequestParams } from '../types/Request.types'

export namespace Klaviyo {
  export type Entity = { track: any; profiles: any }
  export type Endpoint =
    | {
        trackProfile: ApiDescriptionEndpoint
        identifyProfile: ApiDescriptionEndpoint
      }
    | {
        getProfileId: ApiDescriptionEndpoint
        getProfile: ApiDescriptionEndpoint
      }

  interface KlaviyoBasePublic {
    'auth:token': string
  }

  interface KlaviyoBasePrivate {
    'auth:api_key': string
  }

  export interface TrackProfileActivity
    extends KlaviyoBasePublic,
      RequestParams {
    kind: 'klaviyo.track.trackProfile'
    'body:event': string
    'body:customer_properties'?: {
      [key: string]: string
    }
    'body:properties'?: {
      [key: string]: string
    }
    'body:time'?: number
  }

  export interface IdentifyProfile extends KlaviyoBasePublic, RequestParams {
    kind: 'klaviyo.track.identifyProfile'
    'body:properties'?: {
      [key: string]: string
    }
  }

  export interface GetProfileId extends KlaviyoBasePrivate, RequestParams {
    kind: 'klaviyo.profiles.getProfileId'
    'query:email'?: string
    'query:phone_number'?: string
    'query:external_id'?: string
  }

  export interface GetProfile extends KlaviyoBasePrivate, RequestParams {
    kind: 'klaviyo.profiles.getProfile'
    'param:person_id': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'klaviyo',
      name: 'Klaviyo',
      url: 'https://www.klaviyo.com',
      docs: 'https://developers.klaviyo.com',
      tags: ['web2'],
      category: 'marketing',
      type: 'inbound',
    },
    base: 'https://a.klaviyo.com/api',
    api: {
      track: {
        trackProfile: {
          interface: 'TrackProfileActivity',
          meta: {
            title: 'Track Profile Activity',
            description: `This endpoint is used to track a profile's activity. The following data is encoded in a JSON object. NOTE: an account can have up to 200 unique metrics (event types). This endpoint can accept payloads up to approximately 1MB.`,
            docs: 'https://developers.klaviyo.com/en/reference/track-post',
          },
          method: 'POST',
          auth: {
            token: {
              type: 'body',
              authHandler: (fetchParams: FetchParams, authValue: string) => {
                if (fetchParams.body) {
                  fetchParams.body.token = authValue
                } else {
                  fetchParams.body = {
                    token: authValue,
                  }
                }
              },
            },
          },
          paths: [
            {
              name: 'track',
              type: 'static',
            },
          ],
        },
        identifyProfile: {
          interface: 'IdentifyProfile',
          meta: {
            title: 'Identify Profile',
            description: `This endpoint is used to track and update properties about an individual without tracking an associated event. The following data is stored in a JSON object.`,
            docs: 'https://developers.klaviyo.com/en/reference/identify-post',
          },
          method: 'POST',
          auth: {
            token: {
              type: 'body',
              authHandler: (fetchParams: FetchParams, authValue: string) => {
                if (fetchParams.body) {
                  fetchParams.body.token = authValue
                } else {
                  fetchParams.body = {
                    token: authValue,
                  }
                }
              },
            },
          },
          paths: [
            {
              name: 'identify',
              type: 'static',
            },
          ],
        },
      },
      profiles: {
        getProfileId: {
          interface: 'GetProfileId',
          meta: {
            title: 'Get Profile Id',
            description: `Get a profile's Klaviyo ID given exactly one corresponding identifier: email, phone_number, or external_id. NOTE: calling this endpoint with multiple identifiers will result in an error.`,
            docs: 'https://developers.klaviyo.com/en/reference/get-profile-id',
          },
          method: 'GET',
          auth: {
            api_key: {
              type: 'query',
            },
          },
          paths: [
            {
              name: 'v2',
              type: 'static',
            },
            {
              name: 'people',
              type: 'static',
            },
            {
              name: 'search',
              type: 'static',
            },
          ],
        },
        getProfile: {
          interface: 'GetProfile',
          meta: {
            title: 'Get Profile',
            description: `Retrieves all the data attributes for a person, based on the Klaviyo Person ID.`,
            docs: 'https://developers.klaviyo.com/en/reference/get-profile',
          },
          method: 'GET',
          auth: {
            api_key: {
              type: 'query',
            },
          },
          paths: [
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'person',
              type: 'static',
            },
            {
              name: 'person_id',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Klaviyo
