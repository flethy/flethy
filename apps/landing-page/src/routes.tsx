import { Route } from 'mobx-router'
import { RootStore } from './models/root'
import NotFoundPage from './pages/404/page'
import HomePage from './pages/home/page'
import IntegrationsPage from './pages/integrations/page'
import VerificationPage from './pages/verification/page'

export default {
	home: new Route<RootStore>({
		path: '/',
		component: <HomePage />,
		onEnter(_route, _parameters, { root: { pages } }) {
			pages.home.initialisePage()
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
		path: '/integration/:id',
		component: <IntegrationsPage />,
		onEnter(_route, parameters, { root: { pages } }) {
			const id = (parameters?.id as string) ?? ''
			pages.integration.initialisePage(id)
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
