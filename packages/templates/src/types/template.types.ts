import { FlowNode } from '@flethy/flow'

export type TemplateLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type TemplateCategory = 'social-media' | 'utils' | 'identity'
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
      secrets?: Array<{
        key: string
        description: string
      }>
      envs?: Array<{
        key: string
        description: string
      }>
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
  example?: any
}
