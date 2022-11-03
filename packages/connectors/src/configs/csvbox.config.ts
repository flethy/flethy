import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { FetchParams } from '../types/FetchParams.type'
import { RequestParams } from '../types/Request.types'

export namespace CSVBox {
  export type Entity = { core: any }
  export type Endpoint = { import: ApiDescriptionEndpoint }

  interface CSVBoxBase {
    'auth:x-csvbox-api-key': string
    'auth:sheet_license_key': string
  }

  export interface ImportFile extends CSVBoxBase, RequestParams {
    kind: 'csvbox.core.import'
    'body:import': {
      public_file_url: string
      // sheet_license_key: string
      user?: {
        user_id: string
      }
      options?: {
        has_header?: 0 | 1
        max_rows?: number
      }
      dynamic_columns?: Array<{
        column_name: string
        display_label?: string
        info_hint?: string
        matching_keywords?: string
        type: 'text' | 'number'
        validators?: {
          min_length?: number
          max_length?: number
          min_value?: number
          max_value?: number
        }
        required: boolean
      }>
    }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'csvbox',
      name: 'CSVBox',
      url: 'https://csvbox.io/',
      docs: 'https://help.csvbox.io/advanced-installation/rest-file-api',
      signup: 'https://app.csvbox.io/register',
      pricing: 'https://csvbox.io/#pricing',
      tags: ['web2', 'csv'],
      category: 'utils',
      type: 'data-exchange',
      social: {
        twitter: 'csvboxio',
      },
    },
    base: 'https://api.csvbox.io/1.1',
    auth: {
      'x-csvbox-api-key': {
        type: 'header',
      },
      sheet_license_key: {
        type: 'body',
        authHandler: (fetchParams: FetchParams, authValue: string) => {
          fetchParams.body.import.sheet_license_key = authValue
        },
      },
    },
    api: {
      core: {
        import: {
          interface: 'ImportFile',
          meta: {
            title: 'REST File API',
            description: `Automate CSV submissions via REST File API`,
            docs: 'https://help.csvbox.io/advanced-installation/rest-file-api',
          },
          method: 'POST',
          paths: [
            {
              name: 'file',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default CSVBox
