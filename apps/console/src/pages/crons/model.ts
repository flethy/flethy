import { Instance, types } from 'mobx-state-tree'
import { PAGE_CONTEXT } from '../../models/api/context'
import { CronModel } from '../../models/api/crons'
import { FlethyContext } from '../../models/flethy.types'
import { getRootStore } from '../../models/helpers'

export const CronsPage = types
	.model('CronsPage', {
		context: types.optional(FlethyContext, {}),
	})
	.actions((self) => ({
		// INITIALIZATION
		initialisePage(options: { workspaceId: string; projectId: string }) {
			self.context.projectId = options.projectId
			self.context.workspaceId = options.workspaceId
			const { api } = getRootStore(self)
			api.context.setPage(PAGE_CONTEXT.CRONS)
			api.crons.list({
				workspaceId: self.context.workspaceId,
				projectId: self.context.projectId,
			})
		},
	}))
	.views((self) => ({
		isLoading() {
			const { api } = getRootStore(self)
			return api.stateAndCache.somePending([
				{
					api: 'crons',
					operation: 'list',
					id: self.context.projectId,
				},
			])
		},

		cronsAvailable() {
			const { api } = getRootStore(self)
			const crons = api.crons.getCronsFromStore({
				projectId: self.context.projectId,
			})
			if (crons) {
				return crons.length > 0
			}
			return false
		},

		getCrons(): Instance<typeof CronModel>[] {
			const { api } = getRootStore(self)
			return api.crons.getCronsFromStore({
				projectId: self.context.projectId,
			})!
		},
	}))
