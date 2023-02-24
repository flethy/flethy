import { FlowEngine } from '../src/engine/flow.engine'
import { FLOW } from './testflow.const'
import { TEST_INSTANCE } from './testinstance.const'

// console.log(Object.keys(process.env))

const engine = new FlowEngine({
  flow: [
    {
      id: 'start',
      next: [
        {
          id: 'next1',
          condition: {
            filter: 'context.eventId',
            toDecisionModel: {
              id: 'test',
              targetKey: 'output1',
            },
          },
        },
        {
          id: 'next2',
          condition: {
            filter: 'context.eventId',
            toDecisionModel: {
              id: 'test',
              targetKey: 'output2',
            },
          },
        },
      ],
      kind: 'webhooksite.core.get',
      'param:uuid': '80370a44-bf66-49f5-bdb8-195d4c0cdd10',
      'header:x-test-header': 'flethy',
    },
    {
      id: 'next1',
      kind: 'webhooksite.core.get',
      'param:uuid': '80370a44-bf66-49f5-bdb8-195d4c0cdd10',
      'header:x-test-header': 'flethy-next1',
    },
    {
      id: 'next2',
      kind: 'webhooksite.core.get',
      'param:uuid': '80370a44-bf66-49f5-bdb8-195d4c0cdd10',
      'header:x-test-header': 'flethy-next2',
    },
  ],
  input: { eventId: 'input1' },
  env: {
    env: {},
    secrets: {},
  },
  decisions: [
    {
      id: 'test',
      model: [
        {
          input: 'input1',
          outputs: [
            {
              key: 'output1',
              value: false,
            },
            {
              key: 'output2',
              value: true,
            },
          ],
        },
      ],
    },
  ],
})

async function main() {
  const start = Date.now()
  await engine.start()
  const end = Date.now()
  console.log(end - start)
  console.log(`-------`)
}

main()
