import { nao } from '@web3nao/http-configs'
import { FetchParams } from '@web3nao/http-configs/dist/types/FetchParams.type'
import { RequestParams } from '@web3nao/http-configs/dist/types/Request.types'
import axios from 'axios'
import * as jq from 'node-jq'
import { FLOW } from './testflow.const'
import { TEST_INSTANCE } from './testinstance.const'

export interface FlowNode extends RequestParams {
  id: string
  next?: FlowNextNode[]
  previous?: string[]
  [key: string]: any
}

interface FlowNextNode {
  id: string
  condition?: {
    filter: string
    toMatch: string
  }
}

type FlowNodeResponseType = 'prepare' | 'http' | 'postcondition'

interface FlowNodeResponse {
  id?: string
  error?: any
  type: FlowNodeResponseType
  data: any
  resolved: boolean
  ts: number
}

type FlowNodeLogType = 'in' | 'out' | 'prepared'

interface FlowNodeLog {
  id: string
  type: FlowNodeLogType
  ts: number
}

type FlowState = 'stopped' | 'started' | 'running' | 'error'

const JQ_TYPE_SEPARATOR = '->'
const INTERNAL_EXCHANGE = '==>'

export interface FlowContext {
  state: FlowState
  context: any
  next: string[]
  log: FlowNodeLog[]
  incoming: Array<{ id: string; in: string[] }>
  errors: FlowNodeResponse[]
  executingNodeIds: string[]
}

export class FlowEngine {
  private instanceContext: FlowContext = {
    state: 'stopped',
    context: {},
    next: [],
    log: [],
    incoming: [],
    errors: [],
    executingNodeIds: [],
  }

  constructor(
    private config: {
      flow: FlowNode[]
      input?: any
      instanceContext?: FlowContext
    },
  ) {
    if (this.config.flow.length === 0) {
      throw new Error(`No flow nodes specified.`)
    }
    if (config.instanceContext) {
      // continue a running instance with context
      this.instanceContext = config.instanceContext
    } else {
      if (config.input) {
        this.instanceContext.context = config.input
      }
      // first node in array is automatically start node
      this.instanceContext.next = [config.flow[0].id]
    }
  }

  public async start() {
    this.updateState('started')
    while (this.shouldRun()) {
      // if just started: update state to running
      this.updateState()
      await Promise.all(
        this.instanceContext.next.map((nextNode) =>
          this.execute(this.nodeById(nextNode)),
        ),
      )
    }
    console.log(this.instanceContext)
    // console.log(JSON.stringify(this.instanceContext))
  }

  private nodeById(id: string): FlowNode {
    const foundNextNode = this.config.flow.find(
      (currentNode) => currentNode.id === id,
    )
    if (!foundNextNode) {
      throw new Error(`Node with id ${id} not found`)
    }
    return foundNextNode
  }

  private shouldRun(): boolean {
    const nextNodesAvailable = this.instanceContext.next.length > 0
    const errorsAvailable = this.instanceContext.state === 'error'
    const executingNodesAvailable =
      this.instanceContext.executingNodeIds.length > 0
    const instanceJustStarted = this.instanceContext.state === 'started'
    return (
      nextNodesAvailable &&
      !errorsAvailable &&
      (!executingNodesAvailable || instanceJustStarted)
    )
  }

  private updateState(target?: FlowState) {
    if (this.instanceContext.state === 'error') {
      return
    }
    if (target) {
      this.instanceContext.state = target
      return
    }
    switch (this.instanceContext.state) {
      case 'started':
        this.instanceContext.state = 'running'
        break
    }
  }

  private addLog(options: { id: string; type: FlowNodeLogType }) {
    this.instanceContext.log.push({
      id: options.id,
      ts: Date.now(),
      type: options.type,
    })
  }

  public async execute(node: FlowNode) {
    if (this.waitForIncoming(node)) {
      // need to wait for all incoming nodes
      return
    }
    this.addLog({ id: node.id, type: 'in' })
    this.instanceContext.executingNodeIds.push(node.id)
    // replace any references
    try {
      await FlowEngine.replaceReferencedVariables(
        node,
        this.instanceContext.context,
      )
    } catch (error: any) {
      this.addError({
        data: 'failed to replace referenced variables',
        type: 'prepare',
        error,
        id: node.id,
      })
      this.instanceContext.executingNodeIds =
        this.instanceContext.executingNodeIds.filter(
          (currentId) => currentId !== node.id,
        )
      return
    }
    this.addLog({ id: node.id, type: 'prepared' })
    const request = nao(node)
    const response = await FlowEngine.request(request)
    if (response.error) {
      this.addError({
        data: response.data,
        error: response.error,
        id: node.id,
        type: response.type,
      })
      this.instanceContext.executingNodeIds =
        this.instanceContext.executingNodeIds.filter(
          (currentId) => currentId !== node.id,
        )
      return
    }
    this.instanceContext.context = Object.assign(
      this.instanceContext.context,
      response.data,
    )
    // post cleanup (1) remove current node from next, (2) update incoming nodes
    this.instanceContext.next = this.instanceContext.next.filter(
      (currentId) => currentId !== node.id,
    )
    if (node.previous && node.previous.length > 0) {
      this.instanceContext.incoming = this.instanceContext.incoming.filter(
        (current) => current.id !== node.id,
      )
    }
    // add next nodes to run
    this.instanceContext.executingNodeIds =
      this.instanceContext.executingNodeIds.filter(
        (currentId) => currentId !== node.id,
      )
    await this.addNextNodes(node)
    this.addLog({ id: node.id, type: 'out' })
  }

