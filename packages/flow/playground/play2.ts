import { FlowEngine } from '../src/engine/flow.engine'
import { TWITTERTHREAD_FLOW } from './twitterthread.const'
import { TEST_INSTANCE } from './testinstance.const'

// console.log(Object.keys(process.env))

const engine = new FlowEngine({
  flow: TWITTERTHREAD_FLOW,
  input: { input: { thread: ['gmfrens 23!', 'supernice!', 'oh yeah!'] } },
  // instanceContext: TEST_INSTANCE,
  env: {
    env: {},
    secrets: {
      CONSUMER_KEY: '',
      CONSUMER_SECRET: '',
      ACCESS_TOKEN: '',
      ACCESS_TOKEN_SECRET: '',
    },
  },
  options: {
    debug: true,
  },
})

async function main() {
  console.log(`Starting...`)
  const start = Date.now()
  console.log(`Engine start...`)
  await engine.start()
  console.log(`Engine done...`)
  const end = Date.now()
  console.log(end - start)
  console.log(`-------`)
}

main()

// check https://try.jsonata.org/
// Account.Order[1+1]
