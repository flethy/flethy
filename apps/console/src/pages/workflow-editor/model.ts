import { types } from 'mobx-state-tree'
import { FlethyContext } from '../../models/flethy.types'
import { getRootStore } from '../../models/helpers'

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
		context: types.optional(FlethyContext, {}),
		id: types.optional(types.string, ''),
		name: types.optional(types.string, ''),
		workflow: types.optional(types.string, ''),
	})
	.actions((self) => {
		// INITIALIZATION
		const initialisePage = (options: {
			id?: string
			workspaceId: string
			projectId: string
		}) => {
			if (options.id) {
				self.id = options.id
			}
			self.context.projectId = options.projectId
			self.context.workspaceId = options.workspaceId
			self.name = 'Workflow Name'
			self.workflow = WORKFLOW_EXAMPLE
		}

		const updateWorkflow = (value: string) => {
			self.workflow = value
		}

		const save = () => {
			const { api } = getRootStore(self)
			api.workflows.put({
				workspaceId: self.context.workspaceId,
				projectId: self.context.projectId,
				workflow: JSON.parse(self.workflow),
			})
		}

		return { initialisePage, updateWorkflow, save }
	})
	.views((self) => ({}))
