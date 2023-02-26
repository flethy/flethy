import { INTERNAL_EXCHANGE, JQ_TYPE_SEPARATOR } from '../constants/flow.const'
import {
  EngineOptions,
  FlowContext,
  FlowDecisionModel,
  FlowEnvironment,
  FlowInstanceStartConfig,
  FlowNextNode,
  FlowNode,
  FlowNodeLogType,
  FlowNodeResponseType,
  FlowState,
} from '../types/flow.types'
import { EvaluationUtils } from './evaluation.utils'

export class FlowUtils {
  private instanceContext: FlowContext = {
    state: 'stopped',
    context: {},
    next: [],
    log: [],
    incoming: [],
    errors: [],
    executingNodeIds: [],
  }
  private flow: FlowNode[]
  private env: FlowEnvironment
  private engineOptions: EngineOptions | undefined
  private decisions: FlowDecisionModel[] | undefined

  constructor(config: FlowInstanceStartConfig) {
    this.flow = config.flow
    this.env = config.env
    this.engineOptions = config.options
    this.decisions = config.decisions
    if (config.instanceContext) {
      this.instanceContext = config.instanceContext
    } else {
      if (config.input) {
        this.instanceContext.context = config.input
      }
      // first node in array is automatically start node
      this.instanceContext.next = [config.flow[0].id]
    }
  }

  public checkInstancePreconditions() {
    if (this.flow.length === 0) {
      throw new Error(`No flow nodes specified.`)
    }
  }

  public nodeById(id: string): FlowNode {
    const foundNextNode = this.flow.find((currentNode) => currentNode.id === id)
    if (!foundNextNode) {
      throw new Error(`Node with id ${id} not found`)
    }
    return foundNextNode
  }

  public nextNodes(): FlowNode[] {
    return this.instanceContext.next.map((nextNodeId) =>
      this.nodeById(nextNodeId),
    )
  }

  public addExecutingNodeId(id: string) {
    this.instanceContext.executingNodeIds.push(id)
  }

  public removeExecutingNodeId(id: string) {
    this.instanceContext.executingNodeIds =
      this.instanceContext.executingNodeIds.filter(
        (currentId) => currentId !== id,
      )
  }

  public removeNodeIdFromNext(id: string) {
    this.instanceContext.next = this.instanceContext.next.filter(
      (currentId) => currentId !== id,
    )
  }

  public updateIncomingFlowForNode(node: FlowNode) {
    if (node.previous && node.previous.length > 0) {
      this.instanceContext.incoming = this.instanceContext.incoming.filter(
        (current) => current.id !== node.id,
      )
    }
  }

  public shouldRun(): boolean {
    const nextNodesAvailable =
      this.instanceContext.next.length > 0 && !this.nextNodesOnlyWaiting()
    const errorsAvailable = this.instanceContext.state === 'error'
    const executingNodesAvailable =
      this.instanceContext.executingNodeIds.length > 0
    const instanceJustStarted = this.instanceContext.state === 'started'

    return (
      nextNodesAvailable &&
      !errorsAvailable &&
      (!executingNodesAvailable || instanceJustStarted)
    )
  }

  private nextNodesOnlyWaiting(): boolean {
    for (const nextNodeId of this.instanceContext.next) {
      const foundWaiting = this.instanceContext.incoming.find(
        (currentIncoming) => currentIncoming.id === nextNodeId,
      )
      if (!foundWaiting) {
        return false
      }
      if (this.instanceContext.executingNodeIds.length > 0) {
        return false
      }
    }
    return true
  }

  public updateState(target?: FlowState) {
    if (this.instanceContext.state === 'error') {
      return
    }
    if (target) {
      this.instanceContext.state = target
      return
    }
    switch (this.instanceContext.state) {
      case 'started':
        this.instanceContext.state = 'running'
        break
    }
  }

  public updateContext(node: FlowNode, data: any) {
    if (!data || node.config?.noUpdateContext === true) {
      return
    }

    let newData: any = {}
    if (node.config?.namespace) {
      newData[node.config.namespace] = data
    } else {
      newData = data
    }

    this.instanceContext.context = Object.assign(
      this.instanceContext.context,
      newData,
    )
  }

  public async executePostAssignments(node: FlowNode) {
    if (
      !node.config?.postAssignments ||
      node.config?.postAssignments.length === 0
    ) {
      return
    }

    for (const assignment of node.config.postAssignments) {
      const value = await EvaluationUtils.evaluate(
        assignment.valueToEvaluate,
        this.instanceContext.context,
      )
      console.log(assignment)
      console.log(value)
      if (this.instanceContext.context[assignment.namespace]) {
        this.instanceContext.context[assignment.namespace][assignment.key] =
          value
      } else {
        this.instanceContext.context[assignment.namespace] = {}
        this.instanceContext.context[assignment.namespace][assignment.key] =
          value
      }
    }
  }

  public addLog(options: { id: string; type: FlowNodeLogType }) {
    this.instanceContext.log.push({
      id: options.id,
      ts: Date.now(),
      type: options.type,
    })
  }

