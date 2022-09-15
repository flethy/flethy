import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Ortto {
  export type Entity = { person: any }
  export type Endpoint = { retrieve: ApiDescriptionEndpoint }

  export type OrttoPersonField =
    | 'str::first'
    | 'str::last'
    | 'phn::phone'
    | 'str::email'
    | 'geo::city'
    | 'geo::country'
    | 'dtz::b'
    | 'geo::region'
    | 'str::postal'
    | 'tags'
    | 'u4s::t'
    | 'bol::gdpr'
    | 'str::ei'
    | 'bol::p'
    | 'str::u-ctx'
    | 'str::s-ctx'
    | 'bol::sp'
    | 'str::soi-ctx'
    | 'str::soo-ctx'

  export interface OrttoBase {
    'auth:X-Api-Key': string
  }

  export interface RetrieveOneOrMorePeople extends OrttoBase, RequestParams {
    kind: 'ortto.person.retrieve'
    'body:limit'?: number
    'body:sort_order'?: 'asc' | 'desc'
    'body:sort_by_field_id': OrttoPersonField
    'body:offset'?: number
    'body:cursor_id'?: string
    'body:fields': OrttoPersonField[]
    'body:q'?: string
    'body:filter': any
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'ortto',
      name: 'Ortto',
      url: 'https://ortto.app',
      docs: 'https://help.ortto.com/developer/',
      social: {
        twitter: 'orttohq',
        instagram: 'ortto_hq',
      },
      tags: ['web2'],
      category: 'marketing',
      type: 'crm',
    },
    base: 'https://api.ap3api.com/v1',
    auth: {
      'X-Api-Key': {
        type: 'header',
      },
    },
    api: {
      person: {
        retrieve: {
          interface: 'RetrieveOneOrMorePeople',
          meta: {
            title: 'Retrieve one or more people (get)',
            description: `The get Ortto endpoint of the person entity is used to retrieve data from one or more person records in Ortto’s customer data platform (CDP).`,
            docs: 'https://help.ortto.com/developer/latest/api-reference/person/get.html',
          },
          method: 'POST',
          paths: [
            {
              name: 'person',
              type: 'static',
            },
            {
              name: 'get',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Ortto
