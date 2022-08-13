import {
  ApiAuthBasic,
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace HelloSign {
  export type Entity = { account: any; signatureRequest: any }
  export type Endpoint =
    | { get: ApiDescriptionEndpoint }
    | { send: ApiDescriptionEndpoint }

  export interface HelloSignBase {
    'auth:Authorization': ApiAuthBasic
  }

  export interface GetAccount extends HelloSignBase, RequestParams {
    kind: 'hellosign.account.get'
  }

  export interface SendSignatureRequest extends HelloSignBase, RequestParams {
    kind: 'hellosign.signatureRequest.send'
    signers: Array<{
      name: string
      email_address: string
      order?: number
      pin?: string
      sms_phone_number?: string
      sms_phone_number_type?: 'authentication' | 'delivery'
    }>
    file?: string[]
    file_url?: string[]
    allow_decline?: boolean
    allow_reassign?: boolean
    attachments?: Array<{
      name: string
      signer_index: number
      instructions?: string
      required?: boolean
    }>
    cc_email_addresses?: string[]
    client_id?: string
    custom_fields?: Array<{
      name: string
      editor?: string
      required?: boolean
      value?: string
    }>
    field_options?: Array<{
      date_format:
        | 'MM / DD / YYYY'
        | 'MM - DD - YYYY'
        | 'DD / MM / YYYY'
        | 'DD - MM - YYYY'
        | 'YYYY / MM / DD'
        | 'YYYY - MM - DD'
    }>
    form_field_groups?: Array<{
      group_id: string
      group_label: string
      requirement: string
    }>
    form_field_rules?: Array<{
      id: string
      trigger_operator: 'AND'
      triggers: Array<{
        id: string
        operator: 'any' | 'is' | 'match' | 'none' | 'not'
        valuu?: string
        values?: string[]
      }>
      actions: Array<{
        hidden: boolean
        type: 'change-field-visibility' | 'change-group-visibility'
        field_id?: string
        group_id?: string
      }>
    }>
    form_fields_per_document?: Array<{
      document_index: number
      api_id: string
      type: string
      required: boolean
      signer: string
      width: number
      height: number
      x: number
      y: number
      name?: string
      page?: number
      placeholder?: string
      auto_fill_type?: string
      link_id?: string
      masked?: boolean
      validation_type?:
        | 'numbers_only'
        | 'letters_only'
        | 'phone_number'
        | 'bank_routing_number'
        | 'bank_account_number'
        | 'email_address'
        | 'zip_code'
        | 'social_security_number'
        | 'employer_identification_number'
        | 'custom_regex'
      validation_custom_regex?: string
      validation_custom_regex_format_label?: string
    }>
    hide_text_tags?: boolean
    is_qualified_signature?: boolean
    message?: string
    metadata?: {
      [key: string]: any
    }
    signing_options?: {
      default_type: 'draw' | 'phone' | 'type' | 'upload'
      draw?: boolean
      phone?: boolean
      type?: boolean
      upload?: boolean
    }
    signing_redirect_url?: string
    subject?: string
    test_mode?: boolean
    title?: string
    use_text_tags?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'hellosign',
      name: 'HelloSign',
      url: 'https://hellosign.com',
      docs: 'https://developers.hellosign.com/',
      social: {
        twitter: 'hellosign',
      },
      tags: ['web2'],
      category: 'utils',
      type: 'documentsigning',
    },
    base: 'https://api.hellosign.com',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      account: {
        get: {
          interface: 'GetAccount',
          meta: {
            title: 'Get Account',
            description: `Returns the properties and settings of your Account.`,
            docs: 'https://developers.hellosign.com/api/reference/operation/accountGet/',
          },
          method: 'GET',
          paths: [
            {
              name: 'v3',
              type: 'static',
            },
            {
              name: 'account',
              type: 'static',
            },
          ],
        },
      },
      signatureRequest: {
        send: {
          interface: 'SendSignatureRequest',
          meta: {
            title: 'Send Signature Request',
            description: `Creates and sends a new SignatureRequest with the submitted documents. If form_fields_per_document is not specified, a signature page will be affixed where all signers will be required to add their signature, signifying their agreement to all contained documents.`,
            docs: 'https://developers.hellosign.com/api/reference/operation/signatureRequestSend/',
          },
          method: 'POST',
          paths: [
            {
              name: 'v3',
              type: 'static',
            },
            {
              name: 'signature_request',
              type: 'static',
            },
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

export default HelloSign
