import { flow, Instance, types } from 'mobx-state-tree'
import { request } from '../../helpers/api'
import { FlethyContext } from '../flethy.types'
import { getRootStore, RouterPathUtils } from '../helpers'
import { StateAndCacheKey } from './stateAndCache'

export const ProjectModel = types.model('ProjectModel', {
	id: types.string,
	name: types.string,
	r: types.array(types.string),
})

export interface Limits {
	projects: {
		max: number
		workflows: {
			max: number
		}
		tokens: {
			max: number
		}
		secrets: {
			max: number
		}
		crons: {
			max: number
		}
	}
}

export const WorkspaceModel = types.model('WorkspaceModel', {
	id: types.string,
	name: types.string,
	p: types.array(ProjectModel),
	r: types.array(types.string),
	limits: types.optional(types.frozen<Limits>(), {
		projects: {
			max: 1,
			workflows: {
				max: 10,
			},
			tokens: {
				max: 3,
			},
			secrets: {
				max: 10,
			},
			crons: {
				max: 1,
			},
		},
	}),
})

export const WorkspacesModel = types
	.model('WorkspacesModel', {
		workspaces: types.map(WorkspaceModel),
		context: types.optional(FlethyContext, {}),
	})
	.actions((self) => {
		const getMy = flow(function* (options: { useCache?: boolean }) {
			const { api } = getRootStore(self)
			const useCache = options.useCache ?? true

			const stateAndCacheKey: StateAndCacheKey = {
				api: `workspaces`,
				operation: `getMy`,
			}
			if (!api.stateAndCache.shouldFetch(stateAndCacheKey, useCache)) {
				return
			}

			api.stateAndCache.updateToPending(stateAndCacheKey)

			try {
				const response = yield request({
					base: 'flethy',
					method: 'get',
					auth: true,
					url: new RouterPathUtils().w(false).custom('my').gen(),
				})
				if (response?.workspaces) {
					response.workspaces.forEach((workspace: any) => {
						if (workspace?.id) {
							self.workspaces.set(workspace.id, workspace)
						}
					})
				}
				self.context.workspaceId = api.user.workspaces[0].id
				self.context.projectId = api.user.workspaces[0].projects[0].id
				api.workflows.list(api.workspaces.getContext())
				api.stateAndCache.updateToDone(stateAndCacheKey)
			} catch (error) {
				console.log(error)
				api.stateAndCache.updateToFailure(stateAndCacheKey)
			}
		})

		const onboard = flow(function* (options: {
			workspaceName: string
			projectName: string
		}) {
			const { api, auth } = getRootStore(self)
			const workspaceId = api.user.workspaces[0].id
			try {
				const response = yield request({
					base: 'flethy',
					method: 'post',
					auth: true,
					url: `api/w/${workspaceId}/onboard`,
					body: {
						name: options.workspaceName,
						projectName: options.projectName,
					},
				})
				yield new Promise((resolve) => {
					setTimeout(resolve, 1000)
				})
				window.location.reload()
			} catch (error) {
				console.log(error)
			}
		})

		return { getMy, onboard }
	})
	.views((self) => {
		const getFromStore = (options: {
			workspaceId: string
		}): Instance<typeof WorkspaceModel> | undefined => {
			return self.workspaces.get(options.workspaceId)
		}

		const getContext = () => {
			const context = {
				workspaceId: self.context.workspaceId,
				projectId: self.context.projectId,
			}
			return context
		}

		const isOnboarded = () => {
			return (
				self.context.workspaceId?.length > 0 &&
				self.context.projectId?.length > 0
			)
		}

		const getLimits = (): Limits => {
			return (
				self.workspaces.get(self.context.workspaceId)?.limits ?? {
					projects: {
						max: 1,
						workflows: {
							max: 10,
						},
						tokens: {
							max: 3,
						},
						secrets: {
							max: 10,
						},
						crons: {
							max: 1,
						},
					},
				}
			)
		}

		const getEnrichedContext = () => {
			const workspace = self.workspaces.get(self.context.workspaceId)
			if (workspace) {
				const project = workspace.p.find(
					(project) => project.id === self.context.projectId,
				)
				if (project) {
					return {
						workspace,
						project,
					}
				}
			}
			return undefined
		}

		return {
			getFromStore,
			getContext,
			getEnrichedContext,
			isOnboarded,
			getLimits,
		}
	})
