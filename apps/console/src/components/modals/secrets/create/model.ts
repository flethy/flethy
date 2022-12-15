import { cast, flow, types } from 'mobx-state-tree'
import { FormValidationModel } from '../../../../models/api/formValidation'
import { getRootStore } from '../../../../models/helpers'

export const CreateSecretsModal = types
	.model('CreateSecretsModal', {
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
				keyError: types.optional(types.string, ''),
				value: types.optional(types.string, ''),
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
		const open = (params: { workspaceId: string; projectId: string }) => {
			self.isSubmitting = false
			self.context.workspaceId = params.workspaceId
			self.context.projectId = params.projectId
			self.form.key = ''
			self.form.keyError = ''
			self.form.value = ''

			const { api } = getRootStore(self)
			const currentSecrets = api.secrets.getFromStore({
				projectId: self.context.projectId,
			})
			const currentKeys: string[] = currentSecrets?.keys ?? []
			self.formValidation.clear()
			self.formValidation.add('key', {
				name: 'Secrets Key',
				value: '',
				unique: cast(currentKeys.slice()),
				minLength: 1,
				valid: true,
				errorMessage: '',
			})
			self.formValidation.add('value', {
				name: 'Secrets Value',
				value: '',
				unique: null,
				minLength: 1,
				valid: true,
				errorMessage: '',
			})
			self.isOpen = true
			self.valid = true
		}

		const update = (form: Partial<{ key: string; value: string }>) => {
			self.form = { ...self.form, ...form }
			if (form.key) {
				self.formValidation.update('key', form.key)
				self.formValidation.validate('key')
			}
			if (form.value) {
				self.formValidation.update('value', form.value)
				self.formValidation.validate('value')
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
				yield api.secrets.put({
					workspaceId: self.context.workspaceId,
					projectId: self.context.projectId,
					key: self.form.key,
					value: self.form.value,
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
	.views((self) => ({}))
