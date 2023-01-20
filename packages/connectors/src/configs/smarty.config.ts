import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Smarty {
  export type Entity = { cloud: any }
  export type Endpoint = { usStreetAddress: ApiDescriptionEndpoint }

  interface SmartyBase {
    'auth:auth-id': string
    'auth:auth-token': string
  }

  export interface USStreetAddressAPI extends SmartyBase, RequestParams {
    kind: 'smarty.cloud.usStreetAddress'
    'body:body': Array<{
      input_id?: string
      street?: string
      street2?: string
      secondary?: string
      city?: string
      state?: string
      zipcode?: string
      lastline?: string
      addressee?: string
      urbanization?: string
      candidates?: number
      match?: 'invalid' | 'strict' | 'enhanced'
    }>
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'smarty',
      name: 'Smarty',
      url: 'https://www.smarty.com/',
      docs: 'https://www.smarty.com/docs',
      signup: 'https://www.smarty.com/signup',
      pricing: 'https://www.smarty.com/pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'address-verification',
      social: {
        github: 'smartystreets',
        twitter: 'SmartyCompany',
      },
    },
    base: 'https://api.smartystreets.com',
    auth: {
      'auth-id': {
        type: 'query',
      },
      'auth-token': {
        type: 'query',
      },
      key: {
        type: 'query',
      },
    },
    api: {
      cloud: {
        usStreetAddress: {
          interface: 'USStreetAddressAPI',
          meta: {
            title: 'US Street Address API',
            description: 'US Street Address API',
            docs: 'https://www.smarty.com/docs/cloud/us-street-api',
          },
          method: 'POST',
          base: 'https://us-street.api.smartystreets.com',
          paths: [
            {
              name: 'street-address',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Smarty
