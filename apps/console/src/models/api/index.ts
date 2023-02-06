import { Instance, types } from 'mobx-state-tree'
import { AppStateModel } from './appState'
import { ContextModel } from './context'
import { CronsModel } from './crons'
import { HelmetModel } from './helmet'
import { IntegrationsModel } from './integrations'
import { SecretsModel } from './secrets'
import { StateAndCache } from './stateAndCache'
import { TokensModel } from './tokens'
import { UserModel } from './user'
import { WorkflowsModel } from './workflows'
import { WorkspacesModel } from './workspaces'

export default types.model('API', {
	stateAndCache: types.optional(StateAndCache, () => StateAndCache.create()),
	helmet: types.optional(HelmetModel, () => HelmetModel.create()),
	user: types.optional(UserModel, () => UserModel.create()),
	secrets: types.optional(SecretsModel, () => SecretsModel.create()),
	tokens: types.optional(TokensModel, () => TokensModel.create()),
	workflows: types.optional(WorkflowsModel, () => WorkflowsModel.create()),
	workspaces: types.optional(WorkspacesModel, () => WorkspacesModel.create()),
	appState: types.optional(AppStateModel, () => AppStateModel.create()),
	integrations: types.optional(IntegrationsModel, () =>
		IntegrationsModel.create(),
	),
	context: types.optional(ContextModel, () => ContextModel.create()),
	crons: types.optional(CronsModel, () => CronsModel.create()),
})

export type APIType = Instance<{
	stateAndCache: Instance<typeof StateAndCache>
	helmet: Instance<typeof HelmetModel>
	user: Instance<typeof UserModel>
	secrets: Instance<typeof SecretsModel>
	tokens: Instance<typeof TokensModel>
	workflows: Instance<typeof WorkflowsModel>
	workspaces: Instance<typeof WorkspacesModel>
	appState: Instance<typeof AppStateModel>
	integrations: Instance<typeof IntegrationsModel>
	context: Instance<typeof ContextModel>
	crons: Instance<typeof CronsModel>
}>
