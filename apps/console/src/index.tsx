import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/open-sans/700.css'
import '@fontsource/raleway/400.css'
import { observer } from 'mobx-react-lite'
import { startRouter } from 'mobx-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import AppLoading from './components/Loading'
import events, { LogLevel } from './events/events'
import './i18n/config'
import './index.scss'
import { Provider } from './models/provider'
import { rootStore, useMst } from './models/root'
import AppPage from './pages/app/page'
import routes from './routes'

export const LOGLEVEL = import.meta.env.VITE_LOGLEVEL
	? (String(import.meta.env.VITE_LOGLEVEL) as LogLevel)
	: 'off'
events.init(LOGLEVEL)

let initialized = false

// APP

const App = observer(() => {
	const {
		root: { components, api, auth },
	} = useMst()

	components.quickSearch.initialise()

	let app

	if (auth.isAuthenticated === null) {
		app = <AppLoading />
	} else if (auth.isAuthenticated && auth.user) {
		if (!initialized) {
			startRouter(routes, rootStore, {
				notfound: () => rootStore.router.goTo(routes.notFound),
			})
			initialized = true
		}
		api.workspaces.getMy({})
		app = (
			<>
				<HelmetProvider>
					<Helmet>
						{api.helmet.title ? <title>{api.helmet.title}</title> : null}
					</Helmet>
				</HelmetProvider>
				<AppPage />
			</>
		)
	} else {
		app = <AppLoading />
		if (!auth.isAuthenticated) {
			const path =
				window.location.pathname?.length > 0
					? window.location.pathname.substring(1)
					: ''
			const query = window.location.search
			setTimeout(() => {
				auth.loginWithRedirect({
					appState: {
						target: `${path}${query}`,
					},
				})
			}, 500)
		} else {
			auth.fetchUser()
		}
	}

	return app
})

// ROOT

const theme = extendTheme({
	styles: {
		global: {
			body: {
				// bg: 'black',
			},
		},
	},
	config: {
		initialColorMode: 'dark',
		useSystemColorMode: false,
	},
	colors: {
		flethy: {
			darkbg: '#1A202C',
			orange: '#EE7524',
			lightpurple: '#CC3F6B',
			purple: '#A33792',
			bannerbg:
				'linear-gradient(30deg, rgba(238,117,36,1) 0%, rgba(204,63,107,1) 35%, rgba(163,55,146,1) 100%)',
			900: 'yellow',
		},
	},
	fonts: {
		heading: `'Open Sans', sans-serif`,
		body: `'Raleway', sans-serif`,
	},
})

const container = document.getElementById('root')
if (container) {
	const root = createRoot(container)
	root.render(
		<StrictMode>
			<Provider value={rootStore}>
				<ChakraProvider theme={theme}>
					<App />
				</ChakraProvider>
			</Provider>
		</StrictMode>,
	)
}
