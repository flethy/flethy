import { types } from 'mobx-state-tree'

export const NotFoundPage = types
	.model('NotFoundPage', {
		test: types.maybeNull(types.string),
	})
	.actions((self) => ({
		// INITIALIZATION
		initialisePage() {},
	}))
	.views((self) => ({}))
