import { RequestParams } from '../types/Request.types'
import { ApiDescription } from '../types/ApiDescription.type'

export namespace Hubspot {
  export type Entity = { forms; auth; contacts }
  export type Endpoint = { submit } | { token } | { createOrUpdate }

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

  export interface ContactsCreateOrUpdate extends RequestParams {
    kind: 'hubspot.contacts.createOrUpdate'
    'auth:Authorization': string
    'param:contact_email': string
    'body:properties': Array<{
      property: string
      value: string | number | boolean
    }>
  }

  export interface OAuthToken extends RequestParams {
    kind: 'hubspot.auth.token'
    'header:Content-Type': 'application/x-www-form-urlencoded'
    'auth:grant_type': 'authorization_code' | 'refresh_token'
    'auth:client_id': string
    'auth:client_secret': string
    'auth:refresh_token': string
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
      auth: {
        token: {
          interface: 'OAuthToken',
          meta: {
            title: 'Get OAuth 2.0 access and refresh tokens',
            description:
              'Use the code you get after a user authorizes your app to get an access token and refresh token. The access token will be used to authenticate requests that your app makes. Access tokens are short lived, so you can use the refresh token to get a new access token when the current access token expires.',
            docs: 'https://legacydocs.hubspot.com/docs/methods/oauth2/get-access-and-refresh-tokens',
          },
          method: 'POST',
          base: 'https://api.hubapi.com',
          auth: {
            grant_type: {
              type: 'body:form',
            },
            client_id: {
              type: 'body:form',
            },
            client_secret: {
              type: 'body:form',
            },
            refresh_token: {
              type: 'body:form',
            },
          },
          paths: [
            {
              name: 'oauth',
              type: 'static',
            },
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'token',
              type: 'static',
            },
          ],
        },
      },
      forms: {
        submit: {
          interface: 'FormsSubmit',
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
      contacts: {
        createOrUpdate: {
          interface: 'ContactsCreateOrUpdate',
          meta: {
            title: 'Create or update a contact',
            description:
              'The create or update a contact endpoint is used to create a new HubSpot contact or update an existing one. ',
            docs: 'https://legacydocs.hubspot.com/docs/methods/contacts/create_or_update',
          },
          method: 'POST',
          base: 'https://api.hubapi.com',
          paths: [
            {
              name: 'contacts',
              type: 'static',
            },
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'contact',
              type: 'static',
            },
            {
              name: 'createOrUpdate',
              type: 'static',
            },
            {
              name: 'email',
              type: 'static',
            },
            {
              name: 'contact_email',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Hubspot
