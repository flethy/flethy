import { ApiDescription } from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace PurgoMalum {
  export type Entity = { core }
  export type Endpoint = { profanity }

  export interface Profanity extends RequestParams {
    kind: 'purgomalum.core.profanity'
    'query:text': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'purgomalum',
      name: 'PurgoMalum',
      url: 'https://www.purgomalum.com/',
      docs: 'https://www.purgomalum.com/',
      tags: ['web2'],
      category: 'data',
      type: 'validation',
    },
    base: 'https://www.purgomalum.com/service',
    api: {
      core: {
        profanity: {
          interface: 'Profanity',
          meta: {
            title: 'Profanity',
            description:
              'Returns "true" if input text contains words matching profanity list. If no matches are found, returns "false".',
            docs: 'https://www.purgomalum.com',
          },
          method: 'GET',
          paths: [
            {
              name: 'containsprofanity',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default PurgoMalum
