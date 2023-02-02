import { Route } from 'mobx-router'
import { RootStore } from './models/root'
import UnsufficientPermissionsPage from './pages/403/page'
import NotFoundPage from './pages/404/page'
import ExplorePage from './pages/explore/page'
import HomePage from './pages/home/page'
import SecretsPage from './pages/secrets/page'
import TokensPage from './pages/tokens/page'
import WorkflowEditorPage from './pages/workflow-editor/page'
import WorkflowsPage from './pages/workflows/page'

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

	explore: new Route<RootStore>({
		path: '/explore',
		component: <ExplorePage />,
		onEnter(_route, _parameters, { root: { pages } }) {
			pages.exploreUseCases.init()
		},
	}),

	workflowEditor: new Route<RootStore>({
		path: '/workflow-editor',
		component: <WorkflowEditorPage />,
		onEnter(_route, parameters, { root: { pages } }) {
			const { projectId, workspaceId } = parameters as any
			pages.workflowEditor.initialisePage({ projectId, workspaceId })
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

	tokens: new Route<RootStore>({
		path: new RouterPathUtils().w().p().t().gen(),
		component: <TokensPage />,
		onEnter(_route, parameters, { root: { pages } }) {
			const { projectId, workspaceId } = parameters as any
			pages.tokens.initialisePage({ projectId, workspaceId })
		},
	}),

	workflows: new Route<RootStore>({
		path: new RouterPathUtils().w().p().wf().gen(),
		component: <WorkflowsPage />,
		onEnter(_route, parameters, { root: { pages } }) {
			const { projectId, workspaceId } = parameters as any
			pages.workflows.initialisePage({ projectId, workspaceId })
		},
	}),

	workflowNew: new Route<RootStore>({
		path: new RouterPathUtils().w().p().wf().custom('new').gen(),
		component: <WorkflowEditorPage />,
		onEnter(_route, parameters, { root: { pages } }) {
			const {
				projectId,
				workspaceId,
				tutorial,
				useCaseIntegrationId,
				useCaseInterface,
			} = parameters as any
			let payload: any = { projectId, workspaceId }
			if (useCaseIntegrationId && useCaseInterface) {
				payload.useCase = {
					id: useCaseIntegrationId,
					interfaceName: useCaseInterface,
				}
			}
			if (tutorial) {
				payload.tutorial = tutorial
			}
			pages.workflowEditor.initialisePage(payload)
		},
	}),

	workflowExisting: new Route<RootStore>({
		path: new RouterPathUtils().w().p().wf(true).gen(),
		component: <WorkflowEditorPage />,
		onEnter(_route, parameters, { root: { pages } }) {
			const { projectId, workspaceId, workflowId } = parameters as any
			pages.workflowEditor.initialisePage({
				projectId,
				workspaceId,
				workflowId,
			})
		},
	}),

	unsufficientPermissions: new Route<RootStore>({
		path: '/403',
		component: <UnsufficientPermissionsPage />,
		onEnter(_route, _parameters, { root: { pages } }) {
			pages.unsufficientPermissions.initialisePage({})
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
