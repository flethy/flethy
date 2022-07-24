import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Personio {
  export type Entity = { auth: any; employees: any; absences: any }
  export type Endpoint =
    | { request: ApiDescriptionEndpoint }
    | { get: ApiDescriptionEndpoint }

  export interface PersonioBase {
    'auth:Authorization': string
  }

  export interface AuthRequest extends RequestParams {
    kind: 'personio.auth.request'
    'auth:client_id': string
    'auth:client_secret': string
  }

  export interface EmployeesGet extends PersonioBase, RequestParams {
    kind: 'personio.employees.get'
    'query:limit'?: number
    'query:offset'?: number
    'query:email'?: string
    'query:attributes[]'?: string
  }

  export interface AbsencesGet extends PersonioBase, RequestParams {
    kind: 'personio.absences.get'
    'query:limit'?: number
    'query:offset'?: number
    'query:start_date'?: string
    'query:end_date'?: string
    'query:updated_from'?: string
    'query:updated_to'?: string
    'query:employees[]'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'personio',
      name: 'Personio',
      url: 'https://personio.de',
      docs: 'https://developer.personio.de',
      tags: ['web2'],
      category: 'tools',
      type: 'hr',
    },
    base: 'https://api.personio.de/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      auth: {
        request: {
          interface: 'AuthRequest',
          meta: {
            title: 'Request Authentication Token',
            description: `Request Authentication Token`,
            docs: 'https://developer.personio.de/reference/post_auth-1',
          },
          method: 'POST',
          auth: {
            client_id: {
              type: 'query',
            },
            client_secret: {
              type: 'query',
            },
          },
          paths: [
            {
              name: 'auth',
              type: 'static',
            },
          ],
        },
      },
      employees: {
        get: {
          interface: 'EmployeesGet',
          meta: {
            title: 'List Company Employees',
            description: `List Company Employees`,
            docs: 'https://developer.personio.de/reference/get_company-employees',
          },
          method: 'GET',
          paths: [
            {
              name: 'company',
              type: 'static',
            },
            {
              name: 'employees',
              type: 'static',
            },
          ],
        },
      },
      absences: {
        get: {
          interface: 'AbsencesGet',
          meta: {
            title: 'List Absences',
            description: `This endpoint is responsible for fetching absence data for the company employees.The result can be paginated and filtered by period and/or specific employee/employees. The result contains a list of absence periods.`,
            docs: 'https://developer.personio.de/reference/get_company-time-offs',
          },
          method: 'GET',
          paths: [
            {
              name: 'company',
              type: 'static',
            },
            {
              name: 'time-offs',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Personio
