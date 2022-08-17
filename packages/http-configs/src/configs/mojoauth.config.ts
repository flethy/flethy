import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace MojoAuth {
  export type Entity = { auth: any }
  export type Endpoint = { sendMagicLink: ApiDescriptionEndpoint }

  interface MojoAuthBase {
    'auth:X-API-Key': string
  }

  export interface SendMagicLink extends MojoAuthBase, RequestParams {
    kind: 'mojoauth.auth.sendMagicLink'
    'body:email': string
    'query:language'?: string
    'query:redirect_url'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'mojoauth',
      name: 'MojoAuth',
      url: 'https://mojoauth.com',
      docs: 'https://mojoauth.com/docs',
      tags: ['web2'],
      category: 'identity',
      type: 'identitymanagement',
      social: {
        twitter: 'mojoauth',
      },
    },
    base: 'https://api.mojoauth.com',
    auth: {
      'X-API-Key': {
        type: 'header',
      },
    },
    api: {
      auth: {
        sendMagicLink: {
          interface: 'SendMagicLink',
          meta: {
            title: 'Send magic link on the email',
            description: `This endpoint sends a magiclink to your email.`,
            docs: 'https://mojoauth.com/docs/api/#send-magic-link-on-the-email',
          },
          method: 'POST',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
            {
              name: 'magiclink',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default MojoAuth
