import { Instance, types } from 'mobx-state-tree'
import { HelmetModel } from './helmet'
import { StateAndCache } from './stateAndCache'
import { UserModel } from './user'

export default types.model('API', {
	stateAndCache: types.optional(StateAndCache, () => StateAndCache.create()),
	helmet: types.optional(HelmetModel, () => HelmetModel.create()),
	user: types.optional(UserModel, () => UserModel.create()),
})

export type APIType = Instance<{
	stateAndCache: Instance<typeof StateAndCache>
	helmet: Instance<typeof HelmetModel>
	user: Instance<typeof UserModel>
}>
