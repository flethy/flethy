import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace IncidentIo {
  export type Entity = { incidents: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  interface IncidentIoBase {
    'auth:Authorization': string
  }

  export interface ListIncidents extends IncidentIoBase, RequestParams {
    kind: 'incidentio.incidents.list'
    'query:page_size'?: number
    'query:after'?: string
    'query:status[one_of]'?: string
    'query:status[not_in]'?: string
    'query:severity[one_of]'?: string
    'query:severity[not_in]'?: string
    'query:severity[gte]'?: string
    'query:severity[lte]'?: string
    'query:incident_type[one_of]'?: string
    'query:incident_role[one_of]'?: string
    'query:incident_role[is_blank]'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'incidentio',
      name: 'IncidentIo',
      url: 'https://incident.io/',
      docs: 'https://api-docs.incident.io/',
      signup: 'https://incident.io/',
      pricing: 'https://incident.io/pricing/',
      tags: ['web2'],
      category: 'infra',
      type: 'incident-management',
      social: {
        twitter: 'incident_io',
      },
    },
    base: 'https://api.incident.io/v2',
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
            title: 'List Incidents V2',
            description: `List Incidents V2`,
            docs: 'https://api-docs.incident.io/#operation/Incidents%20V2_List',
          },
          method: 'GET',
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

export default IncidentIo
