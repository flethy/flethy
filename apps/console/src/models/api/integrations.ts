import { CONFIG_TYPES } from '@flethy/configtypes'
import { ConfigUtils } from '@flethy/connectors'
import { types } from 'mobx-state-tree'
import { INTEGRATIONS } from '../../constants/integrations.const'

export const IntegrationsModel = types
	.model('IntegrationsModel', {
		ids: types.array(types.string),
		integrations: types.frozen<Map<string, any>>(),
		integrationsArray: types.frozen<any[]>(),
		categories: types.frozen<string[]>(),
		categoriesMap: types.frozen<Map<string, string[]>>(),
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
			const categories = new Set<string>()
			const categoriesMap = new Map<string, Set<string>>()
			const integrationArray: Array<{
				id: string
				integration: any
				config: any
				configType: any
			}> = []
			INTEGRATIONS.forEach((integration) => {
				const id = integration.id
				self.ids.push(id)
				integrations.set(id, integration)
				const config = ConfigUtils.getConfigById(integration.id)
				configs.set(id, config)
				categories.add(config.meta.category)
				let categorySet = categoriesMap.get(config.meta.category)
				if (!categorySet) {
					categorySet = new Set<string>()
				}
				categorySet.add(id)
				categoriesMap.set(config.meta.category, categorySet)
				integrationArray.push({
					id,
					integration,
					config,
					configType: {},
				})
			})
			CONFIG_TYPES.forEach((configType) => {
				configTypes.set(configType.id, configType)
				const foundIntegration = integrationArray.find(
					(item) => item.id === configType.id,
				)
				if (foundIntegration) {
					foundIntegration.configType = configType
				}
			})
			self.integrationsArray = integrationArray
			self.categories = Array.from(categories)
			const categoriesMapWithoutDuplicates = new Map<string, string[]>()
			self.categories.forEach((category) => {
				categoriesMapWithoutDuplicates.set(
					category,
					Array.from(categoriesMap.get(category)!),
				)
			})
			self.categoriesMap = categoriesMapWithoutDuplicates
			self.integrations = integrations
			self.configs = configs
			self.configTypes = configTypes
			self.loaded = true
		}

		return { init }
	})
	.views((self) => {
		const getIntegrationIds = (filter: { categories: string[] }): string[] => {
			let integrationIds: string[] = []
			if (filter.categories.length > 0) {
				const ids = new Set<string>()
				filter.categories.forEach((category) => {
					const categoryIds = self.categoriesMap.get(category)
					if (categoryIds) {
						categoryIds.forEach((id) => ids.add(id))
					}
				})
				integrationIds = Array.from(ids)
			} else {
				integrationIds = self.ids.slice()
			}
			return integrationIds
		}

		const getIntegrationsByIds = (filter: { categories: string[] }) => {
			let integrations = []
			if (filter.categories.length > 0) {
				integrations = self.integrationsArray.filter((item) =>
					filter.categories.includes(item.config.meta.category),
				)
			} else {
				integrations = self.integrationsArray
			}
			return integrations
		}

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

		const getCategories = () => {
			return self.categories.slice().sort((a, b) => a.localeCompare(b))
		}

		return {
			getIntegrationById,
			getExampleConfigByInterface,
			getCategories,
			getIntegrationIds,
			getIntegrationsByIds,
		}
	})
