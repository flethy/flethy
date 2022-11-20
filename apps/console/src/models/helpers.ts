import { RouterStore } from 'mobx-router'
import { getRoot, IAnyStateTreeNode } from 'mobx-state-tree'
import { RealRootModelInstance, RootStore, rootStore } from './root'

export function getRootStore(node: IAnyStateTreeNode): RealRootModelInstance {
	return getRoot(node) as RealRootModelInstance
}

export function getRouter(): RouterStore<RootStore> {
	return rootStore.router
}

export class RouterPathUtils {
	private path: string[] = ['api']

	constructor(version?: number) {
		if (version) {
			this.v(version)
		}
	}

	public v(version: number) {
		this.path.push(`v${version}`)
		return this
	}

	public p(projectId?: string) {
		this.path.push('p')
		this.path.push(projectId ?? ':projectId')
		return this
	}

	public w(workspaceId?: string) {
		this.path.push('w')
		this.path.push(workspaceId ?? ':workspaceId')
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
		return `${this.path.join('/')}`
	}
}
