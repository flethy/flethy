import { FlowNode } from '@flethy/flow'

export enum TutorialLevel {
	Beginner = 'Beginner',
}

export interface WorkflowTutorial {
	name: string
	level: TutorialLevel
	workflow: FlowNode[]
	env?: {
		[key: string]: string
	}
}

export const WORKFLOW_TUTORIALS: { [key: string]: WorkflowTutorial } = {
	WebhookSite: {
		name: 'First Http Request',
		level: TutorialLevel.Beginner,
		workflow: [
			{
				id: 'webhooksite-post',
				kind: 'webhooksite.core.post',
				'param:uuid': '==>env==>WEBHOOKSITE_UUID',
				'header:x-test-header': 'flethy',
				'body:body': {
					hello: 'world!',
				},
			},
		],
		env: {
			WEBHOOKSITE_UUID: 'webhooksite_uuid',
		},
	},
}
