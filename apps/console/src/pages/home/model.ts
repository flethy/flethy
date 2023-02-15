import { types } from 'mobx-state-tree'
import { PAGE_CONTEXT } from '../../models/api/context'
import { getRootStore } from '../../models/helpers'

export type GettingStartedState = 'fresh' | 'workflows'

export const HomePage = types
	.model('HomePage', {
		codeExample: types.optional(types.number, 0),
		showMore: types.optional(types.boolean, false),
		onboarding: types.optional(
			types.model({
				workspaceName: types.optional(types.string, ''),
				projectName: types.optional(types.string, ''),
			}),
			{},
		),
	})
	.actions((self) => {
		// INITIALIZATION
		const initialisePage = (options?: {}) => {
			const { api } = getRootStore(self)
			api.context.setPage(PAGE_CONTEXT.HOME)
		}

		const toggleShowMore = () => {
			self.showMore = !self.showMore
		}

		const updateOnboarding = (
			params: Partial<{ workspaceName: string; projectName: string }>,
		) => {
			self.onboarding = { ...self.onboarding, ...params }
		}

		return { initialisePage, toggleShowMore, updateOnboarding }
	})
	.views((self) => {
		const isLoading = () => {
			const { api } = getRootStore(self)
			return api.stateAndCache.somePending([
				{
					api: 'workspaces',
					operation: 'getMy',
				},
				{
					api: 'workflows',
					operation: 'list',
					id: api.workspaces.getContext().projectId,
				},
			])
		}

		const isOnboarded = () => {
			const { api } = getRootStore(self)
			return !isLoading() && api.workspaces.isOnboarded()
		}

		const gettingStartedState = (state: GettingStartedState): boolean => {
			const { api } = getRootStore(self)
			switch (state) {
				case 'fresh':
					return !api.workflows.workflowsAvailableInCurrentWorkspace()
				case 'workflows':
					return api.workflows.workflowsAvailableInCurrentWorkspace()
				default:
					return false
			}
		}

		return { isLoading, isOnboarded, gettingStartedState }
	})
