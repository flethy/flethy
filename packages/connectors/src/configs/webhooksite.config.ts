import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace WebhookSite {
  export type Entity = { core: any }
  export type Endpoint = {
    get: ApiDescriptionEndpoint
    post: ApiDescriptionEndpoint
    put: ApiDescriptionEndpoint
    patch: ApiDescriptionEndpoint
    delete: ApiDescriptionEndpoint
  }

  interface WebhookSiteBase {
    'param:uuid': string
  }

  interface WebhookSiteGetBase {
    'header:x-test-header'?: string
    'query:testQueryParam'?: string | number | boolean
  }

  export interface CoreGet
    extends WebhookSiteBase,
      WebhookSiteGetBase,
      RequestParams {
    kind: 'webhooksite.core.get'
  }

  export interface CorePost
    extends WebhookSiteBase,
      WebhookSiteGetBase,
      RequestParams {
    kind: 'webhooksite.core.post'
    'body:body'?: any
  }

  export interface CorePatch
    extends WebhookSiteBase,
      WebhookSiteGetBase,
      RequestParams {
    kind: 'webhooksite.core.patch'
    'body:body'?: any
  }

  export interface CorePut
    extends WebhookSiteBase,
      WebhookSiteGetBase,
      RequestParams {
    kind: 'webhooksite.core.put'
    'body:body'?: any
  }

  export interface CoreDelete
    extends WebhookSiteBase,
      WebhookSiteGetBase,
      RequestParams {
    kind: 'webhooksite.core.delete'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'webhooksite',
      name: 'WebhookSite',
      url: 'https://webhook.site/',
      docs: 'https://docs.webhook.site/',
      signup: 'https://webhook.site/register',
      pricing: 'https://webhook.site/register',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
      social: {
        twitter: 'webhooksite',
      },
    },
    base: 'https://webhook.site',
    api: {
      core: {
        get: {
          interface: 'CoreGet',
          meta: {
            title: 'Get Request',
            description: `Get Request`,
            docs: 'https://docs.webhook.site/api/about.html',
          },
          method: 'GET',
          paths: [
            {
              name: 'uuid',
              type: 'param',
            },
          ],
        },
        post: {
          interface: 'CorePost',
          meta: {
            title: 'Post Request',
            description: `Post Request`,
            docs: 'https://docs.webhook.site/api/about.html',
          },
          method: 'POST',
          paths: [
            {
              name: 'uuid',
              type: 'param',
            },
          ],
        },
        patch: {
          interface: 'CorePatch',
          meta: {
            title: 'Patch Request',
            description: `Patch Request`,
            docs: 'https://docs.webhook.site/api/about.html',
          },
          method: 'PATCH',
          paths: [
            {
              name: 'uuid',
              type: 'param',
            },
          ],
        },
        put: {
          interface: 'CorePut',
          meta: {
            title: 'Put Request',
            description: `Put Request`,
            docs: 'https://docs.webhook.site/api/about.html',
          },
          method: 'PUT',
          paths: [
            {
              name: 'uuid',
              type: 'param',
            },
          ],
        },
        delete: {
          interface: 'CoreDelete',
          meta: {
            title: 'Delete Request',
            description: `Delete Request`,
            docs: 'https://docs.webhook.site/api/about.html',
          },
          method: 'DELETE',
          paths: [
            {
              name: 'uuid',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default WebhookSite
