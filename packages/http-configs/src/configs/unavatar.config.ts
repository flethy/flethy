import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Unavatar {
  export type Entity = { core: any }
  export type Endpoint = {
    fromUsernameEmailDomain: ApiDescriptionEndpoint
    fromProvider: ApiDescriptionEndpoint
  }

  export interface FromUsernameEmailDomain extends RequestParams {
    kind: 'unavatar.core.fromUsernameEmailDomain'
    'param:usernameEmailDomain': string
    'query:json'?: boolean
  }

  type UnavatarProvider =
    | 'microlink'
    | 'deviantart'
    | 'dribbble'
    | 'duckduckgo'
    | 'github'
    | 'google'
    | 'gravatar'
    | 'instagram'
    | 'reddit'
    | 'soundcloud'
    | 'substack'
    | 'telegram'
    | 'twitter'
    | 'youtube'

  export interface FromProvider extends RequestParams {
    kind: 'unavatar.core.fromProvider'
    'param:provider': UnavatarProvider
    'param:input': string
    'query:json'?: boolean
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'unavatar',
      name: 'Unavatar',
      url: 'https://unavatar.io/',
      docs: 'https://unavatar.io/',
      tags: ['web2'],
      category: 'utils',
      type: 'avatar',
      social: {},
    },
    base: 'https://unavatar.io',
    api: {
      core: {
        fromUsernameEmailDomain: {
          interface: 'FromUsernameEmailDomain',
          meta: {
            title: 'From Username / E-Mail / Domain',
            description: `From Username / E-Mail / Domain`,
            docs: 'https://unavatar.io/',
          },
          method: 'GET',
          paths: [
            {
              name: 'usernameEmailDomain',
              type: 'param',
            },
          ],
        },
        fromProvider: {
          interface: 'FromProvider',
          meta: {
            title: 'From Provider',
            description: `From Provider`,
            docs: 'https://unavatar.io/',
          },
          method: 'GET',
          paths: [
            {
              name: 'provider',
              type: 'param',
            },
            {
              name: 'input',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Unavatar
