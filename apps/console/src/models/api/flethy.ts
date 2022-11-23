import { flow, types } from 'mobx-state-tree'
import { request } from '../../helpers/api'
import { FlethyContext } from '../flethy.types'
import { getRootStore } from '../helpers'

export const FlethyModel = types
	.model('FlethyModel', {
		context: types.optional(FlethyContext, {}),
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
				self.context.workspaceId = api.user.workspaces[0].id
				self.context.projectId = api.user.workspaces[0].projects[0].id
			} catch (error) {
				console.log(error)
			}
		})

		return { onboard }
	})
	.views((self) => {
		const getContext = () => {
			const context = {
				workspaceId: self.context.workspaceId,
				projectId: self.context.projectId,
			}
			return context
		}

		const getEnrichedContext = () => {
			const { api } = getRootStore(self)
			const workspace = api.user.workspaceById(
				api.flethy.getContext().workspaceId,
			)
			if (workspace) {
				const project = api.user.projectById(
					workspace.id,
					api.flethy.getContext().projectId,
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

		return { getContext, getEnrichedContext }
	})
