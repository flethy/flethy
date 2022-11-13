import { Instance, types } from 'mobx-state-tree'
import { HelmetModel } from './helmet'
import { StateAndCache } from './stateAndCache'

export default types.model('API', {
	helmet: types.optional(HelmetModel, () => HelmetModel.create()),
	stateAndCache: types.optional(StateAndCache, () => StateAndCache.create()),
})

export type APIType = Instance<{
	stateAndCache: Instance<typeof StateAndCache>
	helmet: Instance<typeof HelmetModel>
}>
