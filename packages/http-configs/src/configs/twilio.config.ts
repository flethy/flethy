import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Twilio {
  export type Entity = { messaging: any }
  export type Endpoint = { sms: ApiDescriptionEndpoint }

  interface TwilioBase {
    'auth:Authorization': {
      username: string
      password: string
    }
  }

  export interface SendSms extends TwilioBase, RequestParams {
    kind: 'twilio.messaging.sms'
    'header:Content-Type': 'application/x-www-form-urlencoded'
    'param:accountSid': string
    'bodyform:To': string
    'bodyform:Body': string
    'bodyform:MessagingServiceSid': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'twilio',
      name: 'Twilio',
      url: 'https://twilio.com',
      docs: 'https://www.twilio.com/docs',
      tags: ['web2'],
      category: 'communication',
      type: 'multichannel',
    },
    base: 'https://api.twilio.com/2010-04-01',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      messaging: {
        sms: {
          interface: 'SendSms',
          meta: {
            title: 'Send SMS',
            description: `Send SMS`,
            docs: 'https://www.twilio.com/docs/sms',
          },
          method: 'POST',
          paths: [
            {
              name: 'Accounts',
              type: 'static',
            },
            {
              name: 'accountSid',
              type: 'param',
            },
            {
              name: 'Messages.json',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Twilio
