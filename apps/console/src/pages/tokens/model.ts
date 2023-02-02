import { Instance, types } from 'mobx-state-tree'
import { PAGE_CONTEXT } from '../../models/api/context'
import { TokenDataModel } from '../../models/api/tokens'
import { FlethyContext } from '../../models/flethy.types'
import { getRootStore } from '../../models/helpers'

export const TokensPage = types
	.model('TokensPage', {
		context: types.optional(FlethyContext, {}),
	})
	.actions((self) => ({
		// INITIALIZATION
		initialisePage(options: { workspaceId: string; projectId: string }) {
			self.context.projectId = options.projectId
			self.context.workspaceId = options.workspaceId
			const { api } = getRootStore(self)
			api.context.setPage(PAGE_CONTEXT.TOKENS)
			api.tokens.list({
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
					api: 'tokens',
					operation: 'list',
					id: self.context.projectId,
				},
			])
		},

		tokensAvailable() {
			const { api } = getRootStore(self)
			const tokens = api.tokens.getTokensFormStore({
				projectId: self.context.projectId,
			})
			if (tokens) {
				return tokens.length > 0
			}
			return false
		},

		getTokens(): Instance<typeof TokenDataModel>[] {
			const { api } = getRootStore(self)
			return api.tokens.getTokensFormStore({
				projectId: self.context.projectId,
			})!
		},
	}))
