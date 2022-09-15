import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace TheStarWarsApi {
  export type Entity = { core: any }
  export type Endpoint = {
    getEntities: ApiDescriptionEndpoint
    getEntity: ApiDescriptionEndpoint
  }

  type SwapiEntity =
    | 'people'
    | 'planets'
    | 'films'
    | 'species'
    | 'vehicles'
    | 'starships'

  export interface GetEntities extends RequestParams {
    kind: 'thestarwarsapi.core.getEntities'
    'param:entity': SwapiEntity
  }

  export interface GetEntity extends RequestParams {
    kind: 'thestarwarsapi.core.getEntity'
    'param:entity': SwapiEntity
    'param:id': number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'thestarwarsapi',
      name: 'TheStarWarsApi',
      url: 'https://swapi.dev/',
      docs: 'https://swapi.dev/',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
      social: {
        twitter: 'Juriy',
        github: 'Juriy',
      },
    },
    base: 'https://swapi.dev/api',
    api: {
      core: {
        getEntities: {
          interface: 'GetEntities',
          meta: {
            title: 'GetEntities',
            description: `GetEntities`,
            docs: 'https://swapi.dev/',
          },
          method: 'GET',
          paths: [
            {
              name: 'entity',
              type: 'param',
            },
          ],
        },
        getEntity: {
          interface: 'GetEntity',
          meta: {
            title: 'GetEntity',
            description: `GetEntity`,
            docs: 'https://swapi.dev/',
          },
          method: 'GET',
          paths: [
            {
              name: 'entity',
              type: 'param',
            },
            {
              name: 'id',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default TheStarWarsApi
