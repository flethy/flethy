import { Instance, types } from 'mobx-state-tree'
import { Integration } from '../../models/api/integrations'
import { getRootStore } from '../../models/helpers'

interface IntegrationMeta {
	id: string
	name: string
	logo: string
	light: boolean
	interfaces: string[]
}

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

		const get = (): Instance<typeof Integration> | undefined => {
			const { api } = getRootStore(self)
			return api.integrations.get(self.id)
		}

		return { isLoading, get }
	})
