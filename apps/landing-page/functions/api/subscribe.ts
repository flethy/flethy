import { FlowEngine } from '@flethy/flow'
import { FlowNode } from '@flethy/flow/dist/types/flow.types'

import { jsonResponse } from './shared/cf.utils'
import { KvUtils } from './shared/kv.utils'
import { PendingSubscription, SubscriptionRequest } from './shared/meta'

export const onRequestPost: PagesFunction<{
	VITE_LOGLEVEL: string
	MAILJET_API_KEY: string
	MAILJET_API_SECRET: string
}> = async ({ request, env }) => {
	const body: SubscriptionRequest = await request.json()
	if (!body.email) {
		return jsonResponse(
			{ status: 'error', message: 'no email' },
			{ status: 400 },
		)
	}

	try {
		const email = body.email.toLowerCase()

		const isPendingAvailable = await KvUtils.isPendingEntryAvailable({ email })
		if (isPendingAvailable) {
			return jsonResponse({
				status: 'done',
			})
		}

		const now = new Date()

		const pendingSubscription: PendingSubscription = {
			email: body.email,
			ts: now.getTime(),
			date: now.toISOString(),
			token: crypto.randomUUID(),
		}

		const flow: FlowNode[] = [
			{
				id: 'sendVerificationEmail',
				config: {
					namespace: 'mailjet',
				},
				kind: 'mailjet.send.basicEmail',
				'auth:Authorization': {
					username: '==>secrets==>MAILJET_API_KEY',
					password: '==>secrets==>MAILJET_API_SECRET',
				},
				'body:Messages': [
					{
						From: {
							Email: 'adam@flethy.com',
							Name: 'Adam (from flethy)',
						},
						To: [
							{
								Name: pendingSubscription.email,
								Email: pendingSubscription.email,
							},
						],
						Subject: `Hello from flethy!`,
						HTMLPart: `<h3>Hello from flethy!</h3><p>Please verify your email address: <a href="https://flethy.com/verify/${pendingSubscription.token}">https://flethy.com/verify/${pendingSubscription.token}</a></p>`,
					},
				],
			},
		]

		const engine = new FlowEngine({
			flow,
			input: {},
			env: {
				env: {},
				secrets: {
					MAILJET_API_KEY: env.MAILJET_API_KEY,
					MAILJET_API_SECRET: env.MAILJET_API_SECRET,
				},
			},
		})

		await engine.start()

		await KvUtils.addPendingEntry(pendingSubscription)

		return jsonResponse({
			status: 'done',
		})
	} catch (error: any) {
		return jsonResponse(
			{ status: 'error', message: error.message, error },
			{ status: 500 },
		)
	}
}
