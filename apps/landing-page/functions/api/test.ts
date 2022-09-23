import { FlowEngine } from '@flethy/flow'
import { FlowNode } from '@flethy/flow/dist/types/flow.types'

export const jsonResponse = (value: any, init: ResponseInit = {}) =>
	new Response(JSON.stringify(value), {
		headers: { 'Content-Type': 'application/json', ...init.headers },
		...init,
	})

export const onRequestGet: PagesFunction<{
	VITE_LOGLEVEL: string
	EMAILOCTOPUS_API_KEY: string
	EMAILOCTOPUS_LIST_ID: string
}> = async ({ request, env }) => {
	const flow: FlowNode[] = [
		{
			id: 'emailoctopus',
			config: {
				namespace: 'emailoctopus',
			},
			kind: 'emailoctopus.lists.createContact',
			'auth:api_key': '==>secrets==>EMAILOCTOPUS_API_KEY',
			'param:listId': '==>secrets==>EMAILOCTOPUS_LIST_ID',
			'body:email_address': 'adam2@flethy.com',
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

	return jsonResponse({
		status: 'hf!1! new',
		setting: env.VITE_LOGLEVEL,
		content: engine.getContent('all'),
	})
}
