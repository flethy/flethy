import { types } from 'mobx-state-tree'

export const MenuComponent = types
	.model('MenuComponent', {
		isOpen: types.optional(types.boolean, false),
	})
	.actions((self) => {
		const toggle = (open?: boolean) => {
			if (open !== undefined) {
				self.isOpen = open
			} else {
				self.isOpen = !self.isOpen
			}
		}

		return { toggle }
	})
	.views((self) => ({}))
