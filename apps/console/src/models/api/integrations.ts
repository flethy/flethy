import { CONFIG_TYPES } from '@flethy/configtypes'
import { ConfigUtils } from '@flethy/connectors'
import { types } from 'mobx-state-tree'
import { INTEGRATIONS } from '../../constants/integrations.const'

export const IntegrationsModel = types
	.model('IntegrationsModel', {
		ids: types.array(types.string),
		integrations: types.frozen<Map<string, any>>(),
		configs: types.frozen<Map<string, any>>(),
		configTypes: types.frozen<Map<string, any>>(),
		loaded: types.optional(types.boolean, false),
	})
	.actions((self) => {
		const init = () => {
			if (self.loaded) {
				return
			}
			const integrations = new Map<string, any>()
			const configs = new Map<string, any>()
			const configTypes = new Map<string, any>()
			INTEGRATIONS.forEach((integration) => {
				const id = integration.id
				self.ids.push(id)
				integrations.set(id, integration)
				const config = ConfigUtils.getConfigById(integration.id)
				configs.set(id, config)
			})
			CONFIG_TYPES.forEach((configType) => {
				configTypes.set(configType.id, configType)
			})
			self.integrations = integrations
			self.configs = configs
			self.configTypes = configTypes
			self.loaded = true
		}

		return { init }
	})
	.views((self) => {
		const getIntegrationById = (
			id: string,
		): { integration: any; config: any; configType: any } => {
			return {
				integration: self.integrations.get(id),
				config: self.configs.get(id),
				configType: self.configTypes.get(id),
			}
		}

		const getExampleConfigByInterface = (id: string, interfaceName: string) => {
			const configType = self.configTypes.get(id)
			const foundInterface = configType.interfaces.find(
				(currentInterface: any) => currentInterface.name === interfaceName,
			)
			const properties: { [key: string]: any } = {}
			if (foundInterface) {
				for (const property of foundInterface.properties) {
					if (!property.optional) {
						let value: any
						console.log(property)
						if (!Array.isArray(property.types)) {
							value = property.types
						} else if (property.types.length > 0) {
							value = property.types[0]
						} else if (property.type === 'string') {
							value = 'string'
						} else if (property.type === 'number') {
							value = 0
						}
						properties[property.name] = value
					}
				}
			}
			return properties
		}

		return { getIntegrationById, getExampleConfigByInterface }
	})
