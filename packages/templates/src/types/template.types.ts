import { FlowNode } from '@flethy/flow'

export enum TutorialLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export interface WorkflowTutorial {
  name: string
  icon?: string
  description: string
  prerequisites: string[]
  level: TutorialLevel
  type: 'oauth' | 'regular'
  prestep?: FlowNode[]
  workflow: FlowNode[]
  env?: {
    [key: string]: string
  }
}
