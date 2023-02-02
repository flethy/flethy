import { types } from 'mobx-state-tree'
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
