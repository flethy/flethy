import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { FetchParams } from '../types/FetchParams.type'

export interface RequestOptions<RequestOptionsParams, RequestOptionsAuth> {
  api: ApiDescription<any, any>
  endpoint: ApiDescriptionEndpoint
  params: { [key in keyof RequestOptionsParams]: any }
  auth?: { [key in keyof RequestOptionsAuth]: string }
}

export class HttpRequestConfig {
  public static requestConfig(options: RequestOptions<any, any>): FetchParams {
    // VALIDATION
    const config: FetchParams = {
      method: options.endpoint.method,
      url: options.endpoint.base ?? options.api.base,
      headers: {},
      body: {},
    }
    const queryParams: { [key: string]: string } = {}

    // AUTH
    if (options.endpoint.auth || options.api.auth) {
      if (!options.auth) {
        throw new Error('Auth required')
      }
      const auth = options.endpoint.auth ?? options.api.auth
      for (const authParam of Object.keys(auth)) {
        const inputAuthParam = options.auth[authParam]
        if (!inputAuthParam) {
          throw new Error(`Mandatory Auth Param required: ${authParam}`)
        }
        switch (auth[authParam].type) {
          case 'query':
            queryParams[authParam] = inputAuthParam
            break
          case 'header':
            config.headers[authParam] = inputAuthParam
            break
          case 'path':
            // will be handled in path section
            break
        }
      }
    }

    // PARAMS

    for (const paramKey of Object.keys(options.params)) {
      if (!Object.keys(options.endpoint.params).includes(paramKey)) {
        throw new Error(`Param ${paramKey} not found`)
      }
      const paramDescription = options.endpoint.params[paramKey]
      switch (paramDescription.type) {
        case 'enum':
          if (typeof options.params[paramKey] !== 'string') {
            throw new Error(`Param ${paramKey} must be a string`)
          }
          if (!paramDescription.values?.includes(options.params[paramKey])) {
            throw new Error(
              `Param ${paramKey} has invalid value ${
                options.params[paramKey]
              }. Must be one of ${paramDescription.values.join(', ')}`
            )
          }
          break
        case 'string':
          if (typeof options.params[paramKey] !== 'string') {
            throw new Error(`Param ${paramKey} must be a string`)
          }
          break
        case 'number':
          if (typeof options.params[paramKey] !== 'number') {
            throw new Error(`Param ${paramKey} must be a number`)
          }
          break
      }

      // add params
      switch (paramDescription.paramType) {
        case 'query':
          queryParams[paramKey] = options.params[paramKey]
          break
        case 'body':
          if (paramKey === 'body') {
            config.body = options.params[paramKey]
          } else {
            config.body[paramKey] = options.params[paramKey]
          }
          break
      }
    }

    // STATIC PARAMS
    if (options.endpoint.query) {
      for (const queryParam of Object.keys(options.endpoint.query)) {
        queryParams[queryParam] = options.endpoint.query[queryParam]
      }
    }

    // REQUEST
    if (Object.keys(queryParams).length > 0) {
      config.url += `?${Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
    }

    // PATHS
    if (options.endpoint.paths) {
      const paths: string[] = []
      for (const path of options.endpoint.paths) {
        switch (path.type) {
          case 'static':
            paths.push(path.name)
            break
          case 'param':
            paths.push(options.params[path.name])
            break
          case 'auth':
            paths.push(options.auth[path.name])
            break
        }
      }
      config.url += `/${paths.join('/')}`
    }

    return config
  }
}
