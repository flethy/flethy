import { flow, types } from 'mobx-state-tree'
import { WORKFLOW_TUTORIALS } from '../../constants/tutorials.const'
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
		workflowId: types.optional(types.string, ''),
		name: types.optional(types.string, ''),
		workflow: types.optional(types.string, ''),
	})
	.actions((self) => {
		// INITIALIZATION
		const initialisePage = flow(function* (options: {
			workflowId?: string
			workspaceId: string
			projectId: string
		}) {
			self.context.projectId = options.projectId
			self.context.workspaceId = options.workspaceId
			self.workflowId = options.workflowId || ''

			if (options.workflowId) {
				self.workflowId = options.workflowId
				const { api } = getRootStore(self)
				const response = yield api.workflows.get({
					workspaceId: options.workspaceId,
					projectId: options.projectId,
					workflowId: options.workflowId,
				})
				self.workflow = JSON.stringify({
					name: response.name,
					workflow: response.workflow.workflow,
				})
				self.name = response.name
			} else {
				const tutorial = WORKFLOW_TUTORIALS.WebhookSite
				self.name = tutorial.name
				const workflow = {
					name: tutorial.name,
					workflow: tutorial.workflow,
					env: tutorial.env,
				}
				self.workflow = JSON.stringify(workflow, null, 2)
			}
		})

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