  public addError(options: {
    data: string
    type: FlowNodeResponseType
    error: any
    id: string
  }) {
    this.instanceContext.errors.push({
      data: options.data,
      resolved: false,
      ts: Date.now(),
      type: options.type,
      error: options.error.message,
      id: options.id,
    })
    this.updateState('error')
  }

  public nextFlowNodesIncludes(
    nextFlowNodes: FlowNextNode[],
    id: string,
  ): boolean {
    for (const nextFlowNode of nextFlowNodes) {
      if (nextFlowNode.id === id) {
        return true
      }
    }
    return false
  }

  public async addNextNodes(node: FlowNode) {
    const nextNodeIds = node.next ?? []
    if (nextNodeIds.length > 0) {
      const filteredNextNodes: FlowNextNode[] = []
      for (const nextNodeId of nextNodeIds) {
        try {
          const metCondition = await this.checkNextNodeCondition(nextNodeId)
          if (metCondition) {
            filteredNextNodes.push(nextNodeId)
          }
        } catch (error: any) {
          this.addError({
            data: 'failed to evaluate condition',
            type: 'postcondition',
            error: error,
            id: node.id,
          })
        }
      }
      const nextNodes = this.flow.filter((current) =>
        this.nextFlowNodesIncludes(filteredNextNodes, current.id),
      )
      // check if next nodes need to wait for incoming nodes
      nextNodes.forEach((nextNode) => {
        if (nextNode.previous && nextNode.previous.length > 0) {
          let foundIncoming = this.instanceContext.incoming.find(
            (currentIncoming) => currentIncoming.id === nextNode.id,
          )
          if (!foundIncoming) {
            foundIncoming = {
              id: nextNode.id,
              in: [node.id],
            }
            this.instanceContext.incoming.push(foundIncoming)
          } else {
            foundIncoming.in.push(node.id)
          }
        }
      })
      this.instanceContext.next = this.instanceContext.next.filter(
        (currentNodeId) =>
          !this.nextFlowNodesIncludes(nextNodeIds, currentNodeId),
      )
      this.instanceContext.next.push(
        ...nextNodes.map((nextNode) => nextNode.id),
      )
    }
  }

  public async checkNextNodeCondition(next: FlowNextNode): Promise<boolean> {
    const condition = next.condition
    if (!condition) {
      return true
    }
    const evaluated = await EvaluationUtils.evaluate(
      condition.filter,
      this.instanceContext.context,
    )
    if (condition.toMatchFilter) {
      const toMatchEvaluated = await EvaluationUtils.evaluate(
        condition.toMatchFilter,
        this.instanceContext.context,
      )
      return evaluated === toMatchEvaluated
    }
    if (condition.toMatch) {
      return evaluated === condition.toMatch
    }
    if (
      condition.toDecisionModel &&
      this.decisions &&
      this.decisions.length > 0
    ) {
      // check decision model
      const decisionModel = this.decisions.find(
        (current) => current.id === condition.toDecisionModel!.id,
      )
      if (decisionModel) {
        const foundModelEntry = decisionModel.model.find((current) => {
          if (Array.isArray(current.input)) {
            return (current.input as any[]).includes(evaluated)
          } else {
            return current.input === evaluated
          }
        })
        if (foundModelEntry) {
          const foundTarget = foundModelEntry.outputs.find(
            (current) => current.key === condition.toDecisionModel!.targetKey,
          )
          if (foundTarget) {
            return foundTarget.value
          } else if (foundModelEntry.default !== undefined) {
            return foundModelEntry.default
          }
        }
      }
    }
    if (typeof evaluated === 'boolean') {
      return evaluated
    }
    return false
  }

  public waitForIncoming(node: FlowNode) {
    if (node.previous && node.previous.length > 0) {
      // need to wait for all invoming nodes
      const foundIncoming = this.instanceContext.incoming.find(
        (currentIncoming) => currentIncoming.id === node.id,
      )
      if (!foundIncoming) {
        // no previous node finished
        return true
      }
      for (const idToWait of node.previous) {
        if (!foundIncoming.in.includes(idToWait)) {
          return true
        }
      }
    }
    return false
  }

  public async replaceReferencedVariables(object: any) {
    if (this.engineOptions?.resolveMappings === false) {
      return
    }
    for (const key of Object.keys(object)) {
      if (typeof object[key] === 'string') {
        const stringValue: string = object[key]
        if (stringValue.startsWith(JQ_TYPE_SEPARATOR)) {
          const splitted = stringValue.split(JQ_TYPE_SEPARATOR)
          const evaluated = await EvaluationUtils.evaluate(
            splitted[1],
            this.instanceContext.context,
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
        if (stringValue.startsWith(INTERNAL_EXCHANGE)) {
          const splitted = stringValue.split(INTERNAL_EXCHANGE)
          object[key] = EvaluationUtils.fromEnv(
            this.env,
            splitted[1],
            splitted[2],
          )
        }
      } else if (Array.isArray(object[key])) {
        const promises = object[key].map((child: any) =>
          this.replaceReferencedVariables(child),
        )
        await Promise.all(promises)
      } else if (typeof object[key] === 'object') {
        await this.replaceReferencedVariables(object[key])
      }
    }
  }

  public getInstanceContext(): FlowContext {
    return this.instanceContext
  }
}
