import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Phyllo {
  export type Entity = { connect: any }
  export type Endpoint = {
    createUser: ApiDescriptionEndpoint
    retrieveUserByExternalId: ApiDescriptionEndpoint
    createSDKToken: ApiDescriptionEndpoint
  }

  type BaseId = 'default' | 'sandbox'

  interface PhylloBase {
    'auth:Authorization': {
      username: string
      password: string
    }
    'header:request-id': string
  }

  export interface CreateUser extends PhylloBase, RequestParams {
    kind: 'phyllo.connect.createUser'
    baseId?: BaseId
    'body:name': string
    'body:external_id': string
  }

  export interface RetrieveUserByExternalId extends PhylloBase, RequestParams {
    kind: 'phyllo.connect.retrieveUserByExternalId'
    baseId?: BaseId
    'param:external_id': string
  }

  type ProductAudience =
    | 'IDENTITY'
    | 'IDENTITY.AUDIENCE'
    | 'ENGAGEMENT'
    | 'ENGAGEMENT.AUDIENCE'
    | 'INCOME'

  export interface CreateSDKToken extends PhylloBase, RequestParams {
    kind: 'phyllo.connect.createSDKToken'
    baseId?: BaseId
    'body:user_id': string
    'body:products': ProductAudience[]
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'phyllo',
      name: 'Phyllo',
      url: 'https://www.getphyllo.com/',
      docs: 'https://docs.getphyllo.com/',
      signup: 'https://dashboard.getphyllo.com/registration',
      pricing: 'https://www.getphyllo.com/pricing',
      tags: ['web2'],
      category: 'data',
      type: 'creator-data',
      social: {
        twitter: 'getphyllo',
        instagram: 'get_phyllo',
      },
    },
    base: [
      {
        id: 'default',
        url: 'https://api.getphyllo.com/v1',
      },
      {
        id: 'sandbox',
        url: 'https://api.sandbox.getphyllo.com/v1',
      },
    ],
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      connect: {
        createUser: {
          interface: 'CreateUser',
          meta: {
            title: 'Create a user',
            description: `Create a user`,
            docs: 'https://docs.getphyllo.com/docs/api-reference/api/ref/operations/create-a-v-1-user',
          },
          method: 'POST',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
          ],
        },
        retrieveUserByExternalId: {
          interface: 'RetrieveUserByExternalId',
          meta: {
            title: 'Retrieve a user by external ID',
            description: `Retrieve the information of the User with the supplied External id.`,
            docs: 'https://docs.getphyllo.com/docs/api-reference/api/ref/operations/get-a-v-1-user-external-id',
          },
          method: 'GET',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
            {
              name: 'external_id',
              type: 'static',
            },
            {
              name: 'external_id',
              type: 'param',
            },
          ],
        },
        createSDKToken: {
          interface: 'CreateSDKToken',
          meta: {
            title: 'Create an SDK token',
            description: `Creates the Connect SDK Token. This is required while initializing the Connect SDK.`,
            docs: 'https://docs.getphyllo.com/docs/api-reference/api/ref/operations/create-a-v-1-sdk-token',
          },
          method: 'POST',
          paths: [
            {
              name: 'sdk-tokens',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Phyllo
