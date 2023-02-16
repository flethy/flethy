import { types } from 'mobx-state-tree'
import { getRootStore } from '../../../../models/helpers'

export const ShowApiConfigModal = types
	.model('ShowApiConfigModal', {
		context: types.optional(
			types.model({
				workspaceId: types.optional(types.string, ''),
				projectId: types.optional(types.string, ''),
				workflowId: types.maybe(types.string),
			}),
			{},
		),
		isOpen: types.optional(types.boolean, false),
	})
	.actions((self) => {
		// INITIALIZATION
		const open = (params: { workflowId?: string }) => {
			self.context.workflowId = undefined
			self.context.workflowId = params.workflowId

			const { api } = getRootStore(self)
			self.context.workspaceId = api.workspaces.getContext().workspaceId
			self.context.projectId = api.workspaces.getContext().projectId

			self.isOpen = true
		}

		const close = () => {
			self.isOpen = false
		}

		return { open, close }
	})
	.views((self) => {
		return {}
	})
