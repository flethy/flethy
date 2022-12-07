import { types } from 'mobx-state-tree'
import { getRootStore } from '../../models/helpers'

export const UnsufficientPermissionsPage = types
	.model('UnsufficientPermissionsPage', {
		entity: types.maybe(types.string),
	})
	.actions((self) => ({
		// INITIALIZATION
		initialisePage(options: { entity?: string }) {
			const { api } = getRootStore(self)
			api.helmet.updateTitle({ title: 'Sorry! :(', concatenateAppname: true })
			self.entity = options.entity
		},
	}))
	.views((self) => ({}))
