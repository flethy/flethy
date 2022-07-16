import { Route } from 'mobx-router'
import { RootStore } from './models/root'
import NotFoundPage from './pages/404/page'
import CatsPage from './pages/cats/page'
import FlowPage from './pages/flow/page'

export default {
	home: new Route<RootStore>({
		path: '/',
		component: <FlowPage />,
		onEnter(_route, _parameters, { root: { pages } }) {
			pages.flow.initialisePage()
		},
	}),

	cats: new Route<RootStore>({
		path: '/cats',
		component: <CatsPage />,
		onEnter(_route, _parameters, { root: { pages } }) {
			pages.cats.initialisePage()
		},
	}),

	flow: new Route<RootStore>({
		path: '/flow',
		component: <FlowPage />,
		onEnter(_route, _parameters, { root: { pages } }) {
			pages.flow.initialisePage()
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
