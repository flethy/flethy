import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace FireHydrant {
  export type Entity = { incidents: any }
  export type Endpoint = {
    list: ApiDescriptionEndpoint
    create: ApiDescriptionEndpoint
  }

  interface FireHydrantBase {
    'auth:Authorization': string
  }

  export interface ListIncidents extends FireHydrantBase, RequestParams {
    kind: 'firehydrant.incidents.list'
    'query:assigned_teams'?: string
    'query:conditions'?: string
    'query:current_milestones'?: string
    'query:end_date'?: string
    'query:environments'?: string
    'query:excluded_infrastructure_ids'?: string
    'query:functionalities'?: string
    'query:name'?: string
    'query:page'?: number
    'query:per_page'?: number
    'query:priorities'?: string
    'query:priority_not_set'?: boolean
    'query:query'?: string
    'query:saved_search_id'?: string
    'query:services'?: string
    'query:severities'?: string
    'query:severity_not_set'?: string
    'query:start_date'?: string
    'query:status'?: string
    'query:tag_match_strategy'?: 'any' | 'match_all' | 'exclude'
    'query:tags'?: string
    'query:teams'?: string
  }

  export interface CreateIncident extends FireHydrantBase, RequestParams {
    kind: 'firehydrant.incidents.create'
    'body:name': string
    'body:summary'?: string
    'body:customer_impact_summary'?: string
    'body:description'?: string
    'body:priority'?: string
    'body:severity'?: string
    'body:severity_condition_id'?: string
    'body:severity_impact_id'?: string
    'body:alert_ids'?: string[]
    'body:labels'?: { [key: string]: string }
    'body:runbook_ids'?: string[]
    'body:tag_list'?: string[]
    'body:impacts'?: Array<{
      type: string
      id: string
      condition_id: string
    }>
    'body:restricted'?: boolean
    'body:context_object'?: {
      object_type: 'Runbooks::Runbook'
      object_id: string
      context_tag: 'runbook_testing' | 'runbook_isolation_testing'
      context_description: string
    }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'firehydrant',
      name: 'FireHydrant',
      url: 'https://firehydrant.com/',
      docs: 'https://developers.firehydrant.io/',
      signup: 'https://app.firehydrant.io/registrations/new',
      pricing: 'https://firehydrant.com/pricing/',
      tags: ['web2'],
      category: 'infra',
      type: 'incident-management',
      social: {
        twitter: 'FireHydrant',
        github: 'firehydrant',
      },
    },
    base: 'https://api.firehydrant.io/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      incidents: {
        list: {
          interface: 'ListIncidents',
          meta: {
            title: 'List all incidents',
            description: `List all incidents`,
            docs: 'https://developers.firehydrant.io/docs/api/bbaafb37d6b26-list-all-incidents',
          },
          method: 'GET',
          paths: [
            {
              name: 'incidents',
              type: 'static',
            },
          ],
        },
        create: {
          interface: 'CreateIncident',
          meta: {
            title: 'Create an incident',
            description: `Create an incident`,
            docs: 'https://developers.firehydrant.io/docs/api/e0ca05be2811d-create-an-incident',
          },
          method: 'POST',
          paths: [
            {
              name: 'incidents',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default FireHydrant
