import { types } from 'mobx-state-tree'
import configTypes from '../../constants/configTypes.json'
import { INTEGRATIONS } from '../../constants/integrations.const'

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

		const get = (): IntegrationMeta | undefined => {
			const integration = INTEGRATIONS.find(
				(integration) => integration.id === self.id,
			)
			const config = configTypes.find((configType) => configType.id === self.id)

			if (!integration || !config) {
				return undefined
			}

			const integrationMeta: IntegrationMeta = {
				id: integration.id,
				name: config.name,
				logo: integration.file,
				light: integration.light,
				interfaces: config.interfaces.map(
					(interfaceType) => interfaceType.name,
				),
			}
			return integrationMeta
		}

		return { isLoading, get }
	})
