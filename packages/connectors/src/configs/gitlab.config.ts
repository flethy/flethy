import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace GitLab {
  export type Entity = { graphql: any }
  export type Endpoint = { query: ApiDescriptionEndpoint }

  interface GitLabBase {
    'auth:Authorization': string
  }

  export interface GraphQLQuery extends GitLabBase, RequestParams {
    kind: 'gitlab.graphql.query'
    'body:query': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'gitlab',
      name: 'GitLab',
      url: 'https://gitlab.com/',
      docs: 'https://docs.gitlab.com/ee/api/',
      signup: 'https://gitlab.com/users/sign_up',
      pricing: 'https://about.gitlab.com/pricing/',
      tags: ['web2'],
      category: 'versioncontrol',
      type: 'hosted',
      social: {
        twitter: 'gitlab',
      },
    },
    base: 'https://gitlab.com/api',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      graphql: {
        query: {
          interface: 'GraphQLQuery',
          meta: {
            title: 'GraphQL',
            description: `GraphQL`,
            docs: 'https://docs.gitlab.com/ee/api/graphql/getting_started.html',
          },
          method: 'POST',
          paths: [
            {
              name: 'graphql',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default GitLab
