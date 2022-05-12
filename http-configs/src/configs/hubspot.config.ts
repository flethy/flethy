import { RequestParams } from '../types/Request.types'
import { ApiDescription } from '../types/ApiDescription.type'

export namespace Hubspot {
  export type Entity = { forms }
  export type Endpoint = { submit }

  export interface FormsSubmit extends RequestParams {
    kind: 'hubspot.forms.submit'
    'auth:Authorization': string
    'param:portalId': number
    'param:formId': string
    'body:submittedAt': string
    'body:fields': Array<{
      name: string
      value: string
      objectTypeId?: string
    }>
    'body:context': {
      hutk?: string
      pageUri: string
      pageName: string
    }
    'body:legalConsentOptions': {
      consent: {
        consentToProcess: boolean
        text: string
        communications: Array<{
          value: boolean
          subscriptionTypeId: number
          text: string
        }>
      }
    }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'hubspot',
      name: 'Hubspot',
      url: 'https://hubspot.com',
      docs: 'https://developers.hubspot.com/docs/api/overview',
      tags: ['web2'],
      category: 'marketing',
      type: 'inbound',
    },
    base: 'https://api.hsforms.com',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      forms: {
        submit: {
          meta: {
            title: 'Submit data to a form',
            description:
              'This endpoint is used to send form submission data to HubSpot.',
            docs: 'https://developers.hubspot.com/docs/api/marketing/forms',
          },
          method: 'POST',
          paths: [
            {
              name: 'submissions',
              type: 'static',
            },
            {
              name: 'v3',
              type: 'static',
            },
            {
              name: 'integration',
              type: 'static',
            },
            {
              name: 'submit',
              type: 'static',
            },
            {
              name: 'portalId',
              type: 'param',
            },
            {
              name: 'formId',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Hubspot
