import { flow, types } from 'mobx-state-tree'
import { request } from '../../helpers/api'
import { getRootStore } from '../helpers'

export const FlethyModel = types
	.model('FlethyModel', {
		testdata: types.optional(types.string, ''),
	})
	.actions((self) => {
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
				auth.getTokenSilently().then((response) => {
					console.log('new token')
				})
				console.log(response)
			} catch (error) {
				console.log(error)
			}
		})

		return { onboard }
	})
