import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Github {
  export type Entity = { issues: any }
  export type Endpoint = { listrepository: ApiDescriptionEndpoint }

  export interface ListRepositoryIssues extends RequestParams {
    kind: 'github.issues.listrepository'
    'param:owner': string
    'param:repo': string
    'auth:Authorization'?: string
    'query:milestone'?: string | number
    'query:state'?: 'open' | 'closed' | 'all'
    'query:assignee'?: string
    'query:creator'?: string
    'query:mentioned'?: string
    'query:labels'?: string
    'query:sort'?: 'created' | 'updated' | 'comments'
    'query:direction'?: 'asc' | 'desc'
    'query:since'?: string
    'query:page'?: number
    'query:per_page'?: number
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'github',
      name: 'Github',
      url: 'https://github.com',
      docs: 'https://docs.github.com/en/rest',
      tags: ['web2'],
      category: 'versioncontrol',
      type: 'hosted',
    },
    base: 'https://api.github.com',
    api: {
      issues: {
        listrepository: {
          interface: 'ListRepositoryIssues',
          meta: {
            title: 'List Repository Issues',
            description: 'List issues in a repository.',
            docs: 'https://docs.github.com/en/rest/issues/issues#list-repository-issues',
          },
          method: 'GET',
          auth: {
            Authorization: {
              type: 'header:token',
            },
          },
          paths: [
            {
              name: 'repos',
              type: 'static',
            },
            {
              name: 'owner',
              type: 'param',
            },
            {
              name: 'repo',
              type: 'param',
            },
            {
              name: 'issues',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Github
