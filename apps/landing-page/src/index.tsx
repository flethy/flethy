import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/open-sans/700.css'
import '@fontsource/raleway/400.css'
import { observer } from 'mobx-react-lite'
import { MobxRouter, startRouter } from 'mobx-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import events, { LogLevel } from './events/events'
import './i18n/config'
import './index.scss'
import { Provider, rootStore, useMst } from './models/root'
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
		config: {
			initialColorMode: 'dark',
			useSystemColorMode: false,
		},
		colors: {},
		fonts: {
			heading: `'Open Sans', sans-serif`,
			body: `'Raleway', sans-serif`,
		},
	})

	return (
		<ChakraProvider theme={theme}>
			{/* <Box p={4} minHeight={{ md: 'calc(100vh - 415px)' }}> */}
			<Box bg="black">
				<MobxRouter store={rootStore} />
			</Box>
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
