import { Instance, types, cast } from 'mobx-state-tree'
import { CONFIG_TYPES } from '@web3nao/http-configs'

export const ConfigInterface = types.model({
	name: types.string,
	props: types.array(types.string),
})

export const Configs = types
	.model('Configs', {
		initialized: types.optional(types.boolean, false),
		configs: types.map(types.array(ConfigInterface)),
	})
	.actions((self) => ({
		// SELECTION
		init() {
			if (self.initialized) {
				return
			}
			CONFIG_TYPES.forEach((config) => {
				const name = config.name
				const configInterfaces: Array<Instance<typeof ConfigInterface>> = []
				config.interfaces.forEach((configInterface) => {
					configInterfaces.push({
						name: configInterface.name,
						props: cast(configInterface.properties.map((prop) => prop.name)),
					})
				})
				self.configs.set(name, configInterfaces)
			})
			self.initialized = true
		},
	}))
	.views((self) => ({
		getConfigNames() {
			return Array.from(self.configs.keys())
		},

		getConfigInterfaces(name: string) {
			const configInterfaces = self.configs.get(name)
			if (configInterfaces) {
				return configInterfaces.map((configInterface) => configInterface.name)
			}
			return []
		},

		getConfigInterface(config: string, configInterface: string) {
			const foundConfig = self.configs.get(config)
			if (foundConfig) {
				const foundConfigInterface = foundConfig.find(
					(currentInterface) => currentInterface.name === configInterface,
				)
				if (foundConfigInterface) {
					return foundConfigInterface
				}
			}
			throw new Error(`Failed to load props for ${config}/${configInterface}`)
		},
	}))
