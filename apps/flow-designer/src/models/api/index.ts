import { Instance, types } from 'mobx-state-tree'
import { Cats } from './cats'
import { StateAndCache } from './stateAndCache'

export default types.model('API', {
	stateAndCache: types.optional(StateAndCache, () => StateAndCache.create()),
	cats: types.optional(Cats, () => Cats.create()),
})

export type APIType = Instance<{
	stateAndCache: Instance<typeof StateAndCache>
	cats: Instance<typeof Cats>
}>
