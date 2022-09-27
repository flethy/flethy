import { types } from 'mobx-state-tree'

export const HomePage = types
	.model('HomePage', {
		codeExample: types.optional(types.number, 0),
		showMore: types.optional(types.boolean, false),
	})
	.actions((self) => ({
		// INITIALIZATION
		initialisePage() {
			// setInterval(() => {
			// 	self.codeExample = (self.codeExample + 1) % 3
			// }, 1000)
		},

		toggleShowMore() {
			self.showMore = !self.showMore
		},
	}))
	.views((self) => ({}))
