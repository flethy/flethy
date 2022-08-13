import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Jira {
  export type Entity = { issue: any }
  export type Endpoint = {
    get: ApiDescriptionEndpoint
    search: ApiDescriptionEndpoint
    create: ApiDescriptionEndpoint
  }

  export interface JiraBase {
    'auth:Authorization': {
      username: string
      password: string
    }
    'subdomain:project': string
  }

  export interface GetIssue extends JiraBase, RequestParams {
    kind: 'jira.issue.get'
    'param:issueId': string
  }

  export interface SearchIssues extends JiraBase, RequestParams {
    kind: 'jira.issue.search'
    'query:jql'?: string
  }

  export interface CreateIssue extends JiraBase, RequestParams {
    kind: 'jira.issue.create'
    'body:fields': any
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'jira',
      name: 'Jira',
      url: 'https://www.atlassian.com/software/jira',
      docs: 'https://support.atlassian.com/jira-software-cloud/resources/',
      social: {
        twitter: 'atlassian',
      },
      tags: ['web2'],
      category: 'utils',
      type: 'issueticketing',
    },
    base: 'https://subdomain:project.atlassian.net/rest/api/latest',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      issue: {
        get: {
          interface: 'GetIssue',
          meta: {
            title: 'Get Issue',
            description: `Get Issue`,
            docs: 'https://developer.atlassian.com/server/jira/platform/rest-apis/#using-the-rest-apis',
          },
          method: 'GET',
          paths: [
            {
              name: 'issue',
              type: 'static',
            },
            {
              name: 'issueId',
              type: 'param',
            },
          ],
        },
        search: {
          interface: 'SearchIssues',
          meta: {
            title: 'Search Issues',
            description: `Search Issues`,
            docs: 'https://developer.atlassian.com/server/jira/platform/rest-apis/#using-the-rest-apis',
          },
          method: 'GET',
          paths: [
            {
              name: 'search',
              type: 'static',
            },
          ],
        },
        create: {
          interface: 'CreateIssue',
          meta: {
            title: 'Create Issue',
            description: `Create Issue`,
            docs: 'https://developer.atlassian.com/server/jira/platform/rest-apis/#using-the-rest-apis',
          },
          method: 'POST',
          paths: [
            {
              name: 'issue',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Jira
