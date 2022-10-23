import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace RemoteOk {
  export type Entity = { core: any }
  export type Endpoint = { get: ApiDescriptionEndpoint }

  export interface GetListings extends RequestParams {
    kind: 'remoteok.core.get'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'remoteok',
      name: 'RemoteOk',
      url: 'https://remoteok.com',
      docs: 'https://remoteok.com',
      signup: 'https://remoteok.com/sign-up',
      social: {
        twitter: 'remoteok',
      },
      tags: ['web2'],
      category: 'career',
      type: 'job-listings',
    },
    base: 'https://remoteok.com/api',
    api: {
      core: {
        get: {
          interface: 'GetListings',
          meta: {
            title: 'Get Listings',
            description: `RemoteOk API`,
            docs: 'https://remoteok.com',
          },
          method: 'GET',
        },
      },
    },
  }
}

export default RemoteOk
