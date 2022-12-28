import {
  EngineOptions,
  FlowContext,
  FlowInstanceStartConfig,
  FlowNode,
} from '../types/flow.types'
import { ExecutionUtils } from '../utils/execution.utils'
import { FlowUtils } from '../utils/flow.utils'
import { Logger } from '../utils/logger.utils'

export class FlowEngine {
  private utils: FlowUtils
  private engineOptions: EngineOptions | undefined

  constructor(config: FlowInstanceStartConfig) {
    this.utils = new FlowUtils(config)
    this.engineOptions = config.options
    this.utils.checkInstancePreconditions()
  }

  public async start() {
    this.utils.updateState('started')
    while (this.utils.shouldRun()) {
      // if just started: update state to running
      this.utils.updateState()
      this.debug(this.utils.getInstanceContext())
      await Promise.all(
        this.utils.nextNodes().map((nextNode) => this.execute(nextNode)),
      )
    }
    this.debug(this.utils.getInstanceContext())
  }

  public hasErrors(): boolean {
    return this.utils.getInstanceContext().errors.length > 0
  }

  public getErrors(): Array<{ id?: string; error: any }> {
    return this.utils.getInstanceContext().errors.map((error) => {
      return { id: error.id, error: error.error }
    })
  }

  public getInstanceContext(): FlowContext {
    return this.utils.getInstanceContext()
  }

  public getContext(): any {
    return this.utils.getInstanceContext().context
  }

  // map attributes to _flethyresponse if they should be returned
  public getResponse() {
    return this.utils.getInstanceContext().context._flethyresponse ?? {}
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
    if (this.engineOptions?.dryRun === true) {
      // dry run: just update context
    } else {
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
      await this.utils.executePostAssignments(node)
    }
    // post cleanup (1) remove current node from next, (2) update incoming nodes
    this.utils.removeNodeIdFromNext(node.id)
    this.utils.updateIncomingFlowForNode(node)
    // add next nodes to run
    this.utils.removeExecutingNodeId(node.id)
    await this.utils.addNextNodes(node)
    this.utils.addLog({ id: node.id, type: 'out' })
  }

  private debug(message: any) {
    if (this.engineOptions?.debug === true) {
      Logger.info(message)
    }
  }
}
