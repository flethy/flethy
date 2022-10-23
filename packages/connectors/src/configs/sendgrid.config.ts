import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace SendGrid {
  export type Entity = { mail: any }
  export type Endpoint = { send: ApiDescriptionEndpoint }

  interface SendGridBase {
    'auth:Authorization': string
  }

  export interface SendMail extends SendGridBase, RequestParams {
    kind: 'sendgrid.mail.send'
    'body:personalizations': Array<{
      from?: {
        email: string
        name?: string
      }
      to?: Array<{
        email?: string
        name?: string
      }>
      cc?: Array<{
        email?: string
        name?: string
      }>
      bcc?: Array<{
        email?: string
        name?: string
      }>
      subject?: string
      headers?: {
        [key: string]: string
      }
      substitutions?: any
      dynamic_template_data?: any
      custom_args?: any
      send_at?: number
    }>
    'body:from': {
      email: string
      name?: string
    }
    'body:reply_to'?: {
      email: string
      name?: string
    }
    'body:reply_to_list'?: Array<{
      email: string
      name?: string
    }>
    'body:subject': string
    'body:content'?: Array<{
      type: string
      value: string
    }>
    'body:attachments'?: Array<{
      content: string
      type: string
      filename: string
      disposition?: 'inline' | 'attachment'
      content_id?: string
    }>
    'body:template_id'?: string
    'body:headers'?: {
      [key: string]: string
    }
    'body:categories'?: string[]
    'body:custom_args'?: string
    'body:send_at'?: number
    'body:batch_id'?: string
    'body:asm'?: {
      group_id: number
      groups_to_display?: number[]
    }
    'body:ip_pool_name'?: string
    'body:mail_settings'?: {
      bypass_list_management?: {
        enable?: boolean
      }
      bypass_spam_management?: {
        enable?: boolean
      }
      bypass_bounce_management?: {
        enable?: boolean
      }
      bypass_unsubscribe_management?: {
        enable?: boolean
      }
      footer?: {
        enable?: boolean
        text?: string
        html?: string
      }
      sandbox_mode?: {
        enable?: boolean
      }
    }
    'body:tracking_settings'?: {
      click_tracking?: {
        enable?: boolean
        enable_text?: boolean
      }
      open_tracking?: {
        enable?: boolean
        substitution_tag?: string
      }
      subscription_tracking?: {
        enable?: boolean
        text?: string
        html?: string
        substitution_tag?: string
      }
      ganalytics?: {
        enable?: boolean
        utm_source?: string
        utm_medium?: string
        utm_term?: string
        utm_content?: string
        utm_campaign?: string
      }
    }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'sendgrid',
      name: 'SendGrid',
      url: 'https://sendgrid.com',
      docs: 'https://docs.sendgrid.com',
      pricing: 'https://sendgrid.com/pricing/',
      signup: 'https://signup.sendgrid.com/',
      social: {
        twitter: 'sendgrid',
        github: 'sendgrid',
      },
      tags: ['web2'],
      category: 'communication',
      type: 'email',
    },
    base: 'https://api.sendgrid.com/v3',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      mail: {
        send: {
          interface: 'SendMail',
          meta: {
            title: 'Mail Send',
            description: `Mail Send`,
            docs: 'https://docs.sendgrid.com/api-reference/mail-send/mail-send',
          },
          method: 'POST',
          paths: [
            {
              name: 'mail',
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

export default SendGrid
