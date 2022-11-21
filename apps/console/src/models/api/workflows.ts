import { flow, Instance, types } from 'mobx-state-tree'
import { request } from '../../helpers/api'
import { getRootStore, RouterPathUtils } from '../helpers'
import { StateAndCacheKey } from './stateAndCache'

export const WorkflowDataModel = types.model('WorkflowDataModel', {
	createdBy: types.string,
	createdAt: types.number,
	updatedBy: types.maybeNull(types.string),
	updatedAt: types.maybeNull(types.number),
	workflowId: types.optional(types.string, ''),
	name: types.optional(types.string, ''),
})

export const WorkflowsModel = types
	.model('WorkflowsModel', {
		workflows: types.map(types.array(WorkflowDataModel)),
	})
	.actions((self) => {
		const list = flow(function* (options: {
			workspaceId: string
			projectId: string
			useCache?: boolean
		}) {
			const { api } = getRootStore(self)
			const useCache = options.useCache ?? true

			const stateAndCacheKey: StateAndCacheKey = {
				api: `workflows`,
				operation: `list`,
				id: options.projectId,
			}
			if (!api.stateAndCache.shouldFetch(stateAndCacheKey, useCache)) {
				return
			}

			api.stateAndCache.updateToPending(stateAndCacheKey)

			try {
				const response: { data: any[] } = yield request({
					base: 'flethy',
					method: 'get',
					auth: true,
					url: new RouterPathUtils()
						.w(options.workspaceId)
						.p(options.projectId)
						.wf()
						.gen(),
				})
				self.workflows.set(options.projectId, response.data)
				api.stateAndCache.updateToDone(stateAndCacheKey)
			} catch (error) {
				console.log(error)
				api.stateAndCache.updateToFailure(stateAndCacheKey)
			}
		})

		const put = flow(function* (options: {
			workspaceId: string
			projectId: string
			workflow: any
		}) {
			const response: { workflowMetadata: any } = yield request({
				base: 'flethy',
				method: 'put',
				auth: true,
				url: new RouterPathUtils()
					.w(options.workspaceId)
					.p(options.projectId)
					.wf()
					.gen(),
				body: options.workflow,
			})
			const currentWorkflows = self.workflows.get(options.projectId)
			if (currentWorkflows) {
				currentWorkflows.push(response.workflowMetadata)
			} else {
				self.workflows.set(options.projectId, [response.workflowMetadata])
			}
		})

		return { list, put }
	})
	.views((self) => {
		const getFromStore = (options: {
			projectId: string
		}): Instance<typeof WorkflowDataModel>[] | undefined => {
			return self.workflows.get(options.projectId)
		}

		return { getFromStore }
	})