  private addError(options: {
    data: string
    type: FlowNodeResponseType
    error: any
    id: string
  }) {
    this.instanceContext.errors.push({
      data: options.data,
      resolved: false,
      ts: Date.now(),
      type: options.type,
      error: options.error.message,
      id: options.id,
    })
    this.updateState('error')
  }

  private nextFlowNodesIncludes(
    nextFlowNodes: FlowNextNode[],
    id: string,
  ): boolean {
    for (const nextFlowNode of nextFlowNodes) {
      if (nextFlowNode.id === id) {
        return true
      }
    }
    return false
  }

  private async addNextNodes(node: FlowNode) {
    const nextNodeIds = node.next ?? []
    if (nextNodeIds.length > 0) {
      const filteredNextNodes: FlowNextNode[] = []
      for (const nextNodeId of nextNodeIds) {
        try {
          const metCondition = await this.checkNextNodeCondition(nextNodeId)
          if (metCondition) {
            filteredNextNodes.push(nextNodeId)
          }
        } catch (error: any) {
          this.addError({
            data: 'failed to evaluate condition',
            type: 'postcondition',
            error: error,
            id: node.id,
          })
        }
      }
      const nextNodes = this.config.flow.filter((current) =>
        this.nextFlowNodesIncludes(filteredNextNodes, current.id),
      )
      // check if next nodes need to wait for incoming nodes
      nextNodes.forEach((nextNode) => {
        if (nextNode.previous && nextNode.previous.length > 0) {
          let foundIncoming = this.instanceContext.incoming.find(
            (currentIncoming) => currentIncoming.id === nextNode.id,
          )
          if (!foundIncoming) {
            foundIncoming = {
              id: nextNode.id,
              in: [node.id],
            }
            this.instanceContext.incoming.push(foundIncoming)
          } else {
            foundIncoming.in.push(node.id)
          }
        }
      })
      this.instanceContext.next = this.instanceContext.next.filter(
        (currentNodeId) =>
          !this.nextFlowNodesIncludes(nextNodeIds, currentNodeId),
      )
      this.instanceContext.next.push(
        ...nextNodes.map((nextNode) => nextNode.id),
      )
    }
  }

  private waitForIncoming(node: FlowNode) {
    if (node.previous && node.previous.length > 0) {
      // need to wait for all invoming nodes
      const foundIncoming = this.instanceContext.incoming.find(
        (currentIncoming) => currentIncoming.id === node.id,
      )
      if (!foundIncoming) {
        // no previous node finished
        return true
      }
      for (const idToWait of node.previous) {
        if (!foundIncoming.in.includes(idToWait)) {
          return true
        }
      }
    }
    return false
  }

  public static async request(params: FetchParams): Promise<FlowNodeResponse> {
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

  public async checkNextNodeCondition(next: FlowNextNode): Promise<boolean> {
    if (!next.condition) {
      return true
    }
    const evaluated = await jq.run(
      next.condition.filter,
      { context: this.instanceContext.context },
      { input: 'json' },
    )
    return evaluated === next.condition.toMatch
  }

  public static async replaceReferencedVariables(object: any, context: any) {
    for (const key of Object.keys(object)) {
      if (typeof object[key] === 'string') {
        const stringValue: string = object[key]
        if (stringValue.startsWith(JQ_TYPE_SEPARATOR)) {
          const splitted = stringValue.split(JQ_TYPE_SEPARATOR)
          const evaluated = await jq.run(
            splitted[1],
            { context },
            { input: 'json' },
          )
          switch (splitted[2]) {
            case 'number':
              object[key] = Number(evaluated)
              break
            case 'string':
              object[key] = String(evaluated)
              break
            default:
              object[key] = evaluated
          }
        }
        if (stringValue.startsWith(INTERNAL_EXCHANGE)) {
          const splitted = stringValue.split(INTERNAL_EXCHANGE)
          switch (splitted[1]) {
            case 'env':
              object[key] = process.env[splitted[2]]!
              break
          }
        }
      } else if (Array.isArray(object[key])) {
        const promises = object[key].map((child: any) =>
          FlowEngine.replaceReferencedVariables(child, context),
        )
        await Promise.all(promises)
      } else if (typeof object[key] === 'object') {
        await FlowEngine.replaceReferencedVariables(object[key], context)
      }
    }
  }
}

const controller = new FlowEngine({
  flow: FLOW,
  input: { limit: 20 },
  instanceContext: TEST_INSTANCE,
})
controller.start()
