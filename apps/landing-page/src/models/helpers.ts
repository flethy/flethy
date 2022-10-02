import { RouterStore } from 'mobx-router'
import { getRoot, IAnyStateTreeNode } from 'mobx-state-tree'
import { RealRootModelInstance, RootStore, rootStore } from './root'

export function getRootStore(node: IAnyStateTreeNode): RealRootModelInstance {
	return getRoot(node) as RealRootModelInstance
}

export function getRouter(): RouterStore<RootStore> {
	return rootStore.router
}
