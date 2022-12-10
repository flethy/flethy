import { flow, types } from 'mobx-state-tree'
import { getRootStore } from '../../../../models/helpers'

export const DeleteTokenModal = types
	.model('DeleteTokenModal', {
		context: types.optional(
			types.model({
				workspaceId: types.optional(types.string, ''),
				projectId: types.optional(types.string, ''),
			}),
			{},
		),
		form: types.optional(
			types.model({
				tokenId: types.optional(types.string, ''),
				name: types.optional(types.string, ''),
			}),
			{},
		),
		isOpen: types.optional(types.boolean, false),
	})
	.actions((self) => {
		// INITIALIZATION
		const open = (params: {
			workspaceId: string
			projectId: string
			tokenId: string
			name: string
		}) => {
			self.context.workspaceId = params.workspaceId
			self.context.projectId = params.projectId
			self.form.tokenId = params.tokenId
			self.form.name = params.name
			self.isOpen = true
		}

		const close = () => {
			self.isOpen = false
		}

		const submit = flow(function* () {
			const { api } = getRootStore(self)
			try {
				yield api.tokens.del({
					workspaceId: self.context.workspaceId,
					projectId: self.context.projectId,
					tokenId: self.form.tokenId,
				})
				self.isOpen = false
			} catch (error) {
				console.log(error)
			}
		})

		return { open, close, submit }
	})
	.views((self) => ({}))
