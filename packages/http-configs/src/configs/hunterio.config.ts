import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace HunterIo {
  export type Entity = { core: any }
  export type Endpoint = {
    domainSearch: ApiDescriptionEndpoint
    emailFinder: ApiDescriptionEndpoint
    authorFinder: ApiDescriptionEndpoint
    emailVerification: ApiDescriptionEndpoint
  }

  export interface HunterBase {
    'auth:api_key': string
  }

  export interface DomainSearch extends HunterBase, RequestParams {
    kind: 'hunterio.core.domainSearch'
    'query:domain': string
  }

  export interface EmailFinder extends HunterBase, RequestParams {
    kind: 'hunterio.core.emailFinder'
    'query:domain': string
    'query:first_name': string
    'query:last_name': string
  }

  export interface AuthorFinder extends HunterBase, RequestParams {
    kind: 'hunterio.core.authorFinder'
    'query:url': string
  }

  export interface EmailVerification extends HunterBase, RequestParams {
    kind: 'hunterio.core.emailVerification'
    'query:email': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'hunterio',
      name: 'HunterIo',
      url: 'https://hunter.io/',
      docs: 'https://hunter.io/',
      tags: ['web2'],
      category: 'communication',
      type: 'emailverification',
    },
    base: 'https://api.hunter.io/v2',
    auth: {
      api_key: {
        type: 'query',
      },
    },
    api: {
      core: {
        domainSearch: {
          interface: 'DomainSearch',
          meta: {
            title: 'DomainSearch',
            description: `DomainSearch`,
            docs: 'https://hunter.io/',
          },
          method: 'GET',
          paths: [
            {
              name: 'domain-search',
              type: 'static',
            },
          ],
        },
        emailFinder: {
          interface: 'EmailFinder',
          meta: {
            title: 'EmailFinder',
            description: `EmailFinder`,
            docs: 'https://hunter.io/',
          },
          method: 'GET',
          paths: [
            {
              name: 'email-finder',
              type: 'static',
            },
          ],
        },
        authorFinder: {
          interface: 'AuthorFinder',
          meta: {
            title: 'AuthorFinder',
            description: `AuthorFinder`,
            docs: 'https://hunter.io/',
          },
          method: 'GET',
          paths: [
            {
              name: 'author-finder',
              type: 'static',
            },
          ],
        },
        emailVerification: {
          interface: 'EmailVerification',
          meta: {
            title: 'EmailVerification',
            description: `EmailVerification`,
            docs: 'https://hunter.io/',
          },
          method: 'GET',
          paths: [
            {
              name: 'email-verifier',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default HunterIo
