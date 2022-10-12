import { RouterStore } from 'mobx-router'
import { Instance, types } from 'mobx-state-tree'
import { createContext, useContext } from 'react'
import { EmailSubscriptionModel } from '../components/email-subscription/EmailSubscriptionModel'
import { QuickSearchComponent } from '../components/quicksearch/model'
import { NotFoundPage } from '../pages/404/model'
import { HomePage } from '../pages/home/model'
import { IntegrationPage } from '../pages/integration/model'
import { IntegrationsPage } from '../pages/integrations/model'
import { VerificationPage } from '../pages/verification/model'
import ApiStore, { APIType } from './api'

const PagesStore = types.model('Pages', {
	notFound: types.optional(NotFoundPage, () => NotFoundPage.create()),
	home: types.optional(HomePage, () => HomePage.create()),
	verification: types.optional(VerificationPage, () =>
		VerificationPage.create(),
	),
	integrations: types.optional(IntegrationsPage, () =>
		IntegrationsPage.create(),
	),
	integration: types.optional(IntegrationPage, () => IntegrationPage.create()),
})

const ComponentsStore = types.model('Components', {
	emailSubscription: types.optional(EmailSubscriptionModel, () =>
		EmailSubscriptionModel.create(),
	),
	quickSearch: types.optional(QuickSearchComponent, () =>
		QuickSearchComponent.create(),
	),
})

export const RealRootModel = types.model('Root', {
	api: types.optional(ApiStore, () => ApiStore.create()),
	pages: types.optional(PagesStore, () => PagesStore.create()),
	components: types.optional(ComponentsStore, () => ComponentsStore.create()),
})

export type RealRootModelInstance = Instance<{
	api: APIType
	pages: Instance<typeof PagesStore>
	components: Instance<typeof ComponentsStore>
}>

export class RootStore {
	public router: RouterStore<RootStore>
	public root: {
		api: Instance<typeof ApiStore>
		pages: Instance<typeof PagesStore>
		components: Instance<typeof ComponentsStore>
	}

	constructor() {
		this.router = new RouterStore<RootStore>(this)
		this.root = RealRootModel.create()
	}
}

export const rootStore = new RootStore()

const RootStoreContext = createContext<null | RootStore>(null)

export const Provider = RootStoreContext.Provider

export function useMst() {
	const store = useContext(RootStoreContext)
	if (store === null) {
		throw new Error('Store cannot be null, please add a context provider')
	}
	return store
}
