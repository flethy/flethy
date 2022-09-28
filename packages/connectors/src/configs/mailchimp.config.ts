import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Mailchimp {
  export type Entity = { campaigns: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  interface MailchimpBase {
    'auth:Authorization': {
      password: string
    }
    'subdomain:dc': string
  }

  export interface ListCampaigns extends MailchimpBase, RequestParams {
    kind: 'mailchimp.campaigns.list'
    'query:fields'?: string
    'query:exclude_fields'?: string
    'query:count'?: number
    'query:offset'?: number
    'query:type'?: 'regular' | 'plaintext' | 'absplit' | 'rss' | 'variate'
    'query:status'?: 'save' | 'paused' | 'schedule' | 'sending' | 'sent'
    'query:before_send_time'?: string
    'query:since_send_time'?: string
    'query:before_create_time'?: string
    'query:since_create_time'?: string
    'query:list_id'?: string
    'query:folder_id'?: string
    'query:member_id'?: string
    'query:sort_field'?: 'create_time' | 'send_time'
    'query:sort_dir'?: 'ASC' | 'DESC'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'mailchimp',
      name: 'Mailchimp',
      url: 'https://mailchimp.com/',
      docs: 'https://mailchimp.com/developer/',
      signup: 'https://mailchimp.com/signup',
      pricing: 'https://mailchimp.com/pricing',
      tags: ['web2'],
      category: 'marketing',
      type: 'email',
      social: {
        twitter: 'mailchimp',
        instagram: 'mailchimp',
      },
    },
    base: 'https://subdomain:dc.api.mailchimp.com/3.0',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      campaigns: {
        list: {
          interface: 'ListCampaigns',
          meta: {
            title: 'List Campaigns',
            description: `Get all campaigns in an account.`,
            docs: 'https://mailchimp.com/developer/marketing/api/campaigns/list-campaigns/',
          },
          method: 'GET',
          paths: [
            {
              name: 'campaigns',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Mailchimp
