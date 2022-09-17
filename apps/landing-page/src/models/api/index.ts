import { Instance, types } from 'mobx-state-tree'
import { StateAndCache } from './stateAndCache'

export default types.model('API', {
	stateAndCache: types.optional(StateAndCache, () => StateAndCache.create()),
})

export type APIType = Instance<{
	stateAndCache: Instance<typeof StateAndCache>
}>
