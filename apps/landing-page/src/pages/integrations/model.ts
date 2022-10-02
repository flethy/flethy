import { types } from 'mobx-state-tree'
import { getRootStore } from '../../models/helpers'

export const IntegrationsPage = types
	.model('IntegrationsPage', {})
	.actions((self) => {
		// INITIALIZATION
		const initialisePage = () => {}

		return { initialisePage }
	})
	.views((self) => {
		const isLoading = () => {
			return false
		}

		return { isLoading }
	})
