// @ts-ignore
import { test } from 'node:test'
// @ts-ignore
import * as assert from 'node:assert'
import { FlowDecisionModel, FlowNode } from '../../types/flow.types'
import { FlowUtils } from '../../utils/flow.utils'

test('flow.utils', async (t) => {
  await t.test('decision model with array input', async () => {
    const decisions: FlowDecisionModel[] = [
      {
        id: 'event-to-channel',
        model: [
          {
            input: ['event1', 'event2'],
            outputs: [
              {
                key: 'testKey',
                value: true,
              },
            ],
          },
        ],
      },
    ]
    const flow: FlowNode[] = [
      {
        id: 'start',
        kind: 'none',
        next: [
          {
            id: 'test',
            condition: {
              filter: 'context.event',
              toDecisionModel: {
                id: 'event-to-channel',
                targetKey: 'testKey',
              },
            },
          },
        ],
      },
      {
        id: 'test',
        kind: 'none',
      },
    ]

    let flowUtils = new FlowUtils({
      env: {
        env: {},
        secrets: {},
      },
      flow,
      decisions,
      input: {
        event: 'event1',
      },
    })
    if (flow[0] && flow[0].next) {
      const nextNode = flow[0].next[0]
      if (nextNode) {
        const result = await flowUtils.checkNextNodeCondition(nextNode)
        assert.strictEqual(result, true)
      }
    }

    flowUtils = new FlowUtils({
      env: {
        env: {},
        secrets: {},
      },
      flow,
      decisions,
      input: {
        event: 'event3',
      },
    })
    if (flow[0] && flow[0].next) {
      const nextNode = flow[0].next[0]
      if (nextNode) {
        const result = await flowUtils.checkNextNodeCondition(nextNode)
        assert.strictEqual(result, false)
      }
    }
  })

  await t.test('decision model check default', async () => {
    const decisions: FlowDecisionModel[] = [
      {
        id: 'event-to-channel',
        model: [
          {
            input: ['event1', 'event2'],
            outputs: [
              {
                key: 'testKey',
                value: true,
              },
            ],
            default: true,
          },
        ],
      },
    ]
    const flow: FlowNode[] = [
      {
        id: 'start',
        kind: 'none',
        next: [
          {
            id: 'test',
            condition: {
              filter: 'context.event',
              toDecisionModel: {
                id: 'event-to-channel',
                targetKey: 'unknownTargetKey',
              },
            },
          },
        ],
      },
      {
        id: 'test',
        kind: 'none',
      },
    ]

    let flowUtils = new FlowUtils({
      env: {
        env: {},
        secrets: {},
      },
      flow,
      decisions,
      input: {
        event: 'event1',
      },
    })
    if (flow[0] && flow[0].next) {
      const nextNode = flow[0].next[0]
      if (nextNode) {
        const result = await flowUtils.checkNextNodeCondition(nextNode)
        assert.strictEqual(result, true)
      }
    }
  })
})
