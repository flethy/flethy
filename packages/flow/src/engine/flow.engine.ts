import { FlowInstanceStartConfig, FlowNode } from '../types/flow.types'
import { ExecutionUtils } from '../utils/execution.utils'
import { FlowUtils } from '../utils/flow.utils'
import { Logger } from '../utils/logger.utils'

export class FlowEngine {
  private utils: FlowUtils

  constructor(config: FlowInstanceStartConfig) {
    this.utils = new FlowUtils(config)
    this.utils.checkInstancePreconditions()
  }

  public async start() {
    this.utils.updateState('started')
    while (this.utils.shouldRun()) {
      // if just started: update state to running
      this.utils.updateState()
      Logger.info(this.utils.getInstanceContext())
      await Promise.all(
        this.utils.nextNodes().map((nextNode) => this.execute(nextNode)),
      )
    }
    Logger.info(this.utils.getInstanceContext())
    // console.log(this.instanceContext)
    // console.log(JSON.stringify(this.instanceContext))
  }

  public getContent() {
    return this.utils.getInstanceContext().context
  }

  private async execute(node: FlowNode) {
    if (this.utils.waitForIncoming(node)) {
      // need to wait for all incoming nodes
      return
    }
    this.utils.addLog({ id: node.id, type: 'in' })
    this.utils.addExecutingNodeId(node.id)
    // replace any references
    try {
      await this.utils.replaceReferencedVariables(node)
    } catch (error: any) {
      this.utils.addError({
        data: 'failed to replace referenced variables',
        type: 'prepare',
        error,
        id: node.id,
      })
      this.utils.removeExecutingNodeId(node.id)
      return
    }
    this.utils.addLog({ id: node.id, type: 'prepared' })
    const response = await ExecutionUtils.execute(node)
    if (response.error) {
      this.utils.addError({
        data: response.data,
        error: response.error,
        id: node.id,
        type: response.type,
      })
      this.utils.removeExecutingNodeId(node.id)
      return
    }
    this.utils.updateContext(node, response.data)
    // post cleanup (1) remove current node from next, (2) update incoming nodes
    this.utils.removeNodeIdFromNext(node.id)
    this.utils.updateIncomingFlowForNode(node)
    // add next nodes to run
    this.utils.removeExecutingNodeId(node.id)
    await this.utils.addNextNodes(node)
    this.utils.addLog({ id: node.id, type: 'out' })
  }
}
