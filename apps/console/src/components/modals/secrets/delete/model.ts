import { flow, types } from 'mobx-state-tree'
import { getRootStore } from '../../../../models/helpers'

export const DeleteSecretsModal = types
	.model('DeleteSecretsModal', {
		context: types.optional(
			types.model({
				workspaceId: types.optional(types.string, ''),
				projectId: types.optional(types.string, ''),
			}),
			{},
		),
		form: types.optional(
			types.model({
				key: types.optional(types.string, ''),
			}),
			{},
		),
		isOpen: types.optional(types.boolean, false),
		isSubmitting: types.optional(types.boolean, false),
	})
	.actions((self) => {
		// INITIALIZATION
		const open = (params: {
			workspaceId: string
			projectId: string
			key: string
		}) => {
			self.isSubmitting = false
			self.context.workspaceId = params.workspaceId
			self.context.projectId = params.projectId
			self.form.key = params.key
			self.isOpen = true
		}

		const close = () => {
			self.isOpen = false
		}

		const submit = flow(function* () {
			self.isSubmitting = true
			const { api } = getRootStore(self)
			try {
				yield api.secrets.del({
					workspaceId: self.context.workspaceId,
					projectId: self.context.projectId,
					key: self.form.key,
				})
				self.isOpen = false
				self.isSubmitting = false
			} catch (error) {
				self.isSubmitting = false
				console.log(error)
			}
		})

		return { open, close, submit }
	})
	.views((self) => ({}))
