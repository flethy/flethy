import { nao, OpenSea, Slack } from '@web3nao/http-configs'
import { FetchParams } from '@web3nao/http-configs/dist/types/FetchParams.type'
import { RequestParams } from '@web3nao/http-configs/dist/types/Request.types'
import axios from 'axios'
import * as jq from 'node-jq'

interface FlowNode extends RequestParams {
  id: string
  next?: string[]
  previous?: string[]
  [key: string]: any
}

interface FlowNodeResponse {
  id?: string
  error?: any
  data: any
  resolved: boolean
  ts: number
}

interface FlowNodeLog {
  id: string
  type: 'in' | 'out' | 'prepared'
  ts: number
}

const JQ_TYPE_SEPARATOR = '->'

const FLOW: FlowNode[] = [
  {
    id: '1',
    next: ['2', '3'],
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
    next: ['4'],
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
    next: ['4'],
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
  private context: any
  private next: FlowNode[] = []
  private log: FlowNodeLog[] = []
  private incoming: Array<{ id: string; in: string[] }> = []
  private errors: FlowNodeResponse[] = []

  constructor(private config: { flow: FlowNode[]; input: any }) {
    this.context = config.input
    if (this.config.flow.length === 0) {
      throw new Error(`No flow nodes specified.`)
    }
    this.next = [config.flow[0]]
  }

  public async flowGeneric() {
    while (
      this.next.length > 0 &&
      this.errors.filter((error) => !error.resolved).length === 0
    ) {
      await Promise.all(this.next.map((nextNode) => this.execute(nextNode)))
    }
    console.log(this.log)
    console.log(this.incoming)
    console.log(this.errors)
  }

  public async execute(node: FlowNode) {
    if (this.waitForIncoming(node)) {
      // need to wait for all incoming nodes
      return
    }
    this.log.push({ id: node.id, ts: Date.now(), type: 'in' })
    // replace any references
    await FlowEngine.replaceReferencedVariables(node, this.context)
    this.log.push({ id: node.id, ts: Date.now(), type: 'prepared' })
    const request = nao(node)
    const response = await FlowEngine.request(request)
    if (response.error) {
      this.errors.push(response)
    }
    this.context = Object.assign(this.context, response.data)
    // post cleanup (1) remove current node from next, (2) update incoming nodes
    this.next = this.next.filter((current) => current.id !== node.id)
    if (node.previous && node.previous.length > 0) {
      this.incoming = this.incoming.filter((current) => current.id !== node.id)
    }
    // add next nodes to run
    this.addNextNodes(node)
    this.log.push({ id: node.id, ts: Date.now(), type: 'out' })
  }

  private addNextNodes(node: FlowNode) {
    const nextNodeIds = node.next ?? []
    if (nextNodeIds.length > 0) {
      const nextNodes = this.config.flow.filter((current) =>
        nextNodeIds.includes(current.id),
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
        (currentNode) => !nextNodeIds.includes(currentNode.id),
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
controller.flowGeneric()
