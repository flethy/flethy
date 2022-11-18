import { Route } from 'mobx-router'
import { RootStore } from './models/root'
import NotFoundPage from './pages/404/page'
import HomePage from './pages/home/page'
import WorkflowEditorPage from './pages/workflow-editor/page'

export default {
	home: new Route<RootStore>({
		path: '/',
		component: <HomePage />,
		onEnter(_route, _parameters, { root: { pages } }) {
			pages.home.initialisePage()
		},
	}),

	workflowEditor: new Route<RootStore>({
		path: '/workflow-editor',
		component: <WorkflowEditorPage />,
		onEnter(_route, _parameters, { root: { pages } }) {
			pages.workflowEditor.initialisePage({ id: '123' })
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
