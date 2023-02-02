import { types } from 'mobx-state-tree'
import { PAGE_CONTEXT } from '../../models/api/context'
import { getRootStore, getRouter } from '../../models/helpers'
import routes from '../../routes'

const SHOW_ITEMS = 10

export const ExplorePage = types
	.model('ExplorePage', {
		selectedTags: types.array(types.string),
		loadedIndex: types.optional(types.number, 0),
	})
	.actions((self) => {
		// INITIALIZATION
		const init = (options?: {}) => {
			self.selectedTags.clear()
			self.loadedIndex = SHOW_ITEMS
			const { api } = getRootStore(self)
			api.integrations.init()
			api.context.setPage(PAGE_CONTEXT.EXPLORE)
		}

		const toggleTag = (tag: string) => {
			self.loadedIndex = SHOW_ITEMS
			if (self.selectedTags.includes(tag)) {
				self.selectedTags.remove(tag)
			} else {
				self.selectedTags.push(tag)
			}
		}

		const increaseLoadedIndex = () => {
			self.loadedIndex += SHOW_ITEMS
		}

		return { init, toggleTag, increaseLoadedIndex }
	})
	.views((self) => {
		return {}
	})
