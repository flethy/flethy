import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Mastodon {
  export type Entity = { statuses: any }
  export type Endpoint = { publish: ApiDescriptionEndpoint }

  interface MastodonBase {
    'auth:Authorization': string
    'subdomain:mastodoninstance': string
  }

  export interface PublishStatus extends MastodonBase, RequestParams {
    kind: 'mastodon.statuses.publish'
    'header:Idempotency-Key'?: string
    'body:status'?: string
    'body:madia_ids'?: string[]
    'body:poll[options]'?: string[]
    'body:poll[expires_in]'?: number
    'body:poll[multiple]'?: boolean
    'body:poll[hide_totals]'?: boolean
    'body:in_reply_to_id'?: number
    'body:spoiler_text'?: string
    'body:visibility'?: 'public' | 'unlisted' | 'private' | 'direct'
    'body:sensitive'?: boolean
    'body:scheduled_at'?: string
    'body:language'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'mastodon',
      name: 'Mastodon',
      url: 'https://joinmastodon.org',
      docs: 'https://docs.joinmastodon.org',
      tags: ['web2'],
      category: 'marketing',
      type: 'socialmedia',
      social: {
        twitter: 'joinmastodon',
      },
    },
    base: 'https://subdomain:mastodoninstance/api/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      statuses: {
        publish: {
          interface: 'PublishStatus',
          meta: {
            title: 'Publish Status',
            description: `Publish Status`,
            docs: 'https://docs.joinmastodon.org/methods/statuses/#create',
          },
          method: 'POST',
          paths: [
            {
              name: 'statuses',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Mastodon
