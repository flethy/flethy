import { RequestParams } from '@web3nao/http-configs/dist/types/Request.types'

export interface FlowNode extends RequestParams {
  id: string
  next?: FlowNextNode[]
  previous?: string[]
  config?: {
    noUpdateContext?: boolean
  }
  [key: string]: any
}

export interface FlowNextNode {
  id: string
  condition?: {
    filter: string
    toMatch: string | number
  }
}

export type FlowNodeResponseType = 'prepare' | 'http' | 'postcondition'

export interface FlowNodeResponse {
  id?: string
  error?: any
  type: FlowNodeResponseType
  data: any
  resolved: boolean
  ts: number
}

export type FlowNodeLogType = 'in' | 'out' | 'prepared'

export interface FlowNodeLog {
  id: string
  type: FlowNodeLogType
  ts: number
}

export type FlowState = 'stopped' | 'started' | 'running' | 'error'

export interface FlowContext {
  state: FlowState
  context: any
  next: string[]
  log: FlowNodeLog[]
  incoming: Array<{ id: string; in: string[] }>
  errors: FlowNodeResponse[]
  executingNodeIds: string[]
}

export interface FlowInstanceStartConfig {
  flow: FlowNode[]
  input?: any
  instanceContext?: FlowContext
  env: FlowEnvironment
}

export interface FlowEnvironment {
  env: {
    [key: string]: string
  }
  secrets: {
    [key: string]: string
  }
}
