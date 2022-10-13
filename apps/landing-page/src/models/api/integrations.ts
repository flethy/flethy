import { types } from 'mobx-state-tree'
import { ConfigUtils } from '../../../../../packages/connectors/src/utils/Config.utils'
import configTypes from '../../constants/configTypes.json'
import { INTEGRATIONS } from '../../constants/integrations.const'
import routes from '../../routes'
import { getRootStore, getRouter } from '../helpers'

export const Integration = types.model({
	id: types.string,
	name: types.string,
	meta: types.model({
		url: types.string,
		docs: types.string,
		signup: types.maybeNull(types.string),
		pricing: types.maybeNull(types.string),
		category: types.string,
		type: types.string,
	}),
	auth: types.array(types.string),
	logo: types.string,
	light: types.boolean,
	interfaces: types.array(types.string),
	endpoints: types.array(
		types.model({
			id: types.string,
			title: types.string,
			description: types.string,
			docs: types.string,
			method: types.string,
		}),
	),
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
				const apiConfig = ConfigUtils.getConfigById(integration.id)
				if (config && apiConfig) {
					const { components } = getRootStore(self)
					self.integrations.set(integration.id, {
						id: integration.id,
						name: config.name,
						meta: {
							url: apiConfig.meta.url,
							docs: apiConfig.meta.docs,
							signup: apiConfig.meta.signup,
							pricing: apiConfig.meta.pricing,
							category: apiConfig.meta.category,
							type: apiConfig.meta.type,
						},
						auth: getAuthTags(apiConfig),
						logo: integration.file,
						light: integration.light,
						interfaces: config.interfaces.map(
							(interfaceType) => interfaceType.name,
						),
						endpoints: getEndpoints(apiConfig),
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

function getEndpoints(apiConfig: any): any[] {
	const endpoints: any[] = []

	for (const apiKey of Object.keys(apiConfig.api)) {
		for (const apiInterface of Object.keys(apiConfig.api[apiKey])) {
			const apiInterfaceConfig = apiConfig.api[apiKey][apiInterface]
			endpoints.push({
				id: `${apiKey}.${apiInterface}`,
				title: apiInterfaceConfig.meta.title,
				description: apiInterfaceConfig.meta.description,
				docs: apiInterfaceConfig.meta.docs,
				method: apiInterfaceConfig.method,
			})
		}
	}

	return endpoints
}

function getAuthTags(apiConfig: any): string[] {
	const allAuthTags: string[] = []
	if (apiConfig.auth) {
		allAuthTags.push(
			...Array.from(
				new Set(
					Object.values(apiConfig.auth).map(
						(currentAuth: any) => currentAuth.type,
					),
				),
			),
		)
	}
	for (const apiKey of Object.keys(apiConfig.api)) {
		for (const apiInterface of Object.keys(apiConfig.api[apiKey])) {
			if (apiConfig.api[apiKey][apiInterface].auth) {
				allAuthTags.push(
					...Array.from(
						new Set(
							Object.values(apiConfig.api[apiKey][apiInterface].auth).map(
								(currentAuth: any) => currentAuth.type,
							),
						),
					),
				)
			}
		}
	}
	const authTags =
		allAuthTags.length > 0 ? Array.from(new Set(allAuthTags)) : []

	return authTags
}
