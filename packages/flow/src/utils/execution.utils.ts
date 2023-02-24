import { nao } from '@flethy/connectors'
import { FetchParams } from '@flethy/connectors/dist/types/FetchParams.type'
import { FlowNode, FlowNodeResponse } from '../types/flow.types'

const NONE_KIND = 'none'

export class ExecutionUtils {
  public static async execute(node: FlowNode): Promise<FlowNodeResponse> {
    if (node.kind === NONE_KIND) {
      return {
        data: {},
        ts: Date.now(),
        resolved: true,
        type: 'none-kind',
      }
    }
    const request = nao(node)
    const response = await ExecutionUtils.request(request)
    return response
  }

  public static getRequestParams(node: FlowNode): FetchParams {
    return nao(node)
  }

  private static async request(params: FetchParams): Promise<FlowNodeResponse> {
    const nodeResponse: FlowNodeResponse = {
      data: {},
      ts: 0,
      resolved: true,
      type: 'http',
    }

    try {
      const response = await fetch(params.url, {
        method: params.method,
        headers: params.headers,
        body: JSON.stringify(params.body),
      })

      if (!response.ok) {
        nodeResponse.resolved = false
        nodeResponse.error = response.statusText
        nodeResponse.data = {
          statusCode: response.status,
        }
      } else {
        if (!params.responseType || params.responseType === 'json') {
          nodeResponse.data = await response.json()
        }
      }
    } catch (error: any) {
      nodeResponse.error = error
      nodeResponse.data = error.response?.data
      nodeResponse.resolved = false
    }

    nodeResponse.ts = Date.now()

    return nodeResponse
  }
}
