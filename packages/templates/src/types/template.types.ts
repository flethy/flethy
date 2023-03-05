import { FlowNode } from '@flethy/flow'

export type TemplateLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type TemplateCategory = 'social-media'
export interface Template {
  id: string
  level: TemplateLevel
  meta: {
    name: string
    description: string
    prereq: Array<{
      text: string
      link?: {
        href: string
        label: string
      }
      secrets?: string[]
    }>
    docs?: Array<{
      type: 'docs' | 'blog'
      href: string
      label: string
    }>
    services: string[]
    category: TemplateCategory
    tags: string[]
  }
  flow: {
    nodes: FlowNode[]
    env?: {
      [key: string]: string
    }
  }
}

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
