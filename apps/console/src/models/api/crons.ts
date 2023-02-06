import { flow, types } from 'mobx-state-tree'
import { request } from '../../helpers/api'
import { getRootStore, RouterPathUtils } from '../helpers'
import { StateAndCacheKey } from './stateAndCache'

export const CronModel = types.model('CronModel', {
	cronId: types.string,
	name: types.string,
	workflowId: types.string,
	expression: types.string,
})

export const CronsModel = types
	.model('CronsModel', {
		crons: types.map(types.array(CronModel)),
	})
	.views((self) => {
		return {}
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
				api: `crons`,
				operation: `list`,
				id: options.projectId,
			}
			if (!api.stateAndCache.shouldFetch(stateAndCacheKey, useCache)) {
				return
			}

			api.stateAndCache.updateToPending(stateAndCacheKey)

			try {
				const response: any[] = yield request({
					base: 'flethy',
					method: 'get',
					auth: true,
					url: new RouterPathUtils()
						.w(options.workspaceId)
						.p(options.projectId)
						.c()
						.gen(),
				})
				self.crons.set(options.projectId, response ?? [])

				api.stateAndCache.updateToDone(stateAndCacheKey)
			} catch (error) {
				console.log(error)
				api.stateAndCache.updateToFailure(stateAndCacheKey)
			}
		})

		const create = flow(function* (options: {
			workspaceId: string
			projectId: string
			name: string
			expression: string
			workflowId: string
		}) {
			const newCron: any = yield request({
				base: 'flethy',
				method: 'post',
				auth: true,
				url: new RouterPathUtils()
					.w(options.workspaceId)
					.p(options.projectId)
					.c(false)
					.gen(),
				body: {
					name: options.name,
					expression: options.expression,
					workflowId: options.workflowId,
				},
			})

			const currentCrons = self.crons.get(options.projectId) ?? ([] as any[])
			currentCrons.push(newCron)
			self.crons.set(options.projectId, currentCrons)
			return newCron
		})

		const del = flow(function* (options: {
			workspaceId: string
			projectId: string
			cronId: string
		}) {
			yield request({
				base: 'flethy',
				method: 'delete',
				auth: true,
				url: new RouterPathUtils()
					.w(options.workspaceId)
					.p(options.projectId)
					.c(options.cronId)
					.gen(),
			})

			const currentCrons = self.crons.get(options.projectId) ?? ([] as any[])
			const newCrons = currentCrons.filter(
				(cron) => cron.cronId !== options.cronId,
			)

			self.crons.set(options.projectId, newCrons)
		})

		return { list, create, del }
	})
