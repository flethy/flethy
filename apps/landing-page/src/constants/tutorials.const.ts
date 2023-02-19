import { FlowNode } from '@flethy/flow'

export interface WorkflowTutorial {
	id: string
	name: string
	description: string
	workflow: FlowNode[]
}

export const WORKFLOW_TUTORIALS: WorkflowTutorial[] = [
	{
		id: 'ipapi',
		name: 'IP API',
		description: 'IP lookup',
		workflow: [
			{
				id: 'ipapi',
				config: {
					namespace: '_flethyresponse',
				},
				kind: 'ipapi.core.completeLocation',
				'param:ip': '',
				'param:format': 'json',
			},
		],
	},
	{
		id: 'webhooksite',
		name: 'WebhookSite',
		description: 'Send an HTTP request to WebhookSite',
		workflow: [
			{
				id: 'webhooksite-post',
				kind: 'webhooksite.core.post',
				'param:uuid': 'UUID_HERE',
				'header:x-test-header': 'flethy',
				'body:body': {
					hello: 'world!',
				},
			},
		],
	},
	{
		id: 'browsers',
		name: 'BrowsersFyi',
		description: 'Get Browser information',
		workflow: [
			{
				id: 'browsers-fyi',
				config: {
					namespace: '_flethyresponse',
				},
				kind: 'browsersfyi.core.get',
			},
		],
	},
]
