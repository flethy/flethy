import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Netlify {
  export type Entity = { sites: any }
  export type Endpoint = {
    getEnvironmentVariables: ApiDescriptionEndpoint
    listSites: ApiDescriptionEndpoint
  }

  interface NetlifyBase {
    'auth:Authorization': string
  }

  export interface GetEnvironmentVariables extends NetlifyBase, RequestParams {
    kind: 'netlify.sites.getEnvironmentVariables'
    'param:accountId': string
    'query:context_name'?:
      | 'all'
      | 'dev'
      | 'branch-deploy'
      | 'deploy-preview'
      | 'production'
    'query:scope'?: 'builds' | 'functions' | 'runtime' | 'post_processing'
    'query:site_id'?: string
  }

  export interface ListSites extends NetlifyBase, RequestParams {
    kind: 'netlify.sites.listSites'
    'query:filter'?: 'all' | 'owner' | 'guest-deploy'
    'query:page'?: number
    'query:per_page'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'netlify',
      name: 'Netlify',
      url: 'https://netlify.com/',
      docs: 'https://open-api.netlify.com/',
      pricing: 'https://www.netlify.com/pricing/',
      signup: 'https://app.netlify.com/signup',
      tags: ['web2'],
      category: 'infra',
      type: 'hosted',
      social: {
        twitter: 'netlify',
        github: 'netlify',
      },
    },
    base: 'https://api.netlify.com/api/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      sites: {
        listSites: {
          interface: 'ListSites',
          meta: {
            title: 'listSites',
            description: `listSites`,
            docs: 'https://open-api.netlify.com/#tag/site/operation/listSites',
          },
          method: 'GET',
          paths: [
            {
              name: 'sites',
              type: 'static',
            },
          ],
        },
        getEnvironmentVariables: {
          interface: 'GetEnvironmentVariables',
          meta: {
            title: 'getEnvVars',
            description: `getEnvVars`,
            docs: 'https://open-api.netlify.com/#tag/environmentVariables/operation/getEnvVars',
          },
          method: 'GET',
          paths: [
            {
              name: 'accounts',
              type: 'static',
            },
            {
              name: 'accountId',
              type: 'param',
            },
            {
              name: 'env',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Netlify
