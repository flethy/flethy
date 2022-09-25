import { FlowEngine } from '@flethy/flow'
import { FlowNode } from '@flethy/flow/dist/types/flow.types'

import { jsonResponse } from './shared/cf.utils'
import { KvUtils } from './shared/kv.utils'
import { SubscriptionRequest } from './shared/meta'

export const onRequestPost: PagesFunction<{
	VITE_LOGLEVEL: string
	MAILJET_API_KEY: string
	MAILJET_API_SECRET: string
	SLACK_WEBHOOK_ID: string
	MIXPANEL_TOKEN: string
	EMAILSUB: KVNamespace
}> = async ({ request, env }) => {
	const body: SubscriptionRequest = await request.json()
	if (!body.email) {
		return jsonResponse(
			{ status: 'error', message: 'no email' },
			{ status: 400 },
		)
	}

	const email = body.email.toLowerCase()
	const kvUtils = new KvUtils(env.EMAILSUB)

	let pendingSubscription = await kvUtils.getPendingEntry({ email })
	if (!pendingSubscription) {
		const now = new Date()
		pendingSubscription = {
			email: body.email,
			ts: now.getTime(),
			date: now.toISOString(),
			token: crypto.randomUUID(),
		}
	}

	const flow: FlowNode[] = [
		{
			id: 'sendVerificationEmail',
			config: {
				namespace: 'mailjet',
			},
			next: [
				{
					id: 'slackNotification',
				},
				{
					id: 'mixpanelEvent',
				},
			],
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
		{
			id: 'slackNotification',
			config: {
				namespace: 'slack',
			},
			kind: 'slack.incomingWebhooks.message',
			'auth:webhookid': '==>secrets==>SLACK_WEBHOOK_ID',
			'body:text': `new signup: ${pendingSubscription.email}`,
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
					event: 'emailSubscription',
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
				SLACK_WEBHOOK_ID: env.SLACK_WEBHOOK_ID,
				MIXPANEL_TOKEN: env.MIXPANEL_TOKEN,
			},
		},
	})

	await engine.start()

	await kvUtils.addPendingEntry(pendingSubscription)

	return jsonResponse({
		status: 'done',
	})
}
