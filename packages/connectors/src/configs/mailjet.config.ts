import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace MailJet {
  export type Entity = { send: any }
  export type Endpoint = { basicEmail: ApiDescriptionEndpoint }

  interface MailJetBase {
    'auth:Authorization': {
      username: string
      password: string
    }
  }

  interface MailJetContact {
    Name?: string
    Email: string
  }

  export interface SendBasicEmail extends MailJetBase, RequestParams {
    kind: 'mailjet.send.basicEmail'
    'body:Messages': Array<{
      From: MailJetContact
      To: MailJetContact[]
      CC?: MailJetContact[]
      BCC?: MailJetContact[]
      Subject: string
      TextPart?: string
      HTMLPart?: string
      TemplateID?: string
    }>
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'mailjet',
      name: 'MailJet',
      url: 'https://www.mailjet.com/',
      docs: 'https://dev.mailjet.com/',
      signup: 'https://app.mailjet.com/signup',
      pricing: 'https://www.mailjet.com/pricing/',
      tags: ['web2'],
      category: 'marketing',
      type: 'email',
      social: {
        twitter: 'mailjet',
      },
    },
    base: 'https://api.mailjet.com/v3.1',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      send: {
        basicEmail: {
          interface: 'SendBasicEmail',
          meta: {
            title: 'Send a basic email',
            description: `Send a basic email`,
            docs: 'https://dev.mailjet.com/email/guides/send-api-v31/#send-a-basic-email',
          },
          method: 'POST',
          paths: [
            {
              name: 'send',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default MailJet
