import { Instance, types } from 'mobx-state-tree'
import { PAGE_CONTEXT } from '../../models/api/context'
import { WorkflowDataModel } from '../../models/api/workflows'
import { FlethyContext } from '../../models/flethy.types'
import { getRootStore } from '../../models/helpers'

export const WorkflowsPage = types
	.model('SecretsPage', {
		context: types.optional(FlethyContext, {}),
	})
	.actions((self) => ({
		// INITIALIZATION
		initialisePage(options: { workspaceId: string; projectId: string }) {
			self.context.projectId = options.projectId
			self.context.workspaceId = options.workspaceId
			const { api } = getRootStore(self)
			api.context.setPage(PAGE_CONTEXT.WORKFLOWS)
			api.workflows.list({
				workspaceId: self.context.workspaceId,
				projectId: self.context.projectId,
			})
			api.crons.list({
				workspaceId: self.context.workspaceId,
				projectId: self.context.projectId,
			})
		},
	}))
	.views((self) => ({
		isLoading() {
			const { api } = getRootStore(self)
			return api.stateAndCache.somePending([
				{
					api: 'workflows',
					operation: 'list',
					id: self.context.projectId,
				},
				{
					api: 'crons',
					operation: 'list',
					id: self.context.projectId,
				},
			])
		},

		workflowsAvailable() {
			const { api } = getRootStore(self)
			const foundWorkflows = api.workflows.getFromStore({
				projectId: self.context.projectId,
			})
			if (foundWorkflows) {
				return foundWorkflows.length > 0
			}
			return false
		},

		getWorkflows(): Instance<typeof WorkflowDataModel>[] {
			const { api } = getRootStore(self)
			return api.workflows.getFromStore({ projectId: self.context.projectId })!
		},
	}))
