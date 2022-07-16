import { RouterStore } from 'mobx-router'
import { Instance, types } from 'mobx-state-tree'
import { createContext, useContext } from 'react'
import { NotFoundPage } from '../pages/404/model'
import { CatsPage } from '../pages/cats/model'
import ApiStore, { APIType } from './api'

const PagesStore = types.model('Pages', {
	notFound: types.optional(NotFoundPage, () => NotFoundPage.create()),
	cats: types.optional(CatsPage, () => CatsPage.create()),
})

export const RealRootModel = types.model('Root', {
	api: types.optional(ApiStore, () => ApiStore.create()),
	pages: types.optional(PagesStore, () => PagesStore.create()),
})

export type RealRootModelInstance = Instance<{
	api: APIType
	pages: Instance<typeof PagesStore>
}>

export class RootStore {
	public router: RouterStore<RootStore>
	public root: {
		api: Instance<typeof ApiStore>
		pages: Instance<typeof PagesStore>
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
