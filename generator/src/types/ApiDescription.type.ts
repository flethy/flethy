import { FetchMethod } from './FetchParams.type'

export interface ApiDescription<Entity, Endpoint> {
  meta: {
    name: string
    url: string
    docs: string
  }
  base: string
  auth?: { [key: string]: ApiDescriptionAuth }
  headers?: { [key: string]: string }
  api: {
    [entity in keyof Entity]: {
      [endpoint in keyof Endpoint]: ApiDescriptionEndpoint
    }
  }
}

export interface ApiDescriptionPath {
  name: string
  type: 'static' | 'param'
}

export interface ApiDescriptionEndpoint {
  method: FetchMethod
  paths?: ApiDescriptionPath[]
  meta: {
    title: string
    description: string
    docs: string
  }
  query?: { [key: string]: string }
  params?: { [key: string]: ApiDescriptionEndpointParam }
}

export interface ApiDescriptionEndpointParam {
  type: 'enum' | 'string' | 'number' | 'any'
  required: boolean
  paramType: 'query' | 'path' | 'body'
  values?: string[]
  description?: string
}

export interface ApiDescriptionAuth {
  type: 'query' | 'header'
}
