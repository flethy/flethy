import { FetchMethod } from './FetchParams.type'
import { CATEGORY, TAG, TYPE } from './ServiceCategory.type'

export interface ApiDescription<Entity, Endpoint> {
  meta: {
    id: string
    name: string
    url: string
    docs: string
    config?: string
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
  type: 'static' | 'param' | 'auth'
}

export interface ApiDescriptionEndpoint {
  method: FetchMethod
  base?: string
  auth?: { [key: string]: ApiDescriptionAuth }
  paths?: ApiDescriptionPath[]
  meta: {
    title: string
    description: string
    docs: string
    tags: TAG[]
    category: CATEGORY
    type: TYPE
  }
  query?: { [key: string]: string }
  params?: any
}

export interface ApiDescriptionEndpointParam {
  type: 'enum' | 'string' | 'number' | 'any'
  required: boolean
  paramType: 'query' | 'path' | 'body'
  values?: string[]
  description?: string
}

export interface ApiDescriptionAuth {
  type:
    | 'query'
    | 'header'
    | 'header:bearer'
    | 'header:token'
    | 'path'
    | 'header:aws'
}

export interface AuthAws {
  accessKey: string
  secretKey: string
  region: 'us-east-1' | string
  service: 's3' | string
}
