import { KV_KEY_ALL_PENDING, PendingSubscription } from './meta'

declare const EMAILSUB: KVNamespace

export class KvUtils {
	public static async put(key: string, value: string): Promise<void> {
		await EMAILSUB.put(key, value)
	}

	public static async get(key: string): Promise<string | null> {
		const value = await EMAILSUB.get(key)
		return value
	}

	// ===

	public static async getPendingEntry(options: {
		email?: string
		token?: string
	}): Promise<PendingSubscription | undefined> {
		if (!options.email && !options.token) {
			return undefined
		}
		const pendingValue: string | null = await KvUtils.get(KV_KEY_ALL_PENDING)
		if (pendingValue) {
			const pending: PendingSubscription[] = JSON.parse(pendingValue)
			const existing = pending.find((p) => {
				if (options.email) {
					return p.email === options.email
				}
				if (options.token) {
					return p.token === options.token
				}
				return false
			})
			return existing
		}
		return undefined
	}

	public static async isPendingEntryAvailable(options: {
		email?: string
		token?: string
	}): Promise<boolean> {
		const existing = await KvUtils.getPendingEntry(options)
		if (existing) {
			return true
		} else {
			return false
		}
	}

	public static async addPendingEntry(
		pendingSubscription: PendingSubscription,
	): Promise<void> {
		const pendingValue: string | null = await KvUtils.get(KV_KEY_ALL_PENDING)
		if (pendingValue) {
			const pending: PendingSubscription[] = JSON.parse(pendingValue)
			pending.push(pendingSubscription)
			await KvUtils.put(KV_KEY_ALL_PENDING, JSON.stringify(pending))
		} else {
			await KvUtils.put(
				KV_KEY_ALL_PENDING,
				JSON.stringify([pendingSubscription]),
			)
		}
	}

	public static async removePendingEntry(options: {
		email?: string
		token?: string
	}): Promise<void> {
		if (!options.email && !options.token) {
			return
		}
		const pendingValue: string | null = await KvUtils.get(KV_KEY_ALL_PENDING)
		if (pendingValue) {
			const pending: PendingSubscription[] = JSON.parse(pendingValue)
			const filtered = pending.filter((p) => {
				if (options.email) {
					return p.email !== options.email
				}
				if (options.token) {
					return p.token !== options.token
				}
				return true
			})
			await KvUtils.put(KV_KEY_ALL_PENDING, JSON.stringify(filtered))
		}
	}
}
