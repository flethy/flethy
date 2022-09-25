import { Instance, types } from 'mobx-state-tree'
import { EmailSubscription } from './emailSubscription'
import { StateAndCache } from './stateAndCache'

export default types.model('API', {
	emailSubscription: types.optional(EmailSubscription, () =>
		EmailSubscription.create(),
	),
	stateAndCache: types.optional(StateAndCache, () => StateAndCache.create()),
})

export type APIType = Instance<{
	emailSubscription: Instance<typeof EmailSubscription>
	stateAndCache: Instance<typeof StateAndCache>
}>
