import {
	KV_KEY_ALL_PENDING,
	KV_KEY_ALL_VERIFIED,
	PendingSubscription,
	VerifiedSubscription,
} from './meta'

export class KvUtils {
	constructor(private EMAILSUB: KVNamespace) {}

	public async put(key: string, value: string): Promise<void> {
		await this.EMAILSUB.put(key, value)
	}

	public async get(key: string): Promise<string | null> {
		const value = await this.EMAILSUB.get(key)
		return value
	}

	// ===

	public async getPendingEntry(options: {
		email?: string
		token?: string
	}): Promise<PendingSubscription | undefined> {
		if (!options.email && !options.token) {
			return undefined
		}
		const pendingValue: string | null = await this.get(KV_KEY_ALL_PENDING)
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

	public async isPendingEntryAvailable(options: {
		email?: string
		token?: string
	}): Promise<boolean> {
		const existing = await this.getPendingEntry(options)
		if (existing) {
			return true
		} else {
			return false
		}
	}

	public async addPendingEntry(
		pendingSubscription: PendingSubscription,
	): Promise<void> {
		const pendingValue: string | null = await this.get(KV_KEY_ALL_PENDING)
		if (pendingValue) {
			const pending: PendingSubscription[] = JSON.parse(pendingValue)
			pending.push(pendingSubscription)
			await this.put(KV_KEY_ALL_PENDING, JSON.stringify(pending))
		} else {
			await this.put(KV_KEY_ALL_PENDING, JSON.stringify([pendingSubscription]))
		}
	}

	public async addVerifiedEntry(email: string): Promise<void> {
		const newEntry: VerifiedSubscription = { email, ts: Date.now() }
		const verifiedValue: string | null = await this.get(KV_KEY_ALL_VERIFIED)
		if (verifiedValue) {
			const verified: VerifiedSubscription[] = JSON.parse(verifiedValue)
			if (!verified.find((entry) => entry.email === email)) {
				verified.push(newEntry)
			}
			await this.put(KV_KEY_ALL_VERIFIED, JSON.stringify(verified))
		} else {
			await this.put(KV_KEY_ALL_VERIFIED, JSON.stringify([newEntry]))
		}
	}

	public async removePendingEntry(options: {
		email?: string
		token?: string
	}): Promise<void> {
		if (!options.email && !options.token) {
			return
		}
		const pendingValue: string | null = await this.get(KV_KEY_ALL_PENDING)
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
			await this.put(KV_KEY_ALL_PENDING, JSON.stringify(filtered))
		}
	}
}
