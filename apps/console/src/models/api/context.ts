import { types } from 'mobx-state-tree'
import i18next from '../../i18n/config'
import { getRootStore } from '../helpers'

export enum PAGE_CONTEXT {
	EXPLORE = 'explore',
	TOKENS = 'tokens',
	WORKFLOWS = 'workflows',
	HOME = 'home',
	EDITOR = 'editor',
	SECRETS = 'secrets',
}

export const ContextModel = types
	.model('ContextModel', {
		page: types.maybe(types.string),
	})
	.actions((self) => {
		const setPage = (page: string) => {
			self.page = page
			window.scrollTo(0, 0)
			const { api, components } = getRootStore(self)
			switch (page) {
				case PAGE_CONTEXT.WORKFLOWS:
					api.helmet.updateTitle({
						title: 'Your Workflows',
						concatenateAppname: true,
					})
					components.docsBar.setDocItems(['api'])
					break
				case PAGE_CONTEXT.EXPLORE:
					api.helmet.updateTitle({
						title: 'Explore all integrations',
						concatenateAppname: true,
					})
					components.docsBar.setDocItems([])
					break
				case PAGE_CONTEXT.TOKENS:
					api.helmet.updateTitle({
						title: 'Your Tokens',
						concatenateAppname: true,
					})
					components.docsBar.setDocItems([])
					break
				case PAGE_CONTEXT.HOME:
					api.helmet.updateTitle({
						title: `Let's get started!`,
						concatenateAppname: true,
					})
					components.docsBar.setDocItems([])
					break
				case PAGE_CONTEXT.EDITOR:
					api.helmet.updateTitle({
						title: 'Design your Workflow',
						concatenateAppname: true,
					})
					components.docsBar.setDocItems([])
					break
				case PAGE_CONTEXT.SECRETS:
					api.helmet.updateTitle({
						title: 'Your Secrets',
						concatenateAppname: true,
					})
					components.docsBar.setDocItems([])
					break
				default:
					api.helmet.defaultTitle()
					components.docsBar.setDocItems([])
			}
		}

		return { setPage }
	})
