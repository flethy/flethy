import { AuthAws } from 'types/ApiDescription.type'
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
    const config: FetchParams = {
      method: options.endpoint.method,
      url: options.endpoint.base ?? options.api.base,
      headers: {},
      body: {},
    }
    const queryParams: { [key: string]: string } = {}

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
            case 'header:aws':
              // eslint-disable-next-line no-case-declarations
              const authValue: AuthAws = options.params[paramKey] as AuthAws
              config.headers[
                keyname
              ] = `AWS4-HMAC-SHA256 Credential=${authValue.accessKey}/${authValue.region}/${authValue.service}/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=${authValue.secretKey}`
              // AWS4-HMAC-SHA256 Credential=.../20220427/us-east-1/s3/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=...
              break
            case 'path':
              // will be handled in path section
              break
          }
        }
      }
    }

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
