import { types } from 'mobx-state-tree'
import { PAGE_CONTEXT } from '../../models/api/context'
import { getRootStore, getRouter } from '../../models/helpers'
import routes from '../../routes'

export const ExplorePage = types
	.model('ExplorePage', {
		selectedTags: types.array(types.string),
	})
	.actions((self) => {
		// INITIALIZATION
		const init = (options?: {}) => {
			self.selectedTags.clear()
			const { api } = getRootStore(self)
			api.integrations.init()
			api.context.setPage(PAGE_CONTEXT.EXPLORE)
		}

		const toggleTag = (tag: string) => {
			if (self.selectedTags.includes(tag)) {
				self.selectedTags.remove(tag)
			} else {
				self.selectedTags.push(tag)
			}
		}

		return { init, toggleTag }
	})
	.views((self) => {
		return {}
	})
