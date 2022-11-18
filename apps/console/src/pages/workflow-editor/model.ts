import { types } from 'mobx-state-tree'

const WORKFLOW_EXAMPLE = `{
	"name": "test",
	"workflow": [
		{
			"id": "slackNotification",
			"config": {
				"namespace": "slack"
			},
			"kind": "slack.incomingWebhooks.message",
			"auth:webhookid": "==>secrets==>SLACK_WEBHOOK_ID",
			"body:text": "works!",
			"body:blocks": []
		}
	]
}
`

export const WorkflowEditorPage = types
	.model('WorkflowEditorPage', {
		id: types.optional(types.string, ''),
		name: types.optional(types.string, ''),
		workflow: types.optional(types.string, ''),
	})
	.actions((self) => ({
		// INITIALIZATION
		initialisePage(options: { id: string }) {
			self.id = options.id
			self.name = 'Workflow Name'
			self.workflow = WORKFLOW_EXAMPLE
		},

		updateWorkflow(value: string) {
			self.workflow = value
		},
	}))
	.views((self) => ({}))
