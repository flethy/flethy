import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'
import { CryptoUtils } from '../utils/Crypto.utils'

export namespace Gravatar {
  export type Entity = { core: any }
  export type Endpoint = { json: ApiDescriptionEndpoint }

  export interface GetJSONProfileData extends RequestParams {
    kind: 'gravatar.core.json'
    'auth:email': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'gravatar',
      name: 'Gravatar',
      url: 'https://en.gravatar.com',
      docs: 'https://en.gravatar.com/site/implement',
      signup: 'https://en.gravatar.com/connect/',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
      social: {
        twitter: 'gravatar',
      },
    },
    base: 'https://www.gravatar.com',
    api: {
      core: {
        json: {
          interface: 'GetJSONProfileData',
          meta: {
            title: 'JSON Profile Data',
            description: `JSON Profile Data`,
            docs: 'https://en.gravatar.com/site/implement/profiles/json/',
          },
          method: 'GET',
          auth: {
            email: {
              type: 'path',
              transform: (authValue: string) => {
                const hashed = CryptoUtils.createMD5(
                  authValue.trim().toLowerCase(),
                )
                return `${hashed}.json`
              },
            },
          },
          paths: [
            {
              name: 'email',
              type: 'auth',
            },
          ],
        },
      },
    },
  }
}

export default Gravatar
