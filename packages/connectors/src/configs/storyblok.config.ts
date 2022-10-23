import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Storyblok {
  export type Entity = { graphql: any; stories: any }
  export type Endpoint =
    | { query: ApiDescriptionEndpoint }
    | { list: ApiDescriptionEndpoint; get: ApiDescriptionEndpoint }

  interface StoryblokBase {
    'auth:token': string
  }

  export interface GraphQLQuery extends RequestParams {
    kind: 'storyblok.graphql.query'
    'auth:Token': string
    'header:Version': 'draft' | 'published'
    'body:query': string
  }

  export interface ListStories extends StoryblokBase, RequestParams {
    kind: 'storyblok.stories.list'
  }

  export interface GetStory extends StoryblokBase, RequestParams {
    kind: 'storyblok.stories.get'
    'param:id': string
    'query:find_by'?: string
    'query:version'?: 'draft' | 'published'
    'query:resolve_links'?: string
    'query:resolve_relations'?: string
    'query:from_release'?: string
    'query:cv'?: string
    'query:language'?: string
    'query:fallback_lang'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'storyblok',
      name: 'Storyblok',
      url: 'https://www.storyblok.com/',
      docs: 'https://www.storyblok.com/docs/guide/introduction',
      signup: 'https://app.storyblok.com/#!/signup',
      pricing: 'https://www.storyblok.com/pricing',
      tags: ['web2'],
      category: 'marketing',
      type: 'content',
      social: {
        twitter: 'storyblok',
        instagram: 'storybloklife',
      },
    },
    base: 'https://api.storyblok.com/v1',
    auth: {
      Token: {
        type: 'header',
      },
      token: {
        type: 'query',
      },
    },
    api: {
      graphql: {
        query: {
          interface: 'GraphQLQuery',
          meta: {
            title: 'GraphQL Content Delivery API',
            description: `GraphQL Content Delivery API`,
            docs: 'https://www.storyblok.com/docs/graphql-api',
          },
          base: 'https://gapi.storyblok.com/v1',
          method: 'POST',
          paths: [
            {
              name: 'api',
              type: 'static',
            },
          ],
        },
      },
      stories: {
        list: {
          interface: 'ListStories',
          meta: {
            title: 'Stories',
            description: `Storyblok’s most used content delivery endpoint is trimmed for low latency and optimum availability.`,
            docs: 'https://www.storyblok.com/docs/api/content-delivery#core-resources/stories/stories',
          },
          method: 'GET',
          paths: [
            {
              name: 'cdn',
              type: 'static',
            },
            {
              name: 'stories',
              type: 'static',
            },
          ],
        },
        get: {
          interface: 'GetStory',
          meta: {
            title: 'Retrieve one Story',
            description: `Returns a story object for the full_slug, id or uuid if authenticated using a preview or public token.`,
            docs: 'https://www.storyblok.com/docs/api/content-delivery#core-resources/stories/retrieve-one-story',
          },
          method: 'GET',
          paths: [
            {
              name: 'cdn',
              type: 'static',
            },
            {
              name: 'stories',
              type: 'static',
            },
            {
              name: 'id',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Storyblok
