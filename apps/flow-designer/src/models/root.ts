import { RouterStore } from 'mobx-router'
import { Instance, types } from 'mobx-state-tree'
import { useContext } from 'react'
import { NotFoundPage } from '../pages/404/model'
import { CatsPage } from '../pages/cats/model'
import { FlowPage } from '../pages/flow/model'
import ApiStore, { APIType } from './api'
import { Configs } from './configs'
import { RootStoreContext } from './context'
import { Flow } from './flow'

const PagesStore = types.model('Pages', {
	notFound: types.optional(NotFoundPage, () => NotFoundPage.create()),
	cats: types.optional(CatsPage, () => CatsPage.create()),
	flow: types.optional(FlowPage, () => FlowPage.create()),
})

export const RealRootModel = types.model('Root', {
	api: types.optional(ApiStore, () => ApiStore.create()),
	pages: types.optional(PagesStore, () => PagesStore.create()),
	flow: types.optional(Flow, () => Flow.create()),
	configs: types.optional(Configs, () => Configs.create()),
})

export type RealRootModelInstance = Instance<{
	api: APIType
	pages: Instance<typeof PagesStore>
	flow: Instance<typeof Flow>
	configs: Instance<typeof Configs>
}>

export class RootStore {
	public router: RouterStore<RootStore>
	public root: {
		api: Instance<typeof ApiStore>
		pages: Instance<typeof PagesStore>
		flow: Instance<typeof Flow>
		configs: Instance<typeof Configs>
	}

	constructor() {
		this.router = new RouterStore<RootStore>(this)
		this.root = RealRootModel.create()
	}
}

export const rootStore = new RootStore()

export function useMst() {
	const store = useContext(RootStoreContext)
	if (store === null) {
		throw new Error('Store cannot be null, please add a context provider')
	}
	return store
}
