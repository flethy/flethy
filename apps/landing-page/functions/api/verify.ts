import { FlowEngine } from '@flethy/flow'
import { FlowNode } from '@flethy/flow/dist/types/flow.types'

import { jsonResponse } from './shared/cf.utils'
import { KvUtils } from './shared/kv.utils'
import { VerificationRequest } from './shared/meta'

export const onRequestPost: PagesFunction<{
	VITE_LOGLEVEL: string
	EMAILOCTOPUS_API_KEY: string
	EMAILOCTOPUS_LIST_ID: string
	MAILJET_API_KEY: string
	MAILJET_API_SECRET: string
}> = async ({ request, env }) => {
	const body: VerificationRequest = await request.json()
	if (!body.token) {
		return jsonResponse(
			{ status: 'error', message: 'no token' },
			{ status: 400 },
		)
	}
	const token = body.token

	const pendingSubscription = await KvUtils.getPendingEntry({ token })

	if (!pendingSubscription) {
		return jsonResponse(
			{
				status: 'done',
				message: 'no pending entry found',
			},
			{ status: 404 },
		)
	}

	const flow: FlowNode[] = [
		{
			id: 'emailoctopus',
			next: [
				{
					id: 'sendWelcomeEmail',
				},
			],
			config: {
				namespace: 'emailoctopus',
			},
			kind: 'emailoctopus.lists.createContact',
			'auth:api_key': '==>secrets==>EMAILOCTOPUS_API_KEY',
			'param:listId': '==>secrets==>EMAILOCTOPUS_LIST_ID',
			'body:email_address': pendingSubscription.email,
		},
		{
			id: 'sendWelcomeEmail',
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
					HTMLPart: `<h3>Welcome!</h3>`,
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
				EMAILOCTOPUS_API_KEY: env.EMAILOCTOPUS_API_KEY,
				EMAILOCTOPUS_LIST_ID: env.EMAILOCTOPUS_LIST_ID,
			},
		},
	})

	await engine.start()

	await KvUtils.removePendingEntry({ token })

	return jsonResponse({
		status: 'done',
	})
}
