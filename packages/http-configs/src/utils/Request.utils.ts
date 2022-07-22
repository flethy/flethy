import { FetchParams } from '../types/FetchParams.type'
import { RequestOptions, RequestParams } from '../types/Request.types'
import { Base64Utils } from './Base64.utils'
import { ConfigUtils } from './Config.utils'

export function nao<Params extends RequestParams>(params: Params): FetchParams {
  return HttpRequestConfig.requestConfig(
    HttpRequestConfig.requestOptions<Params>(params),
  )
}

export class HttpRequestConfig {
  public static requestOptions<Params extends RequestParams>(
    params: Params,
  ): RequestOptions<Params> {
    const config = ConfigUtils.getConfigByKind(params.kind)
    return { params, api: config.api, endpoint: config.endpoint }
  }

  public static requestConfig(options: RequestOptions<any>): FetchParams {
    // VALIDATION

    let url: string | undefined
    const base = options.endpoint.base ?? options.api.base
    if (Array.isArray(base) && options.params.baseId) {
      url = base.find(
        (currentBase) => currentBase.id === options.params.baseId,
      )?.url
    } else if (typeof base === 'string') {
      url = base
    }
    if (!url) {
      throw new Error(`Cannot determine Base URL`)
    }

    const config: FetchParams = {
      method: options.endpoint.method,
      url,
      headers: options.api.headers ?? {},
      body: options.endpoint.method === 'GET' ? undefined : {},
    }
    const queryParams: { [key: string]: string } = {}
    const formData: Array<{ key: string; value: string }> = []

    // PARAMS

    for (const paramKey of Object.keys(options.params)) {
      const [type, keyname] = paramKey.split(':')
      switch (type) {
        case 'query':
          queryParams[keyname] = options.params[paramKey]
          break
        case 'customQuery':
          for (const customQueryKey of Object.keys(options.params[paramKey])) {
            queryParams[customQueryKey] =
              options.params[paramKey][customQueryKey]
          }
          break
        case 'body':
          if (keyname === 'body') {
            config.body = options.params[paramKey]
          } else {
            config.body[keyname] = options.params[paramKey]
          }
          break
        case 'header':
          if (!config.headers) {
            config.headers = {}
          }
          config.headers[keyname] = options.params[paramKey]
          break
        case 'subdomain':
          config.url = config.url.replace(paramKey, options.params[paramKey])
          break
      }
    }

    // STATIC PARAMS
    if (options.endpoint.query) {
      for (const queryParam of Object.keys(options.endpoint.query)) {
        queryParams[queryParam] = options.endpoint.query[queryParam]
      }
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
            paths.push(options.params[`param:${path.name}`])
            break
          case 'auth':
            paths.push(options.params[`auth:${path.name}`])
            break
        }
      }
      config.url += `/${paths.join('/')}`
      if (options.endpoint.options?.pathTailingSlash) {
        config.url += '/'
      }
    }

    // AUTH
    if (options.endpoint.auth || options.api.auth) {
      for (const paramKey of Object.keys(options.params)) {
        const [type, keyname] = paramKey.split(':')
        if (type === 'auth') {
          const auth = options.endpoint.auth ?? options.api.auth
          if (!auth) {
            throw new Error(`Auth cannot be resolved.`)
          }
          const authConfig = auth[keyname]
          switch (authConfig.type) {
            case 'query':
              queryParams[keyname] = options.params[paramKey]
              break
            case 'header':
              if (!config.headers) {
                config.headers = {}
              }
              config.headers[keyname] = options.params[paramKey]
              break
            case 'header:bearer':
              if (!config.headers) {
                config.headers = {}
              }
              config.headers[keyname] = `Bearer ${options.params[paramKey]}`
              break
            case 'header:basic':
              if (!config.headers) {
                config.headers = {}
              }
              const toEncode = options.params[paramKey].password
                ? `${options.params[paramKey].username}:${options.params[paramKey].password}`
                : `${options.params[paramKey].username}:`
              config.headers[keyname] = `Basic ${Base64Utils.encode(toEncode)}`
              break
            case 'header:token':
              if (!config.headers) {
                config.headers = {}
              }
              config.headers[keyname] = `Token ${options.params[paramKey]}`
              break
            case 'header:custom':
              if (!config.headers) {
                config.headers = {}
              }
              config.headers[keyname] = `${authConfig.custom?.prefix ?? ''}${
                options.params[paramKey]
              }${authConfig.custom?.postfix ?? ''}`
              break
            case 'body':
              if (authConfig.authHandler) {
                authConfig.authHandler(config, options.params[paramKey])
              }
              break
            case 'body:form':
              formData.push({ key: keyname, value: options.params[paramKey] })
              break
            case 'subdomain':
              config.url = config.url.replace(
                `subdomain:${keyname}`,
                options.params[paramKey],
              )
              break
            case 'path':
              // will be handled in path section
              break
          }
        }
      }
    }

    if (formData.length > 0) {
      config.body = formData
        .map((item) => `${item.key}=${item.value}`)
        .join('&')
    }

    // REQUEST
    if (Object.keys(queryParams).length > 0) {
      config.url += `?${Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
    }

    return config
  }
}
