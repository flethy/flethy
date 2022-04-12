import { ETHERSCAN } from '../configs/etherscan.config'
import { MAILERSEND } from '../configs/mailersend.config'
import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { FetchParams } from '../types/FetchParams.type'

export interface RequestParams {
  kind: string
}

export interface RequestOptions<RequestOptionsParams> {
  api: ApiDescription<any, any>
  endpoint: ApiDescriptionEndpoint
  params: RequestOptionsParams
}

export class HttpRequestConfig {
  public static requestOptions<Params extends RequestParams>(
    params: Params
  ): RequestOptions<Params> {
    let endpoint: ApiDescriptionEndpoint
    let api: ApiDescription<any, any>
    switch (params.kind) {
      case 'mailersend.email.send':
        api = MAILERSEND
        endpoint = MAILERSEND.api.email.send
        break
      case 'etherscan.accounts.balanceSingleAddress':
        api = ETHERSCAN
        endpoint = ETHERSCAN.api.accounts.balanceSingleAddress
        break
    }
    return { params, api, endpoint }
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
            case 'path':
              // will be handled in path section
              break
          }
        }
      }

      // if (!options.auth) {
      //   throw new Error('Auth required')
      // }
      // const auth = options.endpoint.auth ?? options.api.auth
      // for (const authParam of Object.keys(auth)) {
      //   const inputAuthParam = options.auth[authParam]
      //   if (!inputAuthParam) {
      //     throw new Error(`Mandatory Auth Param required: ${authParam}`)
      //   }
      //   switch (auth[authParam].type) {
      //     case 'query':
      //       queryParams[authParam] = inputAuthParam
      //       break
      //     case 'header':
      //       config.headers[authParam] = inputAuthParam
      //       break
      //     case 'path':
      //       // will be handled in path section
      //       break
      //   }
      // }
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
      }
      // if (!Object.keys(options.endpoint.params).includes(paramKey)) {
      //   throw new Error(`Param ${paramKey} not found`)
      // }
      // const paramDescription = options.endpoint.params[paramKey]
      // switch (paramDescription.type) {
      //   case 'enum':
      //     if (typeof options.params[paramKey] !== 'string') {
      //       throw new Error(`Param ${paramKey} must be a string`)
      //     }
      //     if (!paramDescription.values?.includes(options.params[paramKey])) {
      //       throw new Error(
      //         `Param ${paramKey} has invalid value ${
      //           options.params[paramKey]
      //         }. Must be one of ${paramDescription.values.join(', ')}`
      //       )
      //     }
      //     break
      //   case 'string':
      //     if (typeof options.params[paramKey] !== 'string') {
      //       throw new Error(`Param ${paramKey} must be a string`)
      //     }
      //     break
      //   case 'number':
      //     if (typeof options.params[paramKey] !== 'number') {
      //       throw new Error(`Param ${paramKey} must be a number`)
      //     }
      //     break
      // }

      // // add params
      // switch (paramDescription.paramType) {
      //   case 'query':
      //     queryParams[paramKey] = options.params[paramKey]
      //     break
      //   case 'body':
      //     if (paramKey === 'body') {
      //       config.body = options.params[paramKey]
      //     } else {
      //       config.body[paramKey] = options.params[paramKey]
      //     }
      //     break
      // }
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
            paths.push(options.params[`param:${path.name}`])
            break
          case 'auth':
            paths.push(options.params[`auth:${path.name}`])
            break
        }
      }
      config.url += `/${paths.join('/')}`
    }

    return config
  }
}
