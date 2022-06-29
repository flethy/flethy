import { nao, OpenSea, Slack } from '@web3nao/http-configs'
import { FetchParams } from '@web3nao/http-configs/dist/types/FetchParams.type'
import { RequestParams } from '@web3nao/http-configs/dist/types/Request.types'
import axios from 'axios'
import * as jq from 'node-jq'

interface naoEntry extends RequestParams {
  id: string
  [key: string]: any
}

const JQ_TYPE_SEPARATOR = '->'

const FLOW: naoEntry[] = [
  {
    id: '1',
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
]

export class Test {
  public async flowGeneric(flow: naoEntry[], input: any) {
    let context = input
    for (const entry of flow) {
      await Test.changeVars(entry, context)
      const request = nao(entry)
      console.log({ request })
      const response = await Test.request(request)
      context = Object.assign(context, response)
      console.log({ context })
    }
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

const controller = new Test()
// controller.flow({ limit: 20 })
controller.flowGeneric(FLOW, { limit: 20 })
