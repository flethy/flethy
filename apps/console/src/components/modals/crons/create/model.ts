import { flow, types } from 'mobx-state-tree'
import { FormValidationModel } from '../../../../models/api/formValidation'
import { getRootStore } from '../../../../models/helpers'

export const CreateCronModal = types
	.model('CreateCronModal', {
		context: types.optional(
			types.model({
				workspaceId: types.optional(types.string, ''),
				projectId: types.optional(types.string, ''),
				workflowId: types.optional(types.string, ''),
			}),
			{},
		),
		form: types.optional(
			types.model({
				name: types.optional(types.string, ''),
				expression: types.optional(types.string, ''),
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
			self.isSubmitting = false
			self.form.name = ''
			self.form.expression = ''

			const { api } = getRootStore(self)
			self.formValidation.clear()
			self.formValidation.add('name', {
				name: 'Cron Name',
				value: '',
				unique: null,
				isJson: null,
				minLength: 1,
				valid: true,
				errorMessage: '',
			})
			self.formValidation.add('expression', {
				name: 'Expression',
				value: '',
				unique: null,
				isJson: null,
				minLength: 1,
				valid: true,
				errorMessage: '',
			})
			self.isOpen = true
			self.valid = true
		}

		const update = (form: Partial<{ name: string; expression: string }>) => {
			self.form = { ...self.form, ...form }
			if (form.name) {
				self.formValidation.update('name', form.name)
				self.formValidation.validate('name')
			}
			if (form.expression) {
				self.formValidation.update('expression', form.expression)
				self.formValidation.validate('expression')
			}
		}

		const close = () => {
			self.isOpen = false
		}

		const submit = flow(function* () {
			self.formValidation.validateAll()
			if (!self.formValidation.valid) {
				return
			}
			self.isSubmitting = true
			const { api } = getRootStore(self)
			try {
				yield api.crons.create({
					workspaceId: self.context.workspaceId,
					projectId: self.context.projectId,
					workflowId: self.context.workflowId,
					name: self.form.name,
					expression: self.form.expression,
				})
				self.isOpen = false
				self.isSubmitting = false
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
