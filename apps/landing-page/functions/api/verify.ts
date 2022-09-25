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
	SLACK_WEBHOOK_ID: string
	MIXPANEL_TOKEN: string
	EMAILSUB: KVNamespace
}> = async ({ request, env }) => {
	const body: VerificationRequest = await request.json()
	if (!body.token) {
		return jsonResponse(
			{ status: 'error', message: 'no token' },
			{ status: 400 },
		)
	}
	const token = body.token
	const kvUtils = new KvUtils(env.EMAILSUB)

	const pendingSubscription = await kvUtils.getPendingEntry({ token })

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
				{
					id: 'slackNotification',
				},
				{
					id: 'mixpanelEvent',
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
		{
			id: 'slackNotification',
			config: {
				namespace: 'slack',
			},
			kind: 'slack.incomingWebhooks.message',
			'auth:webhookid': '==>secrets==>SLACK_WEBHOOK_ID',
			'body:text': `verified signup: ${pendingSubscription.email}`,
			'body:blocks': [],
		},
		{
			id: 'mixpanelEvent',
			config: {
				namespace: 'mixpanel',
			},
			kind: 'mixpanel.events.track',
			'auth:token': '==>secrets==>MIXPANEL_TOKEN',
			baseId: 'api',
			'body:body': [
				{
					properties: {
						distinct_id: pendingSubscription.email,
						time: Date.now(),
					},
					event: 'emailVerification',
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
				MAILJET_API_KEY: env.MAILJET_API_KEY,
				MAILJET_API_SECRET: env.MAILJET_API_SECRET,
				SLACK_WEBHOOK_ID: env.SLACK_WEBHOOK_ID,
				MIXPANEL_TOKEN: env.MIXPANEL_TOKEN,
			},
		},
	})

	await engine.start()

	await kvUtils.removePendingEntry({ token })
	await kvUtils.addVerifiedEntry(pendingSubscription.email)

	return jsonResponse({
		status: 'done',
	})
}
