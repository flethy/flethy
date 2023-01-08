import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace TLDRtech {
  export type Entity = { jobboard: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  export interface ListJobs extends RequestParams {
    kind: 'tldrtech.jobboard.list'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'tldrtech',
      name: 'TLDRtech',
      url: 'https://tldr.tech/',
      docs: 'https://tldr.tech/',
      signup: 'https://tldr.tech/',
      pricing: 'https://tldr.tech/',
      tags: ['web2'],
      category: 'career',
      type: 'job-listings',
      social: {
        twitter: 'tldrnewsletter',
      },
    },
    base: '',
    api: {
      jobboard: {
        list: {
          interface: 'ListJobs',
          meta: {
            title: 'List Jobs',
            description: 'List Jobs',
            docs: 'https://tldr.tech/',
          },
          method: 'GET',
          base: 'https://tldr-tech.vercel.app/api',
          paths: [
            {
              name: 'jobs',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default TLDRtech
