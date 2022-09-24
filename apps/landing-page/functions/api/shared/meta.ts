export const KV_KEY_ALL_PENDING = 'all_pending'

export interface SubscriptionRequest {
	email: string
}

export interface VerificationRequest {
	token: string
}

export interface PendingSubscription {
	email: string
	ts: number
	date: string
	token: string
}
