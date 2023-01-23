import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace LaunchDarkly {
  export type Entity = { featureflags: any; projects: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  interface LaunchDarklyBase {
    'auth:Authorization': string
  }

  export interface ListFeatureFlags extends LaunchDarklyBase, RequestParams {
    kind: 'launchdarkly.featureflags.list'
    'param:projectKey': string
    'query:limit'?: number
    'query:offset'?: number
    'query:filter'?: string
    'query:sort'?: string
    'query:env'?: string
    'query:tag'?: string
    'query:archived'?: boolean
    'query:summary'?: boolean
    'query:compare'?: boolean
  }

  export interface ListProjects extends LaunchDarklyBase, RequestParams {
    kind: 'launchdarkly.projects.list'
    'query:limit'?: number
    'query:offset'?: number
    'query:filter'?: string
    'query:sort'?: string
    'query:expand'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'launchdarkly',
      name: 'LaunchDarkly',
      url: 'https://launchdarkly.com/',
      docs: 'https://docs.launchdarkly.com',
      signup: 'https://app.launchdarkly.com/signup',
      pricing: 'https://launchdarkly.com/pricing/',
      tags: ['web2'],
      category: 'utils',
      type: 'featureflags',
      social: {
        twitter: 'LaunchDarkly',
        instagram: 'launchdarkly',
      },
    },
    base: 'https://app.launchdarkly.com/api/v2',
    auth: {
      Authorization: {
        type: 'header',
      },
    },
    api: {
      featureflags: {
        list: {
          interface: 'ListFeatureFlags',
          meta: {
            title: 'ListFeatureFlags',
            description: 'ListFeatureFlags',
            docs: 'https://apidocs.launchdarkly.com/tag/Feature-flags#operation/getFeatureFlags',
          },
          method: 'GET',
          paths: [
            {
              name: 'flags',
              type: 'static',
            },
            {
              name: 'projectKey',
              type: 'param',
            },
          ],
        },
      },
      projects: {
        list: {
          interface: 'ListProjects',
          meta: {
            title: 'List projects',
            description: 'List projects',
            docs: 'https://apidocs.launchdarkly.com/tag/Projects#operation/getProjects',
          },
          method: 'GET',
          paths: [
            {
              name: 'projects',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default LaunchDarkly
