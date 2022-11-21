import { Instance, types } from 'mobx-state-tree'
import { SecretsDataModel } from '../../models/api/secrets'
import { FlethyContext } from '../../models/flethy.types'
import { getRootStore } from '../../models/helpers'

export const SecretsPage = types
	.model('SecretsPage', {
		context: types.optional(FlethyContext, {}),
	})
	.actions((self) => ({
		// INITIALIZATION
		initialisePage(options: { workspaceId: string; projectId: string }) {
			self.context.projectId = options.projectId
			self.context.workspaceId = options.workspaceId
			const { api } = getRootStore(self)
			api.secrets.get({
				workspaceId: self.context.workspaceId,
				projectId: self.context.projectId,
			})
		},
	}))
	.views((self) => ({
		isLoading() {
			const { api } = getRootStore(self)
			return api.stateAndCache.somePending([
				{
					api: 'secrets',
					operation: 'get',
					id: self.context.projectId,
				},
			])
		},

		secretsAvailable() {
			const { api } = getRootStore(self)
			const foundSecrets = api.secrets.getFromStore({
				projectId: self.context.projectId,
			})
			if (foundSecrets) {
				return foundSecrets.keys.length > 0
			}
			return false
		},

		getSecrets(): Instance<typeof SecretsDataModel> {
			const { api } = getRootStore(self)
			return api.secrets.getFromStore({ projectId: self.context.projectId })!
		},
	}))
