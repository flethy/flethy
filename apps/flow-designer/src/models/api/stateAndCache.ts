import { cast, Instance, types } from 'mobx-state-tree'
import { MINUTE } from '../../constants/duration.const'
import events from '../../events/events'

const DEFAULT_CACHE_TTL = 15 * MINUTE

export interface StateAndCacheKey {
	api: 'cats'
	operation: string
	id?: string
}

export interface UpdateOptions {
	cacheTtl?: number
}

export const StateAndCacheEntry = types.model('CacheEntry', {
	key: types.string,
	state: types.optional(
		types.enumeration('API Request State', ['pending', 'done', 'failure']),
		'done',
	),
	lastSuccessfulFetch: types.optional(types.number, -Infinity),
	cacheTtl: types.optional(types.number, DEFAULT_CACHE_TTL),
})

export const StateAndCache = types
	.model('StateAndCache', {
		entries: types.map(StateAndCacheEntry),
	})
	.views((self) => ({
		key(key: StateAndCacheKey): string {
			return `${key.api}:${key.operation}${key.id ? `:${key.id}` : ''}`
		},

		entry(
			key: StateAndCacheKey,
		): Instance<typeof StateAndCacheEntry> | undefined {
			return self.entries.get(this.key(key))
		},

		state(key: StateAndCacheKey): 'pending' | 'done' | 'failure' {
			const entry = this.entry(key)
			return entry ? entry.state : 'done'
		},

		isPending(key: StateAndCacheKey): boolean {
			const entry = this.entry(key)
			if (entry && entry.state === 'pending') {
				return true
			}

			return false
		},

		somePending(keys: StateAndCacheKey[]): boolean {
			return keys.some((key) => this.isPending(key))
		},

		shouldFetch(key: StateAndCacheKey, useCache: boolean = true): boolean {
			const entry = this.entry(key)
			if (entry) {
				if (entry.state === 'pending') {
					return false
				}
				if (
					useCache &&
					entry.lastSuccessfulFetch > Date.now() - entry.cacheTtl
				) {
					return false
				}
			}

			return true
		},
	}))
	.actions((self) => ({
		updateEntry(
			stateAndCacheKey: StateAndCacheKey,
			state: 'pending' | 'done' | 'failure',
			options?: UpdateOptions,
		) {
			const key = self.key(stateAndCacheKey)
			const entry = self.entries.get(key)
			events.send({
				id: `stateAndCache.updateEntry`,
				level: `debug`,
				message: `Updating entry ${key} to ${state}`,
			})
			let lastSuccessfulFetch = -Infinity
			if (state === 'done') {
				lastSuccessfulFetch = Date.now()
			}
			const cacheTtl = options?.cacheTtl ?? DEFAULT_CACHE_TTL
			if (entry) {
				entry.state = state
				entry.lastSuccessfulFetch = lastSuccessfulFetch
				entry.cacheTtl = cacheTtl
			} else {
				self.entries.set(
					key,
					cast({
						key,
						state,
						lastSuccessfulFetch,
						cacheTtl,
					}),
				)
			}
		},

		updateToPending(
			stateAndCacheKey: StateAndCacheKey,
			options?: UpdateOptions,
		) {
			this.updateEntry(stateAndCacheKey, 'pending', options)
		},

		updateToDone(stateAndCacheKey: StateAndCacheKey, options?: UpdateOptions) {
			this.updateEntry(stateAndCacheKey, 'done', options)
		},

		updateToFailure(
			stateAndCacheKey: StateAndCacheKey,
			options?: UpdateOptions,
		) {
			this.updateEntry(stateAndCacheKey, 'failure', options)
		},
	}))
