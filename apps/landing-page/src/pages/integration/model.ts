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

		const urls = (): Array<{ labelId: string; url: string }> => {
			let availableUrls: Array<{ labelId: string; url: string }> = []

			const config = get()
			if (config) {
				availableUrls = [
					{
						labelId: 'pages.integration.url',
						url: config.meta.url,
					},
					{
						labelId: 'pages.integration.docs',
						url: config.meta.docs,
					},
				]
				if (config.meta.signup) {
					availableUrls.push({
						labelId: 'pages.integration.signup',
						url: config.meta.signup,
					})
				}
				if (config.meta.pricing) {
					availableUrls.push({
						labelId: 'pages.integration.pricing',
						url: config.meta.pricing,
					})
				}
			}

			return availableUrls
		}

		return { isLoading, get, urls }
	})
