import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace MailboxValidator {
  export type Entity = { singleEmailValidation: any }
  export type Endpoint = {
    singleEmailValidation: ApiDescriptionEndpoint
    disposableEmail: ApiDescriptionEndpoint
    freeEmail: ApiDescriptionEndpoint
  }

  interface SingleEmailValidationBase {
    'auth:key': string
    'query:email': string
    'query:format'?: 'json' | 'xml'
  }

  export interface SingleEmailValidation
    extends SingleEmailValidationBase,
      RequestParams {
    kind: 'mailboxvalidator.singleEmailValidation.singleEmailValidation'
  }

  export interface DisposableEmail
    extends SingleEmailValidationBase,
      RequestParams {
    kind: 'mailboxvalidator.singleEmailValidation.disposableEmail'
  }

  export interface FreeEmail extends SingleEmailValidationBase, RequestParams {
    kind: 'mailboxvalidator.singleEmailValidation.freeEmail'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'mailboxvalidator',
      name: 'MailboxValidator',
      url: 'https://www.mailboxvalidator.com',
      docs: 'https://www.mailboxvalidator.com',
      pricing: 'https://www.mailboxvalidator.com/plans',
      signup: 'https://www.mailboxvalidator.com/pay/7',
      social: {
        twitter: 'MailBoxV',
        github: 'mailboxvalidator',
      },
      tags: ['web2'],
      category: 'utils',
      type: 'emailverification',
    },
    base: 'https://api.mailboxvalidator.com/v1',
    api: {
      singleEmailValidation: {
        singleEmailValidation: {
          interface: 'SingleEmailValidation',
          meta: {
            title: 'Single Email Validation',
            description: `The Single Email Validation API does validation on a single email address and returns all the validation results in either JSON or XML format.`,
            docs: 'https://www.mailboxvalidator.com/api-single-validation',
          },
          method: 'GET',
          auth: {
            key: {
              type: 'query',
            },
          },
          paths: [
            {
              name: 'validation',
              type: 'static',
            },
            {
              name: 'single',
              type: 'static',
            },
          ],
        },
        disposableEmail: {
          interface: 'DisposableEmail',
          meta: {
            title: 'Disposable Email',
            description: `The Disposable Email API helps users to detect and block disposable emails from sign up. It checks if an email address is from a disposable email provider and returns the results in either JSON or XML format. Disposable email addresses (DEAs) are temporary email addresses that are only valid for a very short period of time.`,
            docs: 'https://www.mailboxvalidator.com/api-single-validation',
          },
          method: 'GET',
          auth: {
            key: {
              type: 'query',
            },
          },
          paths: [
            {
              name: 'email',
              type: 'static',
            },
            {
              name: 'disposable',
              type: 'static',
            },
          ],
        },
        freeEmail: {
          interface: 'FreeEmail',
          meta: {
            title: 'Free Email',
            description: `The Free Email API checks if a single email address is from a free email provider and returns the results in either JSON or XML format.`,
            docs: 'https://www.mailboxvalidator.com/api-single-validation',
          },
          method: 'GET',
          auth: {
            key: {
              type: 'query',
            },
          },
          paths: [
            {
              name: 'email',
              type: 'static',
            },
            {
              name: 'free',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default MailboxValidator
