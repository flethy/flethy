import { FlowNode } from '../src/types/flow.types'

export const FLOW: FlowNode[] = [
  {
    id: '1',
    next: [
      {
        id: '2',
        condition: { filter: '.context.assets | length', toMatch: '2' },
      },
      { id: '3' },
    ],
    kind: 'opensea.assets.get',
    'auth:X-API-KEY': '==>env==>OPENSEA_APIKEY',
    'query:asset_contract_address': '==>env==>ETH_DIYPUNKS_CONTRACT',
    'query:owner': '==>env==>ETH_OWNER',
    'query:limit': '->.context.limit->number',
    'query:offset': 0,
    'query:order_direction': 'desc',
  },
  {
    id: '2',
    next: [{ id: '4' }],
    config: {
      noUpdateContext: true,
    },
    kind: 'slack.incomingWebhooks.message',
    'auth:webhookid': '==>env==>SLACK_WEBHOOK_ID',
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
    next: [{ id: '4' }],
    kind: 'opensea.assets.get',
    'auth:X-API-KEY': '==>env==>OPENSEA_APIKEY',
    'query:asset_contract_address': '==>env==>ETH_DIYPUNKS_CONTRACT',
    'query:owner': '==>env==>ETH_OWNER',
    'query:limit': '->.context.limit->number',
    'query:offset': 0,
    'query:order_direction': 'desc',
  },
  {
    id: '4',
    previous: ['2', '3'],
    kind: 'opensea.assets.get',
    'auth:X-API-KEY': '==>env==>OPENSEA_APIKEY',
    'query:asset_contract_address': '==>env==>ETH_DIYPUNKS_CONTRACT',
    'query:owner': '==>env==>ETH_OWNER',
    'query:limit': '->.context.limit->number',
    'query:offset': 0,
    'query:order_direction': 'desc',
  },
]
