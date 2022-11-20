import { Route } from 'mobx-router'
import { RootStore } from './models/root'
import NotFoundPage from './pages/404/page'
import HomePage from './pages/home/page'
import SecretsPage from './pages/secrets/page'
import WorkflowEditorPage from './pages/workflow-editor/page'

export class RouterPathUtils {
	private path: string[] = []

	constructor() {}

	public p() {
		this.path.push('p')
		this.path.push(':projectId')
		return this
	}

	public w() {
		this.path.push('w')
		this.path.push(':workspaceId')
		return this
	}

	public s() {
		this.path.push('s')
		return this
	}

	public wf(withId: boolean = false) {
		this.path.push('wf')
		if (withId) {
			this.path.push(':workflowId')
		}
		return this
	}

	public i(withId: boolean = false) {
		this.path.push('i')
		if (withId) {
			this.path.push(':instanceId')
		}
		return this
	}

	public t() {
		this.path.push('token')
		return this
	}

	public custom(custom: string) {
		this.path.push(custom)
		return this
	}

	public gen(): string {
		return `/${this.path.join('/')}`
	}
}

// /////////////////////

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

	secrets: new Route<RootStore>({
		path: new RouterPathUtils().w().p().s().gen(),
		component: <SecretsPage />,
		onEnter(_route, parameters, { root: { pages } }) {
			const { projectId, workspaceId } = parameters as any
			pages.secrets.initialisePage({ projectId, workspaceId })
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
