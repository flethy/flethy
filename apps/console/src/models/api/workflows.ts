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
	workflow: types.maybe(types.string),
	envs: types.map(types.string),
})

export const WorkflowsModel = types
	.model('WorkflowsModel', {
		workflows: types.map(types.array(WorkflowDataModel)),
	})
	.views((self) => {
		const getWorkflowFormStore = (options: {
			projectId: string
			workflowId: string
		}) => {
			let foundWorkflow
			const workflows = self.workflows.get(options.projectId)
			if (workflows) {
				foundWorkflow = workflows.find(
					(workflow) => workflow.workflowId === options.workflowId,
				)
			}
			return foundWorkflow
		}

		return { getWorkflowFormStore }
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
				if (!self.workflows.has(options.projectId)) {
					self.workflows.set(options.projectId, response.data)
				} else {
					const workflows = self.workflows.get(options.projectId)
					for (const workflow of response.data) {
						const foundWorkflow = self.getWorkflowFormStore({
							projectId: options.projectId,
							workflowId: workflow.workflowId,
						})
						if (foundWorkflow) {
							foundWorkflow.updatedAt = workflow.updatedAt
							foundWorkflow.updatedBy = workflow.updatedBy
						} else {
							workflows!.push(workflow)
						}
					}
				}

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
				return self.getWorkflowFormStore(options)
			}

			api.stateAndCache.updateToPending(stateAndCacheKey)

			try {
				yield list(options)
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
				const foundWorkflow = self.getWorkflowFormStore(options)
				if (foundWorkflow) {
					foundWorkflow.workflowId = response.workflowId
					foundWorkflow.workflow = JSON.stringify(response.workflow, null, 2)
					if (response.env) {
						for (const key of Object.keys(response.env)) {
							foundWorkflow.envs.set(key, response.env[key])
						}
					}
				}

				api.stateAndCache.updateToDone(stateAndCacheKey)
				return foundWorkflow
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
					workflowId: options.workflowId,
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
				} else {
					foundWorkflow.name = options.name
					foundWorkflow.workflow = JSON.stringify(options.workflow, null, 2)
					foundWorkflow.envs.clear()
					if (options.env) {
						for (const key of Object.keys(options.env)) {
							foundWorkflow.envs.set(key, options.env[key])
						}
					}
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
			const response = yield request({
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
			return response
		})

		const del = flow(function* (options: {
			workspaceId: string
			projectId: string
			workflowId: string
		}) {
			yield request({
				base: 'flethy',
				method: 'delete',
				auth: true,
				url: new RouterPathUtils()
					.w(options.workspaceId)
					.p(options.projectId)
					.wf(options.workflowId)
					.gen(),
			})
			const currentWorkflows = self.workflows.get(options.projectId)
			if (currentWorkflows) {
				const foundWorkflow = self.getWorkflowFormStore(options)
				if (foundWorkflow) {
					currentWorkflows.remove(foundWorkflow)
				}
			}
		})

		return { list, put, start, get, del }
	})
	.views((self) => {
		const getFromStore = (options: {
			projectId: string
		}): Instance<typeof WorkflowDataModel>[] | undefined => {
			return self.workflows.get(options.projectId)
		}

		const workflowsAvailableInCurrentWorkspace = () => {
			const { api } = getRootStore(self)
			const workflows = getFromStore({
				projectId: api.workspaces.getContext().projectId,
			})
			return (workflows && workflows.length > 0) ?? false
		}

		return { getFromStore, workflowsAvailableInCurrentWorkspace }
	})
