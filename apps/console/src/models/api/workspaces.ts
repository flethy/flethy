import { flow, Instance, types } from 'mobx-state-tree'
import { request } from '../../helpers/api'
import { getRootStore, RouterPathUtils } from '../helpers'
import { StateAndCacheKey } from './stateAndCache'

export const ProjectModel = types.model('ProjectModel', {
	id: types.string,
	name: types.string,
	r: types.array(types.string),
})

export const WorkspaceModel = types.model('WorkspaceModel', {
	id: types.string,
	name: types.string,
	projects: types.array(ProjectModel),
	r: types.array(types.string),
})

export const WorkspacesModel = types
	.model('WorkspacesModel', {
		workspaces: types.map(WorkspaceModel),
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
						self.workspaces.set(workspace.id, workspace)
					})
				}
				api.stateAndCache.updateToDone(stateAndCacheKey)
			} catch (error) {
				console.log(error)
				api.stateAndCache.updateToFailure(stateAndCacheKey)
			}
		})

		return { getMy }
	})
	.views((self) => {
		const getFromStore = (options: {
			workspaceId: string
		}): Instance<typeof WorkspaceModel> | undefined => {
			return self.workspaces.get(options.workspaceId)
		}

		return { getFromStore }
	})
