import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Codat {
  export type Entity = { assess: any }
  export type Endpoint = { getCategories: ApiDescriptionEndpoint }

  interface CodatBase {
    'auth:Authorization': string
  }

  export interface GetCategories extends CodatBase, RequestParams {
    kind: 'codat.assess.getCategories'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'codat',
      name: 'Codat',
      url: 'https://www.codat.io/',
      docs: 'https://docs.codat.io/reference/authentication',
      signup: 'https://signup.codat.io/',
      pricing: 'https://www.codat.io/plans/',
      tags: ['web2'],
      category: 'business',
      type: 'other',
      social: {
        twitter: 'codatdata',
      },
    },
    base: 'https://api.codat.io',
    auth: {
      Authorization: {
        type: 'header:basic:encoded',
      },
    },
    api: {
      assess: {
        getCategories: {
          interface: 'GetCategories',
          meta: {
            title: 'Get Categories',
            description: `Get Categories`,
            docs: 'https://api.codat.io/swagger/index.html#/Assess/get_data_assess_accounts_categories',
          },
          method: 'GET',
          paths: [
            {
              name: 'data',
              type: 'static',
            },
            {
              name: 'assess',
              type: 'static',
            },
            {
              name: 'accounts',
              type: 'static',
            },
            {
              name: 'categories',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Codat
