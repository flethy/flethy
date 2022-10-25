import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Stytch {
  export type Entity = { magicLinks: any; users: any }
  export type Endpoint =
    | { send: ApiDescriptionEndpoint }
    | { create: ApiDescriptionEndpoint }

  interface StytchBase {
    'auth:Authorization': {
      username: string
      password: string
    }
  }

  type BaseId = 'default' | 'test'

  export interface SendMagicLink extends StytchBase, RequestParams {
    kind: 'stytch.magicLinks.send'
    baseId?: BaseId
    'body:email': string
    'body:login_magic_link_url'?: string
    'body:signup_magic_link_url'?: string
    'body:login_expiration_minutes'?: number
    'body:signup_expiration_minutes'?: number
    'body:attributes'?: any
    'body:code_challenge'?: string
    'body:user_id'?: string
    'body:session_token'?: string
    'body:session_jwt'?: string
  }

  export interface CreateUser extends StytchBase, RequestParams {
    kind: 'stytch.users.create'
    baseId?: BaseId
    'body:email'?: string
    'body:name'?: {
      first_name?: string
      middle_name?: string
      last_name?: string
    }
    'body:phone_number'?: string
    'body:create_user_as_pending'?: boolean
    'body:attributes'?: any
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'stytch',
      name: 'Stytch',
      url: 'https://stytch.com/',
      docs: 'https://stytch.com/docs/api/introduction',
      signup: 'https://stytch.com/start-now',
      pricing: 'https://stytch.com/pricing',
      tags: ['web2'],
      category: 'identity',
      type: 'identitymanagement',
      social: {
        twitter: 'stytchauth',
      },
    },
    base: [
      {
        id: 'default',
        url: 'https://api.stytch.com/v1',
      },
      {
        id: 'test',
        url: 'https://test.stytch.com/v1',
      },
    ],
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      magicLinks: {
        send: {
          interface: 'SendMagicLink',
          meta: {
            title: 'Send magic link by email',
            description: `Send a magic link to an existing Stytch user using their email address. If you'd like to create a user and send them a magic link by email with one request, use our log in or create endpoint.`,
            docs: 'https://stytch.com/docs/api/send-by-email',
          },
          method: 'POST',
          paths: [
            {
              name: 'magic_links',
              type: 'static',
            },
            {
              name: 'email',
              type: 'static',
            },
            {
              name: 'send',
              type: 'static',
            },
          ],
        },
      },
      users: {
        create: {
          interface: 'CreateUser',
          meta: {
            title: 'Create user',
            description: `Add a user to Stytch. A user_id is returned in the response that can then be used to perform other operations within Stytch. An email or a phone_number is required.`,
            docs: 'https://stytch.com/docs/api/create-user',
          },
          method: 'POST',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Stytch
