import { FlowEngine } from '../src/engine/flow.engine'
import { FLOW } from './testflow.const'
import { TEST_INSTANCE } from './testinstance.const'

const engine = new FlowEngine({
  flow: FLOW,
  input: { limit: 20 },
  instanceContext: TEST_INSTANCE,
})
engine.start()
