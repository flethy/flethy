import { FetchParams } from '@flethy/connectors/dist/types/FetchParams.type'
import { FlowNode, FlowNodeResponse } from '../types/flow.types'
import axios from 'axios'
import { nao } from '@flethy/connectors'

export class ExecutionUtils {
  public static async execute(node: FlowNode): Promise<FlowNodeResponse> {
    const request = nao(node)
    const response = await ExecutionUtils.request(request)
    return response
  }

  private static async request(params: FetchParams): Promise<FlowNodeResponse> {
    const axiosConfig = {
      method: params.method,
      url: params.url,
      headers: params.headers,
      data: params.body,
    }

    const nodeResponse: FlowNodeResponse = {
      data: {},
      ts: 0,
      resolved: true,
      type: 'http',
    }

    try {
      const response = await axios(axiosConfig)
      nodeResponse.data = response.data
    } catch (error: any) {
      nodeResponse.error = error
      nodeResponse.data = error.response?.data
      nodeResponse.resolved = false
    }

    nodeResponse.ts = Date.now()

    return nodeResponse
  }
}
