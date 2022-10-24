import { types } from 'mobx-state-tree'
import { getRootStore } from '../../models/helpers'

export const IntegrationsPage = types
	.model('IntegrationsPage', {})
	.actions((self) => {
		// INITIALIZATION
		const initialisePage = () => {
			const { api } = getRootStore(self)
			api.helmet.updateTitle({
				title: 'Integrations',
				concatenateAppname: true,
			})
		}

		return { initialisePage }
	})
	.views((self) => {
		const isLoading = () => {
			return false
		}

		return { isLoading }
	})
