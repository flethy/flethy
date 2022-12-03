import { flow, types } from 'mobx-state-tree'
import { WORKFLOW_TUTORIALS } from '../../constants/tutorials.const'
import { FlethyContext } from '../../models/flethy.types'
import { getRootStore, getRouter } from '../../models/helpers'
import routes from '../../routes'

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
		envs: types.array(
			types.model({
				id: types.string,
				key: types.optional(types.string, ''),
				value: types.optional(types.string, ''),
			}),
		),
		envsIndex: types.optional(types.number, 0),
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
			self.envsIndex = 0
			self.name = ''
			self.workflow = ''
			self.envs.clear()

			if (options.workflowId) {
				self.workflowId = options.workflowId
				const { api } = getRootStore(self)
				const response = yield api.workflows.get({
					workspaceId: options.workspaceId,
					projectId: options.projectId,
					workflowId: options.workflowId,
				})
				self.workflow = JSON.stringify(response.workflow, null, 2)
				self.name = response.name
				if (response.env) {
					for (const envKey of Object.keys(response.env)) {
						addEnv({ key: envKey, value: response.env[envKey] })
					}
				}
			} else {
				const tutorial = WORKFLOW_TUTORIALS.WebhookSite
				self.name = tutorial.name
				if (tutorial.env) {
					for (const envKey of Object.keys(tutorial.env)) {
						addEnv({ key: envKey, value: tutorial.env[envKey] })
					}
				}
				self.workflow = JSON.stringify(tutorial.workflow, null, 2)
			}
		})

		const updateWorkflow = (value: string) => {
			self.workflow = value
		}

		const updateName = (value: string) => {
			self.name = value
		}

		const addEnv = (params?: { key: string; value: string }) => {
			self.envs.push({
				id: `envvar-${self.envsIndex}`,
				key: params?.key || '',
				value: params?.value || '',
			})
			self.envsIndex++
		}

		const updateEnv = (params: {
			id: string
			key?: string
			value?: string
		}) => {
			const env = self.envs.find((env) => env.id === params.id)
			if (env) {
				if (params.key) {
					env.key = params.key
				}
				if (params.value) {
					env.value = params.value
				}
			}
		}

		const removeEnv = (params: { id: string }) => {
			const env = self.envs.find((env) => env.id === params.id)
			if (env) {
				self.envs.remove(env)
			}
		}

		const save = flow(function* () {
			const { api } = getRootStore(self)

			const envs: { [key: string]: string } = {}
			for (const env of self.envs) {
				envs[env.key] = env.value
			}

			const workflowId =
				self.workflowId?.length > 0 ? self.workflowId : undefined

			const response = yield api.workflows.put({
				workflowId,
				workspaceId: self.context.workspaceId,
				projectId: self.context.projectId,
				workflow: JSON.parse(self.workflow),
				name: self.name,
				env: envs,
			})

			if (!workflowId) {
				getRouter().goTo(routes.workflowExisting, {
					workflowId: response.workflowId,
					projectId: self.context.projectId,
					workspaceId: self.context.workspaceId,
				})
			}
		})

		return {
			initialisePage,
			updateWorkflow,
			save,
			updateName,
			addEnv,
			updateEnv,
			removeEnv,
		}
	})
	.views((self) => ({}))
