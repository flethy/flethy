import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Statically {
  export type Entity = { staticzap: any }
  export type Endpoint = {
    github: ApiDescriptionEndpoint
    gitlab: ApiDescriptionEndpoint
    bitbucket: ApiDescriptionEndpoint
  }

  export interface StaticZapBase {
    'param:user': string
    'param:repo': string
    'param:tag': string
    'param:file': string
  }

  export interface StaticZapGithub extends StaticZapBase, RequestParams {
    kind: 'statically.staticzap.github'
  }

  export interface StaticZapGitlab extends StaticZapBase, RequestParams {
    kind: 'statically.staticzap.gitlab'
  }

  export interface StaticZapBitbucket extends StaticZapBase, RequestParams {
    kind: 'statically.staticzap.bitbucket'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'statically',
      name: 'Statically',
      url: 'https://statically.io/',
      docs: 'https://statically.io/',
      tags: ['web2'],
      category: 'network',
      type: 'cdn',
    },
    base: 'https://cdn.statically.io',
    api: {
      staticzap: {
        github: {
          interface: 'StaticZapGithub',
          meta: {
            title: 'StaticZapGithub',
            description: '-',
            docs: 'https://statically.io/',
          },
          method: 'GET',
          paths: [
            {
              name: 'gh',
              type: 'static',
            },
            {
              name: 'user',
              type: 'param',
            },
            {
              name: 'repo',
              type: 'param',
            },
            {
              name: 'tag',
              type: 'param',
            },
            {
              name: 'file',
              type: 'param',
            },
          ],
        },
        gitlab: {
          interface: 'StaticZapGitlab',
          meta: {
            title: 'StaticZapGitlab',
            description: '-',
            docs: 'https://statically.io/',
          },
          method: 'GET',
          paths: [
            {
              name: 'gl',
              type: 'static',
            },
            {
              name: 'user',
              type: 'param',
            },
            {
              name: 'repo',
              type: 'param',
            },
            {
              name: 'tag',
              type: 'param',
            },
            {
              name: 'file',
              type: 'param',
            },
          ],
        },
        bitbucket: {
          interface: 'StaticZapBitbucket',
          meta: {
            title: 'StaticZapBitbucket',
            description: '-',
            docs: 'https://statically.io/',
          },
          method: 'GET',
          paths: [
            {
              name: 'bb',
              type: 'static',
            },
            {
              name: 'user',
              type: 'param',
            },
            {
              name: 'repo',
              type: 'param',
            },
            {
              name: 'tag',
              type: 'param',
            },
            {
              name: 'file',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Statically
