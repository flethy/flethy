import { Instance, types } from 'mobx-state-tree'
import { EmailSubscription } from './emailSubscription'
import { HelmetModel } from './helmet'
import { Integrations } from './integrations'
import { StateAndCache } from './stateAndCache'

export default types.model('API', {
	emailSubscription: types.optional(EmailSubscription, () =>
		EmailSubscription.create(),
	),
	integrations: types.optional(Integrations, () => Integrations.create()),
	helmet: types.optional(HelmetModel, () => HelmetModel.create()),
	stateAndCache: types.optional(StateAndCache, () => StateAndCache.create()),
})

export type APIType = Instance<{
	emailSubscription: Instance<typeof EmailSubscription>
	integrations: Instance<typeof Integrations>
	stateAndCache: Instance<typeof StateAndCache>
	helmet: Instance<typeof HelmetModel>
}>
