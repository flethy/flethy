import { ApiDescription } from '../types/ApiDescription.type'
import { FetchParams } from '../types/FetchParams.type'
import { logger } from '../utils/Logger'
import axios from 'axios'

export class ApiRequest {
  private apiDescription: ApiDescription

  public init(json: ApiDescription) {
    this.apiDescription = json
  }

  public async request(options: {
    entity: string
    endpoint: string
    params: { [key: string]: any }
    auth?: { [key: string]: string }
  }) {
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

    const axiosConfig = {
      method: config.method,
      url: config.url,
    }

    const response = await axios(axiosConfig)
    return response.data
  }
}
