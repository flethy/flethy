import axios from 'axios'
import {
  InputData,
  jsonInputForTargetLanguage,
  quicktype,
} from 'quicktype-core'
import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { FetchParams } from '../types/FetchParams.type'

export interface RequestOptions<RequestOptionsParams, RequestOptionsAuth> {
  // api: ApiDescription<any, any>
  api: ApiDescription<any, any>
  endpoint: ApiDescriptionEndpoint
  params: { [key in keyof RequestOptionsParams]: any }
  auth?: { [key in keyof RequestOptionsAuth]: string }
}

export class ApiRequest {
  public static requestConfig(options: RequestOptions<any, any>): FetchParams {
    // VALIDATION
    const config: FetchParams = {
      method: options.endpoint.method,
      url: options.api.base,
      headers: {},
      body: {},
    }
    const queryParams: { [key: string]: string } = {}

    // AUTH
    if (options.api.auth) {
      if (!options.auth) {
        throw new Error('Auth required')
      }
      for (const authParam of Object.keys(options.api.auth)) {
        const inputAuthParam = options.auth[authParam]
        if (!inputAuthParam) {
          throw new Error(`Mandatory Auth Param required: ${authParam}`)
        }
        switch (options.api.auth[authParam].type) {
          case 'query':
            queryParams[authParam] = inputAuthParam
            break
          case 'header':
            config.headers[authParam] = inputAuthParam
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
          config.body[paramKey] = options.params[paramKey]
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
        }
      }
      config.url += `/${paths.join('/')}`
    }

    return config
  }

  public static async request(params: FetchParams) {
    const axiosConfig = {
      method: params.method,
      url: params.url,
      headers: params.headers,
      data: params.body,
    }

    const response = await axios(axiosConfig)

    const data = response.data
    return data
  }

  public static async quicktypeJson(typeName: string, json: string) {
    const targetLanguage = 'ts'
    const jsonInput = jsonInputForTargetLanguage(targetLanguage)
    await jsonInput.addSource({
      name: typeName,
      samples: [json],
    })

    const inputData = new InputData()
    inputData.addInput(jsonInput)

    const generatedType = await quicktype({
      inputData,
      lang: targetLanguage,
    })

    return generatedType.lines.join('\n')
  }
}
