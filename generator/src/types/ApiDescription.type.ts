import { FetchMethod } from './FetchParams.type'

export interface ApiDescription {
  meta: {
    name: string
    url: string
    docs: string
  }
  base: string
  auth?: { [key: string]: ApiDescriptionAuth }
  api: {
    [entity: string]: {
      [key: string]: ApiDescriptionEndpoint
    }
  }
}

export interface ApiDescriptionEndpoint {
  method: FetchMethod
  meta: {
    title: string
    description: string
    docs: string
  }
  query: { [key: string]: string }
  params: { [key: string]: ApiDescriptionEndpointParam }
}

export interface ApiDescriptionEndpointParam {
  type: 'enum' | 'string' | 'number'
  required: boolean
  paramType: 'query' | 'path' | 'body'
  values?: string[]
  description?: string
}

export interface ApiDescriptionAuth {
  type: 'query' | 'header'
}
