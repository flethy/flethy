import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { FetchParams } from '../types/FetchParams.type'
import { RequestParams } from '../types/Request.types'

export namespace PostHog {
  export type Entity = { post: any }
  export type Endpoint = { sendEvent: ApiDescriptionEndpoint }

  interface PostHogPostBase {
    'auth:api_key': string
  }

  export interface SendEvent extends PostHogPostBase, RequestParams {
    kind: 'posthog.post.sendEvent'
    'body:event': string
    'body:properties': {
      distinct_id: string
      [key: string]: string | number | boolean
    }
    'body:timestamp'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'posthog',
      name: 'PostHog',
      url: 'https://posthog.com',
      docs: 'https://posthog.com/docs',
      tags: ['web2'],
      category: 'analytics',
      type: 'webinsights',
      social: {
        twitter: 'posthog',
      },
    },
    base: 'https://app.posthog.com',
    api: {
      post: {
        sendEvent: {
          interface: 'SendEvent',
          meta: {
            title: 'Single Event',
            description: `Single Event`,
            docs: 'https://posthog.com/docs/api/post-only-endpoints',
          },
          method: 'POST',
          auth: {
            api_key: {
              type: 'body',
              authHandler: (fetchParams: FetchParams, authValue: string) => {
                if (fetchParams.body) {
                  fetchParams.body.api_key = authValue
                } else {
                  fetchParams.body = {
                    api_key: authValue,
                  }
                }
              },
            },
          },
          paths: [
            {
              name: 'capture',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default PostHog
