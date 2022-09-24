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
	}))
