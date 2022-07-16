import { flow, types } from 'mobx-state-tree'
import { SECOND } from '../../constants/duration.const'
import { request } from '../../helpers/api'
import { getRootStore } from '../helpers'
import { StateAndCacheKey } from './stateAndCache'
import { Cat } from 'mobxtypes'
import { CatRoute } from 'shared-types'

export const CATS_API_V1 = import.meta.env.VITE_CATS_API_V1

export const Cats = types
	.model('Cats', {
		cats: types.array(Cat),
		cache: types.frozen<{ [key: string]: any }>(),
		state: types.optional(
			types.enumeration('State', ['pending', 'done', 'failure']),
			'done',
		),
		lastSuccessfulFetch: types.optional(types.number, -Infinity),
	})
	.actions((self) => ({
		search: flow(function* () {
			const { api } = getRootStore(self)

			const stateAndCacheKey: StateAndCacheKey = {
				api: `cats`,
				operation: `search`,
			}
			if (!api.stateAndCache.shouldFetch(stateAndCacheKey, true)) {
				return
			}

			api.stateAndCache.updateToPending(stateAndCacheKey)

			try {
				const url = `${CATS_API_V1}/${CatRoute.IMAGES}/${CatRoute.SEARCH}`
				self.cats = yield request({
					url,
					method: 'get',
				})
				api.stateAndCache.updateToDone(stateAndCacheKey, {
					cacheTtl: 5 * SECOND,
				})
			} catch (error) {
				api.stateAndCache.updateToFailure(stateAndCacheKey)
			}
		}),
	}))
