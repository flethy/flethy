import { cast, flow, types } from 'mobx-state-tree'
import { FormValidationModel } from '../../../../models/api/formValidation'
import { TokenScope } from '../../../../models/api/tokens'
import { getRootStore } from '../../../../models/helpers'

export const CreateTokenModal = types
	.model('CreateTokenModal', {
		context: types.optional(
			types.model({
				workspaceId: types.optional(types.string, ''),
				projectId: types.optional(types.string, ''),
			}),
			{},
		),
		form: types.optional(
			types.model({
				name: types.optional(types.string, ''),
				scopes: types.array(types.string),
			}),
			{},
		),
		state: types.optional(types.enumeration(['create', 'show']), 'create'),
		token: types.optional(types.string, ''),
		formValidation: types.optional(FormValidationModel, {}),
		isOpen: types.optional(types.boolean, false),
		valid: types.optional(types.boolean, true),
	})
	.actions((self) => {
		// INITIALIZATION
		const open = (params: { workspaceId: string; projectId: string }) => {
			self.context.workspaceId = params.workspaceId
			self.context.projectId = params.projectId
			self.state = 'create'
			self.form.name = ''
			self.token = ''
			self.form.scopes.clear()

			const { api } = getRootStore(self)
			const currentTokens = api.tokens.getTokensFormStore({
				projectId: self.context.projectId,
			})
			const currentNames: string[] =
				currentTokens?.map((token) => token.name) ?? []
			self.formValidation.clear()
			self.formValidation.add('name', {
				name: 'Token Name',
				value: '',
				unique: cast(currentNames.slice()),
				minLength: 1,
				valid: true,
				errorMessage: '',
			})
			self.formValidation.add('scopes', {
				name: 'Token Scopes',
				value: '',
				unique: null,
				minLength: 1,
				valid: true,
				errorMessage: '',
			})
			self.isOpen = true
			self.valid = true
		}

		const update = (form: Partial<{ name: string }>) => {
			self.form = { ...self.form, ...form }
			if (form.name) {
				self.formValidation.update('name', form.name)
				self.formValidation.validate('name')
			}
		}

		const updateScopes = (scope: string, checked: boolean) => {
			const foundScope = self.form.scopes.find(
				(currentScope) => currentScope === scope,
			)
			if (foundScope && !checked) {
				self.form.scopes.remove(foundScope)
			}
			if (!foundScope && checked) {
				self.form.scopes.push(scope)
			}
			const scopesString =
				self.form.scopes.length > 0 ? self.form.scopes.join(',') : ''
			self.formValidation.update('scopes', scopesString)
		}

		const close = () => {
			self.isOpen = false
		}

		const submit = flow(function* () {
			self.formValidation.validateAll()
			if (!self.formValidation.valid) {
				return
			}
			const { api } = getRootStore(self)
			try {
				const response = yield api.tokens.create({
					workspaceId: self.context.workspaceId,
					projectId: self.context.projectId,
					name: self.form.name,
					scopes: (self.form.scopes as TokenScope[]) ?? [],
				})
				self.token = response.access_token
				self.state = 'show'
			} catch (error) {
				console.log(error)
			}
		})

		return { open, update, updateScopes, close, submit }
	})
	.views((self) => {
		const isScopeChecked = (scope: string) => {
			return self.form.scopes.includes(scope)
		}

		return { isScopeChecked }
	})
