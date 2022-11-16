import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace MergeApi {
  export type Entity = { hris: any }
  export type Endpoint = { bankInfoGetAll: ApiDescriptionEndpoint }

  interface MergeApiBase {
    'auth:Authorization': string
    'auth:X-Account-Token': string
  }

  export interface BankInfoGetAll extends MergeApiBase, RequestParams {
    kind: 'mergeapi.hris.bankInfoGetAll'
    'query:account_type'?: string
    'query:bank_name'?: string
    'query:created_after'?: string
    'query:created_before'?: string
    'query:cursor'?: string
    'query:employee_id'?: string
    'query:expand'?: string
    'query:include_deleted_data'?: boolean
    'query:include_remote_data'?: boolean
    'query:modified_after'?: string
    'query:modified_before'?: string
    'query:order_by'?: string
    'query:page_size'?: number
    'query:remote_fields'?: string
    'query:remote_id'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'mergeapi',
      name: 'MergeApi',
      url: 'https://merge.dev/',
      docs: 'https://docs.merge.dev/',
      signup: 'https://app.merge.dev/signup',
      pricing: 'https://merge.dev/pricing',
      tags: ['web2'],
      category: 'tools',
      type: 'other',
      social: {
        twitter: 'merge_api',
      },
    },
    base: 'https://api.merge.dev/api',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
      'X-Account-Token': {
        type: 'header',
      },
    },
    api: {
      hris: {
        bankInfoGetAll: {
          interface: 'BankInfoGetAll',
          meta: {
            title: 'Get Bank Info',
            description: `Returns a list of BankInfo objects.`,
            docs: 'https://docs.merge.dev/hris/bank-info/#bank_info_list',
          },
          method: 'GET',
          paths: [
            {
              name: 'hris',
              type: 'static',
            },
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'bank-info',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default MergeApi
