import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Github {
  export type Entity = { issues: any; repositories: any; gitDatabase: any }
  export type Endpoint =
    | { listrepository: ApiDescriptionEndpoint; create: ApiDescriptionEndpoint }
    | { getContent: ApiDescriptionEndpoint }
    | { getTree: ApiDescriptionEndpoint }

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

  export interface CreateIssues extends RequestParams {
    kind: 'github.issues.create'
    'header:accept': 'application/vnd.github+json'
    'param:owner': string
    'param:repo': string
    'auth:Authorization'?: string
    'body:title': string
    'body:body'?: string
    'body:assignees'?: string[]
    'body:assignee'?: string
    'body:milestone'?: string | number
    'body:labels'?: string[]
  }

  export interface RepositoriesGetContent extends RequestParams {
    kind: 'github.repositories.getContent'
    'param:owner': string
    'param:repo': string
    'param:path': string
    'auth:Authorization'?: string
    'query:ref'?: string
    'header:accept': 'application/vnd.github+json'
  }

  export interface GitDatabaseGetTree extends RequestParams {
    kind: 'github.gitDatabase.getTree'
    'param:owner': string
    'param:repo': string
    'param:tree_sha': string
    'auth:Authorization'?: string
    'query:recursive'?: 0 | 1 | true | false
    'header:accept': 'application/vnd.github+json'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'github',
      name: 'Github',
      url: 'https://github.com',
      docs: 'https://docs.github.com/en/rest',
      signup: 'https://github.com/signup',
      pricing: 'https://github.com/pricing',
      social: {
        twitter: 'github',
      },
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
              type: 'header:bearer',
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
        create: {
          interface: 'CreateIssues',
          meta: {
            title: 'Create an issue',
            description: 'Create an issue',
            docs: 'https://docs.github.com/en/rest/issues/issues#create-an-issue',
          },
          method: 'POST',
          auth: {
            Authorization: {
              type: 'header:bearer',
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
      repositories: {
        getContent: {
          interface: 'RepositoriesGetContent',
          meta: {
            title: 'Get repository content',
            description:
              'Gets the contents of a file or directory in a repository. Specify the file path or directory in :path.',
            docs: 'https://docs.github.com/en/rest/repos/contents#get-repository-content',
          },
          method: 'GET',
          auth: {
            Authorization: {
              type: 'header:bearer',
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
              name: 'contents',
              type: 'static',
            },
            {
              name: 'path',
              type: 'param',
            },
          ],
        },
      },
      gitDatabase: {
        getTree: {
          interface: 'GitDatabaseGetTree',
          meta: {
            title: 'Get a tree',
            description:
              'Returns a single tree using the SHA1 value for that tree.',
            docs: 'https://docs.github.com/en/rest/git/trees#get-a-tree',
          },
          method: 'GET',
          auth: {
            Authorization: {
              type: 'header:bearer',
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
              name: 'git',
              type: 'static',
            },
            {
              name: 'trees',
              type: 'static',
            },
            {
              name: 'tree_sha',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Github
