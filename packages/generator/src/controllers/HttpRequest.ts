import {
  InputData,
  jsonInputForTargetLanguage,
  quicktype,
} from 'quicktype-core'
import { FetchParams } from '../../../connectors/src/types/FetchParams.type'
import { logger } from '../utils/Logger'

export class HttpRequest {
  public static async request(
    params: FetchParams,
    options?: { dryRun?: boolean }
  ) {
    console.log(params)
    if (options?.dryRun) {
      return
    }
    const payload = params.body
      ? {
          method: params.method,
          headers: params.headers,
          body: JSON.stringify(params.body),
        }
      : { method: params.method, headers: params.headers }
    try {
      const response = await fetch(params.url, payload)

      let nodeResponse: any = {}

      if (!params.responseType || params.responseType === 'json') {
        try {
          nodeResponse = await response.json()
        } catch (error) {
          const textResponse = await response.text()
          logger.info(textResponse)
          logger.info(nodeResponse)
          logger.error(error)
          throw error
        }
      }
      if (params.responseType === 'text') {
        nodeResponse = await response.text()
      }
      // const response = await axios(axiosConfig)

      return nodeResponse
    } catch (error) {
      logger.error(error)
      // logger.error(error.response.data)
      // logger.error(error.response.config.headers)
      // logger.error(error.response.data.errors)
      // logger.error(Object.keys(error))
    }
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
