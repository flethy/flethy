import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace CarbEngage {
  export type Entity = { core: any }
  export type Endpoint = { info: ApiDescriptionEndpoint }

  interface CarbEngageBase {
    'auth:x-api-key': string
  }

  export interface Info extends CarbEngageBase, RequestParams {
    kind: 'carbengage.core.info'
    'query:id': number
    'query:year'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'carbengage',
      name: 'CarbEngage',
      url: 'https://www.carbengage.com',
      docs: 'https://www.carbengage.com/carbengage-api',
      tags: ['web2'],
      category: 'data',
      type: 'carbon-emmisions',
      social: {},
    },
    base: 'https://api.carbengage.com',
    auth: {
      'x-api-key': {
        type: 'header',
      },
    },
    api: {
      core: {
        info: {
          interface: 'Info',
          meta: {
            title: 'Carbon Emissions',
            description: `Access emissions data with just a few lines of code`,
            docs: 'https://carbengage.notion.site/CarbEngage-API-Instructions-cbd902393f484fa7b2010855d92fb360',
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

export default CarbEngage
