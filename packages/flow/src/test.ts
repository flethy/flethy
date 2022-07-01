import { nao, OpenSea, Slack } from '@web3nao/http-configs'
import { FetchParams } from '@web3nao/http-configs/dist/types/FetchParams.type'
import { RequestParams } from '@web3nao/http-configs/dist/types/Request.types'
import axios from 'axios'
import * as jq from 'node-jq'

interface FlowNode extends RequestParams {
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

interface FlowNodeLog {
  id: string
  type: 'in' | 'out' | 'prepared'
  ts: number
}

type FlowState = 'stopped' | 'started' | 'running' | 'error'

const JQ_TYPE_SEPARATOR = '->'

const FLOW: FlowNode[] = [
  {
    id: '1',
    next: [
      {
        id: '2',
        condition: { filter: '.context.assets | length', toMatch: '3' },
      },
      { id: '3' },
    ],
    kind: 'opensea.assets.get',
    'auth:X-API-KEY': process.env.OPENSEA_APIKEY!,
    'query:asset_contract_address': process.env.ETH_DIYPUNKS_CONTRACT!,
    'query:owner': process.env.ETH_OWNER!,
    'query:limit': '->.context.limit->number',
    'query:offset': 0,
    'query:order_direction': 'desc',
  },
  {
    id: '2',
    next: [{ id: '4' }],
    kind: 'slack.incomingWebhooks.message',
    'auth:webhookid': process.env.SLACK_WEBHOOK_ID!,
    'body:text': 'Hello, world!',
    'body:blocks': [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `->.context.assets[0].id->number`,
        },
      },
    ],
  },
  {
    id: '3',
    next: [{ id: '4' }],
    kind: 'opensea.assets.get',
    'auth:X-API-KEY': process.env.OPENSEA_APIKEY!,
    'query:asset_contract_address': process.env.ETH_DIYPUNKS_CONTRACT!,
    'query:owner': process.env.ETH_OWNER!,
    'query:limit': '->.context.limit->number',
    'query:offset': 0,
    'query:order_direction': 'desc',
  },
  {
    id: '4',
    previous: ['2', '3'],
    kind: 'opensea.assets.get',
    'auth:X-API-KEY': process.env.OPENSEA_APIKEY!,
    'query:asset_contract_address': process.env.ETH_DIYPUNKS_CONTRACT!,
    'query:owner': process.env.ETH_OWNER!,
    'query:limit': '->.context.limit->number',
    'query:offset': 0,
    'query:order_direction': 'desc',
  },
]

export class FlowEngine {
  private state: FlowState = 'stopped'
  private context: any
  private next: FlowNode[] = []
  private log: FlowNodeLog[] = []
  private incoming: Array<{ id: string; in: string[] }> = []
  private errors: FlowNodeResponse[] = []
  private executingNodeIds: string[] = []

  constructor(private config: { flow: FlowNode[]; input: any }) {
    this.context = config.input
    if (this.config.flow.length === 0) {
      throw new Error(`No flow nodes specified.`)
    }
    // first node in array is automatically start node
    this.next = [config.flow[0]]
  }

  public async start() {
    this.state = 'started'
    while (this.shouldRun()) {
      this.updateState()
      await Promise.all(this.next.map((nextNode) => this.execute(nextNode)))
    }
    console.log(this.log)
    console.log(this.incoming)
    console.log(this.errors)
    console.log(this.state)
  }

  private shouldRun(): boolean {
    const nextNodesAvailable = this.next.length > 0
    const errorsAvailable = this.state === 'error'
    const executingNodesAvailable = this.executingNodeIds.length > 0
    const instanceJustStarted = this.state === 'started'
    return (
      nextNodesAvailable &&
      !errorsAvailable &&
      (executingNodesAvailable || instanceJustStarted)
    )
  }

  private updateState(target?: FlowState) {
    if (this.state === 'error') {
      return
    }
    if (target) {
      this.state = target
      return
    }
    switch (this.state) {
      case 'started':
        this.state = 'running'
        break
    }
  }

  public async execute(node: FlowNode) {
    if (this.waitForIncoming(node)) {
      // need to wait for all incoming nodes
      return
    }
    this.log.push({ id: node.id, ts: Date.now(), type: 'in' })
    this.executingNodeIds.push(node.id)
    // replace any references
    try {
      await FlowEngine.replaceReferencedVariables(node, this.context)
    } catch (error: any) {
      this.addError({
        data: 'failed to replace referenced variables',
        type: 'prepare',
        error,
        id: node.id,
      })
      this.executingNodeIds = this.executingNodeIds.filter(
        (currentId) => currentId !== node.id,
      )
      return
    }
    this.log.push({ id: node.id, ts: Date.now(), type: 'prepared' })
    const request = nao(node)
    const response = await FlowEngine.request(request)
    if (response.error) {
      this.addError({
        data: response.data,
        error: response.error,
        id: node.id,
        type: response.type,
      })
      this.executingNodeIds = this.executingNodeIds.filter(
        (currentId) => currentId !== node.id,
      )
      return
    }
    this.context = Object.assign(this.context, response.data)
    // post cleanup (1) remove current node from next, (2) update incoming nodes
    this.next = this.next.filter((current) => current.id !== node.id)
    if (node.previous && node.previous.length > 0) {
      this.incoming = this.incoming.filter((current) => current.id !== node.id)
    }
    // add next nodes to run
    this.executingNodeIds = this.executingNodeIds.filter(
      (currentId) => currentId !== node.id,
    )
    await this.addNextNodes(node)
    this.log.push({ id: node.id, ts: Date.now(), type: 'out' })
  }

  private addError(options: {
    data: string
    type: FlowNodeResponseType
    error: any
    id: string
  }) {
    this.errors.push({
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
          let foundIncoming = this.incoming.find(
            (currentIncoming) => currentIncoming.id === nextNode.id,
          )
          if (!foundIncoming) {
            foundIncoming = {
              id: nextNode.id,
              in: [node.id],
            }
            this.incoming.push(foundIncoming)
          } else {
            foundIncoming.in.push(node.id)
          }
        }
      })
      this.next = this.next.filter(
        (currentNode) =>
          !this.nextFlowNodesIncludes(nextNodeIds, currentNode.id),
      )
      this.next.push(...nextNodes)
    }
  }

  private waitForIncoming(node: FlowNode) {
    if (node.previous && node.previous.length > 0) {
      // need to wait for all invoming nodes
      const foundIncoming = this.incoming.find(
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
      { context: this.context },
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

const controller = new FlowEngine({ flow: FLOW, input: { limit: 20 } })
controller.start()
