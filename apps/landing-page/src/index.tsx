import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/open-sans/700.css'
import '@fontsource/raleway/400.css'
import { observer } from 'mobx-react-lite'
import { startRouter } from 'mobx-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import events, { LogLevel } from './events/events'
import './i18n/config'
import './index.scss'
import { Provider, rootStore, useMst } from './models/root'
import AppPage from './pages/app/page'
import routes from './routes'

export const LOGLEVEL = import.meta.env.VITE_LOGLEVEL
	? (String(import.meta.env.VITE_LOGLEVEL) as LogLevel)
	: 'off'
events.init(LOGLEVEL)

const App = observer(() => {
	const {
		root: {},
	} = useMst()

	startRouter(routes, rootStore, {
		notfound: () => rootStore.router.goTo(routes.notFound),
	})

	const theme = extendTheme({
		styles: {
			global: {
				body: {
					bg: 'black',
				},
			},
		},
		config: {
			initialColorMode: 'dark',
			useSystemColorMode: false,
		},
		colors: {
			flethy: {
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

	return (
		<ChakraProvider theme={theme}>
			<AppPage />
		</ChakraProvider>
	)
})

const container = document.getElementById('root')
if (container) {
	const root = createRoot(container)
	root.render(
		<StrictMode>
			<Provider value={rootStore}>
				<App />
			</Provider>
		</StrictMode>,
	)
}
