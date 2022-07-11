import { FlowEngine } from '../src/engine/flow.engine'
import { FLOW } from './testflow.const'
import { TEST_INSTANCE } from './testinstance.const'

// console.log(Object.keys(process.env))

const engine = new FlowEngine({
  flow: FLOW,
  input: { limit: 20 },
  // instanceContext: TEST_INSTANCE,
  env: {
    env: {
      OPENSEA_APIKEY: process.env.OPENSEA_APIKEY!,
      ETH_DIYPUNKS_CONTRACT: process.env.ETH_DIYPUNKS_CONTRACT!,
      ETH_OWNER: process.env.ETH_OWNER!,
      SLACK_WEBHOOK_ID: process.env.SLACK_WEBHOOK_ID!,
    },
    secrets: {},
  },
})

async function main() {
  const start = Date.now()
  await engine.start()
  const end = Date.now()
  console.log(end - start)
  console.log(`-------`)
}

main()
