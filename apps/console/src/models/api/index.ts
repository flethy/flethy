import { Instance, types } from 'mobx-state-tree'
import { FlethyModel } from './flethy'
import { HelmetModel } from './helmet'
import { SecretsModel } from './secrets'
import { StateAndCache } from './stateAndCache'
import { UserModel } from './user'
import { WorkflowsModel } from './workflows'

export default types.model('API', {
	stateAndCache: types.optional(StateAndCache, () => StateAndCache.create()),
	helmet: types.optional(HelmetModel, () => HelmetModel.create()),
	user: types.optional(UserModel, () => UserModel.create()),
	flethy: types.optional(FlethyModel, () => FlethyModel.create()),
	secrets: types.optional(SecretsModel, () => SecretsModel.create()),
	workflows: types.optional(WorkflowsModel, () => WorkflowsModel.create()),
})

export type APIType = Instance<{
	stateAndCache: Instance<typeof StateAndCache>
	helmet: Instance<typeof HelmetModel>
	user: Instance<typeof UserModel>
	flethy: Instance<typeof FlethyModel>
	secrets: Instance<typeof SecretsModel>
	workflows: Instance<typeof WorkflowsModel>
}>
