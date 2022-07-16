import { FetchMethod, FetchParams } from './FetchParams.type'
import { CATEGORY, TAG, TYPE } from './ServiceCategory.type'

export interface ApiDescription<Entity, Endpoint> {
  meta: {
    id: string
    name: string
    url: string
    docs: string
    tags: TAG[]
    category: CATEGORY
    type: TYPE
    config?: string
  }
  base: string | ApiDescriptionBase[]
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
  interface: string
  base?: string | ApiDescriptionBase[]
  auth?: { [key: string]: ApiDescriptionAuth }
  paths?: ApiDescriptionPath[]
  options?: ApiDescriptionEndpointOptions
  meta: {
    title: string
    description: string
    docs: string
  }
  query?: { [key: string]: string }
  params?: any
}

export interface ApiDescriptionEndpointOptions {
  pathTailingSlash?: boolean
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
    | 'header:basic'
    | 'header:bearer'
    | 'header:token'
    | 'path'
    | 'body'
    | 'body:form'
  authHandler?: (fetchParams: FetchParams, authValue: string) => void
}

export interface ApiAuthBasic {
  username: string
  password?: string
}

export interface ApiDescriptionBase {
  id: string
  url: string
}
