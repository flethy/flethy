import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Ory {
  export type Entity = { admin: any }
  export type Endpoint = { listOAuth2Clients: ApiDescriptionEndpoint }

  type BASE_ID = 'admin'

  interface OryPatBase {
    'auth:Authorization': string
    'subdomain:project': string
  }

  export interface ListOAuth2Clients extends OryPatBase, RequestParams {
    kind: 'ory.admin.listOAuth2Clients'
    baseId: BASE_ID
    'query:limit'?: number
    'query:offset'?: number
    'query:client_name'?: string
    'query:owner'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'ory',
      name: 'Ory',
      url: 'https://www.ory.sh/',
      docs: 'https://www.ory.sh/docs',
      signup: 'https://console.ory.sh/registration',
      pricing: 'https://www.ory.sh/pricing/',
      tags: ['web2'],
      category: 'identity',
      type: 'identitymanagement',
      social: {
        twitter: 'orycorp',
        github: 'ory',
      },
    },
    base: [
      {
        id: 'admin',
        url: 'https://subdomain:project.projects.oryapis.com/admin',
      },
    ],
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      admin: {
        listOAuth2Clients: {
          interface: 'ListOAuth2Clients',
          meta: {
            title: 'List OAuth 2.0 Clients',
            description: `List OAuth 2.0 Clients`,
            docs: 'https://www.ory.sh/docs/reference/api#operation/listOAuth2Clients',
          },
          method: 'GET',
          paths: [
            {
              name: 'clients',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Ory
