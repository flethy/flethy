import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Shrtcode {
  export type Entity = { core: any }
  export type Endpoint = {
    shorten: ApiDescriptionEndpoint
    info: ApiDescriptionEndpoint
  }

  export interface Shorten extends RequestParams {
    kind: 'shrtcode.core.shorten'
    'query:url': string
  }

  export interface Info extends RequestParams {
    kind: 'shrtcode.core.info'
    'query:code': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'shrtcode',
      name: 'Shrtcode',
      url: 'https://shrtco.de/',
      docs: 'https://shrtco.de/docs/',
      tags: ['web2'],
      category: 'utils',
      type: 'url-shortener',
      social: {},
    },
    base: 'https://api.shrtco.de/v2',
    api: {
      core: {
        shorten: {
          interface: 'Shorten',
          meta: {
            title: 'Shortening a Link',
            description: `Shortening a Link`,
            docs: 'https://shrtco.de/docs/',
          },
          method: 'GET',
          paths: [
            {
              name: 'shorten',
              type: 'static',
            },
          ],
        },
        info: {
          interface: 'Info',
          meta: {
            title: 'Getting information on a Link',
            description: `Getting information on a Link`,
            docs: 'https://shrtco.de/docs/',
          },
          method: 'GET',
          paths: [
            {
              name: 'info',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Shrtcode
