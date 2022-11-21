import { types } from 'mobx-state-tree'
import { getRootStore, getRouter } from '../../models/helpers'
import routes from '../../routes'

export const HomePage = types
	.model('HomePage', {
		codeExample: types.optional(types.number, 0),
		showMore: types.optional(types.boolean, false),
	})
	.actions((self) => ({
		// INITIALIZATION
		initialisePage(options?: { emailSubscription?: boolean }) {
			const { api } = getRootStore(self)
			api.helmet.defaultTitle()
			if (options?.emailSubscription === true) {
				const router = getRouter()
				router.goTo(routes.home)
				setTimeout(() => {
					const emailSubscription = document.querySelector(
						'#email-subscription',
					)
					if (emailSubscription) {
						emailSubscription.scrollIntoView({ behavior: 'smooth' })
					}
				}, 100)
			}
		},

		toggleShowMore() {
			self.showMore = !self.showMore
		},
	}))
	.views((self) => {
		const getContext = () => {
			const { api } = getRootStore(self)
			const context = {
				workspaceId: api.flethy.context.workspaceId,
				projectId: api.flethy.context.projectId,
			}
			console.log(context)
			return context
		}

		return { getContext }
	})
