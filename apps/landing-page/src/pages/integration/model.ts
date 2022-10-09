import { types } from 'mobx-state-tree'
import { getRootStore } from '../../models/helpers'

export const IntegrationPage = types
	.model('IntegrationPage', {
		id: types.optional(types.string, ''),
	})
	.actions((self) => {
		// INITIALIZATION
		const initialisePage = (id: string) => {
			self.id = id
		}

		return { initialisePage }
	})
	.views((self) => {
		const isLoading = () => {
			return false
		}

		return { isLoading }
	})
