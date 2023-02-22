import { RequestParams } from '@flethy/connectors/dist/types/Request.types'

export interface FlowNode extends RequestParams {
  id: string
  next?: FlowNextNode[]
  previous?: string[]
  config?: {
    noUpdateContext?: boolean
    namespace?: string
    postAssignments?: Array<{
      namespace: string
      key: string
      valueToEvaluate: string
    }>
  }
  [key: string]: any
}

export interface FlowNextNode {
  id: string
  condition?: {
    filter: string
    toMatchFilter?: string
    toMatch?: string | number
    toDecisionModel?: {
      id: string
      targetKey: string
    }
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

export interface EngineOptions {
  debug?: boolean
  dryRun?: boolean
  resolveMappings?: boolean
}

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
  options?: EngineOptions
  decisions?: FlowDecisionModel[]
}

export interface FlowEnvironment {
  env: {
    [key: string]: string
  }
  secrets: {
    [key: string]: string
  }
}

export interface FlowDecisionModel {
  id: string
  model: Array<{
    input: string | number
    outputs: Array<{
      key: string
      value: boolean
    }>
  }>
}
