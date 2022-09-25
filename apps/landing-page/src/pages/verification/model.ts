import { types } from 'mobx-state-tree'
import { getRootStore } from '../../models/helpers'

export const VerificationPage = types
	.model('VerificationPage', {
		token: types.optional(types.string, ''),
	})
	.actions((self) => {
		// INITIALIZATION
		const initialisePage = (token: string) => {
			self.token = token
			const { api } = getRootStore(self)
			api.emailSubscription.verify({ token })
		}

		return { initialisePage }
	})
	.views((self) => {
		const isLoading = () => {
			const { api } = getRootStore(self)
			return api.stateAndCache.isPending({
				api: 'emailSubscription',
				operation: 'verify',
				id: self.token,
			})
		}

		return { isLoading }
	})
