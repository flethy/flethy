import { flow, types } from 'mobx-state-tree'
import { request } from '../../helpers/api'
import { getRootStore, RouterPathUtils } from '../helpers'
import { StateAndCacheKey } from './stateAndCache'

export enum TokenScope {
	WORKFLOW_CREATE = 'workflow:create',
	WORKFLOW_READ = 'workflow:read',
	WORKFLOW_UPDATE = 'workflow:update',
	WORKFLOW_DELETE = 'workflow:delete',
	INSTANCE_CREATE = 'instance:create',
	WORKSPACE_CREATE = 'workspace:create',
	WORKSPACE_READ = 'workspace:read',
	WORKSPACE_UPDATE = 'workspace:update',
	WORKSPACE_DELETE = 'workspace:delete',
	PROJECT_CREATE = 'project:create',
	PROJECT_READ = 'project:read',
	PROJECT_UPDATE = 'project:update',
	PROJECT_DELETE = 'project:delete',
	SECRET_CREATE = 'secret:create',
	SECRET_READ = 'secret:read',
	SECRET_UPDATE = 'secret:update',
	SECRET_DELETE = 'secret:delete',
	TOKEN_CREATE = 'token:create',
	TOKEN_READ = 'token:read',
	TOKEN_DELETE = 'token:delete',
}

export const TokenDataModel = types.model('TokenModel', {
	id: types.string,
	name: types.string,
})

export const TokensModel = types
	.model('WorkflowsModel', {
		tokens: types.map(types.array(TokenDataModel)),
	})
	.views((self) => {
		const getTokensFormStore = (options: { projectId: string }) => {
			const tokens = self.tokens.get(options.projectId)
			return tokens
		}

		const availableScopes = (): TokenScope[] => {
			return [
				TokenScope.WORKFLOW_CREATE,
				TokenScope.WORKFLOW_DELETE,
				TokenScope.WORKFLOW_UPDATE,
				TokenScope.WORKFLOW_READ,
			]
		}

		return { getTokensFormStore, availableScopes }
	})
	.actions((self) => {
		const list = flow(function* (options: {
			workspaceId: string
			projectId: string
			useCache?: boolean
		}) {
			const { api } = getRootStore(self)
			const useCache = options.useCache ?? true

			const stateAndCacheKey: StateAndCacheKey = {
				api: `tokens`,
				operation: `list`,
				id: options.projectId,
			}
			if (!api.stateAndCache.shouldFetch(stateAndCacheKey, useCache)) {
				return
			}

			api.stateAndCache.updateToPending(stateAndCacheKey)

			try {
				const response: { tokens?: any[] } = yield request({
					base: 'flethy',
					method: 'get',
					auth: true,
					url: new RouterPathUtils()
						.w(options.workspaceId)
						.p(options.projectId)
						.t()
						.gen(),
				})
				self.tokens.set(options.projectId, response.tokens ?? [])

				api.stateAndCache.updateToDone(stateAndCacheKey)
			} catch (error) {
				console.log(error)
				api.stateAndCache.updateToFailure(stateAndCacheKey)
			}
		})

		const create = flow(function* (options: {
			workspaceId: string
			projectId: string
			name: string
			scopes: TokenScope[]
		}) {
			const response: {
				access_token: string
				token_type: string
				success: boolean
				tokens: any
			} = yield request({
				base: 'flethy',
				method: 'post',
				auth: true,
				url: new RouterPathUtils()
					.w(options.workspaceId)
					.p(options.projectId)
					.t()
					.gen(),
				body: {
					name: options.name,
					scopes: options.scopes,
				},
			})

			self.tokens.set(options.projectId, response.tokens)
			return {
				access_token: response.access_token,
				token_type: response.token_type,
			}
		})

		const del = flow(function* (options: {
			workspaceId: string
			projectId: string
			tokenId: string
		}) {
			const response = yield request({
				base: 'flethy',
				method: 'delete',
				auth: true,
				url: new RouterPathUtils()
					.w(options.workspaceId)
					.p(options.projectId)
					.t(options.tokenId)
					.gen(),
			})

			self.tokens.set(options.projectId, response.tokens)
		})

		return { list, create, del }
	})
