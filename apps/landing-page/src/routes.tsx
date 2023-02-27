import { Route } from 'mobx-router'
import { EXTERNAL_LINKS } from './constants/externallinks.const'
import { UTMUtils } from './helpers/utm'
import { RootStore } from './models/root'
import NotFoundPage from './pages/404/page'
import HomePage from './pages/home/page'
import IntegrationPage from './pages/integration/page'
import IntegrationsPage from './pages/integrations/page'
import PitchDeckPage from './pages/pitchdeck/page'
import PlaygroundPage from './pages/playground/page'
import RedirectPage from './pages/redirect/page'
import RoadmapPage from './pages/roadmap/page'
import UseCasePage from './pages/use-case/page'
import UseCasesPage from './pages/use-cases/page'
import VerificationPage from './pages/verification/page'

export default {
	home: new Route<RootStore>({
		path: '/',
		component: <HomePage />,
		onEnter(_route, _parameters, { root: { pages } }) {
			pages.home.initialisePage()
		},
	}),

	pitch: new Route<RootStore>({
		path: '/pitch',
		component: <PitchDeckPage />,
		onEnter(_route, _parameters, { root: { api } }) {
			api.helmet.updateTitle({
				title: 'Pitch Deck',
				concatenateAppname: true,
			})
		},
	}),

	playground: new Route<RootStore>({
		path: '/playground',
		component: <PlaygroundPage />,
		onEnter(_route, _parameters, { root: { pages } }) {
			pages.playground.initialisePage()
		},
	}),

	signup: new Route<RootStore>({
		path: '/signup',
		component: (
			<RedirectPage title="Signup" subtitle="Redirecting to signup now" />
		),
		onEnter(_route, _parameters, { root: { pages } }) {
			window.location.href = UTMUtils.assign(EXTERNAL_LINKS.CONSOLE, {
				utm_source: 'flethy',
				utm_medium: 'landingpage',
				utm_content: 'buttonlink',
			})
		},
	}),

	roadmap: new Route<RootStore>({
		path: '/roadmap',
		component: <RoadmapPage />,
		onEnter(_route, _parameters, { root: { api } }) {
			api.helmet.updateTitle({
				title: 'Roadmap',
				concatenateAppname: true,
			})
		},
	}),

	verification: new Route<RootStore>({
		path: '/verify/:token',
		component: <VerificationPage />,
		onEnter(_route, parameters, { root: { pages } }) {
			pages.verification.initialisePage(parameters!.token as string)
		},
	}),

	integrations: new Route<RootStore>({
		path: '/integrations',
		component: <IntegrationsPage />,
		onEnter(_route, _parameters, { root: { pages } }) {
			pages.integrations.initialisePage()
		},
	}),

	integration: new Route<RootStore>({
		path: '/integrations/:id',
		component: <IntegrationPage />,
		onEnter(_route, parameters, { root: { pages } }) {
			const id = (parameters?.id as string) ?? ''
			pages.integration.initialisePage(id)
		},
		onParamsChange(_router, parameters, { root: { pages } }) {
			const id = (parameters?.id as string) ?? ''
			pages.integration.initialisePage(id)
		},
	}),

	useCases: new Route<RootStore>({
		path: '/use-cases',
		component: <UseCasesPage />,
		onEnter(_route, _parameters, { root: { api } }) {
			api.helmet.updateTitle({
				title: 'Use Cases',
				concatenateAppname: true,
			})
		},
	}),

	useCase: new Route<RootStore>({
		path: '/use-cases/:id',
		component: <UseCasePage />,
		onEnter(_route, parameters, { root: { pages } }) {
			const { id } = parameters!
			pages.useCase.initialisePage(id as string)
		},
		onParamsChange(_router, parameters, { root: { pages } }) {
			const { id } = parameters!
			pages.useCase.initialisePage(id as string)
		},
	}),

	notFound: new Route<RootStore>({
		path: '/404',
		component: <NotFoundPage />,
		onEnter(_route, _parameters, { root: { pages } }) {
			pages.notFound.initialisePage()
		},
	}),
}
