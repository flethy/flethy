import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace MailboxLayer {
  export type Entity = { core: any }
  export type Endpoint = { check: ApiDescriptionEndpoint }

  interface MailboxLayerBase {
    'auth:apikey': string
  }

  export interface CheckEmail extends MailboxLayerBase, RequestParams {
    kind: 'mailboxlayer.core.check'
    'param:email': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'mailboxlayer',
      name: 'MailboxLayer',
      url: 'https://mailboxlayer.com/',
      docs: 'https://mailboxlayer.com/documentation',
      signup: 'https://apilayer.com/signup',
      pricing: 'https://apilayer.com/marketplace/',
      tags: ['web2'],
      category: 'communication',
      type: 'emailverification',
      social: {
        twitter: 'apilayer',
        instagram: 'apilayer',
        github: 'apilayer',
      },
    },
    base: 'https://api.apilayer.com',
    auth: {
      apikey: {
        type: 'header',
      },
    },
    api: {
      core: {
        check: {
          interface: 'CheckEmail',
          meta: {
            title: 'Check Email Address',
            description: `Check Email Address`,
            docs: 'https://mailboxlayer.com/documentation',
          },
          method: 'GET',
          paths: [
            {
              name: 'email_verification',
              type: 'static',
            },
            {
              name: 'email',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default MailboxLayer
