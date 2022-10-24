import { types } from 'mobx-state-tree'
import { getRootStore } from '../../models/helpers'

export const NotFoundPage = types
	.model('NotFoundPage', {
		test: types.maybeNull(types.string),
	})
	.actions((self) => ({
		// INITIALIZATION
		initialisePage() {
			const { api } = getRootStore(self)
			api.helmet.updateTitle({ title: 'Sorry! :(', concatenateAppname: true })
		},
	}))
	.views((self) => ({}))
