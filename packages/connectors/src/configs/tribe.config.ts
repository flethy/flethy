import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Tribe {
  export type Entity = { auth: any }
  export type Endpoint = { appAccessToken: ApiDescriptionEndpoint }

  export interface TribeAccessToken extends RequestParams {
    kind: 'tribe.auth.appAccessToken'
    baseId: 'app-access-token'
    'auth:clientId': string
    'auth:clientSecret': string
    'body:query': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'tribe',
      name: 'Tribe',
      url: 'https://tribeplatform.com',
      docs: 'https://partners.tribe.so/docs',
      social: {
        twitter: 'tribeplatform',
        instagram: 'tribeplatform',
      },
      tags: ['web2'],
      category: 'collaboration',
      type: 'forum',
    },
    base: [
      {
        id: 'app-access-token',
        url: `https://subdomain:clientId:subdomain:clientSecret@app.tribe.so/graphql`,
      },
    ],
    auth: {
      clientId: {
        type: 'subdomain',
      },
      clientSecret: {
        type: 'subdomain',
      },
    },
    api: {
      auth: {
        appAccessToken: {
          interface: 'TribeAccessToken',
          meta: {
            title: 'App Access Token',
            description: `An app access token allows app developers to perform actions on behalf of a bot account or a specific member in the community using Tribe API. Bot accounts can perform all actions that a community admin can perform.`,
            docs: 'https://partners.tribe.so/docs/guide/graphql/authentication/access-token',
          },
          method: 'POST',
        },
      },
    },
  }
}

export default Tribe
