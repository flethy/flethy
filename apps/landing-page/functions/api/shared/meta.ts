export const KV_KEY_ALL_PENDING = 'all_pending'
export const KV_KEY_ALL_VERIFIED = 'all_verified'

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

export interface VerifiedSubscription {
	email: string
	ts: number
}
