import { FlowNode } from '@flethy/flow'

export enum TutorialLevel {
	Beginner = 'Beginner',
	Intermediate = 'Intermediate',
	Advanced = 'Advanced',
}

export interface WorkflowTutorial {
	name: string
	description: string
	prerequisites: string[]
	level: TutorialLevel
	workflow: FlowNode[]
	env?: {
		[key: string]: string
	}
}

export const WORKFLOW_TUTORIALS: { [key: string]: WorkflowTutorial } = {
	WebhookSite: {
		name: 'First Http Request',
		description: 'Send your first HTTP request with WebhookSite',
		prerequisites: ['Navigate to webhook.site and copy the UUID'],
		level: TutorialLevel.Beginner,
		workflow: [
			{
				id: 'webhooksite-post',
				kind: 'webhooksite.core.post',
				'param:uuid': '==>env==>WEBHOOKSITE_UUID',
				'header:x-test-header': 'flethy',
				'body:body': {
					hello: 'world!',
				},
			},
		],
		env: {
			WEBHOOKSITE_UUID: 'webhooksite_uuid',
		},
	},
	Auth0User: {
		name: 'Create an Auth0 User',
		description: 'Request a new Token and create a new Auth0 User',
		prerequisites: [
			'Auth0 Machine to Machine Application',
			'Client Credentials',
		],
		level: TutorialLevel.Intermediate,
		workflow: [
			{
				id: 'token',
				config: {
					namespace: 'token',
				},
				next: [
					{
						id: 'createUser',
					},
				],
				kind: 'auth0.auth.accesstoken',
				'body:audience': '==>env==>AUTH0_AUDIENCE',
				'body:grant_type': 'client_credentials',
				'body:client_id': '==>secrets==>AUTH0_CLIENT_ID',
				'body:client_secret': '==>secrets==>AUTH0_CLIENT_SECRET',
				'subdomain:tenant': '==>env==>AUTH0_TENANT',
			},
			{
				id: 'createUser',
				config: {
					namespace: 'createUser',
				},
				kind: 'auth0.users.create',
				'auth:Authorization': '->context.token.access_token->string',
				'subdomain:tenant': '==>env==>AUTH0_TENANT',
				'body:email': '->context.input.email->string',
				'body:family_name': '->context.input.last->string',
				'body:given_name': '->context.input.first->string',
			},
		],
		env: {
			AUTH0_AUDIENCE: 'audience',
		},
	},
	TwitterThread: {
		name: 'Twitter Thread',
		description: 'Automate your twitter thread posts',
		prerequisites: ['Twitter Developer Accounts', 'OAuth Credentials'],
		level: TutorialLevel.Advanced,
		workflow: [
			{
				id: 'first',
				next: [
					{
						id: 'reply',
						condition: {
							filter: '$count(context.input.thread) > 1',
						},
					},
				],
				config: {
					namespace: 'tweet',
					postAssignments: [
						{
							namespace: 'thread',
							key: 'counter',
							valueToEvaluate: '$number(1)',
						},
					],
				},
				kind: 'twitter.manage.postTweets',
				'auth:Authorization': {
					consumerKey: '==>secrets==>CONSUMER_KEY',
					consumerSecret: '==>secrets==>CONSUMER_SECRET',
					accessKey: '==>secrets==>ACCESS_TOKEN',
					accessSecret: '==>secrets==>ACCESS_TOKEN_SECRET',
				},
				'body:text': '->context.input.thread[0]->string',
			},
			{
				id: 'reply',
				next: [
					{
						id: 'reply',
						condition: {
							filter:
								'$number(context.thread.counter) < $count(context.input.thread)',
						},
					},
				],
				config: {
					namespace: 'tweet',
					postAssignments: [
						{
							namespace: 'thread',
							key: 'counter',
							valueToEvaluate: '$number(context.thread.counter) + 1',
						},
					],
				},
				kind: 'twitter.manage.postTweets',
				'auth:Authorization': {
					consumerKey: '==>secrets==>CONSUMER_KEY',
					consumerSecret: '==>secrets==>CONSUMER_SECRET',
					accessKey: '==>secrets==>ACCESS_TOKEN',
					accessSecret: '==>secrets==>ACCESS_TOKEN_SECRET',
				},
				'body:text':
					'->context.input.thread[$$.context.thread.counter]->string',
				'body:reply': {
					in_reply_to_tweet_id: '->context.tweet.data.id->string',
				},
			},
		],
	},
}

export const WORKFLOW_STARTER = [
	{
		id: '',
		kind: '',
	},
]
