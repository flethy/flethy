import { flow, types } from 'mobx-state-tree'
import { request } from '../../helpers/api'
import { getRootStore } from '../helpers'
import { StateAndCacheKey } from './stateAndCache'

export const EmailSubscription = types
	.model('Connections', {})
	.views((self) => ({}))
	.actions((self) => ({
		subscribe: flow(function* (options: { email: string }) {
			const { api } = getRootStore(self)

			const stateAndCacheKey: StateAndCacheKey = {
				api: `emailSubscription`,
				operation: `subscribe`,
			}

			api.stateAndCache.updateToPending(stateAndCacheKey)

			yield request({
				url: `api/subscribe`,
				method: 'post',
				base: 'origin',
				body: {
					email: options.email,
				},
			})
			api.stateAndCache.updateToDone(stateAndCacheKey)
		}),

		verify: flow(function* (options: { token: string }) {
			const { api } = getRootStore(self)

			const stateAndCacheKey: StateAndCacheKey = {
				api: `emailSubscription`,
				operation: `verify`,
				id: options.token,
			}

			api.stateAndCache.updateToPending(stateAndCacheKey)

			try {
				yield request({
					url: `api/verify/${options.token}`,
					method: 'post',
					base: 'origin',
					body: {
						email: options.token,
					},
				})
				api.stateAndCache.updateToDone(stateAndCacheKey)
			} catch (error) {
				api.stateAndCache.updateToFailure(stateAndCacheKey)
			}
		}),
	}))
