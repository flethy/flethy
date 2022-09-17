import { types } from 'mobx-state-tree'

export const HomePage = types
	.model('HomePage', {})
	.actions((self) => ({
		// INITIALIZATION
		initialisePage() {},
	}))
	.views((self) => ({}))
