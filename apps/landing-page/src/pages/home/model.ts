import { types } from 'mobx-state-tree'
import { getRouter } from '../../models/helpers'
import routes from '../../routes'

export const HomePage = types
	.model('HomePage', {
		codeExample: types.optional(types.number, 0),
		showMore: types.optional(types.boolean, false),
	})
	.actions((self) => ({
		// INITIALIZATION
		initialisePage(options?: { emailSubscription?: boolean }) {
			if (options?.emailSubscription === true) {
				const router = getRouter()
				router.goTo(routes.home)
				const emailSubscription = document.querySelector('#email-subscription')
				if (emailSubscription) {
					emailSubscription.scrollIntoView({ behavior: 'smooth' })
				}
			}
		},

		toggleShowMore() {
			self.showMore = !self.showMore
		},
	}))
	.views((self) => ({}))
