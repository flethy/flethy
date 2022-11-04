import { FetchParams } from '../types/FetchParams.type'
import { RequestOptions, RequestParams } from '../types/Request.types'
import { Base64Utils } from './Base64.utils'
import { ConfigUtils } from './Config.utils'
import { OAuth1Helper } from './OAuth1a.utils'

export function nao<Params extends RequestParams>(params: Params): FetchParams {
  return HttpRequestConfig.requestConfig(
    HttpRequestConfig.requestOptions<Params>(params),
  )
}

export async function naoAsync<Params extends RequestParams>(
  params: Params,
): Promise<FetchParams> {
  const requestOptions = await HttpRequestConfig.asyncPreparation(
    HttpRequestConfig.requestOptions<Params>(params),
  )
  return HttpRequestConfig.requestConfig(requestOptions)
}

export function asyncPreparationNeeded<Params extends RequestParams>(
  params: Params,
): boolean {
  return HttpRequestConfig.asyncPreparationNeeded(
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

  public static asyncPreparationNeeded(options: RequestOptions<any>): boolean {
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
            case 'header:oauth1a':
              return true
          }
        }
      }
    }
    return false
  }

  public static async asyncPreparation(
    options: RequestOptions<any>,
  ): Promise<RequestOptions<any>> {
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
            case 'header:oauth1a':
              const url = HttpRequestConfig.getUrl(options)
              const oauthhelper = new OAuth1Helper({
                consumerKeys: {
                  key: options.params[paramKey].consumerKey,
                  secret: options.params[paramKey].consumerSecret,
                },
              })
              const oauthInfo = await oauthhelper.authorize(
                {
                  url: url,
                  method: options.endpoint.method,
                  data: {},
                },
                {
                  key: options.params[paramKey].accessKey,
                  secret: options.params[paramKey].accessSecret,
                },
              )
              const headerValue = oauthhelper.toHeader(oauthInfo)
              options.params[`header:${keyname}`] = headerValue.Authorization
              break
          }
        }
      }
    }
    return options
  }

  private static getUrl(options: RequestOptions<any>): string {
    let url: string | undefined
    const base = options.endpoint.base ?? options.api.base
    if (Array.isArray(base)) {
      const baseId = options.params.baseId ?? 'default'
      url = base.find((currentBase) => currentBase.id === baseId)?.url
    } else if (typeof base === 'string') {
      url = base
    }
    if (!url) {
      throw new Error(`Cannot determine Base URL`)
    }
    return url
  }

  public static requestConfig(options: RequestOptions<any>): FetchParams {
    // VALIDATION

    const url = HttpRequestConfig.getUrl(options)

    const config: FetchParams = {
      method: options.endpoint.method,
      url,
      headers: options.api.headers ?? {},
      body: options.endpoint.method === 'GET' ? undefined : {},
    }
    const queryParams: URLSearchParams = new URLSearchParams()
    const formData: Array<{ key: string; value: string }> = []

    // PARAMS

    for (const paramKey of Object.keys(options.params)) {
      const [type, keyname] = paramKey.split(':')
      switch (type) {
        case 'query':
          queryParams.append(keyname, options.params[paramKey])
          break
        case 'customQuery':
          for (const customQueryKey of Object.keys(options.params[paramKey])) {
            queryParams.append(
              customQueryKey,
              options.params[paramKey][customQueryKey],
            )
          }
          break
        case 'body':
          if (['GET'].includes(options.endpoint.method)) {
            throw new Error(`Body not allowed for GET method`)
          }
          if (keyname === 'body') {
            config.body = options.params[paramKey]
          } else {
            // BODY TRANSFORMATION
            if (
              options.endpoint.transform &&
              options.endpoint.transform[paramKey]
            ) {
              switch (options.endpoint.transform[paramKey].type) {
                case 'prefix':
                  config.body[
                    keyname
                  ] = `${options.endpoint.transform[paramKey].value}${options.params[paramKey]}`
              }
            } else {
              config.body[keyname] = options.params[paramKey]
            }
          }
          break
        case 'bodyform':
          if (['GET'].includes(options.endpoint.method)) {
            throw new Error(`Body not allowed for GET method`)
          }
          formData.push({ key: keyname, value: options.params[paramKey] })
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

    if (!config.headers) {
      config.headers = {}
    }

    if (!config.headers['Content-Type'] && !config.headers['content-type']) {
      config.headers['content-type'] = 'application/json'
    }

    // STATIC PARAMS
    if (options.endpoint.query) {
      for (const queryParam of Object.keys(options.endpoint.query)) {
        queryParams.append(queryParam, options.endpoint.query[queryParam])
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
              queryParams.append(keyname, options.params[paramKey])
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
            case 'header:key':
              if (!config.headers) {
                config.headers = {}
              }
              config.headers[keyname] = `Key ${options.params[paramKey]}`
              break
            case 'header:basic':
              if (!config.headers) {
                config.headers = {}
              }
              let toEncode = ''
              if (options.params[paramKey].username) {
                toEncode = options.params[paramKey].password
                  ? `${options.params[paramKey].username}:${options.params[paramKey].password}`
                  : `${options.params[paramKey].username}:`
              } else if (options.params[paramKey].password) {
                toEncode = options.params[paramKey].username
                  ? `${options.params[paramKey].username}:${options.params[paramKey].password}`
                  : `:${options.params[paramKey].password}`
              } else {
                toEncode = options.params[paramKey]
              }
              config.headers[keyname] = `Basic ${Base64Utils.encode(toEncode)}`
              break
            case 'header:basic:encoded':
              if (!config.headers) {
                config.headers = {}
              }
              config.headers[keyname] = `Basic ${options.params[paramKey]}`
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
              if (authConfig.custom?.prefix || authConfig.custom?.postfix) {
                config.headers[keyname] = `${authConfig.custom?.prefix ?? ''}${
                  options.params[paramKey]
                }${authConfig.custom?.postfix ?? ''}`
              }
              if (authConfig.custom?.concat) {
                config.headers[keyname] = authConfig.custom?.concat.keys
                  .map((key) => options.params[paramKey][key])
                  .join(authConfig.custom?.concat.separator ?? '')
              }
              break
            case 'header:oauth1a':
              // ignore: needs to be handled via async preparation
              break
            case 'body':
              if (authConfig.authHandler) {
                authConfig.authHandler(config, options.params[paramKey])
              } else {
                if (!config.body) {
                  config.body = {}
                }
                config.body[keyname] = options.params[paramKey]
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
    const queryParameters = queryParams.toString()
    if (queryParameters?.length > 0) {
      config.url += `?${queryParameters}`
    }

    return config
  }
}
