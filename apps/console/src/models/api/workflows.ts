import { FlowNode } from '@flethy/flow'
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
	workflow: types.optional(types.string, ''),
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

		const get = flow(function* (options: {
			workspaceId: string
			projectId: string
			workflowId: string
			useCache?: boolean
		}) {
			const { api } = getRootStore(self)
			const useCache = options.useCache ?? true

			const stateAndCacheKey: StateAndCacheKey = {
				api: `workflows`,
				operation: `get`,
				id: options.workflowId,
			}
			if (!api.stateAndCache.shouldFetch(stateAndCacheKey, useCache)) {
				return
			}

			api.stateAndCache.updateToPending(stateAndCacheKey)

			try {
				const response: any = yield request({
					base: 'flethy',
					method: 'get',
					auth: true,
					url: new RouterPathUtils()
						.w(options.workspaceId)
						.p(options.projectId)
						.wf(options.workflowId)
						.gen(),
				})
				// TODO: fix persisting of workflows
				api.stateAndCache.updateToDone(stateAndCacheKey)
				return response
			} catch (error) {
				console.log(error)
				api.stateAndCache.updateToFailure(stateAndCacheKey)
			}
		})

		const put = flow(function* (options: {
			workflowId?: string
			workspaceId: string
			projectId: string
			workflow: FlowNode[]
			name: string
			env?: { [key: string]: string }
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
				body: {
					name: options.name,
					workflow: options.workflow,
					env: options.env,
				},
			})
			const currentWorkflows = self.workflows.get(options.projectId)
			if (currentWorkflows) {
				const foundWorkflow = currentWorkflows.find(
					(workflow) =>
						workflow.workflowId === response.workflowMetadata.workflowId,
				)
				if (!foundWorkflow) {
					currentWorkflows.push(response.workflowMetadata)
				}
			} else {
				self.workflows.set(options.projectId, [response.workflowMetadata])
			}
			return response.workflowMetadata
		})

		const start = flow(function* (options: {
			workspaceId: string
			projectId: string
			workflowId: string
			payload?: any
		}) {
			yield request({
				base: 'flethy',
				method: 'post',
				auth: true,
				url: new RouterPathUtils()
					.w(options.workspaceId)
					.p(options.projectId)
					.wf(options.workflowId)
					.i()
					.gen(),
				body: { payload: options.payload },
			})
		})

		return { list, put, start, get }
	})
	.views((self) => {
		const getFromStore = (options: {
			projectId: string
		}): Instance<typeof WorkflowDataModel>[] | undefined => {
			return self.workflows.get(options.projectId)
		}

		return { getFromStore }
	})
