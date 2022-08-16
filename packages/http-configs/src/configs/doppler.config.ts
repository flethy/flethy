import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Doppler {
  export type Entity = { secrets: any }
  export type Endpoint = { download: ApiDescriptionEndpoint }

  interface DopplerBase {
    'auth:token': string
  }

  export interface DownloadSecrets extends DopplerBase, RequestParams {
    kind: 'doppler.secrets.download'
    'query:format': 'json' | 'yaml' | 'env'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'doppler',
      name: 'Doppler',
      url: 'https://doppler.com',
      docs: 'https://docs.doppler.com',
      tags: ['web2'],
      category: 'infra',
      type: 'secret-management',
      social: {
        twitter: 'doppler',
        github: 'dopplerhq',
      },
    },
    base: 'https://subdomain:token@api.doppler.com/v3',
    auth: {
      token: {
        type: 'subdomain',
      },
    },
    api: {
      secrets: {
        download: {
          interface: 'DownloadSecrets',
          meta: {
            title: 'Download Secrets',
            description: `Download the secrets for a Doppler project/environment.`,
            docs: 'https://docs.doppler.com',
          },
          method: 'GET',
          paths: [
            {
              name: 'configs',
              type: 'static',
            },
            {
              name: 'config',
              type: 'static',
            },
            {
              name: 'secrets',
              type: 'static',
            },
            {
              name: 'download',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Doppler
