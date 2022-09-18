export const jsonResponse = (value: any, init: ResponseInit = {}) =>
	new Response(JSON.stringify(value), {
		headers: { 'Content-Type': 'application/json', ...init.headers },
		...init,
	})

export const onRequestGet: PagesFunction<{
	VITE_LOGLEVEL: string
}> = async ({ request, env }) => {
	return jsonResponse({
		status: 'hf!1!',
		setting: env.VITE_LOGLEVEL,
	})
}
