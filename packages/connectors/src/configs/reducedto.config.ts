import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace ReducedTo {
  export type Entity = { core: any }
  export type Endpoint = { shorten: ApiDescriptionEndpoint }

  export interface ShortenURL extends RequestParams {
    kind: 'reducedto.core.shorten'
    'body:originalUrl': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'reducedto',
      name: 'ReducedTo',
      url: 'https://reduced.to',
      docs: 'https://reduced.to',
      tags: ['web2'],
      category: 'utils',
      type: 'url-shortener',
      social: {
        github: 'origranot',
      },
    },
    base: 'https://reduced.to/api/v1',
    api: {
      core: {
        shorten: {
          interface: 'ShortenURL',
          meta: {
            title: 'Shorten URL',
            description: `Shorten URL`,
            docs: 'https://reduced.to',
          },
          method: 'POST',
          paths: [
            {
              name: 'shortener',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default ReducedTo
