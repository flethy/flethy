import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Storedat {
  export type Entity = { graphql: any }
  export type Endpoint = { query: ApiDescriptionEndpoint }

  interface StoredatBase {
    'auth:client-id': string
    'auth:Authorization': string
  }

  export interface GraphQLQuery extends StoredatBase, RequestParams {
    kind: 'storedat.graphql.query'
    'body:query': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'storedat',
      name: 'Storedat',
      url: 'https://www.storedat.io/',
      docs: 'https://docs.storedat.io/',
      signup: 'https://auth.storedat.io/',
      pricing: 'https://www.storedat.io/',
      tags: ['web3'],
      category: 'aggregation',
      type: 'indexer',
      social: {
        twitter: 'storedat_io',
        github: 'glosseta',
      },
    },
    base: 'https://perma.storedat.io/api/v1',
    auth: {
      'client-id': {
        type: 'header',
      },
      Authorization: {
        type: 'header',
      },
    },
    api: {
      graphql: {
        query: {
          interface: 'GraphQLQuery',
          meta: {
            title: 'GraphQL Query',
            description: 'GraphQL Query',
            docs: 'https://docs.storedat.io/reference/api-reference/query',
          },
          method: 'POST',
          paths: [
            {
              name: 'graphql',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Storedat
