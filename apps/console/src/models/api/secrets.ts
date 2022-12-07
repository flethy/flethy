import { flow, Instance, types } from 'mobx-state-tree'
import { request } from '../../helpers/api'
import { getRootStore, RouterPathUtils } from '../helpers'
import { StateAndCacheKey } from './stateAndCache'

export const SecretsDataModel = types.model('SecretsDataModel', {
	createdBy: types.string,
	createdAt: types.number,
	updatedBy: types.maybeNull(types.string),
	updatedAt: types.maybeNull(types.number),
	keys: types.array(types.string),
})

export const SecretsModel = types
	.model('SecretsModel', {
		secrets: types.map(SecretsDataModel),
	})
	.actions((self) => {
		const get = flow(function* (options: {
			workspaceId: string
			projectId: string
			useCache?: boolean
		}) {
			const { api } = getRootStore(self)
			const useCache = options.useCache ?? true

			const stateAndCacheKey: StateAndCacheKey = {
				api: `secrets`,
				operation: `get`,
				id: options.projectId,
			}
			if (!api.stateAndCache.shouldFetch(stateAndCacheKey, useCache)) {
				return
			}

			api.stateAndCache.updateToPending(stateAndCacheKey)

			try {
				const response = yield request({
					base: 'flethy',
					method: 'get',
					auth: true,
					url: new RouterPathUtils()
						.w(options.workspaceId)
						.p(options.projectId)
						.s()
						.gen(),
				})
				if (response?.createdBy) {
					self.secrets.set(options.projectId, response)
				}
				api.stateAndCache.updateToDone(stateAndCacheKey)
			} catch (error: any) {
				api.stateAndCache.updateToFailure(stateAndCacheKey)
			}
		})

		const put = flow(function* (options: {
			workspaceId: string
			projectId: string
			key: string
			value: string
		}) {
			yield request({
				base: 'flethy',
				method: 'put',
				auth: true,
				url: new RouterPathUtils()
					.w(options.workspaceId)
					.p(options.projectId)
					.s()
					.gen(),
				body: {
					key: options.key,
					value: options.value,
				},
			})
			const currentSecrets = self.secrets.get(options.projectId)
			if (currentSecrets) {
				currentSecrets.keys.push(options.key)
			} else {
				const { api } = getRootStore(self)
				self.secrets.set(options.projectId, {
					createdBy: api.user.userId,
					createdAt: Date.now(),
					keys: [options.key],
				})
			}
		})

		const del = flow(function* (options: {
			workspaceId: string
			projectId: string
			key: string
		}) {
			yield request({
				base: 'flethy',
				method: 'delete',
				auth: true,
				url: new RouterPathUtils()
					.w(options.workspaceId)
					.p(options.projectId)
					.s()
					.gen(),
				body: {
					key: options.key,
				},
			})
			const currentSecrets = self.secrets.get(options.projectId)
			if (currentSecrets) {
				currentSecrets.keys.remove(options.key)
			}
		})

		return { put, get, del }
	})
	.views((self) => {
		const getFromStore = (options: {
			projectId: string
		}): Instance<typeof SecretsDataModel> | undefined => {
			return self.secrets.get(options.projectId)
		}

		return { getFromStore }
	})
