import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace BambooHR {
  export type Entity = { employees: any }
  export type Endpoint = { directory: ApiDescriptionEndpoint }

  export interface BambooHrBase {
    'auth:Authorization': {
      username: string
      password: string
    }
  }

  export interface EmployeesDirectory extends BambooHrBase, RequestParams {
    kind: 'bamboohr.employees.directory'
    'param:companySlug': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'bamboohr',
      name: 'BambooHR',
      url: 'https://bamboohr.com',
      docs: 'https://documentation.bamboohr.com',
      tags: ['web2'],
      category: 'tools',
      type: 'hr',
    },
    base: 'https://api.bamboohr.com/api/gateway.php',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
    },
    api: {
      employees: {
        directory: {
          interface: 'EmployeesDirectory',
          meta: {
            title: 'Employees Directory',
            description: `Employees Directory`,
            docs: 'https://documentation.bamboohr.com/docs/getting-started',
          },
          method: 'GET',
          paths: [
            {
              name: 'companySlug',
              type: 'param',
            },
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'employees',
              type: 'static',
            },
            {
              name: 'directory',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default BambooHR
