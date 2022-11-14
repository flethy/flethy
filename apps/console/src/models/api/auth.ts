import {
	Auth0Client,
	Auth0ClientOptions,
	createAuth0Client,
	LogoutOptions,
	RedirectLoginOptions,
} from '@auth0/auth0-spa-js'
import { types } from 'mobx-state-tree'

const AUTH0_BASE_CLAIM = `https://flethy.com`

export const AuthStore = types
	.model('Auth', {
		clientOptions: types.frozen<Auth0ClientOptions>(),
		isAuthenticated: types.optional(types.maybeNull(types.boolean), null),
		token: types.maybe(types.string),
		error: types.maybeNull(
			types.model({
				error: types.string,
				description: types.string,
			}),
		),
	})
	.volatile(
		(_self) =>
			({ user: undefined, client: undefined } as {
				user: { picture?: string; email?: string; sub?: string } | undefined
				client: Promise<Auth0Client> | undefined
			}),
	)
	.actions((self) => ({
		setToken(token: string | undefined) {
			self.token = token
			// if (token) {
			// 	const decodedToken = jwt_decode<Record<string, any>>(token)
			// }
		},

		loginWithRedirect(options?: RedirectLoginOptions) {
			self.client?.then((client) => {
				client.loginWithRedirect(options).then(() => {
					Promise.all([client.getTokenSilently(), client.getUser()]).then(
						([token, user]) => {
							this.loginSuccessful(token, user)
						},
					)
				})
			})
		},

		afterCreate() {
			self.client = createAuth0Client(self.clientOptions)

			const query = window.location.search
			if (query.includes('code=') && query.includes('state=')) {
				this.handleRedirectCallback()
			} else if (query.includes('error=')) {
				const queryParams = new URLSearchParams(query)
				self.error = {
					error: queryParams.get('error') || '',
					description: queryParams.get('error_description') || '',
				}
			} else {
				self.client.then(async (client) => {
					if (await client.isAuthenticated()) {
						Promise.all([client.getTokenSilently(), client.getUser()]).then(
							([token, user]) => {
								this.loginSuccessful(token, user)
							},
						)
					} else {
						this.notLoggedIn()
					}
				})
			}
		},

		async getTokenSilently() {
			if (self.client) {
				const client = await self.client
				const isAuthenticated = await client.isAuthenticated()
				if (!isAuthenticated) {
					try {
						const token = await client.getTokenSilently()
						this.setToken(token)
						return token
					} catch (_error) {
						return this.loginWithRedirect()
					}
				} else {
					return self.token
				}
			}
		},

		fetchUser() {
			self.client?.then((client) =>
				client.getUser().then((user) => {
					if (user) {
						this.updateUser(user)
					}
				}),
			)
		},

		updateUser(user: any) {
			self.user = user
		},

		loginSuccessful(token: string, user: any) {
			this.setToken(token)
			self.user = user
			self.isAuthenticated = true
		},

		notLoggedIn() {
			self.isAuthenticated = false
		},

		logout(options?: LogoutOptions) {
			self.client?.then((client) => {
				client.logout(options)
			})
		},

		handleRedirectCallback() {
			self.client?.then((client: Auth0Client) => {
				client.handleRedirectCallback().then((response: any) => {
					const appStateTarget: string | undefined = response?.appState?.target
					if (appStateTarget) {
						const targetUrl = `${window.location.origin}/${appStateTarget}`
						window.location.href = targetUrl
					}
				})

				Promise.all([client.getTokenSilently(), client.getUser()]).then(
					([token, user]) => {
						this.loginSuccessful(token, user)
					},
				)

				history.replaceState({}, '', '/')
			})
		},
	}))
	.views((self) => ({}))
