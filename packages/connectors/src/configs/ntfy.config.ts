import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Ntfy {
  export type Entity = { core: any }
  export type Endpoint = { publishJson: ApiDescriptionEndpoint }

  export interface PublishMessageAsJson extends RequestParams {
    kind: 'ntfy.core.publishJson'
    'auth:topic': string
    'body:message'?: string
    'body:title'?: string
    'body:tags'?: string[]
    'body:priority'?: 1 | 2 | 3 | 4 | 5
    'body:actions'?: Array<{
      action: 'view' | 'http' | 'broadcast'
      label: string
      url?: string
      clear?: boolean
      body?: string
    }>
    'body:click'?: string
    'body:attach'?: string
    'body:filename'?: string
    'body:delay'?: string
    'body:email'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'ntfy',
      name: 'Ntfy',
      url: 'https://ntfy.sh/',
      docs: 'https://ntfy.sh/docs',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
      social: {
        github: 'binwiederhier/ntfy',
      },
    },
    base: 'https://ntfy.sh',
    api: {
      core: {
        publishJson: {
          interface: 'PublishMessageAsJson',
          meta: {
            title: 'Publish as JSON',
            description: `Publish as JSON`,
            docs: 'https://ntfy.sh/docs/publish/#publish-as-json',
          },
          auth: {
            topic: {
              type: 'body',
            },
          },
          method: 'POST',
        },
      },
    },
  }
}

export default Ntfy
