import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace KontentAI {
  export type Entity = { delivery: any }
  export type Endpoint = {
    items: ApiDescriptionEndpoint
    graphql: ApiDescriptionEndpoint
  }

  export interface GetDeliveryItems extends RequestParams {
    kind: 'kontentai.delivery.items'
    'auth:projectId': string
  }

  export interface GraphQLQuery extends RequestParams {
    kind: 'kontentai.delivery.graphql'
    'header:content-type': 'application/graphql'
    'auth:projectId': string
    'body:body': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'kontentai',
      name: 'KontentAI',
      url: 'https://kontent.ai/',
      docs: 'https://kontent.ai/learn/reference/kontent-apis-overview/',
      signup: 'https://app.kontent.ai/sign-up',
      pricing: 'https://kontent.ai/pricing/',
      tags: ['web2'],
      category: 'marketing',
      type: 'content',
      social: {
        twitter: 'Kontent_ai',
        github: 'kontent-ai',
      },
    },
    base: '',
    auth: {
      projectId: {
        type: 'path',
      },
    },
    api: {
      delivery: {
        items: {
          interface: 'GetDeliveryItems',
          meta: {
            title: 'Get Delivery Items',
            description: `Get Delivery Items`,
            docs: 'https://kontent.ai/learn/reference/delivery-api/#section/Introduction',
          },
          method: 'GET',
          base: 'https://deliver.kontent.ai',
          paths: [
            {
              name: 'projectId',
              type: 'auth',
            },
            {
              name: 'items',
              type: 'static',
            },
          ],
        },
        graphql: {
          interface: 'GraphQLQuery',
          meta: {
            title: 'GraphQL Query',
            description: `GraphQL Query`,
            docs: 'https://kontent.ai/learn/reference/delivery-graphql-api/',
          },
          method: 'POST',
          base: 'https://graphql.kontent.ai',
          paths: [
            {
              name: 'projectId',
              type: 'auth',
            },
          ],
        },
      },
    },
  }
}

export default KontentAI
