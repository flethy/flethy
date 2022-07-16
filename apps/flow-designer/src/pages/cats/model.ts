import { types } from 'mobx-state-tree'
import { getRootStore } from '../../models/helpers'

export const CatsPage = types
	.model('CatsPage', {
		data: types.optional(
			types.model({
				test: types.optional(types.string, ''),
			}),
			{},
		),
	})
	.actions((self) => ({
		// INITIALIZATION
		initialisePage() {
			const { api } = getRootStore(self)

			api.cats.search()
			self.data.test = 'test'
		},
	}))
	.views((self) => ({
		pageModelFetching() {
			const { api } = getRootStore(self)
			return !(api.cats.state === 'done')
		},

		randomCats() {
			const { api } = getRootStore(self)
			return api.cats.cats
		},

		testData() {
			return self.data.test
		},
	}))
