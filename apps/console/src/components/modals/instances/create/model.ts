import { flow, types } from 'mobx-state-tree'
import events from '../../../../events/events'
import { FormValidationModel } from '../../../../models/api/formValidation'
import { getRootStore } from '../../../../models/helpers'

export const CreateInstanceModal = types
	.model('CreateTokenModal', {
		context: types.optional(
			types.model({
				workspaceId: types.optional(types.string, ''),
				workflowId: types.optional(types.string, ''),
				projectId: types.optional(types.string, ''),
			}),
			{},
		),
		form: types.optional(
			types.model({
				payload: types.optional(types.string, ''),
			}),
			{},
		),
		formValidation: types.optional(FormValidationModel, {}),
		isOpen: types.optional(types.boolean, false),
		isSubmitting: types.optional(types.boolean, false),
		valid: types.optional(types.boolean, true),
	})
	.actions((self) => {
		// INITIALIZATION
		const open = (params: {
			workspaceId: string
			projectId: string
			workflowId: string
		}) => {
			self.context.workspaceId = params.workspaceId
			self.context.projectId = params.projectId
			self.context.workflowId = params.workflowId
			self.form.payload = ''

			const { api } = getRootStore(self)
			self.formValidation.clear()
			self.formValidation.add('payload', {
				name: 'Payload',
				value: '',
				unique: null,
				isJson: true,
				minLength: 0,
				valid: true,
				errorMessage: '',
			})
			self.isOpen = true
			self.isSubmitting = false
			self.valid = true
		}

		const update = (form: Partial<{ payload: string }>) => {
			self.form = { ...self.form, ...form }
			if (form.payload) {
				self.formValidation.update('payload', form.payload)
				self.formValidation.validate('payload')
			}
		}

		const close = () => {
			self.isOpen = false
		}

		const submit = flow(function* () {
			self.formValidation.validateAll()
			if (!self.formValidation.valid) {
				console.log('not valid')
				return
			}
			self.isSubmitting = true
			const { api } = getRootStore(self)
			try {
				const response = yield api.workflows.start({
					workspaceId: self.context.workspaceId,
					projectId: self.context.projectId,
					workflowId: self.context.workflowId,
					payload:
						self.form.payload.length > 0 ? JSON.parse(self.form.payload) : {},
				})
				events.send({
					id: 'console.instance.create',
					level: 'debug',
					message: 'Instance created',
					meta: response,
				})
				self.isSubmitting = false
				self.isOpen = false
			} catch (error) {
				self.isSubmitting = false
				console.log(error)
			}
		})

		return { open, update, close, submit }
	})
	.views((self) => {
		return {}
	})
