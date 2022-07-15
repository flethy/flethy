import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace ContentFul {
  export type Entity = { content: any; graphql: any }
  export type Endpoint =
    | {
        getSpace: ApiDescriptionEndpoint
        getSpaceContentModel: ApiDescriptionEndpoint
        getSpaceSingleContentType: ApiDescriptionEndpoint
      }
    | {
        queryBySpace: ApiDescriptionEndpoint
        queryBySpaceAndEnvironment: ApiDescriptionEndpoint
      }

  export interface ContentFulBase {
    'param:spaceId': string
    'auth:Authorization': string
  }

  export interface ContentGetSpace extends ContentFulBase, RequestParams {
    kind: 'contentful.content.getSpace'
  }

  export interface ContentGetSpaceContentModel
    extends ContentFulBase,
      RequestParams {
    kind: 'contentful.content.getSpaceContentModel'
    'param:environmentId': string
  }

  export interface ContentGetSpaceSingleContentType
    extends ContentFulBase,
      RequestParams {
    kind: 'contentful.content.getSpaceSingleContentType'
    'param:environmentId': string
    'param:contentTypeId': string
  }

  export interface GraphQLbySpace extends ContentFulBase, RequestParams {
    kind: 'contentful.graphql.queryBySpace'
    'body:query': string
  }

  export interface GraphQLbySpaceAndEnvironment
    extends ContentFulBase,
      RequestParams {
    kind: 'contentful.graphql.queryBySpaceAndEnvironment'
    'param:environmentId': string
    'body:query': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'contentful',
      name: 'ContentFul',
      url: 'https://www.contentful.com/',
      docs: 'https://www.contentful.com/developers/docs',
      tags: ['web2'],
      category: 'marketing',
      type: 'content',
    },
    base: [
      {
        id: 'cdn',
        url: 'https://cdn.contentful.com',
      },
      {
        id: 'graphql',
        url: 'https://graphql.contentful.com',
      },
    ],
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      content: {
        getSpace: {
          interface: 'ContentGetSpace',
          meta: {
            title: 'Get a Space',
            description: `All content and assets in Contentful belong to a space. You will generally have at least one space for a project, but use separate spaces for testing or staging.`,
            docs: 'https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/spaces/space',
          },
          method: 'GET',
          paths: [
            {
              name: 'spaces',
              type: 'static',
            },
            {
              name: 'spaceId',
              type: 'param',
            },
          ],
        },
        getSpaceContentModel: {
          interface: 'ContentGetSpaceContentModel',
          meta: {
            title: 'Get content model of space',
            description: `Get content model of space`,
            docs: 'https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-types/content-model',
          },
          method: 'GET',
          paths: [
            {
              name: 'spaces',
              type: 'static',
            },
            {
              name: 'spaceId',
              type: 'param',
            },
            {
              name: 'environments',
              type: 'static',
            },
            {
              name: 'environmentId',
              type: 'param',
            },
            {
              name: 'content_types',
              type: 'static',
            },
          ],
        },
        getSpaceSingleContentType: {
          interface: 'ContentGetSpaceSingleContentType',
          meta: {
            title: 'Get single content type of space',
            description: `Get single content type of space`,
            docs: 'https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-types/content-type',
          },
          method: 'GET',
          paths: [
            {
              name: 'spaces',
              type: 'static',
            },
            {
              name: 'spaceId',
              type: 'param',
            },
            {
              name: 'environments',
              type: 'static',
            },
            {
              name: 'environmentId',
              type: 'param',
            },
            {
              name: 'content_types',
              type: 'static',
            },
            {
              name: 'contentTypeId',
              type: 'param',
            },
          ],
        },
      },
      graphql: {
        queryBySpace: {
          interface: 'GraphQLbySpace',
          meta: {
            title: 'Query by Space',
            description: `Query content by Space`,
            docs: 'https://www.contentful.com/developers/docs/references/graphql/#/introduction/basic-api-information',
          },
          method: 'POST',
          paths: [
            {
              name: 'content',
              type: 'static',
            },
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'spaces',
              type: 'static',
            },
            {
              name: 'spaceId',
              type: 'param',
            },
          ],
        },
        queryBySpaceAndEnvironment: {
          interface: 'GraphQLbySpaceAndEnvironment',
          meta: {
            title: 'Query by Space and Environment',
            description: `Query content by Space and Environment`,
            docs: 'https://www.contentful.com/developers/docs/references/graphql/#/introduction/basic-api-information',
          },
          method: 'POST',
          paths: [
            {
              name: 'content',
              type: 'static',
            },
            {
              name: 'v1',
              type: 'static',
            },
            {
              name: 'spaces',
              type: 'static',
            },
            {
              name: 'spaceId',
              type: 'param',
            },
            {
              name: 'environments',
              type: 'static',
            },
            {
              name: 'environmentId',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default ContentFul
