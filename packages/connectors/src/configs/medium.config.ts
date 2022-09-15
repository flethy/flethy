import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Medium {
  export type Entity = { users: any; publications: any }
  export type Endpoint =
    | {
        me: ApiDescriptionEndpoint
        publications: ApiDescriptionEndpoint
        createPost: ApiDescriptionEndpoint
      }
    | {
        createPost: ApiDescriptionEndpoint
        getContributors: ApiDescriptionEndpoint
      }

  export interface MediumBase {
    'auth:Authorization': string
  }

  export interface Me extends MediumBase, RequestParams {
    kind: 'medium.users.me'
  }

  export interface GetPublications extends MediumBase, RequestParams {
    kind: 'medium.users.publications'
    'param:userId': string
  }

  export interface MediumCreatePostBase {
    'body:title': string
    'body:contentFormat': 'html' | 'markdown'
    'body:content': string
    'body:tags'?: string[]
    'body:canonicalUrl'?: string
    'body:publishStatus'?: 'public' | 'draft' | 'unlisted'
    'body:license'?:
      | 'all-rights-reserved'
      | 'cc-40-by'
      | 'cc-40-by-sa'
      | 'cc-40-by-nd'
      | 'cc-40-by-nc'
      | 'cc-40-by-nc-nd'
      | 'cc-40-by-nc-sa'
      | 'cc-40-zero'
      | 'public-domain'
    'body:notifyFollowers'?: boolean
  }

  export interface CreatePost
    extends MediumBase,
      MediumCreatePostBase,
      RequestParams {
    kind: 'medium.users.createPost'
    'param:authorId': string
  }

  export interface CreatePostUnderPublication
    extends MediumBase,
      MediumCreatePostBase,
      RequestParams {
    kind: 'medium.publications.createPost'
    'param:publicationId': string
  }

  export interface GetContributorsOfPublication
    extends MediumBase,
      RequestParams {
    kind: 'medium.publications.getContributors'
    'param:publicationId': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'medium',
      name: 'Medium',
      url: 'https://medium.com',
      docs: 'https://developers.medium.com/',
      social: {
        twitter: 'medium',
      },
      tags: ['web2'],
      category: 'marketing',
      type: 'blogging',
    },
    base: 'https://api.medium.com/v1',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      users: {
        me: {
          interface: 'Me',
          meta: {
            title: 'Users Me',
            description: `Users Me`,
            docs: 'https://github.com/Medium/medium-api-docs#31-users',
          },
          method: 'GET',
          paths: [
            {
              name: 'me',
              type: 'static',
            },
          ],
        },
        publications: {
          interface: 'GetPublications',
          meta: {
            title: 'Publications',
            description: `Listing the user’s publications`,
            docs: 'https://github.com/Medium/medium-api-docs#32-publications',
          },
          method: 'GET',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
            {
              name: 'userId',
              type: 'param',
            },
            {
              name: 'publications',
              type: 'static',
            },
          ],
        },
        createPost: {
          interface: 'CreatePost',
          meta: {
            title: 'Posts',
            description: `Creating a post`,
            docs: 'https://github.com/Medium/medium-api-docs#creating-a-post',
          },
          method: 'POST',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
            {
              name: 'authorId',
              type: 'param',
            },
            {
              name: 'posts',
              type: 'static',
            },
          ],
        },
      },
      publications: {
        createPost: {
          interface: 'CreatePostUnderPublication',
          meta: {
            title: 'Creating a post under a publication',
            description: `Creating a post under a publication`,
            docs: 'https://github.com/Medium/medium-api-docs#creating-a-post-under-a-publication',
          },
          method: 'POST',
          paths: [
            {
              name: 'publications',
              type: 'static',
            },
            {
              name: 'publicationId',
              type: 'param',
            },
            {
              name: 'posts',
              type: 'static',
            },
          ],
        },
        getContributors: {
          interface: 'GetContributorsOfPublication',
          meta: {
            title: 'Fetching contributors for a publication',
            description: `Fetching contributors for a publication`,
            docs: 'https://github.com/Medium/medium-api-docs#fetching-contributors-for-a-publication',
          },
          method: 'POST',
          paths: [
            {
              name: 'publications',
              type: 'static',
            },
            {
              name: 'publicationId',
              type: 'param',
            },
            {
              name: 'contributors',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Medium
