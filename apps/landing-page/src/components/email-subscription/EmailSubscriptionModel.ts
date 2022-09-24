import { flow, types } from 'mobx-state-tree'
import { getRootStore } from '../../models/helpers'

const REGEX_EMAIL =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const EmailSubscriptionModel = types
	.model('EmailSubscriptionModel', {
		form: types.optional(
			types.model({
				email: types.optional(types.string, ''),
				emailValid: types.optional(types.boolean, true),
			}),
			{},
		),
		state: types.optional(
			types.enumeration('State', ['idle', 'pending', 'done', 'error']),
			'idle',
		),
	})
	.actions((self) => {
		const setFormValues = (values: Partial<{ email: string }>) => {
			self.form = {
				...self.form,
				...values,
			}
		}

		const validate = (): boolean => {
			self.form.emailValid = REGEX_EMAIL.test(self.form.email)
			if (!self.form.emailValid) {
				return false
			}
			return true
		}

		const submit = flow(function* () {
			if (!validate()) {
				return
			}
			self.state = 'pending'
			const { api } = getRootStore(self)
			try {
				yield api.emailSubscription.subscribe({
					email: self.form.email,
				})
				self.state = 'done'
			} catch (error) {
				console.error(error)
				self.state = 'error'
			}
		})

		return { setFormValues, validate, submit }
	})
	.views((self) => ({}))
