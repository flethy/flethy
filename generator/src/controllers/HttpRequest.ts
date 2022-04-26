import axios from 'axios'
import {
  InputData,
  jsonInputForTargetLanguage,
  quicktype,
} from 'quicktype-core'
import { FetchParams } from '../../../http-configs/src/types/FetchParams.type'

export class HttpRequest {
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
