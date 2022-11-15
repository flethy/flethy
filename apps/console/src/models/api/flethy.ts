import { flow, types } from 'mobx-state-tree'
import { request } from '../../helpers/api'
import { getRootStore } from '../helpers'

export const FlethyModel = types
	.model('FlethyModel', {
		testdata: types.optional(types.string, ''),
	})
	.actions((self) => {
		const test = flow(function* () {
			try {
				const response = yield request({
					base: 'flethy',
					method: 'get',
					auth: true,
					url: `api/test/w/50d48025-a1cf-468b-bcdf-e9ce37a4b42d`,
				})
				console.log(response)
			} catch (error) {
				console.log(error)
			}
		})

		const onboard = flow(function* (options: {
			workspaceName: string
			projectName: string
		}) {
			const { api } = getRootStore(self)
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
				console.log(response)
			} catch (error) {
				console.log(error)
			}
		})

		return { test, onboard }
	})
