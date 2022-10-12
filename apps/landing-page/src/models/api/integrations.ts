import { types } from 'mobx-state-tree'
import configTypes from '../../constants/configTypes.json'
import { INTEGRATIONS } from '../../constants/integrations.const'
import routes from '../../routes'
import { getRootStore, getRouter } from '../helpers'

export const Integration = types.model({
	id: types.string,
	name: types.string,
	logo: types.string,
	light: types.boolean,
	interfaces: types.array(types.string),
})

export const Integrations = types
	.model('Integrations', {
		integrations: types.map(Integration),
	})
	.views((self) => ({
		get(id: string) {
			return self.integrations.get(id)
		},

		getAll() {
			return self.integrations.values()
		},
	}))
	.actions((self) => ({
		add: (integration: any) => {
			if (self.integrations.has(integration.id)) {
				return
			} else {
				const config = configTypes.find(
					(configType) => configType.id === integration.id,
				)
				if (config) {
					const { components } = getRootStore(self)
					self.integrations.set(integration.id, {
						id: integration.id,
						name: config.name,
						logo: integration.file,
						light: integration.light,
						interfaces: config.interfaces.map(
							(interfaceType) => interfaceType.name,
						),
					})
					components.quickSearch.addAction({
						id: `navigateTo${integration.id}`,
						title: config.name,
						subtitle: `Details for ${config.name}`,
						action: () =>
							getRouter().goTo(routes.integration, { id: integration.id }),
					})
				}
			}
		},
	}))
	.actions((self) => ({
		load: () => {
			INTEGRATIONS.forEach((integration) => {
				self.add(integration)
			})
		},
	}))
