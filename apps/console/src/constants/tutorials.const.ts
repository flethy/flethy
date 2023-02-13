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
	type: 'oauth' | 'regular'
	prestep?: FlowNode[]
	workflow: FlowNode[]
	env?: {
		[key: string]: string
	}
}

export const WORKFLOW_TUTORIALS: { [key: string]: WorkflowTutorial } = {
	TwitterOAuth: {
		name: 'Twitter OAuth Flow',
		type: 'oauth',
		description: 'Twitter OAuth Flow',
		prerequisites: [
			'Navigate to Twitter developer console and create an OAuth app',
		],
		level: TutorialLevel.Advanced,
		prestep: [
			{
				id: 'authorize',
				kind: 'twitter.auth.oAuth2Authorize',
				'auth:client_id': '==>env==>TWOA_CLIENT_ID',
				'query:code_challenge_method': 'plain',
				'query:code_challenge': '==>env==>CODE_CHALLENGE',
				'query:response_type': 'code',
				'query:redirect_uri': '==>env==>REDIRECT_URL',
				'query:state': '==>env==>STATE',
				'query:scope':
					'tweet.read users.read follows.read follows.write offline.access',
			},
		],
		workflow: [
			{
				id: 'token',
				config: {
					namespace: '_flethyresponse',
				},
				kind: 'twitter.auth.oAuth2Token',
				'auth:Authorization': {
					username: '==>env==>TWOA_CLIENT_ID',
					password: '==>secrets==>TWOA_CLIENT_SECRET',
				},
				'header:Content-Type': 'application/x-www-form-urlencoded',
				'query:code': '->context.input.code->string',
				'query:code_verifier': '==>env==>CODE_CHALLENGE',
				'query:grant_type': 'authorization_code',
				'query:redirect_uri': '==>env==>REDIRECT_URL',
			},
		],
		env: {
			TWOA_CLIENT_ID: 'clientId',
			CODE_CHALLENGE: 'codeChallenge',
			STATE: 'state',
			REDIRECT_URL: 'http://localhost:4200/',
			IS_OAUTH: 'true',
			TUTORIAL: 'TwitterOAuth',
		},
	},
	WebhookSite: {
		name: 'First Http Request',
		type: 'regular',
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
		type: 'regular',
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
		type: 'regular',
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
