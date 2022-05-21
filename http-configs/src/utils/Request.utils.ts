import { FetchParams } from '../types/FetchParams.type'
import { RequestOptions, RequestParams } from '../types/Request.types'
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

    let url: string
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
      headers: {},
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
        case 'body':
          if (keyname === 'body') {
            config.body = options.params[paramKey]
          } else {
            config.body[keyname] = options.params[paramKey]
          }
          break
        case 'header':
          config.headers[keyname] = options.params[paramKey]
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
          const authConfig = auth[keyname]
          switch (authConfig.type) {
            case 'query':
              queryParams[keyname] = options.params[paramKey]
              break
            case 'header':
              config.headers[keyname] = options.params[paramKey]
              break
            case 'header:bearer':
              config.headers[keyname] = `Bearer ${options.params[paramKey]}`
              break
            case 'header:token':
              config.headers[keyname] = `Token ${options.params[paramKey]}`
              break
            case 'body':
              authConfig.authHandler(config, options.params[paramKey])
              break
            case 'body:form':
              formData.push({ key: keyname, value: options.params[paramKey] })
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
