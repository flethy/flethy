import { nao, OpenSea, Slack } from '@web3nao/http-configs'
import { FetchParams } from '@web3nao/http-configs/dist/types/FetchParams.type'
import { RequestParams } from '@web3nao/http-configs/dist/types/Request.types'
import axios from 'axios'
import * as jq from 'node-jq'

interface naoEntry extends RequestParams {
  id: string
  next?: string[]
  previous?: string[]
  [key: string]: any
}

interface NodeLog {
  id: string
  type: 'in' | 'out' | 'prepared'
  ts: number
}

const JQ_TYPE_SEPARATOR = '->'

const FLOW: naoEntry[] = [
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
          text: `->.context.assets[0].id->string`,
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

export class Test {
  private context: any
  private next: naoEntry[] = []
  private log: NodeLog[] = []

  constructor(private config: { flow: naoEntry[]; input: any }) {
    this.context = config.input
    if (this.config.flow.length === 0) {
      throw new Error(`No flow nodes specified.`)
    }
    this.next = [config.flow[0]]
  }

  public async flowGeneric() {
    while (this.next.length > 0) {
      await Promise.all(this.next.map((nextNode) => this.execute(nextNode)))
    }
    console.log(this.log)
  }

  public async execute(node: naoEntry) {
    this.log.push({ id: node.id, ts: Date.now(), type: 'in' })
    await Test.changeVars(node, this.context)
    this.log.push({ id: node.id, ts: Date.now(), type: 'prepared' })
    const request = nao(node)
    const response = await Test.request(request)
    this.context = Object.assign(this.context, response)
    this.next = this.next.filter((current) => current.id !== node.id)
    const nextNodeIds = node.next ?? []
    if (nextNodeIds.length > 0) {
      const nextNodes = this.config.flow.filter((current) =>
        nextNodeIds.includes(current.id),
      )
      this.next.push(...nextNodes)
    }
    this.log.push({ id: node.id, ts: Date.now(), type: 'out' })
  }

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

  public static async changeVars(object: any, context: any) {
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
          Test.changeVars(child, context),
        )
        await Promise.all(promises)
      } else if (typeof object[key] === 'object') {
        await Test.changeVars(object[key], context)
      }
    }
  }
}

const controller = new Test({ flow: FLOW, input: { limit: 20 } })
controller.flowGeneric()
