import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace CustomerIo {
  export type Entity = { track: any }
  export type Endpoint = {
    single: ApiDescriptionEndpoint
    multiple: ApiDescriptionEndpoint
  }

  interface CustomerIoBase {
    'auth:Authorization': {
      username: string
      password: string
    }
  }

  interface Identifiers {
    id?: string
    email?: string
    cio_id?: string
  }

  interface TrackObject {
    type: 'object'
    identifiers: {
      object_type_id: '1'
      object_id: string
    }
    action: 'identify' | 'delete' | 'delete_relationships' | 'add_relationships'
    cio_relationships?: Array<{
      identifiers: Identifiers
    }>
  }

  interface TrackPerson {
    type: 'person'
    identifiers: Identifiers
    action:
      | 'identify'
      | 'delete'
      | 'delete_relationships'
      | 'add_relationships'
      | 'event'
      | 'screen'
      | 'page'
      | 'add_service'
      | 'delete_service'
      | 'merge'
      | 'suppress'
      | 'unsuppress'
    cio_relationships?: Array<{
      object_type_id: '1'
      object_id: string
    }>
    attributes?: any
  }

  interface TrackDelivery {
    type: 'delivery'
    identifiers: { id: string }
    action: 'event'
    cio_relationships?: Array<{
      object_type_id: '1'
      object_id: string
    }>
    attributes?: {
      device_token: string
    }
    name: 'opened' | 'converted' | 'delivered'
  }

  export interface TrackSingleEntity extends CustomerIoBase, RequestParams {
    kind: 'customerio.track.single'
    'body:body': TrackObject | TrackPerson | TrackDelivery
  }

  export interface TrackMultipleEntities extends CustomerIoBase, RequestParams {
    kind: 'customerio.track.multiple'
    'body:batch': Array<TrackObject | TrackPerson | TrackDelivery>
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'customerio',
      name: 'CustomerIo',
      url: 'https://customer.io/',
      docs: 'https://customer.io/docs/api/#section/Overview',
      signup: 'https://fly.customer.io/signup',
      pricing: 'https://customer.io/pricing/',
      tags: ['web2'],
      category: 'marketing',
      type: 'inbound',
      social: {
        twitter: 'CustomerIO',
      },
    },
    base: 'https://customer.io/api/v2',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      track: {
        single: {
          interface: 'TrackSingleEntity',
          meta: {
            title: 'Make a single request',
            description: 'Make a single request',
            docs: 'https://customer.io/docs/api/#operation/entity',
          },
          method: 'POST',
          base: 'https://track.customer.io/api/v2',
          paths: [
            {
              name: 'entity',
              type: 'static',
            },
          ],
        },
        multiple: {
          interface: 'TrackMultipleEntities',
          meta: {
            title: 'Send multiple requests',
            description: 'Send multiple requests',
            docs: 'https://customer.io/docs/api/#operation/batch',
          },
          method: 'POST',
          base: 'https://track.customer.io/api/v2',
          paths: [
            {
              name: 'batch',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default CustomerIo
