import { ApiDescription } from '../types/ApiDescription.type'
import { FetchParams } from '../types/FetchParams.type'
import { logger } from '../utils/Logger'
import axios from 'axios'
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
  JSONSchemaInput,
  FetchingJSONSchemaStore,
} from 'quicktype-core'

export class ApiRequest {
  private apiDescription: ApiDescription

  public init(json: ApiDescription) {
    this.apiDescription = json
  }

  public requestConfig(options: {
    entity: string
    endpoint: string
    params: { [key: string]: any }
    auth?: { [key: string]: string }
  }): FetchParams {
    // VALIDATION
    const endpointDescription =
      this.apiDescription.api[options.entity][options.endpoint]
    if (!endpointDescription) {
      throw new Error(`Endpoint ${options.endpoint} not found`)
    }
    const config: FetchParams = {
      method: endpointDescription.method,
      url: this.apiDescription.base,
    }
    const queryParams: { [key: string]: string } = {}

    // AUTH
    if (this.apiDescription.auth) {
      if (!options.auth) {
        throw new Error('Auth required')
      }
      for (const authParam of Object.keys(this.apiDescription.auth)) {
        const inputAuthParam = options.auth[authParam]
        if (!inputAuthParam) {
          throw new Error(`Mandatory Auth Param required: ${authParam}`)
        }
        switch (this.apiDescription.auth[authParam].type) {
          case 'query':
            queryParams[authParam] = inputAuthParam
            break
        }
      }
    }

    // PARAMS

    for (const paramKey of Object.keys(options.params)) {
      if (!Object.keys(endpointDescription.params).includes(paramKey)) {
        throw new Error(`Param ${paramKey} not found`)
      }
      const paramDescription = endpointDescription.params[paramKey]
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
      }
    }

    // STATIC PARAMS
    for (const queryParam of Object.keys(endpointDescription.query)) {
      queryParams[queryParam] = endpointDescription.query[queryParam]
    }

    // REQUEST
    if (Object.keys(queryParams).length > 0) {
      config.url += `?${Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
    }

    return config
  }

  public getApiName() {
    return this.apiDescription.meta.name
  }

  public static async request(params: FetchParams) {
    const axiosConfig = {
      method: params.method,
      url: params.url,
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
