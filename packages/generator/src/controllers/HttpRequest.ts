import axios from 'axios'
import {
  InputData,
  jsonInputForTargetLanguage,
  quicktype,
} from 'quicktype-core'
import { FetchParams } from '../../../connectors/src/types/FetchParams.type'
import { logger } from '../utils/Logger'

export class HttpRequest {
  public static async request(params: FetchParams) {
    const axiosConfig = {
      method: params.method,
      url: params.url,
      headers: params.headers,
      data: params.body,
    }

    try {
      const response = await axios(axiosConfig)

      const data = response.data
      return data
    } catch (error) {
      logger.error(error.message)
      logger.error(error.response.data)
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
